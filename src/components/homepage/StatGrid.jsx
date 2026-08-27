import React, { useState } from "react";
import DEFAULT_HERO_FIELDS, {
  heroFieldsByPersona,
  personaExplainers,
  DEFAULT_EXPLAINER,
} from "./heroFieldsByPersona.js";

function formatNumeric(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return String(value);
}

function formatClock(value) {
  if (value === null || value === undefined) return "—";
  return value;
}

function formatFlag(value) {
  if (value === null || value === undefined) return "—";
  return String(value);
}

const ALL_FIELDS = [
  { key: "tempC", label: "Temperature", unit: "°C", formatter: formatNumeric },
  { key: "feelsLikeC", label: "Feels Like", unit: "°C", formatter: formatNumeric },
  { key: "humidityPct", label: "Humidity", unit: "%", formatter: formatNumeric },
  { key: "windKph", label: "Wind Speed", unit: "km/h", formatter: formatNumeric },
  { key: "windDirDeg", label: "Wind Dir", unit: "°", formatter: formatNumeric },
  { key: "uv", label: "UV Index", unit: "", formatter: formatNumeric },
  { key: "aqi", label: "AQI", unit: "", formatter: formatNumeric },
  { key: "pm25", label: "PM2.5", unit: "µg/m³", formatter: formatNumeric },
  { key: "rainProbPct", label: "Rain Prob", unit: "%", formatter: formatNumeric },
  { key: "precipMm", label: "Precipitation", unit: "mm", formatter: formatNumeric },
  { key: "visibilityKm", label: "Visibility", unit: "km", formatter: formatNumeric },
  { key: "soilMoisturePct", label: "Soil Moisture", unit: "%", formatter: formatNumeric, hideWhenNull: true },
  { key: "waveM", label: "Waves", unit: "m", formatter: formatNumeric, hideWhenNull: true },
  { key: "waterTempC", label: "Water Temp", unit: "°C", formatter: formatNumeric, hideWhenNull: true },
  { key: "sunrise", label: "Sunrise", unit: "", formatter: formatClock },
  { key: "sunset", label: "Sunset", unit: "", formatter: formatClock },
  { key: "frost", label: "Frost", unit: "", formatter: formatFlag, hideWhenNull: true },
  { key: "fog", label: "Fog", unit: "", formatter: formatFlag, hideWhenNull: true },
];

const FIELD_MAP = ALL_FIELDS.reduce((acc, f) => {
  acc[f.key] = f;
  return acc;
}, {});

function getProportion(label, numericVal) {
  if (numericVal === null || numericVal === undefined || Number.isNaN(numericVal)) return 0;
  const num = Number(numericVal);
  if (label.includes("Temp") || label.includes("Feels")) {
    return Math.min(Math.max(num / 50, 0), 1);
  }
  if (label.includes("AQI")) {
    return Math.min(Math.max(num / 300, 0), 1);
  }
  if (label.includes("UV")) {
    return Math.min(Math.max(num / 12, 0), 1);
  }
  if (label.includes("Humidity") || label.includes("Rain") || label.includes("Moisture")) {
    return Math.min(Math.max(num / 100, 0), 1);
  }
  if (label.includes("Wind")) {
    return Math.min(Math.max(num / 100, 0), 1);
  }
  if (label.includes("PM2.5")) {
    return Math.min(Math.max(num / 250, 0), 1);
  }
  if (label.includes("Visibility")) {
    return Math.min(Math.max(num / 20, 0), 1);
  }
  return 0.5;
}

export function StatChip({ label, value, rawValue, unit = "", variant = "standard" }) {
  const [tiltStyle, setTiltStyle] = useState({});
  const displayVal = typeof value === "boolean" ? formatFlag(value) : value;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 100ms ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 400ms ease-out",
    });
  };

  if (variant === "hero") {
    const proportion = getProportion(label, rawValue);
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - proportion);
    const ringColor = label.includes("AQI") || label.includes("Feels") ? "#3EA8B8" : "#F0A93F";

    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="flex flex-col justify-between rounded-xl border border-[#2A3441] bg-[#151B24] p-4 shadow-[0_8px_20px_rgb(0,0,0,0.3)] backdrop-blur-md"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-[#8B93A1]">{label}</span>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-2xl font-bold text-[#E8ECF1]">{displayVal}</span>
            {unit && displayVal !== "—" ? <span className="text-xs text-[#8B93A1]">{unit}</span> : null}
          </div>
          {/* Circular SVG Gauge Ring */}
          <div className="relative h-10 w-10 flex-shrink-0">
            <svg className="h-10 w-10 -rotate-90 transform" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-[#2A3441]"
                strokeWidth="3.5"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                stroke={ringColor}
                strokeWidth="3.5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="flex items-center justify-between rounded-lg border border-[#2A3441] bg-[#151B24]/80 px-3 py-2.5 text-xs shadow-sm"
    >
      <span className="font-medium text-[#8B93A1]">{label}</span>
      <span className="font-mono font-semibold text-[#E8ECF1]">
        {displayVal}
        {unit && displayVal !== "—" ? ` ${unit}` : ""}
      </span>
    </div>
  );
}

export default function StatGrid({ profile, reading }) {
  if (!reading) return null;

  const topPersonaId = profile?.personas?.[0]?.id;
  const heroKeys = (topPersonaId && heroFieldsByPersona[topPersonaId]) || DEFAULT_HERO_FIELDS;
  const explainerText = (topPersonaId && personaExplainers[topPersonaId]) || DEFAULT_EXPLAINER;

  const heroFields = heroKeys
    .map((key) => FIELD_MAP[key])
    .filter(Boolean);

  const standardFields = ALL_FIELDS.filter((f) => !heroKeys.includes(f.key));

  return (
    <div className="space-y-4">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {heroFields.map((f) => {
          const val = reading[f.key];
          if (f.hideWhenNull && (val === null || val === undefined)) {
            return null;
          }
          return (
            <StatChip
              key={f.key}
              label={f.label}
              value={f.formatter(val)}
              rawValue={val}
              unit={f.unit}
              variant="hero"
            />
          );
        })}
      </div>

      {/* Hero Explainer */}
      <p className="text-xs font-medium text-[#8B93A1]">
        {explainerText}
      </p>

      {/* Standard Stats */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {standardFields.map((f) => {
          const val = reading[f.key];
          if (f.hideWhenNull && (val === null || val === undefined)) {
            return null;
          }
          return (
            <StatChip
              key={f.key}
              label={f.label}
              value={f.formatter(val)}
              unit={f.unit}
            />
          );
        })}
      </div>
    </div>
  );
}
