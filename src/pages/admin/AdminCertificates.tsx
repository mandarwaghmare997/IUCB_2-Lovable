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
import { Award, Plus, Search, MoreHorizontal } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const statusColors: Record<string, string> = {
  draft: "secondary", generated: "outline", published: "default",
  suspended: "destructive", revoked: "destructive", expired: "secondary", archived: "secondary",
};

const allStatuses = ["draft", "generated", "published", "suspended", "revoked", "expired", "archived"];

const AdminCertificates = () => {
  const [certs, setCerts] = useState<any[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState({
    certificate_number: "", organization_id: "", scope_summary: "",
    issue_date: "", expiry_date: "", template_id: "",
  });

  const load = async () => {
    const [{ data: c }, { data: o }, { data: t }] = await Promise.all([
      supabase.from("certificates").select("*, organizations(legal_name)").order("created_at", { ascending: false }),
      supabase.from("organizations").select("id, legal_name").eq("status", "active"),
      supabase.from("certificate_templates").select("id, name").eq("is_active", true),
    ]);
    setCerts(c || []);
    setOrgs(o || []);
    setTemplates(t || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = form.certificate_number.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const { error } = await supabase.from("certificates").insert({
      ...form, verification_slug: slug, qr_token: crypto.randomUUID(),
      created_by: user?.id, updated_by: user?.id,
    });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    else { toast({ title: "Certificate draft created" }); setOpen(false); setForm({ certificate_number: "", organization_id: "", scope_summary: "", issue_date: "", expiry_date: "", template_id: "" }); load(); }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const updates: any = { status: newStatus, updated_by: user?.id };
    if (newStatus === "published") { updates.publication_state = "published"; updates.published_at = new Date().toISOString(); }
    const { error } = await supabase.from("certificates").update(updates).eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: `Status updated to ${newStatus}` }); load(); }
  };

  const deleteCert = async (id: string) => {
    const { error } = await supabase.from("certificates").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Certificate deleted" }); load(); }
  };

  const filtered = certs.filter((c) => {
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    const matchesSearch = !search || c.certificate_number.toLowerCase().includes(search.toLowerCase()) || (c.organizations?.legal_name || "").toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Award className="h-6 w-6" /> Certificates</h1>
          <p className="text-muted-foreground">Manage CAB certificates lifecycle</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> New Certificate</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Certificate Draft</DialogTitle></DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2"><Label>Certificate Number *</Label><Input required value={form.certificate_number} onChange={(e) => setForm({ ...form, certificate_number: e.target.value })} placeholder="IUCB-CAB-2026-001" /></div>
              <div className="space-y-2"><Label>Organization *</Label>
                <Select required value={form.organization_id} onValueChange={(v) => setForm({ ...form, organization_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select organization" /></SelectTrigger>
                  <SelectContent>{orgs.map((o) => <SelectItem key={o.id} value={o.id}>{o.legal_name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Template</Label>
                <Select value={form.template_id} onValueChange={(v) => setForm({ ...form, template_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                  <SelectContent>{templates.map((t) => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Scope Summary</Label><Textarea value={form.scope_summary} onChange={(e) => setForm({ ...form, scope_summary: e.target.value })} /></div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Issue Date</Label><Input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} /></div>
                <div className="space-y-2"><Label>Expiry Date</Label><Input type="date" value={form.expiry_date} onChange={(e) => setForm({ ...form, expiry_date: e.target.value })} /></div>
              </div>
              <Button type="submit" className="w-full">Create Draft</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search certificates..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {allStatuses.map((s) => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <Card>
        <CardContent className="pt-6">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No certificates found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate #</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Publication</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium font-mono text-foreground">{c.certificate_number}</TableCell>
                    <TableCell className="text-muted-foreground">{c.organizations?.legal_name || "—"}</TableCell>
                    <TableCell><Badge variant={(statusColors[c.status] || "secondary") as any} className="capitalize">{c.status}</Badge></TableCell>
                    <TableCell><Badge variant="outline" className="capitalize">{c.publication_state}</Badge></TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.issue_date || "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.expiry_date || "—"}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {allStatuses.filter((s) => s !== c.status).map((s) => (
                            <DropdownMenuItem key={s} onClick={() => updateStatus(c.id, s)} className="capitalize">Set {s}</DropdownMenuItem>
                          ))}
                          <DropdownMenuItem className="text-destructive" onClick={() => deleteCert(c.id)}>Delete</DropdownMenuItem>
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

export default AdminCertificates;
