"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameStatus } from '@/lib/store';
import { cn } from '@/lib/utils';

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
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="relative border-none bg-transparent shadow-2xl max-w-md mx-auto">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-xl -z-10" />
        
        <DialogHeader>
          <DialogTitle className={cn(
            "text-2xl font-bold text-center",
            isWon ? "text-emerald-400" : "text-red-400"
          )}>
            {isWon ? "Gewonnen! 🎉" : "Verloren! 😢"}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-300">
            {isWon 
              ? "Herzlichen Glückwunsch! Du hast das Wort erraten."
              : "Schade! Versuche es noch einmal."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative p-4 rounded-xl w-full text-center">
            <div className={cn(
              "absolute inset-0 rounded-xl backdrop-blur-sm border shadow-md -z-10",
              isWon 
                ? "bg-gradient-to-br from-emerald-700/30 to-emerald-900/30 border-emerald-600/40" 
                : "bg-gradient-to-br from-red-700/30 to-red-900/30 border-red-600/40"
            )} />
            
            <p className="text-sm text-slate-300 mb-2">
              {isWon 
                ? "Das gesuchte Wort war:" 
                : "Das richtige Wort wäre gewesen:"}
            </p>
            <p className={cn(
              "text-xl md:text-2xl font-bold",
              isWon ? "text-emerald-300" : "text-red-300"
            )}>
              {word}
            </p>
          </div>
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Button 
              onClick={onPlayAgain}
              className="relative bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-none shadow-lg"
            >
              Noch einmal spielen
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal; 