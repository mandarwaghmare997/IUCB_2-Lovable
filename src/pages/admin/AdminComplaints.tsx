import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("complaints").select("*").order("received_at", { ascending: false });
    setComplaints(data || []);
  };

  useEffect(() => { load(); }, []);

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "new" ? "closed" : "new";
    const { error } = await supabase.from("complaints").update({ status: newStatus }).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      load();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
          <MessageSquare className="h-6 w-6" /> Complaints & Appeals
        </h1>
        <p className="text-muted-foreground">Review submissions from public forms</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {complaints.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No submissions yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell><Badge variant="outline" className="capitalize">{c.type}</Badge></TableCell>
                    <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{c.subject || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "new" ? "default" : "secondary"} className="capitalize">{c.status}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(c.received_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" onClick={() => toggleStatus(c.id, c.status)}>
                        {c.status === "new" ? "Close" : "Reopen"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminComplaints;
