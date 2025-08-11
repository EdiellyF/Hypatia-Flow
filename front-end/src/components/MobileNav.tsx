import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/AppStore";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAppStore();

 
  const isAuthenticated = !!user;
  const isPublicPage = location.pathname === "/" || location.pathname === "/login";
  if (isPublicPage && !isAuthenticated) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] max-w-[300px] pr-0">
        <div className="px-2 py-6">
          
          <nav className="flex flex-col space-y-2">
            {isAuthenticated ? (
              <>
                <Link 
                  to="./dashboard" 
                  className={`px-3 py-2.5 rounded-md text-sm font-medium hover:bg-accent/50 ${location.pathname === "/dashboard" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="./estudo" 
                  className={`px-3 py-2.5 rounded-md text-sm font-medium hover:bg-accent/50 ${location.pathname === "/estudo" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Estudo
                </Link>
                <Link 
                  to="./disciplinas" 
                  className={`px-3 py-2.5 rounded-md text-sm font-medium hover:bg-accent/50 ${location.pathname === "/disciplinas" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Disciplinas
                </Link>
                <Link 
                  to="./progresso" 
                  className={`px-3 py-2.5 rounded-md text-sm font-medium hover:bg-accent/50 ${location.pathname === "/progresso" ? "bg-accent text-accent-foreground" : ""}`}
                  onClick={() => setOpen(false)}
                >
                  Progresso
                </Link>
          
                <div className="pt-6">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate('/');
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </Button>
                </div>
              </>
            ) : (
              <Button asChild variant="default" className="mt-6">
                <Link to="/login" onClick={() => setOpen(false)}>Entrar</Link>
              </Button>
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}