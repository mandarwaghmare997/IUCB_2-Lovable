import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Search, Eye, MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("complaints").select("*").order("received_at", { ascending: false });
    setComplaints(data || []);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("complaints").update({ status: newStatus as any }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Status set to ${newStatus}` }); load(); }
  };

  const deleteComplaint = async (id: string) => {
    const { error } = await supabase.from("complaints").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Deleted" }); load(); setSelected(null); }
  };

  const filtered = complaints.filter((c) => {
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesType = typeFilter === "all" || c.type === typeFilter;
    const matchesSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()) || (c.subject || "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><MessageSquare className="h-6 w-6" /> Complaints & Appeals</h1>
        <p className="text-muted-foreground">Review submissions from public forms</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by name, email, subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="complaint">Complaint</SelectItem>
            <SelectItem value="appeal">Appeal</SelectItem>
            <SelectItem value="support">Support</SelectItem>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="accreditation_application">Application</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <Card>
        <CardContent className="pt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No submissions found.</p>
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
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}>
                    <TableCell><Badge variant="outline" className="capitalize">{c.type.replace("_", " ")}</Badge></TableCell>
                    <TableCell className="font-medium text-foreground">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.email}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate">{c.subject || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "new" ? "default" : c.status === "in_progress" ? "outline" : "secondary"} className="capitalize">{c.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(c.received_at).toLocaleDateString()}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelected(c)}><Eye className="mr-2 h-4 w-4" /> View</DropdownMenuItem>
                          {["new", "in_progress", "closed"].filter((s) => s !== c.status).map((s) => (
                            <DropdownMenuItem key={s} onClick={() => updateStatus(c.id, s)} className="capitalize">Set {s.replace("_", " ")}</DropdownMenuItem>
                          ))}
                          <DropdownMenuItem className="text-destructive" onClick={() => deleteComplaint(c.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Submission Detail</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium text-foreground">{selected.name}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium text-foreground">{selected.email}</span></div>
                <div><span className="text-muted-foreground">Type:</span> <Badge variant="outline" className="capitalize ml-1">{selected.type.replace("_", " ")}</Badge></div>
                <div><span className="text-muted-foreground">Status:</span> <Badge variant="default" className="capitalize ml-1">{selected.status.replace("_", " ")}</Badge></div>
                <div><span className="text-muted-foreground">Received:</span> <span className="font-medium text-foreground">{new Date(selected.received_at).toLocaleString()}</span></div>
                {selected.related_certificate_number && <div><span className="text-muted-foreground">Cert #:</span> <span className="font-medium font-mono text-foreground">{selected.related_certificate_number}</span></div>}
              </div>
              {selected.subject && <div><span className="text-sm text-muted-foreground">Subject:</span><p className="mt-1 font-medium text-foreground">{selected.subject}</p></div>}
              <div><span className="text-sm text-muted-foreground">Message:</span><p className="mt-1 text-foreground whitespace-pre-wrap rounded-lg bg-muted p-3 text-sm">{selected.message}</p></div>
              <div className="flex gap-2">
                {["new", "in_progress", "closed"].filter((s) => s !== selected.status).map((s) => (
                  <Button key={s} size="sm" variant="outline" className="capitalize" onClick={() => { updateStatus(selected.id, s); setSelected({ ...selected, status: s }); }}>
                    Set {s.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminComplaints;
