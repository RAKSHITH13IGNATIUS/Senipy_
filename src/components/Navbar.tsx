
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/90 backdrop-blur-md shadow-md' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
                <div className="h-3 w-3 bg-secondary rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold">Robo Companion</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('download')}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              Download
            </button>
            <Link to="/login" className="btn-secondary !py-2 !px-5">
              Login
            </Link>
            <Link to="/signup" className="btn-primary !py-2 !px-5">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMenuOpen ? 'max-h-60 bg-white/95 backdrop-blur-md shadow-md' : 'max-h-0'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('download')}
              className="text-lg font-medium py-2 hover:text-primary transition-colors"
            >
              Download
            </button>
            <div className="pt-2 flex flex-col space-y-3">
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
