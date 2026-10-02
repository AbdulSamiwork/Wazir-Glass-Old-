import { useState, useEffect, lazy, Suspense } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CertificationsBar } from "./components/CertificationsBar";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Process } from "./components/Process";
import { Brands } from "./components/Brands";
import { VisionMission } from "./components/VisionMission";
import { EmergencyContact } from "./components/EmergencyContact";
import { ServiceAreas } from "./components/ServiceAreas";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { BackToTop } from "./components/BackToTop";
import { Toaster } from "./components/ui/sonner";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Button } from "./components/ui/button";

// Lazy load heavy components to boost initial page speed
const Portfolio = lazy(() => import("./components/Portfolio").then(m => ({ default: m.Portfolio })));
const Testimonials = lazy(() => import("./components/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQ = lazy(() => import("./components/FAQ").then(m => ({ default: m.FAQ })));
const InternationalClients = lazy(() => import("./components/InternationalClients").then(m => ({ default: m.InternationalClients })));
const QuoteDialog = lazy(() => import("./components/QuoteDialog").then(m => ({ default: m.QuoteDialog })));
const AdminLogin = lazy(() => import("./components/admin/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));

// Glassmorphism Skeleton Loader for smooth progressive loading
const SectionSkeleton = () => (
  <div className="w-full py-12 flex justify-center items-center">
    <div className="animate-pulse flex flex-col items-center gap-3">
      <div className="h-6 w-40 bg-blue-100 rounded-full"></div>
      <div className="h-4 w-60 bg-gray-200 rounded"></div>
    </div>
  </div>
);

type AppMode = "public" | "admin";

export default function App() {
  const [mode, setMode] = useState<AppMode>("public");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthenticated(true);
    }

    if (window.location.hash === "#admin") {
      setMode("admin");
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setMode("public");
    window.location.hash = "";
  };

  const switchToAdmin = () => {
    setMode("admin");
    window.location.hash = "admin";
  };

  const switchToPublic = () => {
    setMode("public");
    window.location.hash = "";
  };

  // Admin Panel
  if (mode === "admin") {
    if (!isAuthenticated) {
      return (
        <Suspense fallback={<SectionSkeleton />}>
          <AdminLogin onLogin={handleLogin} />
          <div className="fixed bottom-4 left-4">
            <Button onClick={switchToPublic} variant="outline" size="sm">
              ← Back to Website
            </Button>
          </div>
          <Toaster />
        </Suspense>
      );
    }

    return (
      <Suspense fallback={<SectionSkeleton />}>
        <AdminDashboard onLogout={handleLogout} />
        <Toaster />
      </Suspense>
    );
  }

  // Public Website
  return (
    <div className="min-h-screen">
      <Header onOpenQuote={() => setQuoteDialogOpen(true)} />
      <Hero onOpenQuote={() => setQuoteDialogOpen(true)} />
      <CertificationsBar />
      <Services />
      <Stats />
      
      <Suspense fallback={<SectionSkeleton />}>
        <Portfolio />
      </Suspense>

      <WhyChooseUs />
      <Process />
      <Brands />
      <VisionMission />

      <Suspense fallback={<SectionSkeleton />}>
        <InternationalClients />
        <Testimonials />
      </Suspense>

      <EmergencyContact />
      <ServiceAreas />

      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>

      <Contact />
      <Footer onAdminClick={switchToAdmin} />
      <BackToTop />
      <WhatsAppButton />

      {quoteDialogOpen && (
        <Suspense fallback={null}>
          <QuoteDialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen} />
        </Suspense>
      )}

      <Toaster />
    </div>
  );
}
