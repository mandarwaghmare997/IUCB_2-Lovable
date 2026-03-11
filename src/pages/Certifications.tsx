import { useTranslation } from "react-i18next";
import { Shield, Lock, Eye, BarChart3, ArrowRight, CheckCircle, FileCheck, Server, Activity } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg-original.jpg";

const certData = {
  iso: [
    { name: "ISO/IEC 27001", desc: "Information Security Management System", scope: "Protects information assets through systematic risk management" },
    { name: "ISO 9001", desc: "Quality Management System", scope: "Ensures consistent quality in products and services" },
    { name: "ISO/IEC 42001", desc: "AI Management System", scope: "Framework for responsible AI development and governance" },
    { name: "ISO 22301", desc: "Business Continuity Management", scope: "Ensures operational resilience during disruptions" },
    { name: "ISO/IEC 27701", desc: "Privacy Information Management", scope: "Extension to ISO 27001 for privacy management" },
    { name: "ISO/IEC 20000-1", desc: "IT Service Management", scope: "Best practices for delivering managed IT services" },
  ],
  cyber: [
    { name: "SOC 2", desc: "Service Organization Controls", scope: "Trust principles: security, availability, processing integrity, confidentiality, privacy" },
    { name: "NIST CSF", desc: "Cybersecurity Framework", scope: "Risk-based approach to managing cybersecurity risk" },
    { name: "CIS Controls", desc: "Critical Security Controls", scope: "Prioritized set of actions to protect against cyber attacks" },
    { name: "Zero Trust", desc: "Zero Trust Architecture", scope: "Never trust, always verify — modern security architecture" },
  ],
  privacy: [
    { name: "GDPR", desc: "General Data Protection Regulation", scope: "EU data protection and privacy regulation" },
    { name: "CCPA", desc: "California Consumer Privacy Act", scope: "Consumer privacy rights and data protection" },
    { name: "HIPAA", desc: "Health Insurance Portability", scope: "Protection of sensitive health information" },
    { name: "PDPA", desc: "Personal Data Protection Act", scope: "Southeast Asian data protection framework" },
  ],
  industry: [
    { name: "PCI DSS", desc: "Payment Card Industry Standard", scope: "Security standards for card payment processing" },
    { name: "CMMC", desc: "Cybersecurity Maturity Model", scope: "DoD cybersecurity requirements for contractors" },
    { name: "FedRAMP", desc: "Federal Risk Authorization", scope: "Government cloud security assessment framework" },
  ],
};

const tabs = [
  { key: "iso", icon: Shield, titleKey: "certificationsPage.isoTitle" },
  { key: "cyber", icon: Lock, titleKey: "certificationsPage.cyberTitle" },
  { key: "privacy", icon: Eye, titleKey: "certificationsPage.privacyTitle" },
  { key: "industry", icon: BarChart3, titleKey: "certificationsPage.industryTitle" },
];

const Certifications = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-16">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Global Standards
          </div>
          <h1 className="mb-6 text-4xl font-bold font-display text-foreground md:text-5xl lg:text-6xl">{t("certificationsPage.title")}</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Comprehensive certification schemes covering ISO standards, cybersecurity frameworks, and sector-specific trust marks.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="iso" className="space-y-12">
            <div className="flex justify-center overflow-x-auto pb-4 md:pb-0">
              <TabsList className="inline-flex h-auto w-auto rounded-xl bg-secondary p-1">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.key} value={tab.key} className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-md">
                    <tab.icon className="h-4 w-4" /> {t(tab.titleKey)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.entries(certData).map(([key, items]) => (
              <TabsContent key={key} value={key}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((cert) => (
                    <div key={cert.name} className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{cert.name}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </div>
                      <h3 className="mb-2 font-semibold font-display text-foreground">{cert.desc}</h3>
                      <p className="text-sm text-muted-foreground">{cert.scope}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-2xl font-bold font-display text-foreground">Need Help Choosing?</h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Our team can help you identify the right certifications for your organization's needs and compliance requirements.
          </p>
          <a href="mailto:info@iucb.org">
            <Button className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
              Contact Our Team
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Certifications;
