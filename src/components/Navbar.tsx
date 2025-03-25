
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PawPrint, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ease-in-out',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-3 text-2xl font-bold text-foreground group"
        >
          <div className="relative transition-all duration-300 group-hover:scale-110">
            <PawPrint className="h-10 w-10 text-pawcare-600" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-pawcare-500/20 rounded-full blur-lg -z-10 opacity-70 group-hover:opacity-100"></div>
          </div>
          <span className="hidden md:inline bg-gradient-to-r from-pawcare-600 to-pawcare-500 bg-clip-text text-transparent">PawCare</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" end className={({isActive}) => cn('nav-link', isActive && 'active')}>
            Ana Sayfa
          </NavLink>
          <NavLink to="/dashboard" className={({isActive}) => cn('nav-link', isActive && 'active')}>
            Kontrol Paneli
          </NavLink>
          <NavLink to="/health" className={({isActive}) => cn('nav-link', isActive && 'active')}>
            Sağlık Kayıtları
          </NavLink>
          <NavLink to="/appointments" className={({isActive}) => cn('nav-link', isActive && 'active')}>
            Randevular
          </NavLink>
          <Button variant="default" size="sm" className="btn-shine ml-4">
            Giriş Yap
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out flex flex-col',
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'
        )}
      >
        <nav className="flex flex-col space-y-4 p-6">
          <NavLink 
            to="/" 
            end
            className={({isActive}) => cn(
              'nav-link text-lg py-2',
              isActive && 'active text-primary'
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ana Sayfa
          </NavLink>
          <NavLink 
            to="/dashboard" 
            className={({isActive}) => cn(
              'nav-link text-lg py-2',
              isActive && 'active text-primary'
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Kontrol Paneli
          </NavLink>
          <NavLink 
            to="/health" 
            className={({isActive}) => cn(
              'nav-link text-lg py-2',
              isActive && 'active text-primary'
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sağlık Kayıtları
          </NavLink>
          <NavLink 
            to="/appointments" 
            className={({isActive}) => cn(
              'nav-link text-lg py-2',
              isActive && 'active text-primary'
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Randevular
          </NavLink>
          <Button variant="default" size="lg" className="w-full mt-4">
            Giriş Yap
          </Button>
        </nav>
      </div>
    </header>
  );
}
