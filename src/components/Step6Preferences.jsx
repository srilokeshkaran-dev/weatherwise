import React from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'ta', label: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'te', label: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'es', label: 'Español (Spanish)', flag: '🇪🇸' }
];

export function Step6Preferences({ answers, onChange, onSubmit }) {
  const { language = 'en', unitSystem = 'metric', freeformNotes = '' } = answers;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Language & AI Context Notes
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Final details to calibrate your advisory language, measurement units, and custom personal notes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Language Selection */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <label className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>🌐 Advisory & Interface Language</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onChange({ language: lang.code })}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/20'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {isSelected && <span className="text-cyan-400">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Unit System */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <label className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>📐 Measurement Units</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'metric', title: 'Metric System', desc: '°C, km/h, mm, meters' },
              { id: 'imperial', title: 'Imperial System', desc: '°F, mph, inches, feet' }
            ].map((unit) => {
              const isSelected = unitSystem === unit.id;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => onChange({ unitSystem: unit.id })}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-950/20'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold">{unit.title}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{unit.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Freeform Prompt / Custom Instructions */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center justify-between">
          <span>📝 Free-form Custom Notes for AI Personalizer (Optional)</span>
          <span className="text-[10px] text-slate-500 font-normal">Passed directly to Person 2 AI Engine</span>
        </label>
        <textarea
          rows={3}
          value={freeformNotes}
          onChange={(e) => onChange({ freeformNotes: e.target.value })}
          placeholder="e.g. 'I ride my scooter with my daughter every morning at 7:30 AM and need warning if rain chance is above 40%, or if sudden cold snaps occur.'"
          className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 rounded-xl text-xs focus:outline-none focus:border-cyan-400 resize-none"
        />
      </div>

      {/* Submit Action Button */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs text-slate-500">
          Ready to synthesize your tailored profile
        </div>

        <button
          onClick={onSubmit}
          className="px-8 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 shadow-xl shadow-cyan-500/25 flex items-center gap-2 cursor-pointer transition-all transform hover:-translate-y-0.5"
        >
          <span>Synthesize AI Weather Profile</span>
          <span className="text-base">✨</span>
        </button>
      </div>
    </div>
  );
}
