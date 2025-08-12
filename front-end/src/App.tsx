import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Study from "./pages/Study";
import Disciplines from "./pages/Disciplines";
import Progress from "./pages/Progress";
import Achievements from "./pages/Achievements";
import { AppStoreProvider } from "./store/AppStore";
import { queryClient } from "./lib/queryClient";


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppStoreProvider>
        <BrowserRouter>
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              <Route path="/estudo" element={<ProtectedLayout />}>
                <Route index element={<Study />} />
                <Route path="estudo" element={<Study />} />

                <Route path="dashboard" element={<Dashboard />} />
                <Route path="disciplinas" element={<Disciplines />} />
                <Route path="progresso" element={<Progress />} />
             



                
                
          
              </Route>
   
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </AppStoreProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;



