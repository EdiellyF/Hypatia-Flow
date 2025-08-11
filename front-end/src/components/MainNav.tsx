import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/AppStore";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { MobileNav } from "./MobileNav";

export function MainNav() {
  const location = useLocation();
  const { user, logout } = useAppStore();

  const isAuthenticated = !!user;
  const isPublicPage = location.pathname === "/" || location.pathname === "/login";
  if (isPublicPage && !isAuthenticated) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-3 sm:px-6">
        <MobileNav />
        
        <NavigationMenu className="hidden md:flex flex-1">
          <NavigationMenuList>

            {isAuthenticated && (
              <>



              <NavigationMenuItem>
                  <Link 
                    to="./dashboard" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "./dashboard" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="./estudo" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "/estudo" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Estudo
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="./disciplinas" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "./disciplinas" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Disciplinas
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link 
                    to="./progresso" 
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "/progresso" && "bg-accent text-accent-foreground"
                    )}
                  >
                    Progresso
                  </Link>
                </NavigationMenuItem>

              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-between md:justify-end md:flex-none space-x-2">
          <Link to="./" className="md:hidden flex items-center">
            <span className="text-primary font-bold flex items-center"><span className="text-2xl mr-2">🌸</span> Hypatia-flow</span>
          </Link>
          
          {isAuthenticated ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => { logout(); navigate('/'); }} 
              title="Sair"
              className="text-muted-foreground hover:text-foreground hidden md:flex"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button asChild variant="default" className="hidden md:flex">
              <Link to="./login">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}