import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GameStatus } from '@/lib/store';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  gameStatus: GameStatus;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ 
  word, 
  guessedLetters,
  gameStatus
}) => {
  const normalizedWord = word.toUpperCase();
  
  // Container-Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Buchstaben-Animation
  const letterVariants = {
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
    }
  };

  return (
    <div className="relative w-full py-8 px-4">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md border border-slate-700/50 shadow-xl" />
      
      <motion.div 
        className="relative flex flex-wrap justify-center gap-2 md:gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...normalizedWord].map((letter, index) => {
          const isSpace = letter === ' ';
          const isGuessed = guessedLetters.includes(letter);
          const shouldReveal = isGuessed || gameStatus === 'lost' || isSpace;
          
          return (
            <motion.div
              key={`${index}-${letter}`}
              variants={letterVariants}
              className={cn(
                "relative w-8 h-12 md:w-10 md:h-14 flex items-center justify-center",
                isSpace ? "mx-4" : ""
              )}
            >
              {!isSpace && (
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm border border-slate-600/50 shadow-md" />
              )}
              
              {!isSpace && (
                <span 
                  className={cn(
                    "relative text-xl md:text-2xl font-bold",
                    shouldReveal 
                      ? (gameStatus === 'lost' && !isGuessed 
                          ? "text-red-400" 
                          : "text-emerald-400")
                      : "opacity-0"
                  )}
                >
                  {letter}
                </span>
              )}
              
              {!isSpace && !shouldReveal && (
                <span className="absolute bottom-0 w-full h-1 bg-slate-400 rounded-full" />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WordDisplay; 