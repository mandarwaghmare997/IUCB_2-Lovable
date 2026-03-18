import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import iucbLogo from "@/assets/iucb-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 pt-16">
      <div className="mx-auto max-w-md text-center">
        <img src={iucbLogo} alt="IUCB" className="mx-auto mb-8 h-12 w-auto logo-adaptive" />
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Shield className="h-10 w-10 text-primary" />
          </div>
        </div>
        <h1 className="mb-2 text-6xl font-bold font-display text-foreground">404</h1>
        <p className="mb-2 text-xl font-semibold font-display text-foreground">Page Not Found</p>
        <p className="mb-8 text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          If you followed a link, please let us know so we can fix it.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="outline" className="w-full sm:w-auto border-primary/30 text-foreground hover:bg-primary/10">
              Contact Support <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
