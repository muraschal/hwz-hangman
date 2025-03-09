"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HangmanFigureProps {
  wrongGuesses: number;
  maxWrongGuesses: number;
}

const HangmanFigure: React.FC<HangmanFigureProps> = ({ 
  wrongGuesses,
  maxWrongGuesses
}) => {
  // Berechne den Fortschritt für die Animation
  const progress = wrongGuesses / maxWrongGuesses;
  
  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-md border border-slate-700/50 shadow-xl" />
      
      <svg 
        className="relative w-48 h-48 md:w-64 md:h-64" 
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Galgen Basis */}
        <motion.line 
          x1="20" y1="180" x2="100" y2="180"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="stroke-slate-200"
        />
        
        {/* Galgen Pfosten */}
        <motion.line 
          x1="60" y1="20" x2="60" y2="180"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          className="stroke-slate-200"
        />
        
        {/* Galgen Querbalken */}
        <motion.line 
          x1="60" y1="20" x2="140" y2="20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          className="stroke-slate-200"
        />
        
        {/* Galgen Seil */}
        <motion.line 
          x1="140" y1="20" x2="140" y2="40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          className="stroke-slate-200"
        />
        
        {/* Kopf */}
        {wrongGuesses >= 1 && (
          <motion.circle 
            cx="140" cy="55" r="15"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "stroke-slate-200",
              wrongGuesses >= maxWrongGuesses && "stroke-red-500"
            )}
          />
        )}
        
        {/* Körper */}
        {wrongGuesses >= 2 && (
          <motion.line 
            x1="140" y1="70" x2="140" y2="120"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "stroke-slate-200",
              wrongGuesses >= maxWrongGuesses && "stroke-red-500"
            )}
          />
        )}
        
        {/* Linker Arm */}
        {wrongGuesses >= 3 && (
          <motion.line 
            x1="140" y1="80" x2="120" y2="100"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "stroke-slate-200",
              wrongGuesses >= maxWrongGuesses && "stroke-red-500"
            )}
          />
        )}
        
        {/* Rechter Arm */}
        {wrongGuesses >= 4 && (
          <motion.line 
            x1="140" y1="80" x2="160" y2="100"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "stroke-slate-200",
              wrongGuesses >= maxWrongGuesses && "stroke-red-500"
            )}
          />
        )}
        
        {/* Linkes Bein */}
        {wrongGuesses >= 5 && (
          <motion.line 
            x1="140" y1="120" x2="120" y2="150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "stroke-slate-200",
              wrongGuesses >= maxWrongGuesses && "stroke-red-500"
            )}
          />
        )}
        
        {/* Rechtes Bein */}
        {wrongGuesses >= 6 && (
          <motion.line 
            x1="140" y1="120" x2="160" y2="150"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={cn(
              "stroke-slate-200",
              wrongGuesses >= maxWrongGuesses && "stroke-red-500"
            )}
          />
        )}
      </svg>
      
      {/* Fortschrittsanzeige */}
      <div className="absolute bottom-4 left-4 right-4 h-2 bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div 
          className={cn(
            "h-full rounded-full",
            progress < 0.5 ? "bg-emerald-500" : 
            progress < 0.8 ? "bg-amber-500" : 
            "bg-red-500"
          )}
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};

export default HangmanFigure; 