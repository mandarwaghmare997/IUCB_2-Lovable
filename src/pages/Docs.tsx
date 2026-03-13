import { useState, useEffect } from "react";
import { BookOpen, FileText, Shield, Scale, AlertTriangle, Award, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

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

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-navy py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
            <BookOpen className="h-7 w-7 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">
            IUCB <span className="text-gradient-gold">Documentation</span>
          </h1>
          <p className="max-w-xl text-lg text-white/70">
            Access accreditation manuals, policies, and corporate documents. All documents are available in multiple languages.
          </p>
          <div className="mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <Input
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.key}
                variant={category === cat.key ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(cat.key)}
                className={category === cat.key ? "bg-gradient-gold text-primary-foreground" : "border-primary/30 text-foreground hover:bg-primary/10"}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {loading ? (
            <div className="py-12 text-center text-muted-foreground">Loading documents…</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">No documents found.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((doc) => {
                const Icon = categoryIcons[doc.category] || FileText;
                return (
                  <div key={doc.id} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold font-display text-foreground group-hover:text-primary transition-colors">{doc.title}</h3>
                        {doc.summary && <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{doc.summary}</p>}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="rounded-full bg-muted px-2 py-0.5">{doc.version}</span>
                          <span>{new Date(doc.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "short" })}</span>
                          <span className="capitalize">{doc.category}</span>
                        </div>
                        <div className="mt-3 flex gap-2">
                          {doc.html_content && (
                            <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10">
                              <ExternalLink className="h-3 w-3 mr-1" /> Read Online
                            </Button>
                          )}
                          {doc.file_url && (
                            <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                              <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                                <Download className="h-3 w-3 mr-1" /> PDF
                              </Button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Notice */}
      <section className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-background p-6 text-center">
            <h3 className="mb-2 font-semibold font-display text-foreground">Official Documentation</h3>
            <p className="text-sm text-muted-foreground">
              All documents on this portal are official IUCB publications. For verification of document authenticity, please check the document version and date.
              If you have questions about any document, contact us at{" "}
              <a href="mailto:connect@iucb.org" className="text-primary hover:underline">connect@iucb.org</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Docs;
