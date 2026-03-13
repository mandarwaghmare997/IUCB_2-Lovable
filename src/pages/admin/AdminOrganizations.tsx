import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Plus, Search, MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const AdminOrganizations = () => {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const [form, setForm] = useState({
    legal_name: "", public_name: "", registration_number: "",
    country: "", city: "", website: "",
    contact_name: "", contact_email: "", contact_phone: "",
  });

  const load = async () => {
    const { data } = await supabase.from("organizations").select("*").order("created_at", { ascending: false });
    setOrgs(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("organizations").insert(form);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Organization created" }); setOpen(false); setForm({ legal_name: "", public_name: "", registration_number: "", country: "", city: "", website: "", contact_name: "", contact_email: "", contact_phone: "" }); load(); }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase.from("organizations").update({ status: newStatus as any }).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Status updated to ${newStatus}` }); load(); }
  };

  const deleteOrg = async (id: string) => {
    const { error } = await supabase.from("organizations").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Organization deleted" }); load(); }
  };

  const filtered = orgs.filter((o) => {
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesSearch = !search || o.legal_name.toLowerCase().includes(search.toLowerCase()) || (o.country || "").toLowerCase().includes(search.toLowerCase()) || (o.contact_email || "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Building2 className="h-6 w-6" /> Organizations</h1>
          <p className="text-muted-foreground">Manage CAB entities</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New Organization</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Organization</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Legal Name *</Label><Input required value={form.legal_name} onChange={(e) => setForm({ ...form, legal_name: e.target.value })} /></div>
                <div className="space-y-2"><Label>Public Name</Label><Input value={form.public_name} onChange={(e) => setForm({ ...form, public_name: e.target.value })} /></div>
                <div className="space-y-2"><Label>Registration #</Label><Input value={form.registration_number} onChange={(e) => setForm({ ...form, registration_number: e.target.value })} /></div>
                <div className="space-y-2"><Label>Country</Label><Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} /></div>
                <div className="space-y-2"><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
                <div className="space-y-2"><Label>Website</Label><Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
                <div className="space-y-2"><Label>Contact Name</Label><Input value={form.contact_name} onChange={(e) => setForm({ ...form, contact_name: e.target.value })} /></div>
                <div className="space-y-2"><Label>Contact Email</Label><Input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} /></div>
                <div className="space-y-2"><Label>Contact Phone</Label><Input value={form.contact_phone} onChange={(e) => setForm({ ...form, contact_phone: e.target.value })} /></div>
              </div>
              <Button type="submit" className="w-full">Create Organization</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search organizations..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <Card>
        <CardContent className="pt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No organizations found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Legal Name</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium text-foreground">{o.legal_name}</TableCell>
                    <TableCell className="text-muted-foreground">{o.country || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{o.contact_email || "—"}</TableCell>
                    <TableCell><Badge variant={o.status === "active" ? "default" : "secondary"} className="capitalize">{o.status}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(o.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {["active", "inactive", "archived"].filter((s) => s !== o.status).map((s) => (
                            <DropdownMenuItem key={s} onClick={() => updateStatus(o.id, s)} className="capitalize">Set {s}</DropdownMenuItem>
                          ))}
                          <DropdownMenuItem className="text-destructive" onClick={() => deleteOrg(o.id)}>Delete</DropdownMenuItem>
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
    </div>
  );
};

export default AdminOrganizations;
