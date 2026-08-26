import React from 'react';
import { PERSONA_METADATA, PERSONA_TYPES } from '../types/surveySchema';

export function Step1Personas({ selectedPersonas, onChange, onNext }) {
  const togglePersona = (personaId) => {
    if (selectedPersonas.includes(personaId)) {
      // Don't allow deselecting if it's the only selected persona
      if (selectedPersonas.length === 1) return;
      onChange(selectedPersonas.filter((id) => id !== personaId));
    } else {
      onChange([...selectedPersonas, personaId]);
    }
  };

  const hasSelection = selectedPersonas.length > 0;

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          What describes your lifestyle & needs?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          Select one or more personas. KAIROS uses these to build your multi-dimensional weather priority matrix.
        </p>
      </div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {Object.values(PERSONA_METADATA).map((meta) => {
          const isSelected = selectedPersonas.includes(meta.id);
          const selectionIndex = selectedPersonas.indexOf(meta.id);

          return (
            <div
              key={meta.id}
              onClick={() => togglePersona(meta.id)}
              className={`relative p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400/70 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
              }`}
            >
              {/* Persona Icon */}
              <div className="text-3xl p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0">
                {meta.icon}
              </div>

              {/* Persona Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-sm sm:text-base text-slate-100">
                    {meta.label}
                  </h3>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                      {selectionIndex === 0 ? 'Primary' : `Priority #${selectionIndex + 1}`}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {meta.tagline}
                </p>
              </div>

              {/* Checkbox indicator */}
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-700'
                }`}
              >
                {isSelected ? '✓' : ''}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Counter & Next CTA */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs text-slate-400">
          Selected: <strong className="text-cyan-400">{selectedPersonas.length}</strong> persona{selectedPersonas.length !== 1 ? 's' : ''}
        </div>

        <button
          disabled={!hasSelection}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            hasSelection
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Continue to Routine</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
