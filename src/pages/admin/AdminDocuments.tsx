import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const categories = ["policy", "procedure", "manual", "deck", "guidance"];

const AdminDocuments = () => {
  const [docs, setDocs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: "", slug: "", category: "policy", summary: "",
    version: "1.0", effective_date: "", is_public: false,
  });

  const load = async () => {
    const { data } = await supabase.from("documents").select("*").order("created_at", { ascending: false });
    setDocs(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const { error } = await supabase.from("documents").insert({
      title: form.title,
      slug,
      category: form.category as any,
      summary: form.summary,
      version: form.version,
      effective_date: form.effective_date || null,
      is_public: form.is_public,
      created_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Document created" });
      setOpen(false);
      setForm({ title: "", slug: "", category: "policy", summary: "", version: "1.0", effective_date: "", is_public: false });
      load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <FileText className="h-6 w-6" /> Documents
          </h1>
          <p className="text-muted-foreground">Manage policies, manuals, and governance documents</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> New Document</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Document</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c} className="capitalize">{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Summary</Label>
                <Textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Input value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Effective Date</Label>
                  <Input type="date" value={form.effective_date} onChange={(e) => setForm({ ...form, effective_date: e.target.value })} />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Document</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {docs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No documents yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Public</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {docs.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium text-foreground">{d.title}</TableCell>
                    <TableCell className="capitalize text-muted-foreground">{d.category}</TableCell>
                    <TableCell className="text-muted-foreground">v{d.version}</TableCell>
                    <TableCell>
                      <Badge variant={d.status === "published" ? "default" : "secondary"} className="capitalize">{d.status}</Badge>
                    </TableCell>
                    <TableCell>{d.is_public ? "✓" : "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(d.created_at).toLocaleDateString()}</TableCell>
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

export default AdminDocuments;
