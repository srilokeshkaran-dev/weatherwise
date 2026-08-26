import React from 'react';

const CROP_OPTIONS = ['Wheat', 'Rice (Paddy)', 'Cotton', 'Sugarcane', 'Mustard', 'Vegetables', 'Pulses / Lentils', 'Fruit Orchard', 'Tea / Coffee'];
const CROP_STAGES = ['Sowing / Germination', 'Vegetative Growth', 'Flowering / Pollination', 'Grain Filling', 'Harvest Ready'];
const IRRIGATION_TYPES = ['Canal / Flood', 'Tube-well / Borewell', 'Drip / Micro-irrigation', 'Rainfed'];

export function Step4MicroQuestions({ selectedPersonas = [], details = {}, onChange, onNext }) {
  const isFarmer = selectedPersonas.includes('agriculture');
  const isFitness = selectedPersonas.includes('fitness');
  const isParent = selectedPersonas.includes('parent');
  const isBeach = selectedPersonas.includes('beach_marine');
  const isHealth = selectedPersonas.includes('health');

  const updateDetail = (key, val) => {
    onChange({
      ...details,
      [key]: val
    });
  };

  const hasAnyMicroQuestions = isFarmer || isFitness || isParent || isBeach;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Persona-Specific Calibration
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Tailor the exact variables KAIROS computes for your selected focus areas.
        </p>
      </div>

      <div className="space-y-4">
        {/* 🌱 Agriculture Micro-Form */}
        {isFarmer && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-lime-950/40 via-slate-900 to-slate-900 border border-lime-500/30 space-y-4">
            <div className="flex items-center gap-2 text-lime-400 font-bold text-sm uppercase tracking-wider">
              <span>🌱 Agricultural Parameters (Agromet Advisory)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Crop Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Crop</label>
                <select
                  value={details.cropType || 'Wheat'}
                  onChange={(e) => updateDetail('cropType', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-lime-400"
                >
                  {CROP_OPTIONS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Crop Stage */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Growth Stage</label>
                <select
                  value={details.cropStage || 'Sowing / Germination'}
                  onChange={(e) => updateDetail('cropStage', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-lime-400"
                >
                  {CROP_STAGES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Irrigation */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Irrigation Setup</label>
                <select
                  value={details.irrigationType || 'Canal / Flood'}
                  onChange={(e) => updateDetail('irrigationType', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-lime-400"
                >
                  {IRRIGATION_TYPES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-[11px] text-lime-400/80">
              KAIROS will track soil moisture fraction (0-0.5) and predict rain probability before irrigation or pesticide spraying.
            </p>
          </div>
        )}

        {/* 🏃 Fitness Micro-Form */}
        {isFitness && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <span>🏃 Outdoor Fitness & Workout Routine</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Primary Sport</label>
                <select
                  value={details.fitnessType || 'Road Running (10K)'}
                  onChange={(e) => updateDetail('fitnessType', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-emerald-400"
                >
                  <option value="Road Running">Road Running</option>
                  <option value="Trail Running">Trail Running</option>
                  <option value="Road Cycling">Road Cycling</option>
                  <option value="Outdoor HIIT">Outdoor HIIT</option>
                  <option value="Brisk Walking">Brisk Walking</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Target Running Window</label>
                <select
                  value={details.targetWorkoutWindow || '05:30 - 07:00'}
                  onChange={(e) => updateDetail('targetWorkoutWindow', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-emerald-400"
                >
                  <option value="05:30 - 07:00">Early Morning (05:30 – 07:00)</option>
                  <option value="06:30 - 08:00">Morning (06:30 – 08:00)</option>
                  <option value="17:30 - 19:00">Evening Dusk (17:30 – 19:00)</option>
                  <option value="19:30 - 21:00">Night (19:30 – 21:00)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Heat Cutoff Limit (°C)</label>
                <input
                  type="number"
                  min="24"
                  max="42"
                  value={details.maxHeatToleranceC || 33}
                  onChange={(e) => updateDetail('maxHeatToleranceC', Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-emerald-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* 👨‍👩‍👧 Parent Micro-Form */}
        {isParent && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
              <span>👨‍👩‍👧 Parent & Child Care Schedule</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">School Departure Time</label>
                <input
                  type="time"
                  value={details.childrenSchoolDeparture || '07:30'}
                  onChange={(e) => updateDetail('childrenSchoolDeparture', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Playground / Stroller Walk Time</label>
                <input
                  type="time"
                  value={details.strollerWalkPreferredTime || '17:00'}
                  onChange={(e) => updateDetail('strollerWalkPreferredTime', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* 🏄 Beach & Marine Micro-Form */}
        {isBeach && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
              <span>🏄 Beach & Coastal Water Conditions</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Water Sport</label>
                <select
                  value={details.waterSport || 'Surfing'}
                  onChange={(e) => updateDetail('waterSport', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-cyan-400"
                >
                  <option value="Surfing">Surfing</option>
                  <option value="Swimming">Open Water Swimming</option>
                  <option value="Sailing / Kayaking">Sailing / Kayaking</option>
                  <option value="Scuba / Snorkeling">Scuba / Snorkeling</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Max Swell / Wave Height Limit (Meters)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="5.0"
                  value={details.maxWaveHeightM || 1.8}
                  onChange={(e) => updateDetail('maxWaveHeightM', parseFloat(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-cyan-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Generic Fallback if user selected other personas */}
        {!hasAnyMicroQuestions && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
            <div className="text-2xl">✨</div>
            <h3 className="text-sm font-semibold text-slate-200">General Routine Mode</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your selected personas ({selectedPersonas.join(', ')}) will automatically receive high-precision AI dynamic spotlighting on the homepage.
            </p>
          </div>
        )}
      </div>

      {/* Navigation CTA */}
      <div className="pt-4 flex items-center justify-end border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Continue to Location</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
