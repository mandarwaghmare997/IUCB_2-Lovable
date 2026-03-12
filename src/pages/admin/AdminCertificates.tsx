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
import { Award, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const statusColors: Record<string, string> = {
  draft: "secondary",
  generated: "outline",
  published: "default",
  suspended: "destructive",
  revoked: "destructive",
  expired: "secondary",
  archived: "secondary",
};

const AdminCertificates = () => {
  const [certs, setCerts] = useState<any[]>([]);
  const [orgs, setOrgs] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState({
    certificate_number: "",
    organization_id: "",
    scope_summary: "",
    issue_date: "",
    expiry_date: "",
    template_id: "",
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
      ...form,
      verification_slug: slug,
      qr_token: crypto.randomUUID(),
      created_by: user?.id,
      updated_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Certificate draft created" });
      setOpen(false);
      setForm({ certificate_number: "", organization_id: "", scope_summary: "", issue_date: "", expiry_date: "", template_id: "" });
      load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <Award className="h-6 w-6" /> Certificates
          </h1>
          <p className="text-muted-foreground">Manage CAB certificates lifecycle</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> New Certificate</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Certificate Draft</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Certificate Number *</Label>
                <Input required value={form.certificate_number} onChange={(e) => setForm({ ...form, certificate_number: e.target.value })} placeholder="IUCB-CAB-2026-001" />
              </div>
              <div className="space-y-2">
                <Label>Organization *</Label>
                <Select required value={form.organization_id} onValueChange={(v) => setForm({ ...form, organization_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select organization" /></SelectTrigger>
                  <SelectContent>
                    {orgs.map((o) => (
                      <SelectItem key={o.id} value={o.id}>{o.legal_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Template</Label>
                <Select value={form.template_id} onValueChange={(v) => setForm({ ...form, template_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                  <SelectContent>
                    {templates.map((t) => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Scope Summary</Label>
                <Textarea value={form.scope_summary} onChange={(e) => setForm({ ...form, scope_summary: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" value={form.issue_date} onChange={(e) => setForm({ ...form, issue_date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input type="date" value={form.expiry_date} onChange={(e) => setForm({ ...form, expiry_date: e.target.value })} />
                </div>
              </div>
              <Button type="submit" className="w-full">Create Draft</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {certs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No certificates yet. Create your first one.</p>
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {certs.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium font-mono text-foreground">{c.certificate_number}</TableCell>
                    <TableCell className="text-muted-foreground">{(c as any).organizations?.legal_name || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={(statusColors[c.status] || "secondary") as any} className="capitalize">{c.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{c.publication_state}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.issue_date || "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{c.expiry_date || "—"}</TableCell>
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
