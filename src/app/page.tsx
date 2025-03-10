"use client";

import { useState, useEffect, useRef } from 'react';
import HangmanGame from '@/components/game/HangmanGame';
import DancingStickman from '@/components/easter-egg/DancingStickman';

// Erweiterte DeviceMotionEvent-Schnittstelle für iOS
interface DeviceMotionEventWithPermission extends DeviceMotionEvent {
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
}

// Erweiterte DeviceMotionEvent-Konstruktor-Schnittstelle
interface DeviceMotionEventConstructorWithPermission {
  new(type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent;
  prototype: DeviceMotionEvent;
  requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
}

export default function Home() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [spaceCounter, setSpaceCounter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Referenzen für die Schüttelerkennung
  const lastX = useRef(0);
  const lastY = useRef(0);
  const lastZ = useRef(0);
  const lastTime = useRef(0);
  const shakeCount = useRef(0);
  const shakeTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Erkennung, ob es sich um ein mobiles Gerät handelt
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    
    setIsMobile(checkMobile());
  }, []);
  
  // Effekt für die Schüttelerkennung auf mobilen Geräten
  useEffect(() => {
    // Nur auf mobilen Geräten und wenn das Easter Egg noch nicht aktiviert ist
    if (!isMobile || showEasterEgg) return;
    
    const SHAKE_THRESHOLD = 15;
    const SHAKE_TIMEOUT = 1000; // 1 Sekunde zwischen Schüttelereignissen
    const SHAKE_COUNT_TO_ACTIVATE = 3; // 3 Schüttelbewegungen zum Aktivieren
    
    const handleDeviceMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration || acceleration.x === null || acceleration.y === null || acceleration.z === null) return;
      
      const currentTime = new Date().getTime();
      
      if ((currentTime - lastTime.current) > 100) { // Prüfe alle 100ms
        const diffTime = currentTime - lastTime.current;
        lastTime.current = currentTime;
        
        const x = acceleration.x;
        const y = acceleration.y;
        const z = acceleration.z;
        
        const speed = Math.abs(x + y + z - lastX.current - lastY.current - lastZ.current) / diffTime * 10000;
        
        if (speed > SHAKE_THRESHOLD) {
          // Schüttelbewegung erkannt
          shakeCount.current += 1;
          
          // Setze den Timeout zurück
          if (shakeTimeout.current) {
            clearTimeout(shakeTimeout.current);
          }
          
          // Setze einen neuen Timeout, um den Zähler zurückzusetzen, wenn keine weiteren Schüttelbewegungen erkannt werden
          shakeTimeout.current = setTimeout(() => {
            shakeCount.current = 0;
          }, SHAKE_TIMEOUT);
          
          // Aktiviere das Easter Egg nach der festgelegten Anzahl von Schüttelbewegungen
          if (shakeCount.current >= SHAKE_COUNT_TO_ACTIVATE) {
            setShowEasterEgg(true);
            shakeCount.current = 0;
            
            // Vibriere kurz, um Feedback zu geben (falls verfügbar)
            if (navigator.vibrate) {
              navigator.vibrate(200);
            }
          }
        }
        
        lastX.current = x;
        lastY.current = y;
        lastZ.current = z;
      }
    };
    
    // Frage den Benutzer nach Erlaubnis für die Bewegungssensoren (nur auf iOS)
    const requestDeviceMotionPermission = async () => {
      if (typeof DeviceMotionEvent !== 'undefined' && 
          typeof (DeviceMotionEvent as DeviceMotionEventConstructorWithPermission).requestPermission === 'function') {
        try {
          const permissionState = await (DeviceMotionEvent as DeviceMotionEventConstructorWithPermission).requestPermission?.();
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        } catch (error) {
          console.error('Fehler beim Anfordern der Berechtigung:', error);
        }
      } else {
        // Für Geräte, die keine Berechtigungsanfrage benötigen
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    };
    
    // Initialisiere die Schüttelerkennung
    requestDeviceMotionPermission();
    
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
      if (shakeTimeout.current) {
        clearTimeout(shakeTimeout.current);
      }
    };
  }, [isMobile, showEasterEgg]);
  
  // Effekt für das Zählen der Leertasten-Drücke
  useEffect(() => {
    // Nur zählen, wenn das Easter Egg noch nicht aktiviert ist
    if (showEasterEgg) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        // Zähle die Leertasten-Drücke und aktiviere das Easter Egg nach 5 Drücken
        const newCount = spaceCounter + 1;
        setSpaceCounter(newCount);
        
        // Aktiviere das Easter Egg nach 5 Leertasten-Drücken
        if (newCount >= 5) {
          setShowEasterEgg(true);
          setSpaceCounter(0); // Setze den Zähler zurück
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showEasterEgg, spaceCounter]);
  
  // Funktion zum Schließen des Easter Eggs
  const handleCloseEasterEgg = () => {
    setShowEasterEgg(false);
  };
  
  return (
    <main className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-b from-slate-900 to-slate-950 text-slate-200 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
        <div className="absolute -top-40 -left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -top-40 -right-20 w-72 h-72 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        <HangmanGame />
        
        <footer className="mt-12 text-center text-slate-500 text-sm">
          <p>Entwickelt für die HWZ - Hochschule für Wirtschaft Zürich | Executive MBA Programm</p>
        </footer>
      </div>
      
      {/* Easter Egg */}
      <DancingStickman isVisible={showEasterEgg} onClose={handleCloseEasterEgg} />
      
      {/* Hinweis für mobile Geräte */}
      {isMobile && !showEasterEgg && (
        <div className="fixed bottom-4 left-0 right-0 text-center text-xs text-slate-400 opacity-70 px-4">
          Schüttle dein Gerät für eine Überraschung!
        </div>
      )}
    </main>
  );
}
