import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import iucbLogo from "@/assets/iucb-logo.png";

const navItems = [
  { key: "home", path: "/" },
  {
    key: "services",
    children: [
      { key: "accreditation", path: "/accreditation" },
      { key: "certifications", path: "/certifications" },
      { key: "training", path: "/training" },
    ],
  },
  { key: "directory", path: "/directory" },
  {
    key: "trust",
    children: [
      { key: "governance", href: "https://doc.iucb.org/governance" },
      { key: "policies", href: "https://doc.iucb.org" },
      { key: "resources", href: "https://doc.iucb.org/resources" },
    ],
  },
  { key: "about", path: "/about" },
  { key: "contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                >
                  {t(`nav.${item.key}`)}
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {openDropdown === item.key && (
                  <div className="absolute left-0 top-full z-50 min-w-[200px] rounded-lg border border-border bg-popover p-1.5 shadow-lg animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                          location.pathname === child.path
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-popover-foreground hover:bg-muted"
                        }`}
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {t(`nav.${item.key}`)}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                )}
              </Link>
            )
          )}
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
            <Link to="/accreditation">
              <Button size="sm" className="bg-gradient-gold font-semibold text-primary-foreground hover:opacity-90">
                Get Accredited
              </Button>
            </Link>
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
            {navItems.map((item) =>
              item.children ? (
                <div key={item.key}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.key ? null : item.key)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted"
                  >
                    {t(`nav.${item.key}`)}
                    <ChevronRight className={`h-4 w-4 transition-transform ${mobileExpanded === item.key ? "rotate-90" : ""}`} />
                  </button>
                  {mobileExpanded === item.key && (
                    <div className="ml-4 flex flex-col gap-0.5 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className={`rounded-md px-3 py-2 text-sm transition-colors ${
                            location.pathname === child.path
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground/70 hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          {t(`nav.${child.key}`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path!}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              )
            )}
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/verify" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full border-primary/30 text-foreground hover:bg-primary/10">
                  Verify Certificate
                </Button>
              </Link>
              <Link to="/accreditation" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-gradient-gold font-semibold text-primary-foreground">
                  Get Accredited
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
