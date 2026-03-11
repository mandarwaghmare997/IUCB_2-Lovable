import { useTranslation } from "react-i18next";
import { Target, Eye, Shield, Star, Lightbulb, Users, MapPin, Building, Globe, CheckCircle, Scale } from "lucide-react";
import heroBg from "@/assets/hero-bg-original.jpg";

const leadership = [
  { name: "Dr. Elena Voreakis", role: "Executive Director", loc: "Tallinn, Estonia" },
  { name: "Marcus Thornfield", role: "Chief Accreditation Officer", loc: "London, UK" },
  { name: "Sarah Chen", role: "Head of Digital Standards", loc: "Singapore" },
  { name: "Johan Berg", role: "Director of Training", loc: "Berlin, Germany" },
];

const ethics = [
  { title: "Impartiality", desc: "Decisions are based solely on objective evidence of conformity, free from commercial or financial pressures." },
  { title: "Confidentiality", desc: "We protect the proprietary information of our applicants and certified entities with the highest security standards." },
  { title: "Competence", desc: "Accreditation is granted only by personnel with demonstrated technical competence in the specific sector." },
  { title: "Responsibility", desc: "We take full accountability for our accreditation decisions and their impact on public trust." },
];

const stats = [
  { value: "500+", key: "statsOrgs" },
  { value: "85+", key: "statsCountries" },
  { value: "50+", key: "statsStandards" },
  { value: "2,000+", key: "statsAuditors" },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="IUCB Headquarters" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("about.title")}
          </div>
          <h1 className="mb-6 text-4xl font-bold font-display leading-tight text-foreground md:text-5xl lg:text-6xl">
            Setting the Global Standard for <span className="text-gradient-gold">Trust & Excellence</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Headquartered in Tallinn, Estonia, IUCB is a premier European accreditation body driving innovation, transparency, and sustainability in global compliance.
          </p>
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

      {/* Mission, Vision, Values */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/30">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold font-display text-foreground">{t("about.missionTitle")}</h3>
              <p className="leading-relaxed text-muted-foreground">
                To empower organizations worldwide by providing a robust, transparent, and universally recognized accreditation framework that fosters trust and operational excellence.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/30">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Lightbulb className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold font-display text-foreground">{t("about.visionTitle")}</h3>
              <p className="leading-relaxed text-muted-foreground">
                A world where certification and benchmarking are synonymous with integrity, driving sustainable growth and innovation across all industries.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/30">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Scale className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-4 text-2xl font-bold font-display text-foreground">{t("about.valuesTitle")}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Transparency in all processes</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Innovation in assessment</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Sustainability focus</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-primary" /> Global collaboration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Traditional Accreditation */}
      <section className="relative overflow-hidden border-y border-border bg-card py-24">
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            <h2 className="text-3xl font-bold font-display text-foreground md:text-4xl">
              Beyond Traditional <span className="text-gradient-gold">Accreditation</span>
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Founded in 2019, the International Union for Certification & Benchmarking (IUCB) was established to bridge the gap between rigid traditional accreditation and the dynamic needs of the modern digital economy.
              </p>
              <p>
                Unlike government-only bodies, IUCB operates as a private, agile, and globally aligned ecosystem. We combine the authority of international standards with the speed and innovation required by sectors like Cybersecurity, AI, and Fintech.
              </p>
              <p>
                Our commitment to openness allows us to adapt frameworks rapidly, ensuring that our accredited partners are always at the forefront of industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Leadership */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">Governance & Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Guided by a diverse board of experts ensuring impartiality and strategic direction.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person) => (
              <div key={person.name} className="group rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-secondary">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground">{person.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{person.role}</p>
                <p className="mt-2 flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Globe className="h-3 w-3" /> {person.loc}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-xl border border-border bg-card p-8 text-center">
            <h3 className="mb-2 text-xl font-bold font-display text-foreground">Global Presence</h3>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              With a team of over 50 professionals and a network of technical assessors across 20+ countries, IUCB delivers localized expertise with global consistency.
            </p>
          </div>
        </div>
      </section>

      {/* Code of Ethics */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-navy p-8 md:p-16">
            <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative z-10 grid gap-12 md:grid-cols-3">
              <div>
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h2 className="mb-4 text-3xl font-bold font-display text-foreground">Code of Ethics</h2>
                <p className="text-muted-foreground">
                  Our foundation is built on unshakeable integrity. Every member of the IUCB ecosystem adheres to strict ethical guidelines.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 md:col-span-2">
                {ethics.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <h4 className="text-xl font-bold text-primary">{item.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
