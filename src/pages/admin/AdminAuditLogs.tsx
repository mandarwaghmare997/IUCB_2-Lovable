import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollText } from "lucide-react";

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(100);
      setLogs(data || []);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
          <ScrollText className="h-6 w-6" /> Audit Logs
        </h1>
        <p className="text-muted-foreground">Track all admin actions and mutations</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          {logs.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No audit events recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity Type</TableHead>
                  <TableHead>Entity ID</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium text-foreground">{l.action}</TableCell>
                    <TableCell className="text-muted-foreground">{l.entity_type}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{l.entity_id ? l.entity_id.slice(0, 8) + "…" : "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{l.ip_address || "—"}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{new Date(l.created_at).toLocaleString()}</TableCell>
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

export default AdminAuditLogs;
