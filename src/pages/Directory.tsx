import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Building, UserCheck, BookOpen, MapPin, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EntityType = "all" | "org" | "auditor" | "training";

const sampleEntries = [
  { name: "CyberTrust Certifications Ltd.", type: "org" as const, country: "United Kingdom", standards: ["ISO 27001", "SOC 2"], status: "Active" },
  { name: "SecureAudit GmbH", type: "org" as const, country: "Germany", standards: ["ISO 27001", "ISO 9001"], status: "Active" },
  { name: "Ahmed Al-Rashid", type: "auditor" as const, country: "UAE", standards: ["ISO 27001", "GDPR"], status: "Active" },
  { name: "Maria González", type: "auditor" as const, country: "Spain", standards: ["ISO 9001", "ISO 22301"], status: "Active" },
  { name: "Global Compliance Academy", type: "training" as const, country: "Estonia", standards: ["ISO 27001", "ISO 42001"], status: "Active" },
  { name: "InfoSec Institute APAC", type: "training" as const, country: "Singapore", standards: ["SOC 2", "NIST CSF"], status: "Active" },
];

const typeIcons = { org: Building, auditor: UserCheck, training: BookOpen };

const Directory = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<EntityType>("all");

  const filtered = sampleEntries.filter((e) => {
    const matchesFilter = filter === "all" || e.type === filter;
    const matchesSearch = search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.country.toLowerCase().includes(search.toLowerCase()) || e.standards.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filters: { key: EntityType; label: string }[] = [
    { key: "all", label: t("directoryPage.filterAll") },
    { key: "org", label: t("directoryPage.filterOrgs") },
    { key: "auditor", label: t("directoryPage.filterAuditors") },
    { key: "training", label: t("directoryPage.filterTraining") },
  ];

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">{t("directoryPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("directoryPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search & Filter */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("directoryPage.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ps-10"
              />
            </div>
            <div className="flex gap-2">
              {filters.map((f) => (
                <Button key={f.key} variant={filter === f.key ? "default" : "outline"} size="sm" onClick={() => setFilter(f.key)}
                  className={filter === f.key ? "bg-gradient-gold text-primary-foreground" : "border-primary/30 text-foreground hover:bg-primary/10"}>
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{t("directoryPage.noResults")}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((entry) => {
                const Icon = typeIcons[entry.type];
                return (
                  <div key={entry.name} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold font-display text-foreground">{entry.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {entry.country}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {entry.standards.map((s) => (
                          <span key={s} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{s}</span>
                        ))}
                      </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{entry.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Directory;
