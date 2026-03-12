import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6" /> Settings
        </h1>
        <p className="text-muted-foreground">Platform configuration</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-foreground">General</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Platform name, logo, and branding settings will be managed here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-foreground">Email Routing</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Configure SMTP settings and form destination emails.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-foreground">Certificate Numbering</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Define certificate number prefix, format, and auto-increment behavior.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-foreground">Verification</CardTitle></CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Configure verification URL pattern and public status labels.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
