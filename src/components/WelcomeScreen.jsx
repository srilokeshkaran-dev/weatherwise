import React from 'react';
import { DEMO_PRESETS } from '../presets/demoPresets';

export function WelcomeScreen({ onStartCustom, onSelectPreset }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 selection:bg-cyan-500 selection:text-white">
      {/* Background ambient glowing gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-600/20 via-indigo-600/15 to-emerald-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full mx-auto text-center space-y-8">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-cyan-300 tracking-wide shadow-lg shadow-cyan-950/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          🌦️ KAIROS WEATHER INTELLIGENCE
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Weather tailored to <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              who you are & what you do.
            </span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Traditional weather apps give everyone the same generic numbers. 
            <strong className="text-slate-200 font-semibold"> KAIROS </strong> 
            prioritizes what matters to <em>your</em> routine, crops, workouts, and health.
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartCustom}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Start 6-Step Onboarding</span>
            <svg className="w-5 h-5 text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        {/* Divider / Hackathon Quick Demo Presets */}
        <div className="pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              ⚡ Quick-Start Demo Presets (1-Click Evaluation)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {DEMO_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset.data)}
                className={`p-4 rounded-2xl border transition-all text-left bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-sm group cursor-pointer ${preset.color}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{preset.name.split(' ')[0]}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {preset.badge}
                  </span>
                </div>
                <div className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                  {preset.name.replace(/^[^\s]+\s/, '')}
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {preset.subtitle}
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Load Profile</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Feature pillars info footer */}
        <div className="grid grid-cols-3 gap-2 pt-6 text-center text-xs text-slate-500 border-t border-slate-900">
          <div>🧠 <strong>AI Persona Weights</strong></div>
          <div>🌦️ <strong>Open-Meteo Live API</strong></div>
          <div>🔔 <strong>Smart Actionable Alerts</strong></div>
        </div>
      </div>
    </div>
  );
}
