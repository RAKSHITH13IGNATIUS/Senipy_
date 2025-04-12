
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Refresh, Check, Crown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const wordList = [
  'APPLE', 'BREAD', 'CHAIR', 'DANCE', 'EAGLE', 'FRUIT',
  'GRASS', 'HOUSE', 'IMAGE', 'JUICE', 'KNIFE', 'LEMON'
];

const WordGame = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  
  // Initialize game
  useEffect(() => {
    if (gameActive) {
      selectNewWord();
      
      const countdown = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(countdown);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(countdown);
    }
  }, [gameActive]);
  
  const scrambleWord = (word: string) => {
    const wordArray = word.split('');
    for (let i = wordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    // Ensure scrambled word is different from original
    const scrambled = wordArray.join('');
    return scrambled === word ? scrambleWord(word) : scrambled;
  };
  
  const selectNewWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const selectedWord = wordList[randomIndex];
    setCurrentWord(selectedWord);
    setScrambledWord(scrambleWord(selectedWord));
    setUserGuess('');
  };
  
  const checkAnswer = () => {
    if (userGuess.toUpperCase() === currentWord) {
      toast({
        title: "Correct!",
        description: "You found the word!",
      });
      setScore(prev => prev + 10);
      selectNewWord();
    } else {
      toast({
        title: "Not quite right",
        description: "Try again!",
        variant: "destructive",
      });
    }
  };
  
  const startGame = () => {
    setScore(0);
    setTimer(30);
    setGameActive(true);
  };
  
  const endGame = () => {
    setGameActive(false);
    toast({
      title: "Game Over!",
      description: `Your final score is ${score}`,
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Word Scramble</h1>
        <div className="flex gap-4 items-center">
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="font-bold">Score: {score}</span>
          </div>
          <div className={`px-4 py-2 rounded-lg ${timer < 10 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            <span className="font-bold">Time: {timer}s</span>
          </div>
        </div>
      </div>
      
      {!gameActive ? (
        <Card className="mb-6">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            {score > 0 && (
              <div className="mb-6 text-center">
                <Crown className="mx-auto mb-2 text-yellow-500" size={40} />
                <h3 className="text-2xl font-bold">Game Over!</h3>
                <p className="text-xl">Your final score: {score}</p>
              </div>
            )}
            <Button onClick={startGame} className="w-full md:w-auto">
              {score > 0 ? 'Play Again' : 'Start Game'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="p-6 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-2">Unscramble this word:</p>
                <h2 className="text-4xl font-bold tracking-wider">{scrambledWord}</h2>
              </div>
              
              <div className="w-full max-w-md">
                <Input 
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder="Enter your guess"
                  className="text-center text-xl mb-4"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      checkAnswer();
                    }
                  }}
                />
                
                <div className="flex gap-4">
                  <Button 
                    onClick={checkAnswer} 
                    className="flex-1 flex items-center justify-center gap-2" 
                    disabled={!userGuess}
                  >
                    <Check size={18} />
                    Check
                  </Button>
                  <Button 
                    onClick={selectNewWord} 
                    variant="outline" 
                    className="flex items-center gap-2"
                  >
                    <Refresh size={18} />
                    Skip
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default WordGame;
