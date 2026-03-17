import { Shield, CheckCircle, Globe, Lock, Award, ArrowRight, BookOpen, Users, Laptop, Heart, Factory, GraduationCap, Search, FileText, Phone, ClipboardCheck, TrendingUp, Building2, UserCheck, Zap, Target, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import heroBg from "@/assets/hero-bg-original.jpg";
import iucbSeal from "@/assets/iucb-seal-original.png";

const Index = () => {
  const { t } = useTranslation();

  const stats = [
    { value: "500+", label: "Accredited Organizations", icon: Building2 },
    { value: "80+", label: "Countries Served", icon: Globe },
    { value: "50+", label: "Standards Covered", icon: Shield },
    { value: "2,000+", label: "Certified Auditors", icon: UserCheck },
  ];

  const offerings = [
    {
      icon: Shield,
      title: "Accreditation",
      subtitle: "For Certification Bodies, Auditors & Training Providers",
      desc: "Get your organization recognized as a globally accredited body. Issue certifications that carry international weight across ISO, Cybersecurity, and Privacy domains.",
      cta: "Start Accreditation",
      link: "/accreditation",
      highlight: true,
    },
    {
      icon: Award,
      title: "Certification Programs",
      subtitle: "ISO · Cybersecurity · Privacy · Industry Standards",
      desc: "Benchmark your organization against 50+ international standards. From ISO 27001 to SOC 2, GDPR to NIST — demonstrate verified compliance.",
      cta: "Explore Standards",
      link: "/certifications",
      highlight: false,
    },
    {
      icon: BookOpen,
      title: "Training & Examination",
      subtitle: "Professional Development Pathways",
      desc: "World-class courses and rigorous exams for compliance professionals. Earn credentials recognized by employers and regulators worldwide.",
      cta: "View Programs",
      link: "/training",
      highlight: false,
    },
  ];

  const journeys = [
    { icon: Building2, label: "I'm an Organization", desc: "Get accredited or certified against international standards", link: "/accreditation" },
    { icon: UserCheck, label: "I'm an Auditor", desc: "Get individual accreditation and advance your career", link: "/accreditation" },
    { icon: GraduationCap, label: "I'm a Training Provider", desc: "Accredit your courses and examination frameworks", link: "/training" },
    { icon: Search, label: "I need to Verify", desc: "Check the authenticity of a certificate or credential", link: "/verify" },
  ];

  const problemSolution = [
    {
      problem: "Organizations fail audits due to inconsistent compliance frameworks",
      solution: "IUCB provides a unified accreditation ecosystem covering ISO, Cybersecurity & Privacy — one framework, global recognition.",
      icon: Target,
    },
    {
      problem: "Certifications from unrecognized bodies carry no weight with regulators",
      solution: "IUCB-accredited certificates are backed by rigorous assessment and accepted across 80+ countries.",
      icon: CheckCircle,
    },
    {
      problem: "Professionals lack clear career pathways in compliance and auditing",
      solution: "Structured training, examination, and accreditation tiers give auditors a clear progression from associate to lead.",
      icon: TrendingUp,
    },
  ];

  const sectors = [
    { icon: Laptop, label: "IT & Technology" },
    { icon: Heart, label: "Healthcare" },
    { icon: BarChart3, label: "Fintech" },
    { icon: Factory, label: "Manufacturing" },
    { icon: GraduationCap, label: "Education" },
    { icon: Users, label: "Government" },
  ];

  return (
    <main>
      {/* ─── HERO: Clear Who / What / Why ─── */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-15 dark:opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Headquartered in Tallinn, Estonia · Serving 80+ Countries
              </div>

              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                The Global Authority for{" "}
                <span className="text-gradient-gold">Accreditation</span> &{" "}
                <span className="text-gradient-gold">Certification</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                IUCB accredits Certification Bodies, Auditors, and Training Providers against{" "}
                <strong className="text-foreground">ISO, Cybersecurity & Privacy standards</strong> —
                so organizations worldwide can prove verified compliance and build institutional trust.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/accreditation">
                  <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
                    Get Accredited <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/verify">
                  <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                    Verify a Certificate
                  </Button>
                </Link>
              </div>

              {/* Micro social proof */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" /> 500+ accredited organizations</span>
                <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-primary" /> 80+ countries</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> 50+ standards</span>
              </div>
            </div>

            <div className="hidden justify-center lg:flex">
              <div className="relative">
                <div className="absolute -inset-12 rounded-full bg-primary/10 blur-3xl" />
                <img src={iucbSeal} alt="IUCB Official Seal" className="relative w-80 drop-shadow-2xl animate-pulse-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR: Authority Signals ─── */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-0 divide-x divide-border px-4 lg:grid-cols-4 lg:px-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 py-10">
              <s.icon className="h-6 w-6 text-primary" />
              <span className="text-3xl font-bold font-display text-foreground">{s.value}</span>
              <span className="text-sm text-muted-foreground text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── USER JOURNEYS: "I'm a…" Guided Paths ─── */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold font-display text-foreground md:text-3xl">How can we help you?</h2>
            <p className="mt-2 text-muted-foreground">Choose your path to get started</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {journeys.map((j) => (
              <Link
                key={j.label}
                to={j.link}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <j.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold font-display text-foreground">{j.label}</h3>
                <p className="text-sm text-muted-foreground">{j.desc}</p>
                <ChevronRight className="h-4 w-4 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM → SOLUTION: Why IUCB Matters ─── */}
      <section className="border-y border-border bg-muted/30 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
              The Problem We <span className="text-gradient-gold">Solve</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Compliance is broken. Fragmented frameworks, unrecognized certifications, and unclear career paths hold organizations and professionals back.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {problemSolution.map((ps, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                  <ps.icon className="h-6 w-6 text-destructive" />
                </div>
                <p className="mb-4 text-sm font-medium text-destructive/80">⚠ {ps.problem}</p>
                <div className="border-t border-border pt-4">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{ps.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OFFERINGS: 3 Clear Product Buckets ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
              What We <span className="text-gradient-gold">Offer</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Three core programs designed for organizations, professionals, and training bodies seeking international recognition.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {offerings.map((o) => (
              <div
                key={o.title}
                className={`relative flex flex-col rounded-xl border p-8 transition-all hover:shadow-lg ${
                  o.highlight
                    ? "border-primary/40 bg-primary/5 shadow-md"
                    : "border-border bg-card"
                }`}
              >
                {o.highlight && (
                  <div className="absolute -top-3 left-6 rounded-full bg-gradient-gold px-3 py-1 text-xs font-bold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <o.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-1 text-xl font-bold font-display text-foreground">{o.title}</h3>
                <p className="mb-3 text-xs font-medium uppercase tracking-wide text-primary">{o.subtitle}</p>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
                <Link to={o.link}>
                  <Button
                    className={`w-full font-semibold ${
                      o.highlight
                        ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                        : "border-primary/30 text-foreground hover:bg-primary/10"
                    }`}
                    variant={o.highlight ? "default" : "outline"}
                  >
                    {o.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUSTED SECTORS: Social Proof ─── */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold font-display text-foreground md:text-4xl">
            Trusted Across <span className="text-gradient-gold">Industries</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
            From Fortune 500 companies to government agencies — IUCB accreditation is recognized where it matters.
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {sectors.map((sector) => (
              <div key={sector.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background p-6 transition-colors hover:border-primary/20">
                <sector.icon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-foreground">{sector.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONVERSION CTA: Clear Action ─── */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
              Ready to Build <span className="text-gradient-gold">Institutional Trust</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
              Join 500+ organizations and 2,000+ professionals who trust IUCB for globally recognized accreditation and certification.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/accreditation">
                <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
                  Apply for Accreditation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  Talk to Our Team
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Average accreditation timeline: 6–8 weeks · No upfront commitment required
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
