import { Shield, CheckCircle, Globe, Lock, Award, ArrowRight, BookOpen, Users, Laptop, Heart, Factory, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import iucbSeal from "@/assets/iucb-seal.png";

const features = [
  { icon: Shield, title: "Accreditation Programs", description: "Comprehensive accreditation for Certification Bodies, Auditors, and Training Providers ensuring global standards compliance.", link: "/accreditation" },
  { icon: Award, title: "Certifications", description: "ISO standards, Cybersecurity frameworks, and Privacy certifications designed to benchmark organizational excellence.", link: "/certifications" },
  { icon: BookOpen, title: "Training & Exams", description: "World-class training pathways and examination systems for professionals seeking to advance their compliance careers.", link: "/training" },
];

const whyChoose = [
  { icon: Globe, title: "Global Recognition", description: "Accepted worldwide across major industries and regulatory frameworks." },
  { icon: CheckCircle, title: "Versatile Accreditation", description: "Flexible programs covering ISO, Cybersecurity, and Privacy standards." },
  { icon: Award, title: "Industry Benchmarks", description: "Setting the gold standard for compliance and operational excellence." },
  { icon: Lock, title: "Secure Process", description: "Transparent, ethical, and rigorous assessment methodologies." },
];

const focusAreas = [
  { title: "ISO Standards", description: "ISO 27001, ISO 9001, ISO 42001, ISO 22301 and more" },
  { title: "Cybersecurity Frameworks", description: "SOC 2, NIST, CIS Controls, Zero Trust" },
  { title: "Privacy Certifications", description: "GDPR, CCPA, HIPAA, Data Protection" },
  { title: "Industry Benchmarks", description: "Performance metrics and compliance scoring" },
];

const sectors = [
  { icon: Laptop, label: "IT & Technology" },
  { icon: Heart, label: "Healthcare" },
  { icon: Award, label: "Fintech" },
  { icon: Factory, label: "Manufacturing" },
  { icon: GraduationCap, label: "Education" },
  { icon: Users, label: "Government" },
];

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>

        <div className="container relative z-10 mx-auto px-4 py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Global Accreditation Ecosystem
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Global Accreditation & <span className="text-gradient-gold">Certification</span> Ecosystem
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
                Empowering organizations, auditors, and training bodies through globally recognized accreditation and benchmarking frameworks for ISO, Cybersecurity & Privacy Standards.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
                  Become Accredited
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                  Explore Certifications
                </Button>
              </div>
            </div>

            <div className="hidden justify-center lg:flex" style={{ animationDelay: "0.3s" }}>
              <div className="relative">
                <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
                <img src={iucbSeal} alt="IUCB Accreditation Seal" className="relative w-80 drop-shadow-2xl animate-pulse-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Link
                key={f.title}
                to={f.link}
                className="group glass-card rounded-xl p-8 transition-all hover:border-primary/30 hover:shadow-lg"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold font-display text-foreground">{f.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose IUCB */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
              Why Choose <span className="text-gradient-gold">IUCB</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              We provide a secure, transparent, and globally recognized framework for accreditation and benchmarking.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold font-display text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="border-y border-border bg-card py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-4 text-center">
            <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">Our Focus Areas</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Driving excellence across critical domains</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area) => (
              <div key={area.title} className="rounded-xl border border-border bg-secondary/50 p-6 transition-colors hover:border-primary/30">
                <h3 className="mb-2 font-semibold font-display text-foreground">{area.title}</h3>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/certifications">
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                View All Standards <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted Sectors */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold font-display text-foreground md:text-4xl">
            Trusted by Leading <span className="text-gradient-gold">Sectors</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {sectors.map((sector) => (
              <div key={sector.label} className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20">
                <sector.icon className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-foreground">{sector.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-3xl font-bold font-display text-foreground md:text-4xl">
            Ready to Get <span className="text-gradient-gold">Accredited</span>?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Join the global network of accredited organizations, auditors, and training providers. Start your accreditation journey today.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gradient-gold px-8 font-semibold text-primary-foreground hover:opacity-90">
              Apply Now
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
