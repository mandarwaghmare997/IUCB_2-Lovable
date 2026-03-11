import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import iucbLogo from "@/assets/iucb-logo.png";

const navKeys = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "accreditation", path: "/accreditation" },
  { key: "certifications", path: "/certifications" },
  { key: "training", path: "/training" },
  { key: "directory", path: "/directory" },
  { key: "resources", path: "/resources" },
  { key: "contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={iucbLogo} alt="IUCB Logo" className="h-10 w-auto logo-adaptive" />
        </Link>

        <nav className="hidden items-center gap-1 xl:flex">
          {navKeys.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`nav.${link.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="hidden xl:block">
            <Button className="bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90 ltr:ml-2 rtl:mr-2">
              {t("nav.applyNow")}
            </Button>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-foreground xl:hidden ltr:ml-1 rtl:mr-1"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navKeys.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <Button className="mt-2 bg-gradient-gold font-semibold text-primary-foreground">
              {t("nav.applyNow")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
