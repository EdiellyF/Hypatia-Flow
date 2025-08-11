import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title = "Página não encontrada — StudyPetal";
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 w-full">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Oops! Página não encontrada</p>
        <Link to="/" className="story-link text-primary">
          Voltar para o início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
