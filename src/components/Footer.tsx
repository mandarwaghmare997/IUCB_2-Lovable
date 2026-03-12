import { Link } from "react-router-dom";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import iucbLogo from "@/assets/iucb-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={iucbLogo} alt="IUCB Logo" className="h-12 w-auto logo-adaptive" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("footer.description")}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{t("footer.location")}</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2.5">
              {[
                { key: "about", path: "/about" },
                { key: "accreditation", path: "/accreditation" },
                { key: "certifications", path: "/certifications" },
                { key: "training", path: "/training" },
                { key: "directory", path: "/directory" },
              ].map((item) => (
                <li key={item.key}>
                  <Link to={item.path} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Trust & Governance</h4>
            <ul className="space-y-2.5">
              <li><Link to="/governance" className="text-sm text-muted-foreground transition-colors hover:text-primary">Governance</Link></li>
              <li><Link to="/policies" className="text-sm text-muted-foreground transition-colors hover:text-primary">Policy Center</Link></li>
              <li><Link to="/docs" className="text-sm text-muted-foreground transition-colors hover:text-primary">Documentation</Link></li>
              <li><Link to="/verify" className="text-sm text-muted-foreground transition-colors hover:text-primary">Verify Certificate</Link></li>
              <li><Link to="/resources" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t("nav.resources")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">{t("footer.contactTitle")}</h4>
            <ul className="space-y-3">
              {["info@iucb.org", "accreditations@iucb.org", "connect@iucb.org"].map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    {email}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link to="/verify" className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary/80">
                <ExternalLink className="h-3.5 w-3.5" />
                {t("footer.verifyCredentials")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link to="/policies" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t("footer.privacy")}</Link>
            <Link to="/policies" className="text-xs text-muted-foreground transition-colors hover:text-foreground">{t("footer.terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
