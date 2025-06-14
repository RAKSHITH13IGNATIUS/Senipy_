
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Card icons
const iconList = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'
];

// Duplicate and shuffle
const shuffleCards = () => {
  const duplicatedIcons = [...iconList, ...iconList];
  
  // Fisher-Yates shuffle algorithm
  for (let i = duplicatedIcons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [duplicatedIcons[i], duplicatedIcons[j]] = [duplicatedIcons[j], duplicatedIcons[i]];
  }
  
  return duplicatedIcons.map((icon, index) => ({
    id: index,
    content: icon,
    isFlipped: false,
    isMatched: false
  }));
};

const MemoryMatch = () => {
  const [cards, setCards] = useState(shuffleCards());
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  
  // Check for game completion
  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      setGameComplete(true);
      toast({
        title: "Congratulations!",
        description: `You completed the game in ${moves} moves!`,
      });
      
      // Save score to localStorage
      const currentScore = 100 - (moves * 2); // Lower moves = higher score, max 100
      const finalScore = Math.max(0, currentScore); // Ensure score doesn't go below 0
      saveGameScore('memory', finalScore);
    }
  }, [cards, moves]);
  
  // Handle card flips
  useEffect(() => {
    if (flippedCards.length === 2) {
      const firstCardId = flippedCards[0];
      const secondCardId = flippedCards[1];
      
      if (cards[firstCardId].content === cards[secondCardId].content) {
        // Match found
        setCards(prevCards => 
          prevCards.map(card => 
            card.id === firstCardId || card.id === secondCardId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setFlippedCards([]);
      } else {
        // No match, flip back after delay
        const timer = setTimeout(() => {
          setCards(prevCards => 
            prevCards.map(card => 
              card.id === firstCardId || card.id === secondCardId
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);
  
  const handleCardClick = (id: number) => {
    // Prevent clicking if already two cards flipped or card already matched
    if (flippedCards.length === 2 || cards[id].isMatched || cards[id].isFlipped) {
      return;
    }
    
    // Flip card
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards(prev => [...prev, id]);
    
    if (flippedCards.length === 1) {
      setMoves(prev => prev + 1);
    }
  };
  
  const resetGame = () => {
    setCards(shuffleCards());
    setFlippedCards([]);
    setMoves(0);
    setGameComplete(false);
  };

  // Save game score to localStorage
  const saveGameScore = (gameType: string, score: number) => {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    scores[gameType] = score;
    localStorage.setItem('gameScores', JSON.stringify(scores));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Memory Match Game</h1>
        <div className="flex gap-4 items-center">
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="font-bold">Moves: {moves}</span>
          </div>
          <Button onClick={resetGame} variant="outline" className="flex items-center gap-2">
            <RefreshCw size={18} />
            Reset
          </Button>
        </div>
      </div>
      
      {gameComplete && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6 flex items-center">
          <Trophy className="mr-2" />
          <span className="font-bold">Congratulations! You completed the game in {moves} moves!</span>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div 
            key={card.id}
            className={`cursor-pointer transition-all duration-300 ${card.isMatched ? 'opacity-70' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <Card className={`h-24 ${card.isFlipped || card.isMatched ? 'bg-primary/20' : 'bg-gray-200'} shadow-md`}>
              <CardContent className="p-0 h-full flex items-center justify-center">
                {(card.isFlipped || card.isMatched) ? (
                  <span className="text-4xl font-bold text-gray-900 bg-white/80 w-full h-full flex items-center justify-center">
                    {card.content}
                  </span>
                ) : (
                  <span className="text-4xl font-bold text-gray-500 bg-gray-100 w-full h-full flex items-center justify-center">?</span>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-white/90 p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <p>Find all matching pairs of cards in as few moves as possible. Click on a card to reveal it, then try to find its match.</p>
      </div>
    </div>
  );
};

export default MemoryMatch;
