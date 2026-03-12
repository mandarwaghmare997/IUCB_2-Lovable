import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navbar />
          <Routes>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
