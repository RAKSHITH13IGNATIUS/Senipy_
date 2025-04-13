
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Clock, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ReactionGame = () => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'clicked' | 'tooEarly'>('waiting');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [attempts, setAttempts] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load best time from localStorage
    const savedBestTime = localStorage.getItem('reactionBestTime');
    if (savedBestTime) {
      setBestTime(parseInt(savedBestTime));
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const startGame = () => {
    setGameState('waiting');
    setReactionTime(null);
    
    // Random delay between 1-5 seconds
    const delay = Math.floor(Math.random() * 4000) + 1000;
    
    timerRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setGameState('ready');
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'waiting') {
      // Clicked too early
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setGameState('tooEarly');
      toast({
        title: "Too early!",
        description: "Wait for the green color before clicking!",
        variant: "destructive",
      });
    } else if (gameState === 'ready') {
      // Valid click - calculate reaction time
      const endTime = Date.now();
      const time = endTime - (startTime || endTime);
      setReactionTime(time);
      setGameState('clicked');
      
      // Update attempts
      const newAttempts = [...attempts, time];
      setAttempts(newAttempts);
      
      // Calculate average
      const sum = newAttempts.reduce((a, b) => a + b, 0);
      const avg = Math.round(sum / newAttempts.length);
      setAverageTime(avg);
      
      // Update best time
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
        localStorage.setItem('reactionBestTime', time.toString());
        
        // Save to game scores
        saveGameScore('reaction', Math.max(0, 100 - time / 5)); // Convert to score out of 100
      }
      
      toast({
        title: "Great!",
        description: `Your reaction time: ${time}ms`,
      });
    }
  };

  // Save game score to localStorage
  const saveGameScore = (gameType: string, score: number) => {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    scores[gameType] = Math.round(score);
    localStorage.setItem('gameScores', JSON.stringify(scores));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reaction Time Test</h1>
        <div className="flex gap-4 items-center">
          {reactionTime && (
            <div className="bg-primary/10 px-4 py-2 rounded-lg">
              <span className="font-bold">Time: {reactionTime}ms</span>
            </div>
          )}
          <Button onClick={startGame} variant="outline" className="flex items-center gap-2">
            <RefreshCw size={18} />
            {gameState === 'waiting' ? 'Cancel' : 'Try Again'}
          </Button>
        </div>
      </div>
      
      <Card 
        className={`
          mb-6 shadow-md transition-colors duration-300 cursor-pointer
          ${gameState === 'waiting' ? 'bg-blue-100' : ''}
          ${gameState === 'ready' ? 'bg-green-200' : ''}
          ${gameState === 'clicked' ? 'bg-gray-100' : ''}
          ${gameState === 'tooEarly' ? 'bg-red-100' : ''}
        `}
        onClick={handleClick}
      >
        <CardContent className="p-0">
          <div 
            className="w-full h-64 flex items-center justify-center p-6 text-center"
          >
            {gameState === 'waiting' && (
              <div className="space-y-4">
                <Clock className="mx-auto" size={40} />
                <h2 className="text-xl font-bold">Wait for green...</h2>
                <p className="text-gray-700">Click as soon as the box turns green</p>
              </div>
            )}
            
            {gameState === 'ready' && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">CLICK NOW!</h2>
              </div>
            )}
            
            {gameState === 'clicked' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                  {reactionTime} ms
                </h2>
                <p className="text-gray-700">
                  {reactionTime && reactionTime < 200 
                    ? "Incredible reflexes!" 
                    : reactionTime && reactionTime < 300
                    ? "Great job!" 
                    : reactionTime && reactionTime < 500
                    ? "Good reflexes"
                    : "Keep practicing!"}
                </p>
                <Button onClick={startGame} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
            
            {gameState === 'tooEarly' && (
              <div className="space-y-4">
                <AlertTriangle className="mx-auto text-red-500" size={40} />
                <h2 className="text-xl font-bold">Too Early!</h2>
                <p className="text-gray-700">Wait for the green color before clicking</p>
                <Button onClick={startGame} className="mt-4">
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Clock size={18} className="text-primary" />
              Your Best Time
            </h3>
            <p className="text-2xl font-bold">{bestTime ? `${bestTime} ms` : "No attempts yet"}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Average Reaction Time</h3>
            <p className="text-2xl font-bold">{averageTime ? `${averageTime} ms` : "No attempts yet"}</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2">Attempts</h3>
            <p className="text-2xl font-bold">{attempts.length}</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6 bg-white/80 p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <p>Wait for the box to turn green, then click/tap as quickly as you can. Your reaction time will be measured in milliseconds.</p>
      </div>
    </div>
  );
};

export default ReactionGame;
