import React from 'react';

const TIME_WINDOWS = [
  { id: 'early_morning', label: 'Early Morning', time: '5:00 AM – 8:00 AM', icon: '🌅' },
  { id: 'morning', label: 'Morning & Rush', time: '8:00 AM – 11:30 AM', icon: '☀️' },
  { id: 'afternoon', label: 'Mid-day / Afternoon', time: '12:00 PM – 4:00 PM', icon: '🔥' },
  { id: 'evening', label: 'Evening', time: '4:30 PM – 8:00 PM', icon: '🌆' },
  { id: 'night', label: 'Night', time: '8:00 PM – Midnight', icon: '🌙' }
];

const COMMON_ACTIVITIES = [
  '🏃 Running / Jogging',
  '🚴 Cycling',
  '🌾 Field & Farm Work',
  '🏫 School Drop-off',
  '💼 Office Commute',
  '🐕 Walking Dog / Stroll',
  '🏄 Water Sports / Beach',
  '🎪 Outdoor Event / Sports'
];

const COMMUTE_MODES = [
  { id: 'two_wheeler', label: 'Motorcycle / Scooter', icon: '🛵' },
  { id: 'car', label: 'Car / Cab', icon: '🚗' },
  { id: 'bicycle', label: 'Bicycle', icon: '🚲' },
  { id: 'walking', label: 'Walking / Foot', icon: '🚶' },
  { id: 'metro', label: 'Metro / Public Bus', icon: '🚌' }
];

export function Step2Routine({ answers, onChange, onNext }) {
  const { activityTimes = [], activities = [], commuteTime = '07:30', commuteMode = 'two_wheeler' } = answers;

  const toggleTimeWindow = (id) => {
    if (activityTimes.includes(id)) {
      onChange({ activityTimes: activityTimes.filter((t) => t !== id) });
    } else {
      onChange({ activityTimes: [...activityTimes, id] });
    }
  };

  const toggleActivity = (act) => {
    if (activities.includes(act)) {
      onChange({ activities: activities.filter((a) => a !== act) });
    } else {
      onChange({ activities: [...activities, act] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          When are you most active outdoors?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          KAIROS monitors hyper-local conditions during these specific windows instead of drowning you with 24-hour averages.
        </p>
      </div>

      {/* Time of Day Windows */}
      <div className="space-y-3">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Primary Outdoor Windows (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {TIME_WINDOWS.map((w) => {
            const isSelected = activityTimes.includes(w.id);
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => toggleTimeWindow(w.id)}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/30'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                }`}
              >
                <span className="text-2xl">{w.icon}</span>
                <span className="text-xs font-semibold">{w.label}</span>
                <span className="text-[10px] text-slate-500">{w.time}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Types Chips */}
      <div className="space-y-3 pt-2">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Your Typical Outdoor Activities
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_ACTIVITIES.map((act) => {
            const isSelected = activities.includes(act);
            return (
              <button
                key={act}
                type="button"
                onClick={() => toggleActivity(act)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span>{act}</span>
                {isSelected && <span className="text-xs text-emerald-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Commute departure and mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
              <span>⏰ Primary Morning Commute Time</span>
            </label>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              {commuteTime}
            </span>
          </div>
          <input
            type="time"
            value={commuteTime}
            onChange={(e) => onChange({ commuteTime: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 px-3 py-2 rounded-xl text-sm focus:outline-none focus:border-cyan-400"
          />
          <p className="text-[11px] text-slate-500">
            KAIROS alerts you for rain, fog, or extreme heat 45 mins before this time.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <label className="text-xs uppercase font-bold tracking-wider text-slate-300 flex items-center gap-1.5">
            <span>🛵 Commute Transport Mode</span>
          </label>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {COMMUTE_MODES.map((mode) => {
              const isSelected = commuteMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => onChange({ commuteMode: mode.id })}
                  className={`px-2.5 py-1.5 rounded-lg border text-left text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-semibold'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{mode.icon}</span>
                  <span className="truncate">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="pt-4 flex items-center justify-end border-t border-slate-800">
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Continue to Sensitivities</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
