import { useState } from "react";
import { Search, Shield, CheckCircle, XCircle, AlertTriangle, Clock, QrCode, Building, ArrowRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type CertStatus = "active" | "expired" | "suspended" | "revoked";

interface CertResult {
  number: string;
  organization: string;
  scope: string;
  status: CertStatus;
  issueDate: string;
  expiryDate: string;
  certificateType: string;
}

const statusConfig: Record<CertStatus, { label: string; icon: typeof CheckCircle; color: string; bg: string }> = {
  active: { label: "Active", icon: CheckCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  expired: { label: "Expired", icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  suspended: { label: "Suspended", icon: AlertTriangle, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500/10" },
  revoked: { label: "Revoked", icon: XCircle, color: "text-red-600 dark:text-red-400", bg: "bg-red-500/10" },
};

const mapDbStatus = (status: string, expiryDate: string | null): CertStatus => {
  if (status === "revoked") return "revoked";
  if (status === "suspended") return "suspended";
  if (status === "expired" || (expiryDate && new Date(expiryDate) < new Date())) return "expired";
  if (status === "published" || status === "generated") return "active";
  return "expired";
};

const Verify = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CertResult[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    const { data } = await supabase
      .from("certificates")
      .select("certificate_number, certificate_type, scope_summary, status, issue_date, expiry_date, organization_id, organizations(legal_name, public_name)")
      .eq("publication_state", "published")
      .or(`certificate_number.ilike.%${query}%,verification_slug.ilike.%${query}%`)
      .limit(10);

    if (data && data.length > 0) {
      setResults(
        data.map((c: any) => ({
          number: c.certificate_number,
          organization: c.organizations?.public_name || c.organizations?.legal_name || "—",
          scope: c.scope_summary || "—",
          status: mapDbStatus(c.status, c.expiry_date),
          issueDate: c.issue_date || "—",
          expiryDate: c.expiry_date || "—",
          certificateType: c.certificate_type,
        }))
      );
    } else {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-navy py-20">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">
            Certificate <span className="text-gradient-gold">Verification</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/70">
            Verify the authenticity of any certificate issued by an IUCB-accredited body.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter certificate number (e.g., IUCB-ISO9001-2024-001234)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" disabled={loading} className="h-12 px-6 bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
              </Button>
            </form>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Or scan a QR code on the certificate for instant verification
            </p>
          </div>

          {/* Results */}
          {searched && !loading && (
            <div className="mx-auto mt-10 max-w-2xl">
              {results.length === 0 ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <XCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mb-2 font-semibold font-display text-foreground">No certificate found</h3>
                  <p className="text-sm text-muted-foreground">
                    No published certificate matching "{query}" was found. Please check the number and try again.
                  </p>
                  <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline">
                    Report an issue <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((cert) => {
                    const status = statusConfig[cert.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={cert.number} className="rounded-xl border border-border bg-card p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-mono text-muted-foreground">{cert.number}</p>
                            <h3 className="mt-1 text-lg font-semibold font-display text-foreground">{cert.organization}</h3>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${status.color} ${status.bg}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>
                        </div>
                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                          <div>
                            <span className="text-muted-foreground">Type:</span>
                            <span className="ml-2 font-medium text-foreground">{cert.certificateType}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Scope:</span>
                            <span className="ml-2 font-medium text-foreground">{cert.scope}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Issued:</span>
                            <span className="ml-2 font-medium text-foreground">{cert.issueDate}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Expires:</span>
                            <span className="ml-2 font-medium text-foreground">{cert.expiryDate}</span>
                          </div>
                        </div>
                        <div className="mt-3 border-t border-border pt-3">
                          <p className="text-xs text-muted-foreground">
                            Accredited by: <span className="font-medium text-primary">IUCB Accredited</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Verification Methods */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-2xl font-bold font-display text-foreground">Verification Methods</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: Search, title: "Certificate Number", desc: "Enter the unique certificate number found on the certificate document." },
              { icon: QrCode, title: "QR Code Scan", desc: "Scan the QR code on the certificate using your mobile device camera." },
              { icon: Building, title: "Organization Search", desc: "Search by organization name to find all their active certifications." },
            ].map((m) => (
              <div key={m.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <m.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold font-display text-foreground">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Guide */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold font-display text-foreground">Certificate Status Guide</h2>
          <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className={`flex items-center gap-3 rounded-lg ${config.bg} p-4`}>
                  <Icon className={`h-5 w-5 ${config.color}`} />
                  <div>
                    <p className={`font-medium ${config.color}`}>{config.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {key === "active" && "Certificate is valid and current"}
                      {key === "expired" && "Certificate has passed its expiry date"}
                      {key === "suspended" && "Certificate temporarily suspended"}
                      {key === "revoked" && "Certificate permanently withdrawn"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Report */}
      <section className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <p className="text-sm text-muted-foreground">
            Found an issue with a certificate? <Link to="/contact" className="text-primary hover:underline">Report a concern</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Verify;
