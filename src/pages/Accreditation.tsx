import { useTranslation } from "react-i18next";
import { Shield, UserCheck, BookOpen, FileText, ClipboardCheck, Search, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Accreditation = () => {
  const { t } = useTranslation();

  const programs = [
    { icon: Shield, titleKey: "accreditationPage.cbTitle", descKey: "accreditationPage.cbDesc" },
    { icon: UserCheck, titleKey: "accreditationPage.auditorTitle", descKey: "accreditationPage.auditorDesc" },
    { icon: BookOpen, titleKey: "accreditationPage.trainingTitle", descKey: "accreditationPage.trainingDesc" },
  ];

  const steps = [
    { icon: FileText, num: "01", titleKey: "accreditationPage.step1", descKey: "accreditationPage.step1Desc" },
    { icon: ClipboardCheck, num: "02", titleKey: "accreditationPage.step2", descKey: "accreditationPage.step2Desc" },
    { icon: Search, num: "03", titleKey: "accreditationPage.step3", descKey: "accreditationPage.step3Desc" },
    { icon: Award, num: "04", titleKey: "accreditationPage.step4", descKey: "accreditationPage.step4Desc" },
  ];

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">{t("accreditationPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("accreditationPage.subtitle")}</p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {programs.map((p) => (
              <div key={p.titleKey} className="rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/30">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold font-display text-foreground">{t(p.titleKey)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(p.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold font-display text-foreground">{t("accreditationPage.processTitle")}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="relative text-center">
                <div className="mb-4 text-5xl font-bold font-display text-primary/20">{s.num}</div>
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold font-display text-foreground">{t(s.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(s.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold font-display text-foreground">{t("accreditationPage.applyTitle")}</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">{t("accreditationPage.applySubtitle")}</p>
          <a href="mailto:accreditations@iucb.org">
            <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
              {t("accreditationPage.applyBtn")}
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Accreditation;
