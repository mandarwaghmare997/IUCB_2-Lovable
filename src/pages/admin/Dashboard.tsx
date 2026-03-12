import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Award, Building2, FileText, MessageSquare, Plus, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  certificates: Record<string, number>;
  organizations: number;
  complaints: number;
  documents: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    certificates: {},
    organizations: 0,
    complaints: 0,
    documents: 0,
  });
  const [recentComplaints, setRecentComplaints] = useState<any[]>([]);
  const [recentAudit, setRecentAudit] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [certs, orgs, comps, docs, complaints, audit] = await Promise.all([
        supabase.from("certificates").select("status"),
        supabase.from("organizations").select("id", { count: "exact", head: true }),
        supabase.from("complaints").select("id", { count: "exact", head: true }),
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase.from("complaints").select("*").order("received_at", { ascending: false }).limit(5),
        supabase.from("audit_logs").select("*").order("created_at", { ascending: false }).limit(5),
      ]);

      const certCounts: Record<string, number> = {};
      certs.data?.forEach((c) => {
        certCounts[c.status] = (certCounts[c.status] || 0) + 1;
      });

      setStats({
        certificates: certCounts,
        organizations: orgs.count || 0,
        complaints: comps.count || 0,
        documents: docs.count || 0,
      });
      setRecentComplaints(complaints.data || []);
      setRecentAudit(audit.data || []);
    };
    load();
  }, []);

  const certStatuses = ["draft", "generated", "published", "suspended", "revoked", "expired", "archived"];

  const quickActions = [
    { label: "New Certificate", icon: Plus, path: "/admin/certificates/new" },
    { label: "New Organization", icon: Building2, path: "/admin/organizations/new" },
    { label: "New Document", icon: FileText, path: "/admin/documents/new" },
    { label: "View Complaints", icon: MessageSquare, path: "/admin/complaints" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">IUCB Platform Overview</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Certificates</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {Object.values(stats.certificates).reduce((a, b) => a + b, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Organizations</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.organizations}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open Complaints</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.complaints}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Documents</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.documents}</div>
          </CardContent>
        </Card>
      </div>

      {/* Certificate breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Certificate Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {certStatuses.map((status) => (
              <div key={status} className="rounded-lg border border-border px-4 py-2 text-center">
                <div className="text-lg font-bold text-foreground">{stats.certificates[status] || 0}</div>
                <div className="text-xs capitalize text-muted-foreground">{status}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link key={action.path} to={action.path}>
            <Button variant="outline" className="w-full justify-start gap-2 border-border text-foreground hover:bg-muted">
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MessageSquare className="h-4 w-4" /> Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentComplaints.length === 0 ? (
              <p className="text-sm text-muted-foreground">No complaints yet</p>
            ) : (
              <div className="space-y-3">
                {recentComplaints.map((c) => (
                  <div key={c.id} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.subject || c.type}</p>
                      <p className="text-xs text-muted-foreground">{c.name} — {c.email}</p>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs capitalize text-muted-foreground">{c.status}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <ScrollText className="h-4 w-4" /> Recent Audit Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentAudit.length === 0 ? (
              <p className="text-sm text-muted-foreground">No audit events yet</p>
            ) : (
              <div className="space-y-3">
                {recentAudit.map((a) => (
                  <div key={a.id} className="border-b border-border pb-2 last:border-0">
                    <p className="text-sm font-medium text-foreground">{a.action}</p>
                    <p className="text-xs text-muted-foreground">{a.entity_type} — {new Date(a.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
