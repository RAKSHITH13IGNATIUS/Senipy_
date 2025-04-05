
import React, { useState, useEffect } from 'react';

const CursorRobot: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [eyeDirection, setEyeDirection] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Add a small delay before showing robot to avoid flash during load
    const timer = setTimeout(() => setVisible(true), 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate target position with a margin from cursor
      const targetX = e.clientX - 30;
      const targetY = e.clientY - 30;
      
      // Add smooth movement by animating toward cursor with requestAnimationFrame
      setPosition(prev => {
        // Move 10% of the distance to the target each frame for smooth following
        const newX = prev.x + (targetX - prev.x) * 0.1;
        const newY = prev.y + (targetY - prev.y) * 0.1;
        
        // Calculate direction for eyes
        const deltaX = targetX - prev.x;
        const deltaY = targetY - prev.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance > 5) {
          setEyeDirection({ 
            x: deltaX / distance * 2, 
            y: deltaY / distance * 2 
          });
        }
        
        return { x: newX, y: newY };
      });
    };

    const animationFrame = setInterval(() => {
      requestAnimationFrame(() => {
        const event = { clientX: lastKnownMouseX, clientY: lastKnownMouseY } as MouseEvent;
        handleMouseMove(event);
      });
    }, 16); // ~60fps

    let lastKnownMouseX = 0;
    let lastKnownMouseY = 0;

    const trackMouse = (e: MouseEvent) => {
      lastKnownMouseX = e.clientX;
      lastKnownMouseY = e.clientY;
    };

    window.addEventListener('mousemove', trackMouse);

    return () => {
      clearTimeout(timer);
      clearInterval(animationFrame);
      window.removeEventListener('mousemove', trackMouse);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-opacity duration-300"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Robot Body */}
      <div className="relative w-14 h-16">
        {/* Head */}
        <div className="absolute top-0 w-14 h-10 bg-secondary rounded-t-xl border-2 border-gray-300">
          {/* Eyes */}
          <div className="flex justify-center space-x-2 pt-2">
            <div className="relative w-3 h-3 bg-white rounded-full">
              <div 
                className="absolute w-1.5 h-1.5 bg-black rounded-full"
                style={{ 
                  left: `${50 + eyeDirection.x * 30}%`, 
                  top: `${50 + eyeDirection.y * 30}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            <div className="relative w-3 h-3 bg-white rounded-full">
              <div 
                className="absolute w-1.5 h-1.5 bg-black rounded-full"
                style={{ 
                  left: `${50 + eyeDirection.x * 30}%`, 
                  top: `${50 + eyeDirection.y * 30}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Body */}
        <div className="absolute top-10 w-14 h-8 bg-primary rounded-b-lg border-2 border-t-0 border-gray-300">
          {/* Control panel */}
          <div className="flex justify-center space-x-1 pt-1">
            <div className="w-1 h-1 bg-yellow-300 rounded-full"></div>
            <div className="w-1 h-1 bg-green-300 rounded-full"></div>
            <div className="w-1 h-1 bg-red-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Wheels */}
        <div className="absolute bottom-0 left-1 w-4 h-2 bg-gray-800 rounded"></div>
        <div className="absolute bottom-0 right-1 w-4 h-2 bg-gray-800 rounded"></div>
      </div>
    </div>
  );
};

export default CursorRobot;
