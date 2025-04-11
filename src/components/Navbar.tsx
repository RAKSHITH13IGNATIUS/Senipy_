
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { useEffect, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      <Link to="/" className="text-foreground hover:text-primary transition-colors">
        Home
      </Link>
      <Link to="/games" className="text-foreground hover:text-primary transition-colors">
        Games
      </Link>
      <Link to="/feedback" className="text-foreground hover:text-primary transition-colors">
        Feedback
      </Link>
      {user ? (
        <>
          <Link 
            to="/profile" 
            className="text-foreground hover:text-primary transition-colors"
          >
            Profile
          </Link>
          <Button 
            variant="ghost" 
            onClick={signOut}
            className="text-foreground hover:text-primary transition-colors"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-foreground hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Link to="/signup">
            <Button>Sign up</Button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed w-full z-50 py-3 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-background/70 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">SENIPY</span>
        </Link>

        {isMobile ? (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-4 flex flex-col space-y-5 items-center">
                <NavLinks />
              </div>
            </DrawerContent>
          </Drawer>
        ) : (
          <div className="flex items-center space-x-6">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
};
