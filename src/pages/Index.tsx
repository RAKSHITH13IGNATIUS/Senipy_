
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FeatureCard from '@/components/FeatureCard';
import DownloadSection from '@/components/DownloadSection';
import CursorRobot from '@/components/CursorRobot';
import { Mic, GamepadIcon, ShoppingCart, Wallet, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen">
      <CursorRobot />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 animated-element">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Gentle Robot <span className="text-primary">Companion</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                A friendly assistant designed to simplify daily tasks and enhance well-being, 
                particularly for seniors and those seeking an accessible technology experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0 animated-element" style={{ animationDelay: '200ms' }}>
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 md:w-64 md:h-64 bg-primary/20 rounded-full flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
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
      <section id="features" className="py-16 bg-gray-50">
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
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">What Our Users Say</h2>
          <p className="section-description text-center">
            Hear from people who have experienced the benefits of our robot companion
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-blue-50 p-6 rounded-2xl shadow animated-element" style={{ animationDelay: '100ms' }}>
              <div className="text-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4">The voice commands have made using technology enjoyable again. I don't have to struggle with small buttons or complicated menus.</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Margaret L.</h4>
                  <p className="text-sm text-gray-500">78 years old</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl shadow animated-element" style={{ animationDelay: '200ms' }}>
              <div className="text-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4">I love playing the memory games each day. It's become part of my routine, and I've noticed improvement in my recall abilities.</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Robert J.</h4>
                  <p className="text-sm text-gray-500">82 years old</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl shadow animated-element" style={{ animationDelay: '300ms' }}>
              <div className="text-primary text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4">As a caregiver, the Guardian Connect feature gives me peace of mind. I can check in easily and know my mother is doing well.</p>
              <div className="flex items-center mt-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Susan K.</h4>
                  <p className="text-sm text-gray-500">Family caregiver</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animated-element">Ready to Welcome Your Robot Companion?</h2>
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
      
      {/* Download Section */}
      <DownloadSection />
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full"></div>
                </div>
                <span className="text-xl font-bold">Robo Companion</span>
              </div>
              <p className="text-gray-300">
                Enhancing daily life through accessible technology.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors">Features</button></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/signup" className="text-gray-300 hover:text-white transition-colors">Sign Up</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Email: support@robocompanion.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Innovation Way, Tech City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            &copy; {new Date().getFullYear()} Robo Companion. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
