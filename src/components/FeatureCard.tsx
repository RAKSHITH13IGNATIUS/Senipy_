
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  color?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  delay = 0,
  color = "bg-primary" 
}) => {
  return (
    <div 
      className="feature-card animated-element transform transition-all duration-300 hover:scale-105 hover:shadow-xl relative z-10 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
      <div className={`${color} text-white rounded-full p-4 mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
