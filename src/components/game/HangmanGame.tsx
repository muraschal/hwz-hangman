import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGameStore } from '@/lib/store';
import HangmanFigure from './HangmanFigure';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import HintDisplay from './HintDisplay';
import GameOverModal from './GameOverModal';
import { PlayIcon } from 'lucide-react';

const HangmanGame: React.FC = () => {
  const { 
    currentWord, 
    guessedLetters, 
    wrongGuesses, 
    maxWrongGuesses,
    gameStatus,
    isHintVisible,
    startGame,
    guessLetter,
    resetGame,
    toggleHint
  } = useGameStore();

  // Tastatur-Event-Listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;
      
      const key = event.key.toUpperCase();
      if (/^[A-ZÄÖÜ]$/.test(key) && !guessedLetters.includes(key)) {
        guessLetter(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, guessedLetters, guessLetter]);

  const handleStartGame = () => {
    startGame();
  };

  const handlePlayAgain = () => {
    resetGame();
    startGame();
  };

  const handleCloseModal = () => {
    resetGame();
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
            HWZ Hangman
          </h1>
          <p className="text-slate-400 mt-2">
            Errate die EMBA-Buzzwords, bevor der Hangman fertig ist!
          </p>
        </div>

        {gameStatus === 'idle' ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-6 py-12"
          >
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-600/20 to-violet-600/20 backdrop-blur-md border border-indigo-500/30 shadow-xl animate-pulse" />
              <PlayIcon className="relative w-16 h-16 text-indigo-400" />
            </div>
            
            <Button
              onClick={handleStartGame}
              size="lg"
              className="relative bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-none shadow-lg"
            >
              Spiel starten
            </Button>
          </motion.div>
        ) : (
          <>
            {/* Hangman-Figur */}
            <HangmanFigure 
              wrongGuesses={wrongGuesses} 
              maxWrongGuesses={maxWrongGuesses} 
            />
            
            {/* Wort-Anzeige */}
            {currentWord && (
              <WordDisplay 
                word={currentWord.word} 
                guessedLetters={guessedLetters}
                gameStatus={gameStatus}
              />
            )}
            
            {/* Hinweis */}
            {currentWord && (
              <HintDisplay 
                hint={currentWord.hint}
                isVisible={isHintVisible}
                onToggle={toggleHint}
              />
            )}
            
            {/* Tastatur */}
            <Keyboard 
              guessedLetters={guessedLetters}
              onGuess={guessLetter}
              gameStatus={gameStatus}
              currentWord={currentWord?.word}
            />
            
            {/* Spielende-Modal */}
            <GameOverModal 
              isOpen={gameStatus === 'won' || gameStatus === 'lost'}
              onClose={handleCloseModal}
              onPlayAgain={handlePlayAgain}
              gameStatus={gameStatus}
              word={currentWord?.word || ''}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default HangmanGame; 