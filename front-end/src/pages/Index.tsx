import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SakuraBackground from "@/components/SakuraBackground";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "StudyPetal — Comece sua jornada";
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden bg-[image:var(--gradient-soft)]">
      <SakuraBackground />
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-24 flex flex-col items-center text-center animate-enter">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
         Hypatia
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mb-10">
          Gamifique seus estudos com XP, níveis e pétalas. Visual suave inspirado em sakuras para uma rotina mais motivadora.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/login")} size="lg">
            Entrar
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;
