import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Building, MapPin, Globe, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface OrgEntry {
  id: string;
  legal_name: string;
  public_name: string | null;
  country: string | null;
  city: string | null;
  website: string | null;
  contact_email: string | null;
  status: string;
}

const Directory = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [orgs, setOrgs] = useState<OrgEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("organizations")
        .select("id, legal_name, public_name, country, city, website, contact_email, status")
        .eq("status", "active")
        .order("legal_name");
      if (data) setOrgs(data);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = orgs.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.legal_name.toLowerCase().includes(q) ||
      (o.public_name || "").toLowerCase().includes(q) ||
      (o.country || "").toLowerCase().includes(q) ||
      (o.city || "").toLowerCase().includes(q)
    );
  });

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">{t("directoryPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">{t("directoryPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={t("directoryPage.searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ps-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">{t("directoryPage.noResults")}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((org) => (
                <div key={org.id} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold font-display text-foreground">{org.public_name || org.legal_name}</h3>
                    {(org.city || org.country) && (
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {[org.city, org.country].filter(Boolean).join(", ")}
                      </div>
                    )}
                    {org.website && (
                      <a href={org.website.startsWith("http") ? org.website : `https://${org.website}`} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1 text-sm text-primary hover:underline">
                        <Globe className="h-3.5 w-3.5" /> {org.website}
                      </a>
                    )}
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary capitalize">{org.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Directory;
