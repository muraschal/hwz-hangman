"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GameStatus } from '@/lib/store';

interface KeyboardProps {
  guessedLetters: string[];
  onGuess: (letter: string) => void;
  gameStatus: GameStatus;
  currentWord?: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ 
  guessedLetters, 
  onGuess,
  gameStatus,
  currentWord = ''
}) => {
  const normalizedWord = currentWord.toUpperCase();
  
  // Tastatur-Layouts für Deutsch
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P', 'Ü'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ö', 'Ä'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
  ];
  
  // Container-Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2
      }
    }
  };
  
  // Tasten-Animation
  const keyVariants = {
    hidden: { 
      y: 20, 
      opacity: 0,
      scale: 0.8
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    pressed: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const handleKeyClick = (letter: string) => {
    if (gameStatus === 'playing' && !guessedLetters.includes(letter)) {
      onGuess(letter);
    }
  };
  
  const getKeyStatus = (letter: string) => {
    if (!guessedLetters.includes(letter)) {
      return 'unused';
    }
    
    if (normalizedWord.includes(letter)) {
      return 'correct';
    }
    
    return 'incorrect';
  };

  return (
    <div className="relative w-full py-6 px-2 md:px-4">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md border border-slate-700/50 shadow-xl" />
      
      <div className="relative flex flex-col items-center gap-2">
        {keyboardRows.map((row, rowIndex) => (
          <motion.div 
            key={`row-${rowIndex}`}
            className="flex justify-center gap-1 md:gap-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {row.map((letter) => {
              const status = getKeyStatus(letter);
              const isDisabled = guessedLetters.includes(letter) || gameStatus !== 'playing';
              
              return (
                <motion.button
                  key={letter}
                  variants={keyVariants}
                  whileTap="pressed"
                  disabled={isDisabled}
                  onClick={() => handleKeyClick(letter)}
                  className={cn(
                    "relative w-7 h-10 md:w-10 md:h-12 flex items-center justify-center rounded-md",
                    "transition-all duration-200 ease-out",
                    "font-medium text-sm md:text-base",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
                    status === 'unused' && !isDisabled && "hover:bg-slate-700/60 active:bg-slate-600/60",
                    status === 'correct' && "bg-emerald-500/20 border-emerald-500/40",
                    status === 'incorrect' && "bg-red-500/20 border-red-500/40",
                    isDisabled && status === 'unused' && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div 
                    className={cn(
                      "absolute inset-0 rounded-md backdrop-blur-sm border shadow-sm",
                      status === 'unused' && "bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-slate-600/50",
                      status === 'correct' && "bg-gradient-to-br from-emerald-700/30 to-emerald-900/30 border-emerald-600/40",
                      status === 'incorrect' && "bg-gradient-to-br from-red-700/30 to-red-900/30 border-red-600/40"
                    )} 
                  />
                  <span className="relative">{letter}</span>
                </motion.button>
              );
            })}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Keyboard; 