
import React, { useState, useEffect } from 'react';

const BotLogo: React.FC = () => {
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Handle mouse movement to track eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to viewport center
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      
      // Limit eye movement range
      setEyeDirection({
        x: Math.max(-0.5, Math.min(0.5, x * 0.5)),
        y: Math.max(-0.5, Math.min(0.5, y * 0.5))
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Random blinking effect
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="relative h-10 w-10 bg-primary rounded-full flex items-center justify-center">
      <div className="h-6 w-6 bg-white rounded-full flex items-center justify-center">
        {/* Bot face */}
        <div className="absolute top-2 w-full flex justify-center space-x-2">
          {/* Eyes */}
          <div className="relative w-1.5 h-1.5 bg-gray-900 rounded-full overflow-hidden">
            {/* Pupil */}
            {!isBlinking && (
              <div 
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{ 
                  left: `${50 + eyeDirection.x * 100}%`, 
                  top: `${50 + eyeDirection.y * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
            {/* Eyelid for blinking */}
            <div 
              className="absolute top-0 left-0 w-full bg-gray-900 transition-all duration-100"
              style={{ 
                height: isBlinking ? '100%' : '0%'
              }}
            />
          </div>
          <div className="relative w-1.5 h-1.5 bg-gray-900 rounded-full overflow-hidden">
            {/* Pupil */}
            {!isBlinking && (
              <div 
                className="absolute w-0.5 h-0.5 bg-white rounded-full"
                style={{ 
                  left: `${50 + eyeDirection.x * 100}%`, 
                  top: `${50 + eyeDirection.y * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}
            {/* Eyelid for blinking */}
            <div 
              className="absolute top-0 left-0 w-full bg-gray-900 transition-all duration-100"
              style={{ 
                height: isBlinking ? '100%' : '0%'
              }}
            />
          </div>
        </div>
        {/* Mouth */}
        <div className="absolute bottom-1.5 w-3 h-0.5 bg-gray-900 rounded-full"></div>
      </div>
    </div>
  );
};

export default BotLogo;
