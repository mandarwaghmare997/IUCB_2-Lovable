import { useTranslation } from "react-i18next";
import { Shield, Lock, Eye, BarChart3, ArrowRight } from "lucide-react";

const certGroups = [
  {
    titleKey: "certificationsPage.isoTitle",
    icon: Shield,
    items: [
      { name: "ISO 27001", desc: "Information Security Management" },
      { name: "ISO 9001", desc: "Quality Management Systems" },
      { name: "ISO 42001", desc: "AI Management System" },
      { name: "ISO 22301", desc: "Business Continuity Management" },
      { name: "ISO 27701", desc: "Privacy Information Management" },
      { name: "ISO 20000-1", desc: "IT Service Management" },
    ],
  },
  {
    titleKey: "certificationsPage.cyberTitle",
    icon: Lock,
    items: [
      { name: "SOC 2", desc: "Service Organization Controls" },
      { name: "NIST CSF", desc: "Cybersecurity Framework" },
      { name: "CIS Controls", desc: "Critical Security Controls" },
      { name: "Zero Trust", desc: "Zero Trust Architecture" },
    ],
  },
  {
    titleKey: "certificationsPage.privacyTitle",
    icon: Eye,
    items: [
      { name: "GDPR", desc: "General Data Protection Regulation" },
      { name: "CCPA", desc: "California Consumer Privacy Act" },
      { name: "HIPAA", desc: "Health Insurance Portability" },
      { name: "PDPA", desc: "Personal Data Protection Act" },
    ],
  },
  {
    titleKey: "certificationsPage.industryTitle",
    icon: BarChart3,
    items: [
      { name: "PCI DSS", desc: "Payment Card Industry Standard" },
      { name: "CMMC", desc: "Cybersecurity Maturity Model" },
      { name: "FedRAMP", desc: "Federal Risk Authorization" },
    ],
  },
];

const Certifications = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">{t("certificationsPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("certificationsPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto space-y-16 px-4 lg:px-8">
          {certGroups.map((group) => (
            <div key={group.titleKey}>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <group.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-display text-foreground">{t(group.titleKey)}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <div key={item.name} className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30">
                    <div>
                      <h3 className="font-semibold font-display text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Certifications;
