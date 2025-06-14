
import React, { useState, useEffect } from 'react';
import { ArrowDown, Download, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from '@/hooks/use-toast';
import mixpanel from 'mixpanel-browser';

const DownloadSection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);
  
  // Handle auto-scrolling if user is directed to this section
  useEffect(() => {
    // Check if URL hash matches this section
    if (window.location.hash === '#download') {
      // Wait a bit for component to render
      setTimeout(() => {
        document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, []);
  
  const handleDownloadClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast({
        title: "Authentication Required",
        description: "Please sign in to download the SENIPY APK",
        variant: "destructive",
      });
      navigate('/login');
      return false;
    }
    
    // Show downloading toast
    setDownloading(true);
    
    // Track download start in Mixpanel
    mixpanel.track('Download Started', {
      distinct_id: user.id,
      email: user.email
    });
    
    toast({
      title: "Download Started",
      description: "Your download is starting now. Please wait...",
    });
    
    // Simulate download completion
    setTimeout(() => {
      setDownloading(false);
      
      // Track download completion in Mixpanel
      mixpanel.track('Download Completed', {
        distinct_id: user.id,
        email: user.email
      });
      
      toast({
        title: "Download Complete",
        description: "Follow the installation steps to set up SENIPY on your device.",
      });
    }, 2000);
  };

  const handleLearnMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="download" className="py-16 bg-gradient-to-b from-primary/20 to-blue-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center text-3xl md:text-4xl font-bold mb-4">Download Our App</h2>
        <p className="section-description text-center text-xl mb-8">
          Get started with your SENIPY AI today. It's free and easy to install!
        </p>
        
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-xl p-8 border border-gray-100 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="flex flex-col items-center relative">
            {/* Animated arrows pointing to download button */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
              <ArrowDown size={36} className="text-primary" />
            </div>
            <div className="absolute -top-14 left-1/3 transform -translate-x-1/2 animate-bounce hidden md:block" style={{ animationDelay: '0.2s' }}>
              <ArrowDown size={30} className="text-primary opacity-70" />
            </div>
            <div className="absolute -top-14 right-1/3 transform translate-x-1/2 animate-bounce hidden md:block" style={{ animationDelay: "0.4s" }}>
              <ArrowDown size={30} className="text-primary opacity-70" />
            </div>
            
            <h3 className="text-2xl font-bold mb-6">Download APK</h3>
            
            {user ? (
              <>
                <div className="bg-gray-50 rounded-xl p-6 w-full mb-8">
                  <ol className="list-decimal list-inside space-y-3 text-lg">
                    <li>Click the download button below.</li>
                    <li>Open the APK file on your Android device.</li>
                    <li>Follow the on-screen installation instructions.</li>
                    <li>Allow any required permissions when prompted.</li>
                    <li>Launch SENIPY and start exploring!</li>
                  </ol>
                </div>
                
                {downloading ? (
                  <Button 
                    disabled
                    className="flex items-center gap-2 text-xl px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg"
                  >
                    <Download size={24} />
                    Downloading...
                  </Button>
                ) : (
                  <a 
                    href="https://www.dropbox.com/scl/fi/k9n5w4smbrr5oscq5oxom/_Senipy_18707334.apk?rlkey=uh7yxv48fyxvh86ztuvstsfql&st=ybyim5tf&dl=1" 
                    className="btn-primary flex items-center gap-2 text-xl px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-all duration-300" 
                    download="senipy.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDownloadClick}
                  >
                    <Download size={24} />
                    Download APK
                  </a>
                )}
              </>
            ) : (
              <div className="text-center p-6">
                <div className="flex items-center justify-center mb-6 text-gray-500">
                  <Lock className="mr-2" />
                  <p className="text-lg">Authentication required to download</p>
                </div>
                <Button
                  onClick={() => navigate('/login')}
                  className="btn-primary flex items-center gap-2 text-xl px-8 py-4 rounded-full bg-primary text-white hover:bg-primary/90 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sign in to Download
                </Button>
              </div>
            )}
            
            <p className="mt-8 text-gray-500 text-center">
              Need help installing? Contact our support team at senipy08@gmail.com
            </p>
            
            <div className="mt-8 pt-4 border-t border-gray-100">
              <Button 
                variant="secondary"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-white hover:bg-secondary/90 shadow-md transform hover:scale-105 transition-all duration-300"
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
