import { useState } from "react";
import { BookOpen, FileText, Shield, Scale, AlertTriangle, Award, Download, ExternalLink, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DocEntry {
  title: string;
  slug: string;
  category: "core" | "policy" | "guidance";
  pages: number;
  version: string;
  updated: string;
  summary: string;
  icon: typeof FileText;
}

const documents: DocEntry[] = [
  {
    title: "Accreditation Manual",
    slug: "accreditation-manual",
    category: "core",
    pages: 48,
    version: "v5.2",
    updated: "January 2025",
    summary: "Comprehensive guide covering all accreditation requirements, processes, assessment criteria, and obligations for Certification Bodies, Auditors, and Training Providers.",
    icon: BookOpen,
  },
  {
    title: "Company Deck",
    slug: "company-deck",
    category: "core",
    pages: 24,
    version: "v3.0",
    updated: "December 2024",
    summary: "Corporate overview of IUCB including mission, vision, services, global presence, and partnership opportunities.",
    icon: FileText,
  },
  {
    title: "Impartiality Policy",
    slug: "impartiality-policy",
    category: "policy",
    pages: 12,
    version: "v3.1",
    updated: "December 2024",
    summary: "Establishes IUCB's commitment to objectivity and freedom from conflicts of interest in all accreditation activities.",
    icon: Scale,
  },
  {
    title: "Appeals & Complaints Procedure",
    slug: "appeals-complaints",
    category: "policy",
    pages: 8,
    version: "v2.4",
    updated: "November 2024",
    summary: "Formal process for lodging appeals against accreditation decisions and submitting complaints about accredited bodies or IUCB personnel.",
    icon: AlertTriangle,
  },
  {
    title: "Marks Usage Policy",
    slug: "marks-usage",
    category: "policy",
    pages: 16,
    version: "v4.0",
    updated: "January 2025",
    summary: "Guidelines governing the use of IUCB accreditation marks, logos, and certificates by accredited entities.",
    icon: Award,
  },
  {
    title: "Code of Ethics",
    slug: "code-of-ethics",
    category: "guidance",
    pages: 10,
    version: "v2.1",
    updated: "October 2024",
    summary: "Ethical standards and conduct expectations for IUCB personnel, assessors, and accredited organizations.",
    icon: Shield,
  },
];

const categories = [
  { key: "all", label: "All Documents" },
  { key: "core", label: "Core Documents" },
  { key: "policy", label: "Policies" },
  { key: "guidance", label: "Guidance" },
];

const Docs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = documents.filter((doc) => {
    const matchesCategory = category === "all" || doc.category === category;
    const matchesSearch = search === "" || doc.title.toLowerCase().includes(search.toLowerCase()) || doc.summary.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-navy py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">
            IUCB <span className="text-gradient-gold">Documentation</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Access accreditation manuals, policies, and corporate documents. All documents are available in multiple languages.
          </p>
          <div className="mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 bg-background/50 border-border/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter */}
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

          {/* Document Grid */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">No documents matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((doc) => (
                <div key={doc.slug} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <doc.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold font-display text-foreground group-hover:text-primary transition-colors">{doc.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{doc.summary}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="rounded-full bg-muted px-2 py-0.5">{doc.version}</span>
                        <span>{doc.updated}</span>
                        <span>{doc.pages} pages</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10">
                          <ExternalLink className="h-3 w-3 mr-1" /> Read Online
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground hover:text-foreground">
                          <Download className="h-3 w-3 mr-1" /> PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
