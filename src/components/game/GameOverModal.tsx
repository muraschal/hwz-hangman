"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameStatus } from '@/lib/store';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  gameStatus: GameStatus;
  word: string;
}

const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  gameStatus,
  word
}) => {
  const isWon = gameStatus === 'won';
  
  // Verhindere Scrolling auf mobilen Geräten, wenn das Modal geöffnet ist
  useEffect(() => {
    if (isOpen) {
      // Speichere die aktuelle Scroll-Position
      const scrollY = window.scrollY;
      
      // Verhindere Scrolling durch Fixieren des Body
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'hidden';
      
      // Stelle den ursprünglichen Zustand wieder her, wenn das Modal geschlossen wird
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflowY = '';
        // Scrolle zurück zur ursprünglichen Position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);
  
  // Konfetti-Effekt bei Gewinn
  useEffect(() => {
    if (isOpen && isWon) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };
      
      const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
          return;
        }
        
        confetti({
          particleCount: 3,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { y: 0.6 },
          colors: ['#4f46e5', '#8b5cf6', '#10b981', '#0ea5e9'],
          gravity: 0.8,
          scalar: 1.2,
          drift: 0,
          ticks: 300
        });
      }, 150);
      
      return () => clearInterval(confettiInterval);
    }
  }, [isOpen, isWon]);
  
  // Tanzender Business-Hangman Varianten
  const businessHangmanVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    dance: {
      y: [0, -10, 0, -8, 0],
      rotate: [0, -5, 0, 5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Arm-Bewegungen für den tanzenden Hangman
  const armVariants = {
    hidden: { rotate: 0 },
    dance: {
      rotate: [0, 30, 0, -30, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Bein-Bewegungen für den tanzenden Hangman
  const legVariants = {
    hidden: { rotate: 0 },
    dance: {
      rotate: [0, 15, 0, -15, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };
  
  // 3D-Karten-Effekt
  const cardVariants = {
    hidden: { 
      opacity: 0,
      rotateX: 45,
      scale: 0.8
    },
    visible: { 
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.7
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-hidden touch-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isWon ? undefined : onClose}
        >
          <motion.div
            className="relative w-full max-w-md mx-auto overflow-hidden max-h-[90vh]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              perspective: "1200px",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Hintergrund mit Glassmorphism-Effekt */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-2xl" />
            
            {/* Inhalt */}
            <div className="relative p-4 md:p-6 flex flex-col items-center overflow-y-auto max-h-[90vh] scrollbar-hide">
              {/* Titel */}
              <motion.h2
                className={cn(
                  "text-3xl font-bold mb-2",
                  isWon ? "text-emerald-400" : "text-red-400"
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {isWon ? "Gewonnen! 🎉" : "Verloren! 😢"}
              </motion.h2>
              
              <motion.p
                className="text-slate-300 text-center mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isWon 
                  ? "Herzlichen Glückwunsch! Du hast das Wort erraten."
                  : "Schade! Versuche es noch einmal."}
              </motion.p>
              
              {/* Wort-Anzeige */}
              <motion.div
                className={cn(
                  "relative w-full p-4 mb-6 rounded-xl",
                  isWon 
                    ? "bg-gradient-to-br from-emerald-700/30 to-emerald-900/30 border border-emerald-600/40" 
                    : "bg-gradient-to-br from-red-700/30 to-red-900/30 border border-red-600/40"
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-sm text-slate-300 mb-2 text-center">
                  {isWon 
                    ? "Das gesuchte Wort war:" 
                    : "Das richtige Wort wäre gewesen:"}
                </p>
                <p className={cn(
                  "text-2xl font-bold text-center",
                  isWon ? "text-emerald-300" : "text-red-300"
                )}>
                  {word}
                </p>
              </motion.div>
              
              {/* Tanzender Business-Hangman (nur bei Gewinn) */}
              {isWon && (
                <motion.div
                  className="relative w-48 h-48 mb-6"
                  variants={businessHangmanVariants}
                  initial="hidden"
                  animate={["visible", "dance"]}
                >
                  {/* Business-Anzug */}
                  <motion.div className="absolute top-[55px] left-[60px] w-28 h-40 bg-gradient-to-b from-slate-700 to-slate-900 rounded-md" />
                  
                  {/* Hemdkragen */}
                  <motion.div className="absolute top-[55px] left-[74px] w-20 h-10 bg-slate-200 clip-triangle" />
                  
                  {/* Krawatte */}
                  <motion.div className="absolute top-[65px] left-[88px] w-6 h-20 bg-gradient-to-b from-indigo-600 to-violet-700 rounded-b-sm" />
                  
                  {/* Kopf */}
                  <motion.div className="absolute top-[25px] left-[74px] w-20 h-20 rounded-full bg-gradient-to-r from-amber-200 to-amber-300 border-2 border-slate-800 flex items-center justify-center">
                    {/* Gesicht - Lächeln */}
                    <motion.div className="w-12 h-6 border-b-2 border-slate-800 rounded-b-full mt-4" />
                    {/* Augen */}
                    <motion.div className="absolute top-6 left-5 w-3 h-3 rounded-full bg-slate-800" />
                    <motion.div className="absolute top-6 right-5 w-3 h-3 rounded-full bg-slate-800" />
                  </motion.div>
                  
                  {/* Arme */}
                  <motion.div 
                    className="absolute top-[70px] left-[45px] w-15 h-4 bg-slate-700 rounded-full origin-right"
                    variants={armVariants}
                    initial="hidden"
                    animate="dance"
                  />
                  <motion.div 
                    className="absolute top-[70px] right-[45px] w-15 h-4 bg-slate-700 rounded-full origin-left"
                    variants={armVariants}
                    initial="hidden"
                    animate="dance"
                    style={{ scaleX: -1 }}
                  />
                  
                  {/* Beine */}
                  <motion.div 
                    className="absolute bottom-[20px] left-[74px] w-4 h-20 bg-slate-700 rounded-b-md origin-top"
                    variants={legVariants}
                    initial="hidden"
                    animate="dance"
                  />
                  <motion.div 
                    className="absolute bottom-[20px] right-[74px] w-4 h-20 bg-slate-700 rounded-b-md origin-top"
                    variants={legVariants}
                    initial="hidden"
                    animate="dance"
                    style={{ scaleX: -1 }}
                  />
                  
                  {/* Aktentasche */}
                  <motion.div 
                    className="absolute bottom-[15px] left-[40px] w-15 h-20 bg-gradient-to-b from-amber-800 to-amber-950 rounded-md"
                    animate={{
                      rotate: [0, 5, 0, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }
                    }}
                  />
                </motion.div>
              )}
              
              {/* Verlierer-Hangman (nur bei Niederlage) */}
              {!isWon && (
                <motion.div
                  className="relative w-48 h-48 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {/* Galgen */}
                  <motion.div className="absolute bottom-0 left-[30px] w-80 h-2 bg-slate-600" />
                  <motion.div className="absolute bottom-0 left-[70px] w-2 h-120 bg-slate-600" />
                  <motion.div className="absolute top-[20px] left-[70px] w-60 h-2 bg-slate-600" />
                  <motion.div className="absolute top-[20px] right-[50px] w-2 h-20 bg-slate-600" />
                  
                  {/* Hangman */}
                  <motion.div className="absolute top-[40px] right-[50px] w-20 h-20 rounded-full border-2 border-red-500" />
                  <motion.div className="absolute top-[60px] right-[59px] w-2 h-40 bg-red-500" />
                  <motion.div className="absolute top-[80px] right-[59px] rotate-45 w-2 h-20 bg-red-500 origin-top" />
                  <motion.div className="absolute top-[80px] right-[59px] -rotate-45 w-2 h-20 bg-red-500 origin-top" />
                  <motion.div className="absolute top-[100px] right-[59px] rotate-25 w-2 h-30 bg-red-500 origin-top" />
                  <motion.div className="absolute top-[100px] right-[59px] -rotate-25 w-2 h-30 bg-red-500 origin-top" />
                </motion.div>
              )}
              
              {/* Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button 
                  onClick={onPlayAgain}
                  className="relative bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-none shadow-lg px-6 py-2 text-lg"
                >
                  Noch einmal spielen
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverModal; 