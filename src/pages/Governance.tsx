import { Shield, Users, Scale, Eye, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const boardMembers = [
  { name: "Dr. Elena Voreakis", role: "Chairperson", expertise: "International Standards & Policy" },
  { name: "Marcus Thornfield", role: "Vice-Chair", expertise: "Accreditation & Conformity Assessment" },
  { name: "Sarah Chen", role: "Board Member", expertise: "Digital Standards & AI Governance" },
  { name: "Johan Berg", role: "Board Member", expertise: "Training & Professional Development" },
];

const committees = [
  { name: "Accreditation Committee", desc: "Oversees all accreditation decisions, ensures consistency and compliance with IUCB criteria." },
  { name: "Impartiality Committee", desc: "Independent body ensuring freedom from commercial, financial, or other pressures in decision-making." },
  { name: "Technical Committee", desc: "Reviews and updates technical standards, assessment criteria, and competency requirements." },
  { name: "Appeals Committee", desc: "Handles formal appeals against accreditation decisions with full independence from the original decision-makers." },
];

const Governance = () => {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-navy py-24">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Transparency & Integrity
          </div>
          <h1 className="mb-4 text-4xl font-bold font-display text-foreground md:text-5xl">
            Governance <span className="text-gradient-gold">Framework</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            IUCB operates under a robust governance structure designed to ensure impartiality, transparency, and accountability in all accreditation activities.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold font-display text-foreground">Governance Principles</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Scale, title: "Impartiality", desc: "All decisions are made free from commercial, financial, or other pressures that could compromise objectivity." },
              { icon: Eye, title: "Transparency", desc: "Our processes, criteria, and decisions are publicly documented and accessible to all stakeholders." },
              { icon: Shield, title: "Accountability", desc: "Clear lines of responsibility with formal appeals and complaints mechanisms." },
              { icon: Globe, title: "Inclusivity", desc: "Governance structures include diverse representation from across geographies and industries." },
              { icon: CheckCircle, title: "Competence", desc: "Governance participants are selected based on demonstrated technical and managerial expertise." },
              { icon: Users, title: "Stakeholder Engagement", desc: "Regular consultation with accredited bodies, regulators, and industry representatives." },
            ].map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold font-display text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section className="border-y border-border bg-card py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold font-display text-foreground">Board of Directors</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            The Board provides strategic oversight and ensures IUCB's activities align with its mission and international best practice.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {boardMembers.map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-background p-6 text-center transition-colors hover:border-primary/30">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold font-display text-foreground">{m.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{m.role}</p>
                <p className="mt-2 text-xs text-muted-foreground">{m.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold font-display text-foreground">Committees</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Specialist committees support the Board in maintaining the highest standards of accreditation practice.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {committees.map((c) => (
              <div key={c.name} className="rounded-xl border border-border bg-card p-6">
                <h3 className="mb-2 font-semibold font-display text-foreground">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card py-16">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-2xl font-bold font-display text-foreground">Related Documents</h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Access our governance policies, impartiality statement, and complaints procedures.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/docs">
              <Button className="bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">View All Policies</Button>
            </Link>
            <Link to="/policies">
              <Button variant="outline" className="border-primary/30 text-foreground hover:bg-primary/10">Policy Center</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Governance;
