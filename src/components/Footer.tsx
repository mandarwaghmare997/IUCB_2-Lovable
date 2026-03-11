import { Link } from "react-router-dom";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import iucbLogo from "@/assets/iucb-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={iucbLogo} alt="IUCB Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Empowering organizations through globally recognized accreditation and benchmarking frameworks for ISO, Cybersecurity & Privacy Standards.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Tallinn, Estonia</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Quick Links</h4>
            <ul className="space-y-2.5">
              {["About", "Accreditation", "Certifications", "Training", "Directory"].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Standards */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Standards</h4>
            <ul className="space-y-2.5">
              {["ISO 27001", "ISO 9001", "ISO 42001", "SOC 2", "GDPR", "CCPA"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@iucb.org" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" />
                  info@iucb.org
                </a>
              </li>
              <li>
                <a href="mailto:accreditations@iucb.org" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" />
                  accreditations@iucb.org
                </a>
              </li>
              <li>
                <a href="mailto:connect@iucb.org" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4 text-primary" />
                  connect@iucb.org
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <a
                href="https://verify.iucb.org"
                className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary/80"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Verify Credentials
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} International Union for Certification & Benchmarking. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
