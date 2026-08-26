import React, { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  'Parsing survey answers & lifestyle vectors...',
  'Computing multi-dimensional persona weights...',
  'Calibrating heat, AQI, and precipitation thresholds...',
  'Connecting to Open-Meteo atmospheric & air quality feeds...',
  'Synthesizing your personalized weather intelligence dashboard...'
];

export function LoadingScreen({ locationName = 'your location' }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center text-center p-8 space-y-8">
      {/* Animated Radar Pulse Visual */}
      <div className="relative flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-cyan-500/10 border border-cyan-500/30 animate-ping absolute" />
        <div className="w-20 h-20 rounded-full bg-teal-500/20 border border-teal-500/40 animate-pulse absolute" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 flex items-center justify-center text-2xl shadow-xl shadow-cyan-500/30 z-10">
          🌦️
        </div>
      </div>

      {/* Title & Status */}
      <div className="space-y-3 max-w-md">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Building Your Personalized Weather Engine
        </h3>
        <p className="text-xs uppercase tracking-widest font-bold text-cyan-400">
          📍 {locationName}
        </p>
        
        {/* Dynamic cycling message */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-xs sm:text-sm text-slate-300 font-mono transition-opacity duration-200">
            {LOADING_MESSAGES[msgIndex]}
          </p>
        </div>
      </div>

      {/* Indeterminate Progress Bar */}
      <div className="w-64 bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full animate-pulse w-full" />
      </div>

      <div className="text-[11px] text-slate-500 font-medium">
        ⚡ Person 2 AI Personalization Engine & Open-Meteo integration in progress
      </div>
    </div>
  );
}
