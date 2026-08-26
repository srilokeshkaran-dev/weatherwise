import React from 'react';

const ALLERGENS = [
  { id: 'pollen', label: '🌸 Pollen & Grass', desc: 'Spring/seasonal rhinitis' },
  { id: 'dust', label: '💨 Dust & Smog', desc: 'Urban PM2.5/PM10 spikes' },
  { id: 'humidity', label: '💧 High Humidity (>80%)', desc: 'Heavy breathing & dampness' },
  { id: 'cold', label: '❄️ Cold Air / Frost', desc: 'Bronchial spasms & cold shocks' }
];

export function Step3Sensitivities({ sensitivities = {}, onChange, onNext }) {
  const {
    heatSensitivity = 2,
    aqiSensitivity = 'sensitive',
    rainTolerance = 'medium',
    uvAlertThreshold = 6,
    allergens = []
  } = sensitivities;

  const updateField = (key, val) => {
    onChange({
      ...sensitivities,
      [key]: val
    });
  };

  const toggleAllergen = (id) => {
    if (allergens.includes(id)) {
      updateField('allergens', allergens.filter((a) => a !== id));
    } else {
      updateField('allergens', [...allergens, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Your Personalized Weather Thresholds
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Instead of hardcoded rules, KAIROS calibrates alerts according to what your body and schedule can tolerate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Heat Sensitivity Slider */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-rose-300 flex items-center gap-1.5">
              <span>🌡️ Heat Sensitivity</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
              {heatSensitivity === 3 ? 'High (Alert > 31°C)' : heatSensitivity === 2 ? 'Normal (Alert > 34°C)' : 'Tolerant (Alert > 38°C)'}
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={heatSensitivity}
            onChange={(e) => updateField('heatSensitivity', Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
            <span>Heat Tolerant (38°C)</span>
            <span>Balanced (34°C)</span>
            <span>Sensitive (31°C)</span>
          </div>
        </div>

        {/* AQI Sensitivity */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-teal-300 flex items-center gap-1.5">
              <span>😷 AQI Sensitivity Level</span>
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
              {aqiSensitivity === 'sensitive' ? 'Alert at AQI > 50' : aqiSensitivity === 'moderate' ? 'Alert at AQI > 100' : 'Alert at AQI > 150'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'sensitive', label: 'Sensitive', sub: 'Asthma/Kids (>50)' },
              { id: 'moderate', label: 'Moderate', sub: 'Standard (>100)' },
              { id: 'resilient', label: 'Resilient', sub: 'Smog only (>150)' }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateField('aqiSensitivity', opt.id)}
                className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                  aqiSensitivity === opt.id
                    ? 'bg-teal-500/20 border-teal-400 text-teal-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-bold">{opt.label}</div>
                <div className="text-[10px] text-slate-500">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Rain Tolerance */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-blue-300 flex items-center gap-1.5">
              <span>🌧️ Rain Disruption Tolerance</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'low', label: 'Low Tolerance', desc: 'Alert even on drizzle' },
              { id: 'medium', label: 'Medium', desc: 'Alert on moderate rain' },
              { id: 'high', label: 'High Tolerance', desc: 'Alert only on storms' }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => updateField('rainTolerance', r.id)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  rainTolerance === r.id
                    ? 'bg-blue-500/20 border-blue-400 text-blue-200 font-semibold'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs">{r.label}</div>
                <div className="text-[10px] text-slate-500">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* UV Alert Threshold */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-amber-300 flex items-center gap-1.5">
              <span>☀️ UV Index Alert Trigger</span>
            </span>
            <span className="text-xs font-mono font-bold text-amber-300">
              UV ≥ {uvAlertThreshold}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[3, 6, 8, 10].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => updateField('uvAlertThreshold', val)}
                className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  uvAlertThreshold === val
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {val}+ {val <= 3 ? '(Low)' : val <= 6 ? '(Mod)' : val <= 8 ? '(High)' : '(Extreme)'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Allergens & Special Sensitivity Triggers */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-300">
          Environmental Triggers & Allergies (Select all that apply)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {ALLERGENS.map((alg) => {
            const isSelected = allergens.includes(alg.id);
            return (
              <button
                key={alg.id}
                type="button"
                onClick={() => toggleAllergen(alg.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-500/20 border-purple-400 text-purple-200'
                    : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-semibold text-slate-200">{alg.label}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{alg.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="pt-4 flex items-center justify-end border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Continue to Persona Details</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
