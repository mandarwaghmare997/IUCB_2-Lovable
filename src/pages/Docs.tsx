import { useState, useEffect } from "react";
import { BookOpen, FileText, Shield, Scale, AlertTriangle, Award, Download, Search, ArrowRight, Globe, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import iucbSeal from "@/assets/iucb-seal.png";

interface DocEntry {
  id: string;
  title: string;
  slug: string;
  category: string;
  version: string;
  updated_at: string;
  summary: string | null;
  file_url: string | null;
  html_content: string | null;
}

const categoryIcons: Record<string, typeof FileText> = {
  policy: Scale,
  procedure: AlertTriangle,
  manual: BookOpen,
  deck: FileText,
  guidance: Shield,
  generated_certificate: Award,
};

const categories = [
  { key: "all", label: "All Documents" },
  { key: "manual", label: "Manuals" },
  { key: "policy", label: "Policies" },
  { key: "procedure", label: "Procedures" },
  { key: "guidance", label: "Guidance" },
  { key: "deck", label: "Decks" },
];

const Docs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [docs, setDocs] = useState<DocEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("documents")
        .select("id, title, slug, category, version, updated_at, summary, file_url, html_content")
        .eq("is_public", true)
        .eq("status", "published")
        .order("title");
      if (data) setDocs(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = docs.filter((doc) => {
    const matchesCategory = category === "all" || doc.category === category;
    const matchesSearch = search === "" || doc.title.toLowerCase().includes(search.toLowerCase()) || (doc.summary || "").toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const stats = [
    { label: "Published Documents", value: docs.length.toString() },
    { label: "Document Categories", value: "6" },
    { label: "Languages Supported", value: "4" },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative bg-gradient-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-72 h-72 rounded-full border border-white/20" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-white/10" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <BookOpen className="h-8 w-8 text-gold" />
            </div>
            <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">
              Official <span className="text-gradient-gold">Documentation</span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-white/70">
              Access IUCB's accreditation manuals, governance policies, procedures, and corporate materials — the foundation of our trust framework.
            </p>
            <div className="mt-8 mx-auto max-w-md">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                <Input
                  placeholder="Search documents..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl focus:border-gold/50 focus:ring-gold/20"
                />
              </div>
            </div>
            <div className="mt-10 flex justify-center gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold font-display text-gold">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-1 py-4">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                variant={category === cat.key ? "default" : "ghost"}
                size="sm"
                onClick={() => setCategory(cat.key)}
                className={
                  category === cat.key
                    ? "bg-gradient-gold text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="mt-4 text-sm text-muted-foreground">Loading documents…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-muted">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mb-2 font-semibold font-display text-foreground">No documents found</h3>
              <p className="text-sm text-muted-foreground">
                {search ? `No results for "${search}". Try a different search term.` : "No published documents in this category yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((doc) => {
                const Icon = categoryIcons[doc.category] || FileText;
                return (
                  <div
                    key={doc.id}
                    className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold font-display text-foreground group-hover:text-primary transition-colors leading-tight">
                          {doc.title}
                        </h3>
                        {doc.summary && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{doc.summary}</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">{doc.version}</span>
                      <span className="text-muted-foreground">
                        {new Date(doc.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                      </span>
                      <span className="rounded-full bg-muted px-2.5 py-0.5 capitalize text-muted-foreground">{doc.category}</span>
                    </div>
                    <div className="mt-4 flex gap-2 border-t border-border pt-4">
                      {doc.html_content && (
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10">
                          <Globe className="h-3.5 w-3.5 mr-1.5" /> Read Online
                        </Button>
                      )}
                      {doc.file_url && (
                        <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                            <Download className="h-3.5 w-3.5 mr-1.5" /> Download PDF
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Document Categories Info */}
      <section className="border-t border-border bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold font-display text-foreground md:text-3xl">Document Categories</h2>
            <p className="mt-3 text-muted-foreground">Our documentation framework is organized to support transparency and operational excellence.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, title: "Accreditation Manuals", desc: "Comprehensive guides covering the full accreditation lifecycle, assessment criteria, and operational requirements." },
              { icon: Scale, title: "Policies", desc: "Official policies including impartiality, marks usage, appeals procedures, and framework overviews." },
              { icon: AlertTriangle, title: "Procedures", desc: "Step-by-step operational procedures for surveillance audits, assessments, and compliance workflows." },
              { icon: Shield, title: "Guidance Documents", desc: "Advisory materials for certification bodies on risk assessment, best practices, and standards interpretation." },
              { icon: FileText, title: "Corporate Materials", desc: "Company decks, organizational overviews, and presentation materials for stakeholders." },
              { icon: Lock, title: "Internal Documents", desc: "Role-restricted documents available only to accredited bodies and authorized personnel." },
            ].map((cat) => (
              <div key={cat.title} className="rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/20 hover:shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <cat.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold font-display text-foreground">{cat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Notice */}
      <section className="bg-gradient-navy py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <img src={iucbSeal} alt="IUCB Seal" className="mx-auto mb-6 h-16 w-16 opacity-80" />
            <h3 className="mb-3 text-xl font-bold font-display text-white">Official IUCB Publications</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              All documents on this portal are official IUCB publications maintained under strict version control.
              For verification of document authenticity, check the document version and effective date.
              For questions, contact us at{" "}
              <a href="mailto:connect@iucb.org" className="text-gold hover:underline">connect@iucb.org</a>.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link to="/contact">
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  Contact Us
                </Button>
              </Link>
              <Link to="/governance">
                <Button size="sm" className="bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
                  View Governance <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Docs;
