
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
      className="feature-card animated-element"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`${color} text-white rounded-full p-4 mb-4`}>
        <Icon size={32} />
      </div>
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
