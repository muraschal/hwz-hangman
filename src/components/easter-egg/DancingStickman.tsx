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

  // SVG-Strichmännchen-Komponente
  const StickFigure = ({ 
    color = "#FFFFFF", 
    style = "dance" as "dance" | "fight" | "breakdance" | "robot", 
    position = { x: 0, y: 0 },
    scale = 1,
    delay = 0
  }: {
    color?: string;
    style?: "dance" | "fight" | "breakdance" | "robot";
    position?: { x: number; y: number };
    scale?: number;
    delay?: number;
  }) => {
    // Bewegungspfad für die Strichmännchen - deutlich erweitert für mehr Dynamik
    const movementPath = {
      dance: [
        { x: 0, y: 0 },
        { x: 80, y: -40 },
        { x: 160, y: 0 },
        { x: 200, y: 60 },
        { x: 160, y: 120 },
        { x: 80, y: 160 },
        { x: 0, y: 120 },
        { x: -80, y: 60 },
        { x: -160, y: 0 },
        { x: -80, y: -40 },
        { x: 0, y: 0 }
      ],
      fight: [
        { x: 0, y: 0 },
        { x: -100, y: 50 },
        { x: -180, y: 0 },
        { x: -220, y: -50 },
        { x: -180, y: -100 },
        { x: -100, y: -50 },
        { x: 0, y: 0 }
      ],
      breakdance: [
        { x: 0, y: 0 },
        { x: -60, y: -60 },
        { x: -120, y: -30 },
        { x: -60, y: 30 },
        { x: 0, y: 60 },
        { x: 60, y: 30 },
        { x: 120, y: -30 },
        { x: 60, y: -60 },
        { x: 0, y: 0 }
      ],
      robot: [
        { x: 0, y: 0 },
        { x: 80, y: 0 },
        { x: 80, y: 80 },
        { x: 0, y: 80 },
        { x: -80, y: 80 },
        { x: -80, y: 0 },
        { x: -80, y: -80 },
        { x: 0, y: -80 },
        { x: 80, y: -80 },
        { x: 80, y: 0 },
        { x: 0, y: 0 }
      ]
    };

    // Verschiedene Animationsstile
    const animations = {
      dance: {
        movement: {
          x: movementPath.dance.map(p => p.x),
          y: movementPath.dance.map(p => p.y),
          transition: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          }
        },
        body: {
          rotate: [-5, 5, -5, 5, -5],
          y: [-5, 0, 5, 0, -5],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          }
        },
        leftArm: {
          rotate: [0, 30, 60, 30, 0, -30, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        rightArm: {
          rotate: [0, -30, 0, 30, 60, 30, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        leftElbow: {
          rotate: [0, 30, 60, 30, 0, -15, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.3
          }
        },
        rightElbow: {
          rotate: [0, -15, 0, 30, 60, 30, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.3
          }
        },
        leftLeg: {
          rotate: [0, 20, 40, 20, 0, -20, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.1
          }
        },
        rightLeg: {
          rotate: [0, -20, 0, 20, 40, 20, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.1
          }
        },
        leftKnee: {
          rotate: [0, 15, 30, 45, 30, 15, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        rightKnee: {
          rotate: [0, 15, 0, 15, 30, 45, 30],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        }
      },
      fight: {
        movement: {
          x: movementPath.fight.map(p => p.x),
          y: movementPath.fight.map(p => p.y),
          transition: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          }
        },
        body: {
          rotate: [-10, 0, 10, 0, -10],
          x: [-10, 10, -10, 10, -10],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          }
        },
        leftArm: {
          rotate: [0, 60, 90, 120, 90, 60, 0],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.1
          }
        },
        rightArm: {
          rotate: [0, -60, -90, -120, -90, -60, 0],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        leftElbow: {
          rotate: [0, 30, 60, 90, 60, 30, 0],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.15
          }
        },
        rightElbow: {
          rotate: [0, -30, -60, -90, -60, -30, 0],
          transition: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.25
          }
        },
        leftLeg: {
          rotate: [0, 30, 45, 30, 0, -15, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.1
          }
        },
        rightLeg: {
          rotate: [0, -15, 0, 30, 45, 30, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        leftKnee: {
          rotate: [0, 20, 40, 60, 40, 20, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.15
          }
        },
        rightKnee: {
          rotate: [0, -20, 0, 20, 40, 60, 40],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.25
          }
        }
      },
      breakdance: {
        movement: {
          x: movementPath.breakdance.map(p => p.x),
          y: movementPath.breakdance.map(p => p.y),
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          }
        },
        body: {
          rotate: [0, 90, 180, 270, 360],
          y: [0, -10, -5, -10, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay
          }
        },
        leftArm: {
          rotate: [0, 90, 180, 270, 180, 90, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        rightArm: {
          rotate: [0, -90, -180, -270, -180, -90, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.2
          }
        },
        leftElbow: {
          rotate: [0, 45, 90, 135, 90, 45, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.3
          }
        },
        rightElbow: {
          rotate: [0, -45, -90, -135, -90, -45, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.3
          }
        },
        leftLeg: {
          rotate: [0, 90, 135, 90, 45, 0, 45],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.1
          }
        },
        rightLeg: {
          rotate: [0, -45, 0, 45, 90, 135, 90],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.1
          }
        },
        leftKnee: {
          rotate: [0, 45, 90, 135, 90, 45, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.15
          }
        },
        rightKnee: {
          rotate: [0, -45, -90, -135, -90, -45, 0],
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay + 0.15
          }
        }
      },
      robot: {
        movement: {
          x: movementPath.robot.map(p => p.x),
          y: movementPath.robot.map(p => p.y),
          transition: {
            duration: 8,
            repeat: Infinity,
            ease: "steps(10)",
            delay
          }
        },
        body: {
          y: [0, -5, -10, -5, 0],
          rotate: [-5, 0, 5, 0, -5],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay
          }
        },
        leftArm: {
          rotate: [0, 45, 90, 45, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.2
          }
        },
        rightArm: {
          rotate: [0, -45, -90, -45, 0],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.4
          }
        },
        leftElbow: {
          rotate: [0, 22.5, 45, 67.5, 90],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.3
          }
        },
        rightElbow: {
          rotate: [0, -22.5, -45, -67.5, -90],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.5
          }
        },
        leftLeg: {
          rotate: [0, 15, 30, 45, 30],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.1
          }
        },
        rightLeg: {
          rotate: [0, -15, -30, -45, -30],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.3
          }
        },
        leftKnee: {
          rotate: [0, 10, 20, 30, 20],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.15
          }
        },
        rightKnee: {
          rotate: [0, -10, -20, -30, -20],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "steps(5)",
            delay: delay + 0.35
          }
        }
      }
    };

    const currentAnimation = animations[style];

    return (
      <motion.div
        className="absolute"
        style={{ 
          top: `calc(50% + ${position.y}px)`, 
          left: `calc(50% + ${position.x}px)`,
          transform: `translate(-50%, -50%) scale(${scale})`,
          zIndex: 60
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: currentAnimation.movement.x,
          y: currentAnimation.movement.y,
          transition: { 
            duration: 0.5,
            delay: delay,
            type: "spring"
          }
        }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <svg width="120" height="200" viewBox="0 0 120 200">
          {/* Körper */}
          <motion.g
            animate={currentAnimation.body}
            style={{ originX: "60px", originY: "60px" }}
          >
            {/* Kopf */}
            <circle cx="60" cy="40" r="20" stroke={color} strokeWidth="4" fill="none" />
            
            {/* Gesicht - optional */}
            {style === "dance" && (
              <>
                <circle cx="52" cy="35" r="3" fill={color} /> {/* Linkes Auge */}
                <circle cx="68" cy="35" r="3" fill={color} /> {/* Rechtes Auge */}
                <path d="M50 45 Q60 55 70 45" stroke={color} strokeWidth="2" fill="none" /> {/* Lächeln */}
              </>
            )}
            
            {style === "fight" && (
              <>
                <circle cx="52" cy="35" r="3" fill={color} /> {/* Linkes Auge */}
                <circle cx="68" cy="35" r="3" fill={color} /> {/* Rechtes Auge */}
                <path d="M50 48 Q60 40 70 48" stroke={color} strokeWidth="2" fill="none" /> {/* Grimmig */}
              </>
            )}
            
            {style === "breakdance" && (
              <>
                <circle cx="52" cy="35" r="3" fill={color} /> {/* Linkes Auge */}
                <circle cx="68" cy="35" r="3" fill={color} /> {/* Rechtes Auge */}
                <path d="M52 45 L68 45" stroke={color} strokeWidth="2" /> {/* Neutraler Mund */}
              </>
            )}
            
            {style === "robot" && (
              <>
                <rect x="50" y="32" width="4" height="6" fill={color} /> {/* Linkes Auge */}
                <rect x="66" y="32" width="4" height="6" fill={color} /> {/* Rechtes Auge */}
                <path d="M50 45 L70 45" stroke={color} strokeWidth="2" /> {/* Gerader Mund */}
              </>
            )}
            
            {/* Körper */}
            <line x1="60" y1="60" x2="60" y2="120" stroke={color} strokeWidth="4" />
            
            {/* Verbindungskreise für die Gelenke */}
            <circle cx="60" cy="80" r="4" fill={color} /> {/* Schultergelenk */}
            <circle cx="60" cy="120" r="4" fill={color} /> {/* Hüftgelenk */}
            
            {/* Linker Arm - Oberarm */}
            <motion.g
              animate={currentAnimation.leftArm}
              style={{ originX: "60px", originY: "80px" }}
            >
              <line 
                x1="60" y1="80" x2="30" y2="90" 
                stroke={color} 
                strokeWidth="4"
              />
              <circle cx="30" cy="90" r="3" fill={color} /> {/* Ellbogengelenk */}
              
              {/* Linker Arm - Unterarm mit Ellbogen */}
              <motion.g
                animate={currentAnimation.leftElbow}
                style={{ originX: "30px", originY: "90px" }}
              >
                <line 
                  x1="30" y1="90" x2="15" y2="100" 
                  stroke={color} 
                  strokeWidth="4"
                />
                <circle cx="15" cy="100" r="3" fill={color} /> {/* Handgelenk */}
              </motion.g>
            </motion.g>
            
            {/* Rechter Arm - Oberarm */}
            <motion.g
              animate={currentAnimation.rightArm}
              style={{ originX: "60px", originY: "80px" }}
            >
              <line 
                x1="60" y1="80" x2="90" y2="90" 
                stroke={color} 
                strokeWidth="4"
              />
              <circle cx="90" cy="90" r="3" fill={color} /> {/* Ellbogengelenk */}
              
              {/* Rechter Arm - Unterarm mit Ellbogen */}
              <motion.g
                animate={currentAnimation.rightElbow}
                style={{ originX: "90px", originY: "90px" }}
              >
                <line 
                  x1="90" y1="90" x2="105" y2="100" 
                  stroke={color} 
                  strokeWidth="4"
                />
                <circle cx="105" cy="100" r="3" fill={color} /> {/* Handgelenk */}
              </motion.g>
            </motion.g>
            
            {/* Linkes Bein - Oberschenkel */}
            <motion.g
              animate={currentAnimation.leftLeg}
              style={{ originX: "60px", originY: "120px" }}
            >
              <line 
                x1="60" y1="120" x2="40" y2="150" 
                stroke={color} 
                strokeWidth="4"
              />
              <circle cx="40" cy="150" r="3" fill={color} /> {/* Kniegelenk */}
              
              {/* Linkes Bein - Unterschenkel mit Knie */}
              <motion.g
                animate={currentAnimation.leftKnee}
                style={{ originX: "40px", originY: "150px" }}
              >
                <line 
                  x1="40" y1="150" x2="30" y2="180" 
                  stroke={color} 
                  strokeWidth="4"
                />
                <circle cx="30" cy="180" r="3" fill={color} /> {/* Fußgelenk */}
              </motion.g>
            </motion.g>
            
            {/* Rechtes Bein - Oberschenkel */}
            <motion.g
              animate={currentAnimation.rightLeg}
              style={{ originX: "60px", originY: "120px" }}
            >
              <line 
                x1="60" y1="120" x2="80" y2="150" 
                stroke={color} 
                strokeWidth="4"
              />
              <circle cx="80" cy="150" r="3" fill={color} /> {/* Kniegelenk */}
              
              {/* Rechtes Bein - Unterschenkel mit Knie */}
              <motion.g
                animate={currentAnimation.rightKnee}
                style={{ originX: "80px", originY: "150px" }}
              >
                <line 
                  x1="80" y1="150" x2="90" y2="180" 
                  stroke={color} 
                  strokeWidth="4"
                />
                <circle cx="90" cy="180" r="3" fill={color} /> {/* Fußgelenk */}
              </motion.g>
            </motion.g>
            
            {/* Accessoires basierend auf Stil */}
            {style === "dance" && (
              <>
                {/* Sonnenbrille */}
                <rect x="45" y="30" width="30" height="8" rx="2" fill="#6366F1" />
                <line x1="60" y1="30" x2="60" y2="38" stroke="#6366F1" strokeWidth="1" />
              </>
            )}
            
            {style === "fight" && (
              <>
                {/* Stirnband */}
                <path d="M40 30 Q60 25 80 30" stroke="#EF4444" strokeWidth="3" fill="none" />
                <path d="M80 30 L85 25" stroke="#EF4444" strokeWidth="3" fill="none" />
              </>
            )}
            
            {style === "breakdance" && (
              <>
                {/* Kappe */}
                <path d="M40 25 Q60 15 80 25 L75 30 Q60 20 45 30 Z" fill="#10B981" />
              </>
            )}
            
            {style === "robot" && (
              <>
                {/* Antennen */}
                <line x1="55" y1="20" x2="50" y2="10" stroke={color} strokeWidth="2" />
                <circle cx="50" cy="8" r="2" fill={color} />
                <line x1="65" y1="20" x2="70" y2="10" stroke={color} strokeWidth="2" />
                <circle cx="70" cy="8" r="2" fill={color} />
              </>
            )}
          </motion.g>
        </svg>
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
              <StickFigure 
                color="#FFFFFF" 
                style="dance" 
                position={{ x: 0, y: 0 }} 
                scale={1.2}
                delay={0}
              />
              
              {/* Kampf-Strichmännchen links */}
              <StickFigure 
                color="#EF4444" 
                style="fight" 
                position={{ x: -150, y: 50 }} 
                scale={1}
                delay={0.2}
              />
              
              {/* Breakdance-Strichmännchen rechts */}
              <StickFigure 
                color="#10B981" 
                style="breakdance" 
                position={{ x: 150, y: 50 }} 
                scale={1}
                delay={0.4}
              />
              
              {/* Roboter-Strichmännchen oben */}
              <StickFigure 
                color="#3B82F6" 
                style="robot" 
                position={{ x: 0, y: -100 }} 
                scale={0.9}
                delay={0.6}
              />
              
              {/* Kampf-Strichmännchen unten links */}
              <StickFigure 
                color="#F59E0B" 
                style="fight" 
                position={{ x: -100, y: 100 }} 
                scale={0.8}
                delay={0.8}
              />
              
              {/* Tanzender Strichmännchen unten rechts */}
              <StickFigure 
                color="#8B5CF6" 
                style="dance" 
                position={{ x: 100, y: 100 }} 
                scale={0.8}
                delay={1}
              />
            </>
          ) : (
            // Einzelnes Strichmännchen vor der Party
            <StickFigure 
              color="#FFFFFF" 
              style="dance" 
              position={{ x: 0, y: 0 }} 
              scale={1.2}
            />
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