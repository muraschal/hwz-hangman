"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LightbulbIcon } from 'lucide-react';

interface HintDisplayProps {
  hint: string;
  isVisible: boolean;
  onToggle: () => void;
}

const HintDisplay: React.FC<HintDisplayProps> = ({ 
  hint, 
  isVisible, 
  onToggle 
}) => {
  return (
    <div className="relative w-full">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="relative mb-2 bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 hover:text-amber-300"
      >
        <LightbulbIcon className="w-4 h-4 mr-2" />
        {isVisible ? "Hinweis ausblenden" : "Hinweis anzeigen"}
      </Button>
      
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
                <span className="font-semibold">Hinweis:</span> {hint}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HintDisplay; 