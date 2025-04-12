
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Brain, BookOpen, Puzzle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface GameScore {
  memory: number;
  word: number;
  puzzle: number;
}

const ScoreCard = () => {
  const [scores, setScores] = useState<GameScore>({
    memory: 0,
    word: 0,
    puzzle: 0
  });
  
  const [averageScore, setAverageScore] = useState(0);
  
  useEffect(() => {
    // Get scores from localStorage
    const storedScores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    
    const updatedScores = {
      memory: storedScores.memory || 0,
      word: storedScores.word || 0,
      puzzle: storedScores.puzzle || 0
    };
    
    setScores(updatedScores);
    
    // Calculate average (only count games that have been played)
    const playedGames = Object.values(updatedScores).filter(score => score > 0);
    const totalScore = playedGames.reduce((sum, score) => sum + score, 0);
    const average = playedGames.length > 0 ? Math.round(totalScore / playedGames.length) : 0;
    
    setAverageScore(average);
  }, []);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Trophy className="text-yellow-500" size={20} />
          Your Game Scores
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-blue-500" />
              <span className="text-sm font-medium">Memory Match</span>
            </div>
            <span className="text-sm font-bold">{scores.memory}</span>
          </div>
          <Progress value={scores.memory} className="h-2" />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-purple-500" />
              <span className="text-sm font-medium">Word Game</span>
            </div>
            <span className="text-sm font-bold">{scores.word}</span>
          </div>
          <Progress value={scores.word} className="h-2" />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <Puzzle size={16} className="text-green-500" />
              <span className="text-sm font-medium">Sliding Puzzle</span>
            </div>
            <span className="text-sm font-bold">{scores.puzzle}</span>
          </div>
          <Progress value={scores.puzzle} className="h-2" />
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Average Score</span>
            <span className="text-sm font-bold">{averageScore}</span>
          </div>
          <Progress value={averageScore} className="h-2 bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;
