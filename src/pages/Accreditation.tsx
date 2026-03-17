import { useTranslation } from "react-i18next";
import { Shield, UserCheck, BookOpen, FileText, ClipboardCheck, Search, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import heroBg from "@/assets/hero-bg-original.jpg";

const acbBenefits = [
  "Global recognition of your certificates",
  "Access to IUCB technical benchmarks",
  "Listing in the Global Directory",
  "Right to use the IUCB Accreditation Mark",
  "Annual surveillance for continuous improvement",
  "Marketing support and verification services",
];

const auditorLevels = [
  { level: "Associate", experience: "Completed Training", audits: "None required" },
  { level: "Lead Auditor", experience: "2+ Years", audits: "5+ Audits (20 days)" },
  { level: "Senior Auditor", experience: "5+ Years", audits: "15+ Audits (Lead)" },
  { level: "Principal", experience: "10+ Years", audits: "Subject Matter Expert" },
];

const Accreditation = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Core Services
          </div>
          <h1 className="mb-6 text-4xl font-bold font-display text-foreground md:text-5xl lg:text-6xl">{t("accreditationPage.title")}</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Formal recognition of competence for Certification Bodies, Auditors, and Training Providers.
          </p>
        </div>
      </section>

      {/* Tabbed Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="acb" className="space-y-12">
            <div className="flex justify-center">
              <TabsList className="grid h-auto w-full max-w-3xl grid-cols-3 rounded-xl bg-secondary p-1">
                <TabsTrigger value="acb" className="flex items-center gap-2 rounded-lg py-3 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md md:text-base">
                  <Shield className="hidden h-4 w-4 md:inline" /> Certification Bodies
                </TabsTrigger>
                <TabsTrigger value="aap" className="flex items-center gap-2 rounded-lg py-3 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md md:text-base">
                  <UserCheck className="hidden h-4 w-4 md:inline" /> Auditors
                </TabsTrigger>
                <TabsTrigger value="atpp" className="flex items-center gap-2 rounded-lg py-3 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md md:text-base">
                  <BookOpen className="hidden h-4 w-4 md:inline" /> Training Providers
                </TabsTrigger>
              </TabsList>
            </div>

            {/* ACB Tab */}
            <TabsContent value="acb">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-8 lg:col-span-2">
                  <div>
                    <h2 className="mb-4 text-3xl font-bold font-display text-foreground">{t("accreditationPage.cbTitle")} (ACB)</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      The ACB program is designed for organizations that provide audit and certification services. Accreditation by IUCB demonstrates your competence, impartiality, and performance capability.
                    </p>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h3 className="mb-3 flex items-center gap-2 font-semibold font-display text-foreground">
                        <FileText className="h-5 w-5 text-primary" /> Requirements
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>• Legal entity registration and liability insurance</li>
                        <li>• Documented management system (ISO 17021 compliance)</li>
                        <li>• Competent personnel for all technical scopes</li>
                        <li>• Impartiality committee structure</li>
                      </ul>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-6">
                      <h3 className="mb-3 flex items-center gap-2 font-semibold font-display text-foreground">
                        <ClipboardCheck className="h-5 w-5 text-primary" /> Process
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>1. Application & Document Review</li>
                        <li>2. On-site / Remote Office Assessment</li>
                        <li>3. Witness Assessment of Audit Team</li>
                        <li>4. Accreditation Decision & Granting</li>
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/30 p-6">
                    <h3 className="mb-4 text-lg font-bold font-display text-foreground">Benefits of IUCB Accreditation</h3>
                    <ul className="grid gap-3 md:grid-cols-2">
                      {acbBenefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="rounded-xl bg-gradient-navy p-6 shadow-xl">
                    <h3 className="mb-2 text-xl font-bold font-display text-white">Ready to Apply?</h3>
                    <p className="mb-6 text-sm text-white/70">
                      Start your journey towards global recognition today. Download the application kit or contact our team.
                    </p>
                    <a href="mailto:accreditations@iucb.org?subject=ACB Application Inquiry">
                      <Button className="w-full bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">
                        {t("accreditationPage.applyBtn")}
                      </Button>
                    </a>
                    <p className="mt-3 text-center text-xs text-white/50">Response time: 2-3 business days</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="mb-2 font-bold text-foreground">Annual Surveillance</h4>
                    <p className="text-sm text-muted-foreground">
                      Accreditation is valid for 3 years, subject to successful annual surveillance assessments to ensure continued compliance.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* AAP Tab */}
            <TabsContent value="aap">
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-3xl font-bold font-display text-foreground">{t("accreditationPage.auditorTitle")} (AAP)</h2>
                  <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                    The AAP validates the competence of individual auditors. It provides a structured career pathway and independent verification of skills for the global market.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                  {auditorLevels.map((item, i) => (
                    <div key={item.level} className="rounded-lg border-2 border-border bg-card p-4 text-center transition-colors hover:border-primary/30">
                      <div className="font-bold font-display text-foreground">{item.level}</div>
                      <div className="text-xs text-muted-foreground">Level {i + 1}</div>
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-secondary text-foreground">
                      <tr>
                        <th className="p-4 font-medium">Level</th>
                        <th className="p-4 font-medium">Experience</th>
                        <th className="p-4 font-medium">Audits Performed</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      {auditorLevels.map((row) => (
                        <tr key={row.level}>
                          <td className="p-4 font-medium text-foreground">{row.level}</td>
                          <td className="p-4 text-muted-foreground">{row.experience}</td>
                          <td className="p-4 text-muted-foreground">{row.audits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="text-center">
                  <a href="mailto:accreditations@iucb.org?subject=AAP Application Inquiry">
                    <Button className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
                      Apply for Auditor Accreditation
                    </Button>
                  </a>
                </div>
              </div>
            </TabsContent>

            {/* ATPP Tab */}
            <TabsContent value="atpp">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <div>
                    <h2 className="mb-4 text-3xl font-bold font-display text-foreground">{t("accreditationPage.trainingTitle")} (ATPP)</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                      The ATPP recognizes training organizations that deliver courses aligned with IUCB-recognized standards. Accreditation ensures that training content, delivery methods, and examinations meet global best practices.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold font-display text-foreground">Key Requirements</h3>
                    <ul className="space-y-3">
                      {[
                        "Curriculum aligned with IUCB certification schemes",
                        "Qualified instructors with industry experience",
                        "Robust examination and grading methodology",
                        "Student feedback and continuous improvement process",
                        "Adequate learning facilities (physical or virtual)",
                      ].map((req) => (
                        <li key={req} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="rounded-xl bg-gradient-navy p-6 shadow-xl">
                    <h3 className="mb-2 text-xl font-bold font-display text-foreground">Become an Accredited Provider</h3>
                    <p className="mb-6 text-sm text-muted-foreground">
                      Join our global network of recognized training organizations and offer IUCB-accredited courses.
                    </p>
                    <a href="mailto:accreditations@iucb.org?subject=ATPP Application Inquiry">
                      <Button className="w-full bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">
                        Apply Now
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Steps */}
      <section className="border-t border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold font-display text-foreground">{t("accreditationPage.processTitle")}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: "01", icon: FileText, titleKey: "accreditationPage.step1", descKey: "accreditationPage.step1Desc" },
              { num: "02", icon: ClipboardCheck, titleKey: "accreditationPage.step2", descKey: "accreditationPage.step2Desc" },
              { num: "03", icon: Search, titleKey: "accreditationPage.step3", descKey: "accreditationPage.step3Desc" },
              { num: "04", icon: Award, titleKey: "accreditationPage.step4", descKey: "accreditationPage.step4Desc" },
            ].map((s) => (
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
    </main>
  );
};

export default Accreditation;
