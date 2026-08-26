import React, { useState } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';

export default function App() {
  const [completedData, setCompletedData] = useState(null);

  const handleOnboardingComplete = (profile, surveyAnswers) => {
    console.log('🚀 [KAIROS Person 1] Onboarding completed!');
    console.log('Generated Profile for Person 4 / Person 2:', profile);
    console.log('Raw Survey Answers:', surveyAnswers);
    setCompletedData({ profile, surveyAnswers });
  };

  const handleReset = () => {
    setCompletedData(null);
  };

  // If user completed onboarding, show integration handoff preview
  if (completedData) {
    const { profile, surveyAnswers } = completedData;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-2">
                <span>✓</span>
                <span>PERSON 1 ONBOARDING COMPLETE</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">
                Ready for Person 4 (Homepage Integration)
              </h1>
              <p className="text-sm text-slate-400">
                This normalized <code className="text-cyan-400">Profile</code> and <code className="text-cyan-400">surveyAnswers</code> payload is passed directly to the KAIROS Dashboard.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer self-start"
            >
              🔄 Test Survey Again
            </button>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Primary Persona</div>
              <div className="text-xl font-extrabold text-cyan-400 mt-1 capitalize">
                {profile.primary_persona}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Weights: {JSON.stringify(profile.persona_weights)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Location</div>
              <div className="text-xl font-extrabold text-emerald-400 mt-1">
                {profile.location.city}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {profile.location.latitude}°, {profile.location.longitude}° ({profile.language.toUpperCase()})
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Alert Triggers</div>
              <div className="text-xs text-slate-300 font-mono space-y-0.5 mt-2">
                <div>Heat &gt; {profile.thresholds.max_temp_alert}°C</div>
                <div>AQI &gt; {profile.thresholds.aqi_alert}</div>
                <div>Rain &gt; {profile.thresholds.rain_prob_alert}%</div>
              </div>
            </div>
          </div>

          {/* JSON Payload Inspector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Generated JSON Schema (Sent to Person 4 Homepage & Person 3 Weather Fetch)
              </h3>
              <button
                onClick={() => navigator.clipboard.writeText(JSON.stringify(profile, null, 2))}
                className="text-xs text-cyan-400 hover:text-cyan-300 underline font-medium cursor-pointer"
              >
                Copy JSON
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-300/90 overflow-x-auto max-h-96">
              {JSON.stringify(profile, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }

  // Active Onboarding Experience
  return <OnboardingFlow onComplete={handleOnboardingComplete} />;
}
