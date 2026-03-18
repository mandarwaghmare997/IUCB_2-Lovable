import { useState } from "react";
import { Shield, CheckCircle, XCircle, AlertTriangle, Clock, Search, ArrowRight, Loader2, Fingerprint, ScanLine, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import iucbSeal from "@/assets/iucb-seal.png";

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
      <section className="relative bg-gradient-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-96 h-96 rounded-full border border-white/20" />
          <div className="absolute bottom-10 right-20 w-64 h-64 rounded-full border border-white/10" />
        </div>
        <div className="container mx-auto px-4 text-center lg:px-8 relative">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Shield className="h-8 w-8 text-gold" />
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">
            Certificate <span className="text-gradient-gold">Verification</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-white/70">
            Instantly verify the authenticity and validity of any certificate issued by an IUCB-accredited certification body.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="relative -mt-8 z-10 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <form
              onSubmit={handleSearch}
              className="flex gap-3 rounded-2xl border border-border bg-card p-3 shadow-xl"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Enter certificate number (e.g., IUCB-ISO9001-2024-001234)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-11 h-12 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 px-8 bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90 rounded-xl"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Enter the certificate number found on the document or scan the QR code for instant verification
            </p>
          </div>

          {/* Results */}
          {searched && !loading && (
            <div className="mx-auto mt-10 max-w-2xl animate-fade-in-up">
              {results.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
                    <XCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold font-display text-foreground">No Certificate Found</h3>
                  <p className="text-sm text-muted-foreground">
                    No published certificate matching "<span className="font-medium text-foreground">{query}</span>" was found.
                    Please verify the number and try again.
                  </p>
                  <Link to="/contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    Report an issue <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((cert) => {
                    const status = statusConfig[cert.status];
                    const StatusIcon = status.icon;
                    return (
                      <div key={cert.number} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-mono text-muted-foreground tracking-wider">{cert.number}</p>
                            <h3 className="mt-1 text-lg font-semibold font-display text-foreground">{cert.organization}</h3>
                          </div>
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold ${status.color} ${status.bg}`}>
                            <StatusIcon className="h-3.5 w-3.5" />
                            {status.label}
                          </span>
                        </div>
                        <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
                          <div className="rounded-lg bg-muted/50 p-3">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Type</span>
                            <p className="mt-0.5 font-medium text-foreground">{cert.certificateType}</p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Scope</span>
                            <p className="mt-0.5 font-medium text-foreground">{cert.scope}</p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Issued</span>
                            <p className="mt-0.5 font-medium text-foreground">{cert.issueDate}</p>
                          </div>
                          <div className="rounded-lg bg-muted/50 p-3">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Expires</span>
                            <p className="mt-0.5 font-medium text-foreground">{cert.expiryDate}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                          <img src={iucbSeal} alt="IUCB" className="h-5 w-5 opacity-70" />
                          <p className="text-xs text-muted-foreground">
                            Accredited by <span className="font-semibold text-primary">IUCB</span> — International Unified Certification Board
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
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold font-display text-foreground md:text-3xl">How Verification Works</h2>
            <p className="mt-3 text-muted-foreground">Multiple methods to confirm certificate authenticity</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { icon: Fingerprint, title: "Certificate Number", desc: "Enter the unique certificate number printed on the official document to check its current status." },
              { icon: ScanLine, title: "QR Code Scan", desc: "Scan the secure QR code on any IUCB certificate using your device camera for instant verification." },
              { icon: Building2, title: "Organization Lookup", desc: "Search by organization name to view all active certifications issued through IUCB-accredited bodies." },
            ].map((m) => (
              <div key={m.title} className="text-center group">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-105">
                  <m.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold font-display text-foreground">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Guide */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold font-display text-foreground md:text-3xl">Certificate Status Guide</h2>
            <p className="mt-3 text-muted-foreground">Understanding what each status means for verified certificates</p>
          </div>
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
            {Object.entries(statusConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <div key={key} className={`flex items-start gap-4 rounded-xl ${config.bg} p-5 border border-transparent`}>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/80">
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${config.color}`}>{config.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {key === "active" && "Certificate is valid, current, and in good standing"}
                      {key === "expired" && "Certificate has passed its validity date and needs renewal"}
                      {key === "suspended" && "Certificate is temporarily suspended pending review"}
                      {key === "revoked" && "Certificate has been permanently withdrawn by the issuing body"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-navy py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <img src={iucbSeal} alt="IUCB Seal" className="mx-auto mb-6 h-14 w-14 opacity-80" />
          <h3 className="mb-3 text-xl font-bold font-display text-white">Need Assistance?</h3>
          <p className="mx-auto max-w-lg text-sm text-white/60 leading-relaxed">
            If you encounter issues verifying a certificate or believe a certificate may be fraudulent,
            please report it to our team immediately.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/contact">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                Report a Concern
              </Button>
            </Link>
            <Link to="/accreditation">
              <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                Get Accredited <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Verify;
