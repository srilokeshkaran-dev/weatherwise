import React, { useState } from 'react';
import { PERSONA_METADATA } from '../types/surveySchema';

export function ProfileConfirmation({ profile, onConfirm, onEditSurvey }) {
  // Allow local adjustments to thresholds and persona weights if desired
  const [editedProfile, setEditedProfile] = useState(profile);

  const updateThreshold = (key, val) => {
    setEditedProfile({
      ...editedProfile,
      thresholds: {
        ...editedProfile.thresholds,
        [key]: Number(val)
      }
    });
  };

  const handleLaunch = () => {
    onConfirm(editedProfile);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-2">
      {/* Header Badge */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400">
          <span>✓</span>
          <span>AI PROFILE SYNTHESIZED SUCCESSFULLY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Review Your Weather Intelligence Profile
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Here is how KAIROS prioritized your weather parameters based on your lifestyle, routines, and thresholds.
        </p>
      </div>

      {/* AI Advisory / Summary Card */}
      {editedProfile.ai_summary && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-indigo-950/50 border border-cyan-500/30 space-y-2 shadow-xl shadow-cyan-950/20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
            <span>✨ AI Strategy Overview</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            "{editedProfile.ai_summary}"
          </p>
        </div>
      )}

      {/* Grid of Profile Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Weighted Personas Matrix */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>🧠 Persona Priority Weights</span>
            </h3>
            <span className="text-[11px] text-slate-500">Calculated by Person 2 Engine</span>
          </div>

          <div className="space-y-3.5">
            {editedProfile.personas && editedProfile.personas.map((p) => {
              const meta = PERSONA_METADATA[p.id] || { label: p.id, icon: '🌟', color: 'cyan' };
              return (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                      <span>{meta.icon}</span>
                      <span>{meta.label}</span>
                    </span>
                    <span className="font-mono font-bold text-cyan-400">
                      {p.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all"
                      style={{ width: `${p.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
            Spotlights and card placements on the homepage will follow this weighting.
          </p>
        </div>

        {/* Right Column: Active Threshold Triggers */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <span>🔔 Calibrated Alert Thresholds</span>
            </h3>
            <span className="text-[11px] text-slate-500">Live Triggers</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Heat Alert */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-rose-500/20 space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">
                🌡️ Heat Alert
              </span>
              <div className="text-lg font-bold text-slate-100 font-mono">
                &gt; {editedProfile.thresholds?.max_temp_alert}°C
              </div>
              <span className="text-[10px] text-slate-500 block">Thermal stress limit</span>
            </div>

            {/* AQI Alert */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-teal-500/20 space-y-1">
              <span className="text-[10px] uppercase font-bold text-teal-400 block">
                😷 AQI Alert
              </span>
              <div className="text-lg font-bold text-slate-100 font-mono">
                &gt; {editedProfile.thresholds?.aqi_alert}
              </div>
              <span className="text-[10px] text-slate-500 block">Air quality warning</span>
            </div>

            {/* Rain Alert */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-blue-500/20 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-400 block">
                🌧️ Rain Prob Alert
              </span>
              <div className="text-lg font-bold text-slate-100 font-mono">
                &gt; {editedProfile.thresholds?.rain_prob_alert}%
              </div>
              <span className="text-[10px] text-slate-500 block">Disruption warning</span>
            </div>

            {/* UV Alert */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-amber-500/20 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block">
                ☀️ UV Index Alert
              </span>
              <div className="text-lg font-bold text-slate-100 font-mono">
                &ge; {editedProfile.thresholds?.uv_alert}
              </div>
              <span className="text-[10px] text-slate-500 block">Skin protection required</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
            Alerts only trigger when real-time Open-Meteo readings violate these values.
          </p>
        </div>
      </div>

      {/* Routine & Location Details Strip */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold uppercase">📍 Location:</span>
          <span className="text-slate-200 font-semibold">{editedProfile.location?.city}, {editedProfile.location?.country}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold uppercase">⏰ Morning Routine:</span>
          <span className="text-slate-200 font-semibold">{editedProfile.persona_details?.commute_time || '07:30 AM'} ({editedProfile.persona_details?.commute_mode || 'two_wheeler'})</span>
        </div>
        {editedProfile.persona_details?.crop && (
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-bold uppercase">🌱 Crop:</span>
            <span className="text-lime-300 font-semibold">{editedProfile.persona_details.crop} ({editedProfile.persona_details.crop_stage})</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-bold uppercase">🌐 Language:</span>
          <span className="text-cyan-300 font-semibold">{editedProfile.language.toUpperCase()}</span>
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
        <button
          onClick={onEditSurvey}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>✏️ Edit Survey Answers</span>
        </button>

        <button
          onClick={handleLaunch}
          className="w-full sm:w-auto px-10 py-4 rounded-xl font-extrabold text-sm bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <span>Confirm & Launch KAIROS Homepage</span>
          <span className="text-base">🚀</span>
        </button>
      </div>
    </div>
  );
}
