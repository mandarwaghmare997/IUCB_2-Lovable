import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="pt-16">
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">{t("contactPage.title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("contactPage.subtitle")}</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.formName")}</label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.formEmail")}</label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.formSubject")}</label>
                  <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-foreground">{t("contactPage.formMessage")}</label>
                  <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90 sm:w-auto">
                  {t("contactPage.formSubmit")}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold font-display text-foreground">{t("contactPage.generalTitle")}</h3>
                <a href="mailto:info@iucb.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> info@iucb.org
                </a>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold font-display text-foreground">{t("contactPage.accreditationTitle")}</h3>
                <a href="mailto:accreditations@iucb.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> accreditations@iucb.org
                </a>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold font-display text-foreground">{t("contactPage.partnershipsTitle")}</h3>
                <a href="mailto:connect@iucb.org" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" /> connect@iucb.org
                </a>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-3 font-semibold font-display text-foreground">{t("contactPage.officeTitle")}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" /> Tallinn, Estonia
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
