import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import GoToTopButton from "@/components/GoToTopButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Accreditation from "./pages/Accreditation";
import Certifications from "./pages/Certifications";
import Training from "./pages/Training";
import Directory from "./pages/Directory";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Governance from "./pages/Governance";
import Policies from "./pages/Policies";
import Verify from "./pages/Verify";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrganizations from "./pages/admin/AdminOrganizations";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminTemplates from "./pages/admin/AdminTemplates";
import AdminDocuments from "./pages/admin/AdminDocuments";
import AdminComplaints from "./pages/admin/AdminComplaints";
import AdminRoles from "./pages/admin/AdminRoles";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  if (isAdmin) return <>{children}</>;
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <GoToTopButton />
            <PublicLayout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/accreditation" element={<Accreditation />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/training" element={<Training />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/policies" element={<Policies />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/docs" element={<Docs />} />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="organizations" element={<AdminOrganizations />} />
                  <Route path="certificates" element={<AdminCertificates />} />
                  <Route path="templates" element={<AdminTemplates />} />
                  <Route path="documents" element={<AdminDocuments />} />
                  <Route path="complaints" element={<AdminComplaints />} />
                  <Route path="roles" element={<AdminRoles />} />
                  <Route path="audit-logs" element={<AdminAuditLogs />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </PublicLayout>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
