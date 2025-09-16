import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { Header } from "@/components/layout/Header";
import { Dashboard } from "@/pages/Dashboard";
import { DiseaseDetection } from "@/pages/DiseaseDetection";
import { FertilizerRecommendations } from "@/pages/FertilizerRecommendations";
import { WeatherMonitoring } from "@/pages/WeatherMonitoring";
import { MarketIntelligence } from "@/pages/MarketIntelligence";
import { VoiceAssistant } from "@/pages/VoiceAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TranslationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/fertilizer" element={<FertilizerRecommendations />} />
                <Route path="/weather" element={<WeatherMonitoring />} />
                <Route path="/market" element={<MarketIntelligence />} />
                <Route path="/voice" element={<VoiceAssistant />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </TranslationProvider>
  </QueryClientProvider>
);

export default App;
