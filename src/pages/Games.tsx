import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import DynamicBackground from '@/components/DynamicBackground';
import { Brain, BookOpen, Puzzle, PenTool, Trophy, Home } from 'lucide-react';

const Games = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <DynamicBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 mt-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white bg-gray-800/70 inline-block px-6 py-2 rounded-lg">
            Games That Keep You <span className="text-primary">Sharp</span>
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto bg-gray-800/50 p-4 rounded-lg">
            Enjoy a variety of games designed to entertain while providing cognitive benefits and improving digital skills.
          </p>
          <Link to="/" className="mt-6 inline-block">
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Home size={20} />
              Return Home
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side game highlight */}
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-96">
              <img 
                src="/lovable-uploads/089fb17a-eb2f-44c0-a7cf-7a789cb7dba7.png" 
                alt="Memory Match Game" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-3xl font-bold text-white mb-2">Memory Match</h3>
                <p className="text-white mb-4">
                  Test and improve your memory by matching pairs of cards. Great for cognitive stimulation.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Try this game <span className="ml-2">→</span>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side game list */}
          <div className="space-y-4">
            <GameCard 
              title="Memory Match"
              description="Test and improve your memory by matching pairs of cards. Great for cognitive stimulation."
              icon={Brain}
              color="bg-blue-400"
            />
            
            <GameCard 
              title="Word Games"
              description="Expand your vocabulary and keep your mind sharp with our word puzzles and challenges."
              icon={BookOpen}
              color="bg-purple-500"
            />
            
            <GameCard 
              title="Digital Puzzles"
              description="Enjoy classic puzzles in digital format, from jigsaw puzzles to sudoku and crosswords."
              icon={Puzzle}
              color="bg-teal-400"
            />
            
            <GameCard 
              title="Art Studio"
              description="Express yourself through digital painting and drawing designed for ease of use."
              icon={PenTool}
              color="bg-orange-400"
            />
            
            <GameCard 
              title="Trivia Challenges"
              description="Test your knowledge on a variety of subjects with our engaging trivia games."
              icon={Trophy}
              color="bg-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard = ({ 
  title, 
  description, 
  icon: Icon,
  color
}: { 
  title: string, 
  description: string, 
  icon: React.ElementType, 
  color: string 
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="bg-white rounded-lg p-4 flex items-center gap-4 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 group">
          <div className={`${color} p-3 rounded-full text-white`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-gray-600 line-clamp-1">{description}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`${color} p-3 rounded-full text-white`}>
              <Icon size={24} />
            </div>
            <h4 className="font-bold text-lg">{title}</h4>
          </div>
          <p className="text-gray-600">{description}</p>
          <Button className="w-full" variant="outline">
            Play Now
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default Games;
