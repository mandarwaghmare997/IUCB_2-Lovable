import { useTranslation } from "react-i18next";
import { FileText, Download, ChevronDown, ChevronUp, BookOpen, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const guides = [
  { title: "Accreditation Application Guide", format: "PDF", size: "2.4 MB" },
  { title: "ISO 27001 Implementation Handbook", format: "PDF", size: "5.1 MB" },
  { title: "IUCB Accreditation Standards Manual", format: "PDF", size: "3.8 MB" },
  { title: "Cybersecurity Certification Roadmap", format: "PDF", size: "1.9 MB" },
];

const templates = [
  { title: "Accreditation Application Form", format: "DOCX" },
  { title: "Audit Report Template", format: "DOCX" },
  { title: "Training Provider Self-Assessment", format: "XLSX" },
  { title: "Corrective Action Plan Template", format: "DOCX" },
];

const faqs = [
  { q: "How long does the accreditation process take?", a: "The typical accreditation process takes 3-6 months, depending on the program and the applicant's readiness." },
  { q: "What are the fees for accreditation?", a: "Fees vary based on the accreditation program, organization size, and scope. Contact our team for a detailed quote." },
  { q: "How often is re-accreditation required?", a: "Accreditation is typically valid for 3 years, with annual surveillance audits to ensure continued compliance." },
  { q: "Can I apply for multiple accreditations?", a: "Yes, organizations can pursue multiple accreditations simultaneously or sequentially based on their needs." },
  { q: "Is IUCB accreditation recognized internationally?", a: "Yes, IUCB accreditation is recognized globally across major industries and regulatory frameworks." },
];

const Resources = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-white md:text-5xl">{t("resourcesPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">{t("resourcesPage.subtitle")}</p>
        </div>
      </section>

      {/* Guides */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-display text-foreground">{t("resourcesPage.guidesTitle")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {guides.map((g) => (
              <div key={g.title} className="flex items-center justify-between rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">{g.title}</h3>
                    <p className="text-xs text-muted-foreground">{g.format} · {g.size}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  <Download className="h-4 w-4 ltr:mr-1 rtl:ml-1" /> {t("resourcesPage.downloadBtn")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold font-display text-foreground">{t("resourcesPage.templatesTitle")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {templates.map((tmpl) => (
              <div key={tmpl.title} className="flex items-center justify-between rounded-xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium text-foreground">{tmpl.title}</h3>
                    <p className="text-xs text-muted-foreground">{tmpl.format}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  <Download className="h-4 w-4 ltr:mr-1 rtl:ml-1" /> {t("resourcesPage.downloadBtn")}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold font-display text-foreground">{t("resourcesPage.faqTitle")}</h2>
          <div className="mx-auto max-w-3xl space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-start"
                >
                  <span className="font-medium text-foreground">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-5 pb-5 pt-3 text-sm text-muted-foreground">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Resources;
