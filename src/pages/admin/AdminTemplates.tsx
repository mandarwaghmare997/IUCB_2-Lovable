import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileCode, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const AdminTemplates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", html_content: "", css_content: "" });

  const load = async () => {
    const { data } = await supabase.from("certificate_templates").select("*").order("created_at", { ascending: false });
    setTemplates(data || []);
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("certificate_templates").insert({
      ...form,
      created_by: user?.id,
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Template created" });
      setOpen(false);
      setForm({ name: "", html_content: "", css_content: "" });
      load();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
            <FileCode className="h-6 w-6" /> Certificate Templates
          </h1>
          <p className="text-muted-foreground">Manage HTML/CSS certificate templates</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> New Template</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Template</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Template Name *</Label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="CAB Certificate v1" />
              </div>
              <div className="space-y-2">
                <Label>HTML Content</Label>
                <Textarea rows={8} className="font-mono text-xs" value={form.html_content} onChange={(e) => setForm({ ...form, html_content: e.target.value })} placeholder="<div>{{certificateNumber}}</div>" />
              </div>
              <div className="space-y-2">
                <Label>CSS Content</Label>
                <Textarea rows={4} className="font-mono text-xs" value={form.css_content} onChange={(e) => setForm({ ...form, css_content: e.target.value })} />
              </div>
              <Button type="submit" className="w-full">Create Template</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          {templates.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No templates yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium text-foreground">{t.name}</TableCell>
                    <TableCell className="text-muted-foreground">{t.template_type}</TableCell>
                    <TableCell className="text-muted-foreground">v{t.version}</TableCell>
                    <TableCell>
                      <Badge variant={t.is_active ? "default" : "secondary"}>{t.is_active ? "Active" : "Inactive"}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(t.created_at).toLocaleDateString()}</TableCell>
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

export default AdminTemplates;
