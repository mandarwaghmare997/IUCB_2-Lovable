import { FileText, Shield, Scale, AlertTriangle, Award, ExternalLink, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const policies = [
  {
    title: "Impartiality Policy",
    desc: "Establishes IUCB's commitment to objectivity and freedom from conflicts of interest in all accreditation activities.",
    version: "v3.1",
    updated: "December 2024",
    pages: 12,
    icon: Scale,
    docLink: "/docs/impartiality-policy",
  },
  {
    title: "Appeals & Complaints Procedure",
    desc: "Formal process for lodging appeals against accreditation decisions and submitting complaints about accredited bodies.",
    version: "v2.4",
    updated: "November 2024",
    pages: 8,
    icon: AlertTriangle,
    docLink: "/docs/appeals-complaints",
  },
  {
    title: "Marks Usage Policy",
    desc: "Guidelines governing the use of IUCB accreditation marks, logos, and certificates by accredited entities.",
    version: "v4.0",
    updated: "January 2025",
    pages: 16,
    icon: Award,
    docLink: "/docs/marks-usage",
  },
  {
    title: "Accreditation Manual",
    desc: "Comprehensive guide covering all accreditation requirements, processes, assessment criteria, and obligations.",
    version: "v5.2",
    updated: "January 2025",
    pages: 48,
    icon: FileText,
    docLink: "/docs/accreditation-manual",
  },
  {
    title: "Code of Ethics",
    desc: "Ethical standards and conduct expectations for IUCB personnel, assessors, and accredited organizations.",
    version: "v2.1",
    updated: "October 2024",
    pages: 10,
    icon: Shield,
    docLink: "/docs/code-of-ethics",
  },
];

const Policies = () => {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Legal & Compliance
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">
            Policy <span className="text-gradient-gold">Center</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            All IUCB policies, procedures, and governance documents in one place. These documents define how we operate and ensure trust in the accreditation ecosystem.
          </p>
        </div>
      </section>

      {/* Policy List */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.title} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30 sm:flex-row sm:items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <policy.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold font-display text-foreground">{policy.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{policy.desc}</p>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>{policy.version}</span>
                    <span>•</span>
                    <span>{policy.updated}</span>
                    <span>•</span>
                    <span>{policy.pages} pages</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={policy.docLink}>
                    <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10">
                      <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Read
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <Download className="h-3.5 w-3.5 mr-1.5" /> PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            All documents on this page are official IUCB publications. For verification of document authenticity, please check the document version and date.
            If you have questions about any policy, contact us at{" "}
            <a href="mailto:connect@iucb.org" className="text-primary hover:underline">connect@iucb.org</a>.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Policies;
