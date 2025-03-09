"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LightbulbIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface HintDisplayProps {
  hints: string[];
  currentHintIndex: number;
  isVisible: boolean;
  onToggle: () => void;
  onNextHint: () => void;
  onPreviousHint: () => void;
}

const HintDisplay: React.FC<HintDisplayProps> = ({ 
  hints, 
  currentHintIndex,
  isVisible, 
  onToggle,
  onNextHint,
  onPreviousHint
}) => {
  const currentHint = hints[currentHintIndex];
  const totalHints = hints.length;
  
  return (
    <div className="relative w-full">
      <div className="flex items-center justify-between mb-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="relative bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 hover:text-amber-300"
        >
          <LightbulbIcon className="w-4 h-4 mr-2" />
          {isVisible ? "Hinweis ausblenden" : "Hinweis anzeigen"}
        </Button>
        
        {isVisible && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onPreviousHint}
              disabled={currentHintIndex === 0}
              className="relative h-8 w-8 p-0 bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            
            <span className="text-xs text-slate-400">
              {currentHintIndex + 1} / {totalHints}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onNextHint}
              disabled={currentHintIndex === totalHints - 1}
              className="relative h-8 w-8 p-0 bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden"
          >
            <div className="relative p-4 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-800/20 to-amber-900/20 backdrop-blur-md border border-amber-700/30 shadow-xl" />
              <p className="relative text-amber-200 italic">
                <span className="font-semibold">Hinweis {currentHintIndex + 1}:</span> {currentHint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HintDisplay; 