'use client';

import React, { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [cursorStyle, setCursorStyle] = useState<'default' | 'glow' | 'bubble' | 'crosshair'>('default');
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleCursorStyleChange = (e: any) => {
      if (e.detail) {
        setCursorStyle(e.detail);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('cursorStyleChange', handleCursorStyleChange as EventListener);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('cursorStyleChange', handleCursorStyleChange as EventListener);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Update document body style based on selected cursor shape
  useEffect(() => {
    if (cursorStyle === 'crosshair') {
      document.body.style.cursor = 'crosshair';
    } else if (cursorStyle === 'glow' || cursorStyle === 'bubble') {
      document.body.style.cursor = 'none'; // Hide native browser pointer so custom follower is active!
    } else {
      document.body.style.cursor = 'default';
    }
  }, [cursorStyle]);

  if (cursorStyle === 'default' || !isVisible) return null;

  return (
    <>
      {/* 1. GLOW TRAIL CURSOR FOLLOWER */}
      {cursorStyle === 'glow' && (
        <div
          className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          {/* Glowing Center Point */}
          <div className="w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_20px_#38bdf8] border-2 border-white" />
          {/* Outer Indigo Ring */}
          <div className="w-10 h-10 -ml-3 -mt-7 rounded-full border-2 border-indigo-400/80 bg-indigo-500/30 animate-pulse shadow-lg" />
        </div>
      )}

      {/* 2. GLASS BUBBLE CURSOR FOLLOWER */}
      {cursorStyle === 'bubble' && (
        <div
          className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          <div className="w-9 h-9 rounded-full bg-sky-500/30 border-2 border-sky-300 backdrop-blur-md shadow-2xl flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          </div>
        </div>
      )}

      {/* 3. RETRO CROSSHAIR TARGETER */}
      {cursorStyle === 'crosshair' && (
        <div
          className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          <div className="w-7 h-7 border-2 border-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_10px_#34d399]">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
          </div>
        </div>
      )}
    </>
  );
}
