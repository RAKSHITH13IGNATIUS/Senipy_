
import React, { useEffect, useRef } from 'react';

const DynamicBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particlesArray: Particle[] = [];
    const particleCount = 150; // Increased particle count
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      hue: number;
      colorChangeSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1; // Larger particles
        this.speedX = (Math.random() - 0.5) * 1; // Faster movement
        this.speedY = (Math.random() - 0.5) * 1;
        this.hue = Math.random() * 60 + 180; // Blue-ish hues
        this.colorChangeSpeed = Math.random() * 0.5;
        this.color = `hsla(${this.hue}, 100%, 70%, ${Math.random() * 0.6 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Boundary check
        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
        
        // Change color over time
        this.hue += this.colorChangeSpeed;
        if (this.hue > 240) this.hue = 180;
        this.color = `hsla(${this.hue}, 100%, 70%, ${Math.random() * 0.3 + 0.3})`;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.x;
      mouseY = e.y;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(10, 30, 70, 0.9)'); // Darker blue
      gradient.addColorStop(1, 'rgba(50, 80, 120, 0.9)'); // Medium blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Connect particles with lines when near mouse
      for (let a = 0; a < particlesArray.length; a++) {
        particlesArray[a].update();
        particlesArray[a].draw();
        
        // Draw connections
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw line between nearby particles
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 200, 255, ${0.2 - (distance/600)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
          
          // Draw lines to mouse when particles are nearby
          const dxMouse = mouseX - particlesArray[a].x;
          const dyMouse = mouseY - particlesArray[a].y;
          const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (mouseDist < 200) { // Increased interaction radius
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 220, 255, ${0.5 - (mouseDist/400)})`; // Brighter lines
            ctx.lineWidth = 1;
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
            
            // Push particles away from mouse for interactive feel
            if (mouseDist < 100) {
              particlesArray[a].x += dxMouse * 0.01;
              particlesArray[a].y += dyMouse * 0.01;
            }
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default DynamicBackground;
