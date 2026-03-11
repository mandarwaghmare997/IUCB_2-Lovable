import { useTranslation } from "react-i18next";
import { Target, Eye, Shield, Star, Lightbulb, Users, MapPin, Building } from "lucide-react";

const stats = [
  { value: "500+", key: "statsOrgs" },
  { value: "85+", key: "statsCountries" },
  { value: "50+", key: "statsStandards" },
  { value: "2,000+", key: "statsAuditors" },
];

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Shield, key: "integrity" },
    { icon: Star, key: "excellence" },
    { icon: Lightbulb, key: "innovation" },
    { icon: Users, key: "collaboration" },
  ];

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">{t("about.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("about.subtitle")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.key} className="text-center">
                <div className="text-3xl font-bold font-display text-primary md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t(`about.${s.key}`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-4 text-2xl font-bold font-display text-foreground">{t("about.missionTitle")}</h2>
              <p className="leading-relaxed text-muted-foreground">{t("about.mission")}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-4 text-2xl font-bold font-display text-foreground">{t("about.visionTitle")}</h2>
              <p className="leading-relaxed text-muted-foreground">{t("about.vision")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold font-display text-foreground">{t("about.valuesTitle")}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.key} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold font-display text-foreground">{t(`about.values.${v.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`about.values.${v.key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Headquarters */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold font-display text-foreground">{t("about.headquartersTitle")}</h2>
            <p className="leading-relaxed text-muted-foreground">{t("about.headquarters")}</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-primary">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">{t("footer.location")}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
