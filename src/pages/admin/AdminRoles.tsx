import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield } from "lucide-react";

const roles = [
  {
    name: "Super Admin",
    value: "super_admin",
    description: "Full control over all modules, role changes, settings, numbering config, template config, certificate publish and status changes.",
  },
  {
    name: "Admin",
    value: "admin",
    description: "Operational control: users, organizations, templates, certificates, documents, complaints view, audit log view.",
  },
  {
    name: "Certificate Manager",
    value: "certificate_manager",
    description: "Issuance operations: create/edit drafts, generate previews, generate PDFs, publish/unpublish, suspend/revoke/expire.",
  },
];

const AdminRoles = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6" /> Roles & Permissions
        </h1>
        <p className="text-muted-foreground">Platform role definitions and access levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Role Definitions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Permissions Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.value}>
                  <TableCell className="font-medium text-foreground">{r.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{r.value}</TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-md">{r.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRoles;
