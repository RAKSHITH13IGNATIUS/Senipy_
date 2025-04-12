
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCw, Trophy } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GRID_SIZE = 3; // 3x3 grid
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

interface Tile {
  value: number;
  position: number;
}

const Puzzle = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  
  // Initialize the puzzle
  const initializePuzzle = () => {
    // Create ordered tiles
    const newTiles: Tile[] = Array.from({ length: TOTAL_TILES - 1 }, (_, i) => ({
      value: i + 1,
      position: i
    }));
    
    // Add empty tile
    newTiles.push({ value: 0, position: TOTAL_TILES - 1 });
    
    // Shuffle the tiles (ensuring it's solvable)
    const shuffledTiles = shuffleTiles(newTiles);
    
    setTiles(shuffledTiles);
    setMoves(0);
    setIsComplete(false);
    setGameStarted(true);
  };
  
  // Fisher-Yates shuffle
  const shuffleTiles = (tilesArray: Tile[]) => {
    // Make a copy
    const newTiles = [...tilesArray];
    
    // Number of random moves to perform (ensure solvability)
    const randomMoves = 100;
    
    for (let i = 0; i < randomMoves; i++) {
      const emptyTileIndex = newTiles.findIndex(tile => tile.value === 0);
      const emptyPosition = newTiles[emptyTileIndex].position;
      
      // Get valid adjacent positions
      const adjacentPositions = getAdjacentPositions(emptyPosition);
      
      // Select a random adjacent position
      const randomPosition = adjacentPositions[Math.floor(Math.random() * adjacentPositions.length)];
      
      // Find tile at that position
      const tileIndex = newTiles.findIndex(tile => tile.position === randomPosition);
      
      // Swap tiles
      newTiles[emptyTileIndex].position = randomPosition;
      newTiles[tileIndex].position = emptyPosition;
    }
    
    return newTiles;
  };
  
  // Get adjacent positions
  const getAdjacentPositions = (position: number) => {
    const adjacentPositions = [];
    
    // Check top
    if (position >= GRID_SIZE) {
      adjacentPositions.push(position - GRID_SIZE);
    }
    
    // Check bottom
    if (position < GRID_SIZE * (GRID_SIZE - 1)) {
      adjacentPositions.push(position + GRID_SIZE);
    }
    
    // Check left
    if (position % GRID_SIZE !== 0) {
      adjacentPositions.push(position - 1);
    }
    
    // Check right
    if (position % GRID_SIZE !== GRID_SIZE - 1) {
      adjacentPositions.push(position + 1);
    }
    
    return adjacentPositions;
  };
  
  // Handle tile click
  const handleTileClick = (clickedPosition: number) => {
    if (!gameStarted || isComplete) return;
    
    // Find the empty tile
    const emptyTileIndex = tiles.findIndex(tile => tile.value === 0);
    const emptyPosition = tiles[emptyTileIndex].position;
    
    // Check if clicked tile is adjacent to empty tile
    const adjacentPositions = getAdjacentPositions(emptyPosition);
    
    if (adjacentPositions.includes(clickedPosition)) {
      // Find the clicked tile
      const clickedTileIndex = tiles.findIndex(tile => tile.position === clickedPosition);
      
      // Create a new array with the swap
      const newTiles = [...tiles];
      newTiles[emptyTileIndex].position = clickedPosition;
      newTiles[clickedTileIndex].position = emptyPosition;
      
      setTiles(newTiles);
      setMoves(prev => prev + 1);
      
      // Check if puzzle is solved
      checkCompletion(newTiles);
    }
  };
  
  // Check if puzzle is complete
  const checkCompletion = (currentTiles: Tile[]) => {
    // Check if each tile is in correct position
    const isSolved = currentTiles.every((tile, index) => {
      if (tile.value === 0) {
        return tile.position === TOTAL_TILES - 1;
      }
      return tile.position === tile.value - 1;
    });
    
    if (isSolved) {
      setIsComplete(true);
      toast({
        title: "Puzzle Completed!",
        description: `You solved it in ${moves + 1} moves!`,
      });
      
      // Save score to localStorage - lower moves is better
      const currentScore = 100 - (moves * 3); // More penalty per move than memory game
      const finalScore = Math.max(0, currentScore); // Ensure score doesn't go below 0
      saveGameScore('puzzle', finalScore);
    }
  };
  
  // Save game score to localStorage
  const saveGameScore = (gameType: string, score: number) => {
    const scores = JSON.parse(localStorage.getItem('gameScores') || '{}');
    scores[gameType] = score;
    localStorage.setItem('gameScores', JSON.stringify(scores));
  };
  
  // Start the game when component mounts
  useEffect(() => {
    initializePuzzle();
  }, []);
  
  // Get the correct position for CSS grid
  const getGridPosition = (position: number) => {
    const row = Math.floor(position / GRID_SIZE) + 1;
    const col = (position % GRID_SIZE) + 1;
    return { row, col };
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Sliding Puzzle</h1>
        <div className="flex gap-4 items-center">
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="font-bold">Moves: {moves}</span>
          </div>
          <Button onClick={initializePuzzle} variant="outline" className="flex items-center gap-2">
            <RefreshCw size={18} />
            Reset
          </Button>
        </div>
      </div>
      
      {isComplete && (
        <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg mb-6 flex items-center">
          <Trophy className="mr-2" />
          <span className="font-bold">Congratulations! You solved the puzzle in {moves} moves!</span>
        </div>
      )}
      
      <Card className="mb-6 p-4 shadow-lg">
        <CardContent className="p-0 bg-white rounded-lg">
          <div 
            className="grid gap-2 mx-auto bg-gray-100 p-3 rounded-lg"
            style={{ 
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              width: '300px',
              height: '300px'
            }}
          >
            {tiles.map((tile) => {
              const { row, col } = getGridPosition(tile.position);
              
              return tile.value === 0 ? (
                <div 
                  key={tile.value}
                  className="bg-gray-200 rounded"
                  style={{ gridRow: row, gridColumn: col }}
                />
              ) : (
                <div
                  key={tile.value}
                  className="bg-primary/80 text-white flex items-center justify-center text-2xl font-bold rounded cursor-pointer hover:bg-primary transition-colors shadow-md"
                  style={{ gridRow: row, gridColumn: col }}
                  onClick={() => handleTileClick(tile.position)}
                >
                  <div className="bg-white/20 w-full h-full flex items-center justify-center">
                    {tile.value}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="font-bold mb-2">How to Play:</h3>
        <p>Click on tiles adjacent to the empty space to move them. Rearrange the tiles to put them in numerical order.</p>
      </div>
    </div>
  );
};

export default Puzzle;
