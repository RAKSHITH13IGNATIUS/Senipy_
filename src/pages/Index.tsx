
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import DownloadSection from '@/components/DownloadSection';
import { Mic, GamepadIcon, ShoppingCart, Wallet, Users, Brain, Puzzle, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DynamicBackground from '@/components/DynamicBackground';

const Index = () => {
  useEffect(() => {
    // Add animation observer for scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all animated elements
    document.querySelectorAll('.animated-element').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animated-element').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 animated-element backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
                SENIPY <span className="text-primary">AI</span>
              </h1>
              <p className="text-xl text-gray-200 mb-2">SENIPY</p>
              <p className="text-lg text-gray-300 mb-8 italic">Maker's of near Future</p>
              <p className="text-xl text-white mb-8 max-w-lg">
                A friendly assistant designed to simplify daily tasks and enhance well-being, 
                particularly for seniors and those seeking an accessible technology experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                  Get Started
                </Button>
                <Link to="/games">
                  <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/20">
                    Explore Games
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 animated-element" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 mx-auto bg-primary/30 backdrop-blur-md rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/40 rounded-full flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
                    {/* Robot illustration */}
                    <div className="w-32 h-40 md:w-40 md:h-48 relative animate-float" style={{ animationDuration: '6s' }}>
                      {/* Head */}
                      <div className="absolute top-0 w-full h-24 bg-secondary rounded-t-2xl border-2 border-gray-300">
                        {/* Eyes */}
                        <div className="flex justify-center space-x-4 pt-6">
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          </div>
                          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-black rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Body */}
                      <div className="absolute top-24 w-full h-16 bg-primary rounded-b-2xl border-2 border-t-0 border-gray-300">
                        {/* Control panel */}
                        <div className="flex justify-center space-x-2 pt-3">
                          <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                          <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Arms */}
                      <div className="absolute top-28 left-0 w-2 h-8 bg-gray-400 rounded-full transform -translate-x-full"></div>
                      <div className="absolute top-28 right-0 w-2 h-8 bg-gray-400 rounded-full transform translate-x-full"></div>
                      
                      {/* Wheels */}
                      <div className="absolute bottom-0 left-4 w-8 h-4 bg-gray-800 rounded"></div>
                      <div className="absolute bottom-0 right-4 w-8 h-4 bg-gray-800 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Key Features</h2>
          <p className="section-description text-center">
            Discover how our robot companion enhances daily life with these thoughtfully designed features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <FeatureCard 
              title="Voice Integration"
              description="Control your device with simple voice commands, making navigation effortless even for those with limited mobility."
              icon={Mic}
              delay={100}
              color="bg-primary"
            />
            <FeatureCard 
              title="Interactive Games"
              description="Enjoy engaging games designed to stimulate mental activity, improve cognitive function, and provide entertainment."
              icon={GamepadIcon}
              delay={200}
              color="bg-purple-500"
            />
            <FeatureCard 
              title="Voice Shopping"
              description="Shop online using voice commands to easily browse and purchase items without the need for complex navigation."
              icon={ShoppingCart}
              delay={300}
              color="bg-orange-500"
            />
            <FeatureCard 
              title="Wallet Money"
              description="Securely manage finances with an intuitive digital wallet designed specifically for ease of use and safety."
              icon={Wallet}
              delay={400}
              color="bg-green-500"
            />
            <FeatureCard 
              title="Guardian Connect"
              description="Stay connected with family members and caregivers through simplified communication features."
              icon={Users}
              delay={500}
              color="bg-blue-500"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animated-element">Ready to Welcome Your SENIPY Assistant?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animated-element" style={{ animationDelay: '100ms' }}>
            Join thousands of users who have discovered a more accessible way to interact with technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animated-element" style={{ animationDelay: '200ms' }}>
            <Link to="/signup" className="bg-white text-primary hover:bg-gray-100 transition-colors px-8 py-3 rounded-full font-bold text-lg">
              Sign Up Now
            </Link>
            <button onClick={() => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })} className="bg-transparent border-2 border-white hover:bg-white/10 transition-colors px-8 py-3 rounded-full font-bold text-lg">
              Download App
            </button>
          </div>
        </div>
      </section>
      
      {/* Games Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Games</h2>
            <p className="section-description">
              Explore our collection of interactive games designed to entertain and stimulate cognitive abilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-blue-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain size={64} className="text-blue-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Memory Match</h3>
                <p className="text-gray-600 mb-4">Test and improve your memory by matching pairs of cards.</p>
                <Link to="/games">
                  <Button className="w-full">Play Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-purple-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Puzzle size={64} className="text-purple-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Digital Puzzles</h3>
                <p className="text-gray-600 mb-4">Enjoy classic puzzles in digital format, from jigsaw to sudoku.</p>
                <Link to="/games">
                  <Button className="w-full">Play Now</Button>
                </Link>
              </div>
            </div>
            
            <div className="game-card bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="h-48 bg-green-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen size={64} className="text-green-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Word Games</h3>
                <p className="text-gray-600 mb-4">Expand your vocabulary and keep your mind sharp with word puzzles.</p>
                <Link to="/games">
                  <Button className="w-full">Play Now</Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/games">
              <Button size="lg" variant="outline" className="bg-secondary text-white hover:bg-secondary/80 font-semibold">
                View All Games
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Download Section */}
      <DownloadSection />
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
                <span className="text-xl font-bold">SENIPY</span>
              </div>
              <p className="text-gray-300">
                Maker's of near Future
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">Features</button></li>
                <li><Link to="/games" className="text-gray-300 hover:text-white transition-colors">Games</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/signup" className="text-gray-300 hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: senipy08@gmail.com</li>
                <li>Phone: +91 9353152727</li>
                <li>Address: Bangalore, India</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} SENIPY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
