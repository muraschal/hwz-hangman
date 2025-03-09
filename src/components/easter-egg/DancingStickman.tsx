"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DancingStickmanProps {
  isVisible: boolean;
  onClose: () => void;
}

const DancingStickman: React.FC<DancingStickmanProps> = ({ isVisible, onClose }) => {
  const [discoBallPosition, setDiscoBallPosition] = useState(0);
  
  // Effekt für das Herunterlassen der Discokugel
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setDiscoBallPosition(150);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setDiscoBallPosition(0);
    }
  }, [isVisible]);
  
  // Effekt für das Schließen mit der Leertaste
  useEffect(() => {
    if (!isVisible) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, onClose]);
  
  // Varianten für die Strichmännchen-Animation
  const stickmanVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    },
    dance: {
      y: [0, -30, 0, -20, 0],
      rotate: [0, -15, 0, 15, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Varianten für die Arm-Animation
  const armVariants = {
    dance: {
      rotate: [0, 45, 0, -45, 0, 90, 0, -90, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Varianten für die Bein-Animation
  const legVariants = {
    dance: {
      rotate: [0, 30, 0, -30, 0, 45, 0, -45, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2
      }
    }
  };
  
  // Varianten für die Discokugel-Animation
  const discoBallVariants = {
    hidden: { y: -200, opacity: 0 },
    visible: { 
      y: discoBallPosition, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    rotate: {
      rotateY: [0, 360],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    },
    exit: {
      y: -200,
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Varianten für die Lichtstrahl-Animation
  const lightBeamVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 0.7, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    pulse: {
      opacity: [0.3, 0.7, 0.3],
      scale: [0.95, 1.05, 0.95],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Abgedunkelter Hintergrund mit Disco-Effekt */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            {/* Disco-Lichtstrahlen */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
              variants={lightBeamVariants}
              initial="hidden"
              animate={["visible", "pulse"]}
              exit="exit"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-red-500/20 rotate-[0deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-blue-500/20 rotate-[45deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-green-500/20 rotate-[90deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/20 rotate-[135deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-purple-500/20 rotate-[180deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-pink-500/20 rotate-[225deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/20 rotate-[270deg] blur-xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/20 rotate-[315deg] blur-xl"></div>
              </div>
            </motion.div>
            
            {/* Discokugel */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32"
              variants={discoBallVariants}
              initial="hidden"
              animate={["visible", "rotate"]}
              exit="exit"
            >
              <div className="relative w-full h-full">
                {/* Aufhängung */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-20 bg-gray-400"></div>
                
                {/* Kugel */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 overflow-hidden shadow-xl">
                  {/* Spiegeleffekte */}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute w-2 h-2 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.5 + 0.5
                      }}
                    ></div>
                  ))}
                </div>
                
                {/* Lichtstrahlen von der Discokugel */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-24 h-24 animate-pulse">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
                    <div className="absolute top-0 left-0 w-full h-full bg-red-500/10 rotate-[0deg] blur-sm"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10 rotate-[45deg] blur-sm"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-green-500/10 rotate-[90deg] blur-sm"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/10 rotate-[135deg] blur-sm"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Tanzender Strichmännchen */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-80 h-80"
            variants={stickmanVariants}
            initial="hidden"
            animate={["visible", "dance"]}
            exit="exit"
          >
            {/* Kopf */}
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white">
              {/* Gesicht */}
              <div className="absolute top-5 left-4 w-3 h-3 rounded-full bg-white"></div>
              <div className="absolute top-5 right-4 w-3 h-3 rounded-full bg-white"></div>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
            </motion.div>
            
            {/* Körper */}
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 w-4 h-30 bg-white"></motion.div>
            
            {/* Arme */}
            <motion.div 
              className="absolute top-25 left-1/2 -translate-x-1/2 w-40 h-4 bg-white origin-center"
              variants={armVariants}
              animate="dance"
            ></motion.div>
            
            {/* Beine */}
            <motion.div 
              className="absolute top-50 left-[calc(50%-20px)] w-4 h-30 bg-white origin-top"
              variants={legVariants}
              animate="dance"
            ></motion.div>
            <motion.div 
              className="absolute top-50 left-[calc(50%+16px)] w-4 h-30 bg-white origin-top"
              variants={legVariants}
              animate="dance"
              style={{ animationDelay: "0.5s" }}
            ></motion.div>
            
            {/* Sonnenbrille */}
            <motion.div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6">
              <div className="absolute top-0 left-0 w-10 h-5 rounded-full border-2 border-indigo-500 bg-indigo-500/50"></div>
              <div className="absolute top-0 right-0 w-10 h-5 rounded-full border-2 border-indigo-500 bg-indigo-500/50"></div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-indigo-500"></div>
            </motion.div>
            
            {/* Fliege */}
            <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 w-10 h-5">
              <div className="absolute top-0 left-0 w-4 h-4 bg-pink-500 rotate-45"></div>
              <div className="absolute top-0 right-0 w-4 h-4 bg-pink-500 rotate-45"></div>
              <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-700"></div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DancingStickman; 