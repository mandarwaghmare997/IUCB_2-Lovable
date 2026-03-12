import { useTranslation } from "react-i18next";
import { BookOpen, Award, Clock, Users, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  { title: "ISO 27001 Lead Auditor", duration: "5 Days", level: "Advanced", format: "Online / In-Person" },
  { title: "ISO 9001 Lead Implementer", duration: "5 Days", level: "Intermediate", format: "Online" },
  { title: "Cybersecurity Fundamentals", duration: "3 Days", level: "Beginner", format: "Online" },
  { title: "GDPR Data Protection Officer", duration: "4 Days", level: "Advanced", format: "Online / In-Person" },
  { title: "ISO 42001 AI Management", duration: "3 Days", level: "Intermediate", format: "Online" },
  { title: "SOC 2 Compliance Professional", duration: "4 Days", level: "Intermediate", format: "Online" },
];

const benefits = [
  { icon: Award, text: "Globally recognized certifications" },
  { icon: Users, text: "Expert instructors with industry experience" },
  { icon: Globe, text: "Flexible online and in-person options" },
  { icon: CheckCircle, text: "Comprehensive exam preparation" },
];

const Training = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">{t("trainingPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">{t("trainingPage.subtitle")}</p>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold font-display text-foreground">{t("trainingPage.programsTitle")}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold font-display text-foreground">{p.title}</h3>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">
                    <Clock className="h-3 w-3" /> {p.duration}
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{p.level}</span>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">{p.format}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Exam */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl font-bold font-display text-foreground">{t("trainingPage.benefitsTitle")}</h2>
              <div className="space-y-4">
                {benefits.map((b) => (
                  <div key={b.text} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <b.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-foreground">{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-background p-8">
              <h2 className="mb-4 text-2xl font-bold font-display text-foreground">{t("trainingPage.examTitle")}</h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">{t("trainingPage.examDesc")}</p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">{t("trainingPage.enrollBtn")}</Button>
                <a href="mailto:connect@iucb.org">
                  <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">{t("trainingPage.contactBtn")}</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Training;
