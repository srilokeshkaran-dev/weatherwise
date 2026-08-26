import React from 'react';

const STEP_LABELS = [
  'Personas',
  'Routine',
  'Sensitivities',
  'Details',
  'Location',
  'Preferences'
];

export function SurveyProgressBar({ currentStep, totalSteps = 6, onBack, canGoBack = true }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 space-y-4">
      {/* Header bar with Back button and Step Counter */}
      <div className="flex items-center justify-between">
        {canGoBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer"
          >
            <span>←</span>
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            ({STEP_LABELS[currentStep - 1]})
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step dot indicators on larger screens */}
      <div className="hidden sm:flex justify-between items-center px-1">
        {STEP_LABELS.map((label, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 text-slate-950'
                    : isCurrent
                    ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/20'
                    : 'bg-slate-800 text-slate-500'
                }`}
              >
                {isCompleted ? '✓' : stepNum}
              </div>
              <span
                className={`text-[10px] tracking-wide font-medium ${
                  isCurrent ? 'text-cyan-300 font-bold' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
