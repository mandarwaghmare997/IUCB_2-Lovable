import { Shield, CheckCircle, Globe, Lock, Award, ArrowRight, BookOpen, Users, Laptop, Heart, Factory, GraduationCap, Search, FileText, Phone, ClipboardCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg-original.jpg";
import iucbSeal from "@/assets/iucb-seal-original.png";

const Index = () => {
  const { t } = useTranslation();

  const quickActions = [
    { icon: Search, title: "Verify Certificate", desc: "Check the authenticity of any IUCB-accredited certificate", link: "/verify", color: "text-emerald-500" },
    { icon: Shield, title: "Explore Schemes", desc: "Browse accreditation programs for CBs, auditors & training providers", link: "/accreditation", color: "text-primary" },
    { icon: BookOpen, title: "Training & Exams", desc: "Professional development pathways and examination systems", link: "/training", color: "text-blue-500" },
    { icon: FileText, title: "Policies & Docs", desc: "Access governance documents, policies, and manuals", link: "/docs", color: "text-purple-500" },
    { icon: Phone, title: "Contact Support", desc: "Get help from our accreditation and partnerships teams", link: "/contact", color: "text-orange-500" },
    { icon: ClipboardCheck, title: "Apply / Enquire", desc: "Start your accreditation application or submit an enquiry", link: "/contact", color: "text-primary" },
  ];

  const features = [
    { icon: Shield, titleKey: "features.accreditation.title", descKey: "features.accreditation.description", link: "/accreditation" },
    { icon: Award, titleKey: "features.certifications.title", descKey: "features.certifications.description", link: "/certifications" },
    { icon: BookOpen, titleKey: "features.training.title", descKey: "features.training.description", link: "/training" },
  ];

  const whyChoose = [
    { icon: Globe, titleKey: "whyChoose.global.title", descKey: "whyChoose.global.description" },
    { icon: CheckCircle, titleKey: "whyChoose.versatile.title", descKey: "whyChoose.versatile.description" },
    { icon: Award, titleKey: "whyChoose.benchmarks.title", descKey: "whyChoose.benchmarks.description" },
    { icon: Lock, titleKey: "whyChoose.secure.title", descKey: "whyChoose.secure.description" },
  ];

  const focusAreas = [
    { titleKey: "focusAreas.iso.title", descKey: "focusAreas.iso.description" },
    { titleKey: "focusAreas.cyber.title", descKey: "focusAreas.cyber.description" },
    { titleKey: "focusAreas.privacy.title", descKey: "focusAreas.privacy.description" },
    { titleKey: "focusAreas.benchmarks.title", descKey: "focusAreas.benchmarks.description" },
  ];

  const sectors = [
    { icon: Laptop, labelKey: "sectors.it" },
    { icon: Heart, labelKey: "sectors.healthcare" },
    { icon: Award, labelKey: "sectors.fintech" },
    { icon: Factory, labelKey: "sectors.manufacturing" },
    { icon: GraduationCap, labelKey: "sectors.education" },
    { icon: Users, labelKey: "sectors.government" },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-20 dark:opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {t("hero.title1")} <span className="text-gradient-gold">{t("hero.titleHighlight")}</span> {t("hero.title2")}
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{t("hero.subtitle")}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">{t("hero.cta1")}</Button>
                <Link to="/certifications">
                  <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">{t("hero.cta2")}</Button>
                </Link>
              </div>
            </div>
            <div className="hidden justify-center lg:flex">
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
                <img src={iucbSeal} alt="IUCB Seal" className="relative w-80 drop-shadow-2xl animate-pulse-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions — Task-based navigation */}
      <section className="border-y border-border bg-card py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold font-display text-foreground md:text-3xl">What would you like to do?</h2>
            <p className="mt-2 text-muted-foreground">Quick access to the most common tasks</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className="group flex items-start gap-4 rounded-xl border border-border bg-background p-5 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold font-display text-foreground group-hover:text-primary transition-colors">{action.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{action.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f) => (
              <Link key={f.titleKey} to={f.link} className="group glass-card rounded-xl p-8 transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold font-display text-foreground">{t(f.titleKey)}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t(f.descKey)}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {t("features.learnMore")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IUCB */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
              {t("whyChoose.title")} <span className="text-gradient-gold">{t("whyChoose.titleHighlight")}</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">{t("whyChoose.subtitle")}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item) => (
              <div key={item.titleKey} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold font-display text-foreground">{t(item.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-4 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">{t("focusAreas.title")}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">{t("focusAreas.subtitle")}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area) => (
              <div key={area.titleKey} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                <h3 className="mb-2 font-semibold font-display text-foreground">{t(area.titleKey)}</h3>
                <p className="text-sm text-muted-foreground">{t(area.descKey)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/certifications">
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                {t("focusAreas.viewAll")} <ArrowRight className="h-4 w-4 ltr:ml-2 rtl:mr-2 rtl:rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Sectors */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold font-display text-foreground md:text-4xl">
            {t("sectors.title")} <span className="text-gradient-gold">{t("sectors.titleHighlight")}</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {sectors.map((sector) => (
              <div key={sector.labelKey} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/20">
                <sector.icon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-foreground">{t(sector.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
            {t("cta.title")} <span className="text-gradient-gold">{t("cta.titleHighlight")}</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">{t("cta.subtitle")}</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">{t("cta.apply")}</Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">{t("cta.contact")}</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
