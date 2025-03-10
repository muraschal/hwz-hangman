"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DancingStickmanProps {
  isVisible: boolean;
  onClose: () => void;
}

const DancingStickman: React.FC<DancingStickmanProps> = ({ isVisible, onClose }) => {
  const [discoBallPosition, setDiscoBallPosition] = useState(0);
  const [partyMode, setPartyMode] = useState(false);
  
  // Effekt für das Herunterlassen der Discokugel
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setDiscoBallPosition(150);
      }, 500);
      
      // Party-Modus nach 2 Sekunden aktivieren
      const partyTimer = setTimeout(() => {
        setPartyMode(true);
      }, 2000);
      
      return () => {
        clearTimeout(timer);
        clearTimeout(partyTimer);
      };
    } else {
      setDiscoBallPosition(0);
      setPartyMode(false);
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
  
  // Varianten für die Kampf-Animation
  const fightVariants = {
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
    fight: {
      x: [0, 20, -20, 10, -10, 0],
      y: [0, -10, 0, -5, 0],
      rotate: [0, 5, -5, 3, -3, 0],
      transition: {
        duration: 1.5,
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
  
  // Varianten für die Breakdance-Animation
  const breakdanceVariants = {
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
    breakdance: {
      rotateY: [0, 180, 360],
      y: [0, -20, 0],
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
  
  // Varianten für die Roboter-Animation
  const robotVariants = {
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
    robot: {
      x: [0, 10, 10, 0, -10, -10, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "steps(5)"
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
    },
    fight: {
      rotate: [0, 90, 45, 90, 0, -90, -45, -90, 0],
      x: [0, 10, 0, -10, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    breakdance: {
      rotate: [0, 180, 90, 180, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    robot: {
      rotate: [0, 90, 90, 0, -90, -90, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "steps(5)"
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
    },
    fight: {
      rotate: [0, 60, 30, 60, 0, -60, -30, -60, 0],
      y: [0, -5, 0, -5, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    breakdance: {
      rotate: [0, 90, 180, 90, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    robot: {
      rotate: [0, 45, 45, 0, -45, -45, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "steps(5)"
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
  
  // Varianten für die Feuerwerk-Animation
  const fireworkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: [0, 1.5, 0],
      transition: { 
        duration: 1,
        repeat: Infinity,
        repeatDelay: 2,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 }
    }
  };
  
  // Funktion zum Erstellen eines Strichmännchens
  const renderStickman = (
    position: { x: number, y: number }, 
    scale: number = 1, 
    color: string = "white", 
    animationType: "dance" | "fight" | "breakdance" | "robot" = "dance",
    accessories: { hasSunglasses?: boolean, hasBowtie?: boolean, hasHat?: boolean, hasWeapon?: boolean } = {}
  ) => {
    const variants = 
      animationType === "fight" ? fightVariants :
      animationType === "breakdance" ? breakdanceVariants :
      animationType === "robot" ? robotVariants :
      stickmanVariants;
    
    return (
      <motion.div
        className="absolute z-50"
        style={{ 
          top: `calc(50% + ${position.y}px)`, 
          left: `calc(50% + ${position.x}px)`, 
          transform: `translate(-50%, -50%) scale(${scale})` 
        }}
        variants={variants}
        initial="hidden"
        animate={["visible", animationType]}
        exit="exit"
      >
        {/* Kopf */}
        <motion.div className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 border-${color}`}>
          {/* Gesicht */}
          <div className={`absolute top-5 left-4 w-3 h-3 rounded-full bg-${color}`}></div>
          <div className={`absolute top-5 right-4 w-3 h-3 rounded-full bg-${color}`}></div>
          <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-1 bg-${color} rounded-full`}></div>
        </motion.div>
        
        {/* Körper */}
        <motion.div className={`absolute top-20 left-1/2 -translate-x-1/2 w-4 h-30 bg-${color}`}></motion.div>
        
        {/* Arme */}
        <motion.div 
          className={`absolute top-25 left-1/2 -translate-x-1/2 w-40 h-4 bg-${color} origin-center`}
          animate={animationType}
        >
          {animationType === "dance" && <motion.div variants={armVariants} animate="dance" className="w-full h-full" />}
          {animationType === "fight" && <motion.div variants={armVariants} animate="fight" className="w-full h-full" />}
          {animationType === "breakdance" && <motion.div variants={armVariants} animate="breakdance" className="w-full h-full" />}
          {animationType === "robot" && <motion.div variants={armVariants} animate="robot" className="w-full h-full" />}
        </motion.div>
        
        {/* Beine */}
        <motion.div 
          className={`absolute top-50 left-[calc(50%-20px)] w-4 h-30 bg-${color} origin-top`}
          animate={animationType}
        >
          {animationType === "dance" && <motion.div variants={legVariants} animate="dance" className="w-full h-full" />}
          {animationType === "fight" && <motion.div variants={legVariants} animate="fight" className="w-full h-full" />}
          {animationType === "breakdance" && <motion.div variants={legVariants} animate="breakdance" className="w-full h-full" />}
          {animationType === "robot" && <motion.div variants={legVariants} animate="robot" className="w-full h-full" />}
        </motion.div>
        <motion.div 
          className={`absolute top-50 left-[calc(50%+16px)] w-4 h-30 bg-${color} origin-top`}
          animate={animationType}
          style={{ animationDelay: "0.5s" }}
        >
          {animationType === "dance" && <motion.div variants={legVariants} animate="dance" className="w-full h-full" />}
          {animationType === "fight" && <motion.div variants={legVariants} animate="fight" className="w-full h-full" />}
          {animationType === "breakdance" && <motion.div variants={legVariants} animate="breakdance" className="w-full h-full" />}
          {animationType === "robot" && <motion.div variants={legVariants} animate="robot" className="w-full h-full" />}
        </motion.div>
        
        {/* Accessoires */}
        {accessories.hasSunglasses && (
          <motion.div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6">
            <div className="absolute top-0 left-0 w-10 h-5 rounded-full border-2 border-indigo-500 bg-indigo-500/50"></div>
            <div className="absolute top-0 right-0 w-10 h-5 rounded-full border-2 border-indigo-500 bg-indigo-500/50"></div>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-indigo-500"></div>
          </motion.div>
        )}
        
        {accessories.hasBowtie && (
          <motion.div className="absolute top-20 left-1/2 -translate-x-1/2 w-10 h-5">
            <div className="absolute top-0 left-0 w-4 h-4 bg-pink-500 rotate-45"></div>
            <div className="absolute top-0 right-0 w-4 h-4 bg-pink-500 rotate-45"></div>
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-700"></div>
          </motion.div>
        )}
        
        {accessories.hasHat && (
          <motion.div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-24 h-10">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-2 rounded-full bg-red-500"></div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 rounded-t-full bg-red-500"></div>
          </motion.div>
        )}
        
        {accessories.hasWeapon && (
          <motion.div 
            className="absolute top-30 right-[-30px] w-30 h-4 bg-yellow-500 origin-left"
            animate={{
              rotate: [0, 30, 0, -30, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <div className="absolute right-0 top-[-3px] w-0 h-0 border-l-[10px] border-l-yellow-500 border-y-[5px] border-y-transparent"></div>
          </motion.div>
        )}
      </motion.div>
    );
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
            
            {/* Feuerwerk-Effekte */}
            {partyMode && (
              <>
                <motion.div
                  className="absolute top-[20%] left-[20%] w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 blur-md"
                  variants={fireworkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
                <motion.div
                  className="absolute top-[30%] left-[70%] w-16 h-16 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 blur-md"
                  variants={fireworkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ animationDelay: "0.5s" }}
                />
                <motion.div
                  className="absolute top-[70%] left-[30%] w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-blue-500 blur-md"
                  variants={fireworkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ animationDelay: "1s" }}
                />
                <motion.div
                  className="absolute top-[60%] left-[80%] w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 blur-md"
                  variants={fireworkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ animationDelay: "1.5s" }}
                />
              </>
            )}
            
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
          
          {/* Tanzende Strichmännchen */}
          {partyMode ? (
            <>
              {/* Hauptstrichmännchen in der Mitte */}
              {renderStickman(
                { x: 0, y: 0 }, 
                1.2, 
                "white", 
                "dance", 
                { hasSunglasses: true, hasBowtie: true }
              )}
              
              {/* Kampf-Strichmännchen links */}
              {renderStickman(
                { x: -200, y: 50 }, 
                0.9, 
                "yellow-400", 
                "fight", 
                { hasWeapon: true, hasHat: true }
              )}
              
              {/* Breakdance-Strichmännchen rechts */}
              {renderStickman(
                { x: 200, y: 50 }, 
                0.9, 
                "green-400", 
                "breakdance", 
                { hasSunglasses: true }
              )}
              
              {/* Roboter-Strichmännchen oben */}
              {renderStickman(
                { x: 0, y: -150 }, 
                0.8, 
                "blue-400", 
                "robot", 
                { hasSunglasses: true }
              )}
              
              {/* Kampf-Strichmännchen unten links */}
              {renderStickman(
                { x: -150, y: 150 }, 
                0.7, 
                "red-400", 
                "fight", 
                { hasWeapon: true }
              )}
              
              {/* Tanzender Strichmännchen unten rechts */}
              {renderStickman(
                { x: 150, y: 150 }, 
                0.7, 
                "purple-400", 
                "dance", 
                { hasHat: true }
              )}
            </>
          ) : (
            // Einzelnes Strichmännchen vor der Party
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
                animate="dance"
              >
                <motion.div variants={armVariants} animate="dance" className="w-full h-full" />
              </motion.div>
              
              {/* Beine */}
              <motion.div 
                className="absolute top-50 left-[calc(50%-20px)] w-4 h-30 bg-white origin-top"
                animate="dance"
              >
                <motion.div variants={legVariants} animate="dance" className="w-full h-full" />
              </motion.div>
              <motion.div 
                className="absolute top-50 left-[calc(50%+16px)] w-4 h-30 bg-white origin-top"
                animate="dance"
                style={{ animationDelay: "0.5s" }}
              >
                <motion.div variants={legVariants} animate="dance" className="w-full h-full" />
              </motion.div>
              
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
          )}
          
          {/* Party-Hinweis */}
          {!partyMode && (
            <motion.div
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 text-white text-xl font-bold text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
              exit={{ opacity: 0 }}
            >
              Die Party beginnt gleich...
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default DancingStickman; 