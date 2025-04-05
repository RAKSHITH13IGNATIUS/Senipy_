
import React from 'react';
import { ArrowDown, Download } from 'lucide-react';

const DownloadSection: React.FC = () => {
  return (
    <section id="download" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Download Our App</h2>
        <p className="section-description text-center">
          Get started with your Robo Companion today. It's free and easy to install!
        </p>
        
        <div className="max-w-3xl mx-auto mt-12 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
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
            
            <div className="bg-gray-50 rounded-xl p-6 w-full mb-8">
              <ol className="list-decimal list-inside space-y-3 text-lg">
                <li>Click the download button below.</li>
                <li>Open the APK file on your Android device.</li>
                <li>Follow the on-screen installation instructions.</li>
                <li>Allow any required permissions when prompted.</li>
                <li>Launch Robo Companion and start exploring!</li>
              </ol>
            </div>
            
            <a 
              href="#" 
              className="btn-primary flex items-center gap-2 text-xl" 
              onClick={(e) => {
                e.preventDefault();
                // In a real app, this would download the APK
                alert("APK download would start here. This is a demo.");
              }}
            >
              <Download size={24} />
              Download APK
            </a>
            
            <p className="mt-8 text-gray-500 text-center">
              Need help installing? Contact our support team at support@robocompanion.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
