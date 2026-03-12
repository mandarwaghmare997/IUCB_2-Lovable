import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/95 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={iucbLogo} alt="IUCB Logo" className="h-10 w-auto logo-adaptive" />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navKeys.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {t(`nav.${link.key}`)}
              {location.pathname === link.path && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="hidden xl:flex items-center gap-2">
            <Link to="/verify">
              <Button variant="outline" size="sm" className="border-primary/30 text-foreground hover:bg-primary/10">
                {t("nav.verify", "Verify")}
              </Button>
            </Link>
            <Button className="bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background xl:hidden animate-fade-in">
          <nav className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {navKeys.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {t(`nav.${link.key}`)}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/verify" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full border-primary/30 text-foreground hover:bg-primary/10">
                  {t("nav.verify", "Verify")}
                </Button>
              </Link>
              <Button className="w-full bg-gradient-gold font-semibold text-primary-foreground">
                {t("nav.applyNow")}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
