import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const AdminUsers = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [roles, setRoles] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const load = async () => {
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("user_roles").select("*"),
      ]);
      setProfiles(p || []);
      const roleMap: Record<string, string[]> = {};
      r?.forEach((role) => {
        if (!roleMap[role.user_id]) roleMap[role.user_id] = [];
        roleMap[role.user_id].push(role.role);
      });
      setRoles(roleMap);
    };
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
          <Users className="h-6 w-6" /> Users
        </h1>
        <p className="text-muted-foreground">Manage platform users and their roles</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {profiles.length === 0 ? (
            <p className="text-muted-foreground">No users found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium text-foreground">{p.full_name || "—"}</TableCell>
                    <TableCell className="text-muted-foreground">{p.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {(roles[p.user_id] || []).map((r) => (
                          <Badge key={r} variant="secondary" className="text-xs capitalize">
                            {r.replace("_", " ")}
                          </Badge>
                        ))}
                        {(!roles[p.user_id] || roles[p.user_id].length === 0) && (
                          <span className="text-xs text-muted-foreground">No role</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.status === "active" ? "default" : "destructive"} className="capitalize">
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(p.created_at).toLocaleDateString()}
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

export default AdminUsers;
