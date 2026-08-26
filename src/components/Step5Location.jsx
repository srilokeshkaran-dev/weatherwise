import React, { useState, useEffect } from 'react';
import { POPULAR_CITIES, searchCities, detectCurrentLocation } from '../utils/geocoding';

export function Step5Location({ location, onChange, onNext }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectError, setDetectError] = useState(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchCities(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectLocation = (loc) => {
    onChange(loc);
    setSearchQuery('');
    setSearchResults([]);
    setDetectError(null);
  };

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    setDetectError(null);
    try {
      const loc = await detectCurrentLocation();
      onChange(loc);
    } catch (err) {
      setDetectError(err.message || 'Could not auto-detect location. Please search manually.');
    } finally {
      setIsDetecting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Where should KAIROS track weather?
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
          We pull hyper-local micro-climate data, air quality index, and marine readings for your exact coordinates.
        </p>
      </div>

      {/* Currently Selected Location Card */}
      {location && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              📍
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Selected Location
              </div>
              <div className="font-bold text-slate-100 text-base">
                {location.city} {location.region ? `, ${location.region}` : ''}
              </div>
              <div className="text-xs text-slate-400">
                {location.country} • Lat: {location.latitude}° Lon: {location.longitude}° • {location.timezone}
              </div>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
            Active
          </span>
        </div>
      )}

      {/* Search Input & Auto-detect button */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search any city or town worldwide (e.g. Chennai, Ludhiana, London)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-cyan-400 pl-10"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-500">🔍</span>
            {isSearching && (
              <span className="absolute right-3.5 top-3.5 text-xs text-cyan-400 animate-pulse">
                Searching...
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
          >
            <span>🎯</span>
            <span>{isDetecting ? 'Detecting GPS...' : 'Auto-Detect GPS'}</span>
          </button>
        </div>

        {detectError && (
          <p className="text-xs text-rose-400 pt-1">{detectError}</p>
        )}

        {/* Live Search Autocomplete Dropdown */}
        {searchResults.length > 0 && (
          <div className="p-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-1">
            {searchResults.map((res, i) => (
              <button
                key={`${res.city}-${res.latitude}-${i}`}
                onClick={() => handleSelectLocation(res)}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 text-xs text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <strong className="text-white text-sm">{res.city}</strong>
                  <span className="text-slate-400 ml-1">
                    ({res.region}, {res.country})
                  </span>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">
                  {res.latitude}°, {res.longitude}°
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Quick Pick Popular Cities */}
      <div className="space-y-2.5">
        <label className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Or Quick-Select Major Cities
        </label>
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.map((c) => {
            const isSelected = location && location.city.toLowerCase() === c.city.toLowerCase();
            return (
              <button
                key={c.city}
                type="button"
                onClick={() => handleSelectLocation(c)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-md shadow-cyan-950/20'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                📍 {c.city}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="pt-4 flex items-center justify-end border-t border-slate-800">
        <button
          disabled={!location}
          onClick={onNext}
          className={`px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 transition-all cursor-pointer ${
            location
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <span>Continue to Final Preferences</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
