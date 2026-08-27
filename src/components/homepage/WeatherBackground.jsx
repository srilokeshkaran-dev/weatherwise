import React, { useMemo } from "react";

export default function WeatherBackground({ condition }) {
  const particleData = useMemo(() => {
    if (!condition || condition === "unknown") return [];

    let count = 0;
    let baseDuration = 0;

    if (condition === "drizzle") {
      count = 10;
      baseDuration = 2.5;
    } else if (condition === "rain") {
      count = 18;
      baseDuration = 1.5;
    } else if (condition === "heavy_rain" || condition === "thunderstorm") {
      count = 28;
      baseDuration = 0.8;
    } else if (condition === "snow") {
      count = 16;
      baseDuration = 8.0;
    } else {
      return [];
    }

    return Array.from({ length: count }, () => {
      const left = Math.random() * 100;
      const durationVariation = Math.random() * 0.8 - 0.4;
      const animationDuration = Math.max(0.2, baseDuration + durationVariation);
      const animationDelay = Math.random() * animationDuration;
      const top = -Math.random() * 20;

      return {
        left: `${left.toFixed(2)}%`,
        animationDelay: `${animationDelay.toFixed(2)}s`,
        animationDuration: `${animationDuration.toFixed(2)}s`,
        top: `${top.toFixed(2)}%`,
      };
    });
  }, [condition]);

  if (!condition || condition === "unknown") return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Clear Condition */}
      {condition === "clear" && (
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#F0A93F]/15 blur-3xl" />
      )}

      {/* Cloud Conditions */}
      {(condition === "partly_cloudy" || condition === "cloudy") && (
        <div className="animate-cloud-drift absolute inset-0">
          <div className="absolute top-10 -left-10 h-64 w-96 rounded-full bg-[#4A5A6E]/30 blur-3xl" />
          <div className="absolute top-40 right-0 h-72 w-[30rem] rounded-full bg-[#4A5A6E]/40 blur-3xl" />
          {condition === "cloudy" && (
            <div className="absolute top-24 left-1/3 h-80 w-80 rounded-full bg-[#4A5A6E]/25 blur-3xl" />
          )}
        </div>
      )}

      {/* Fog Condition */}
      {condition === "fog" && (
        <div className="animate-cloud-drift absolute inset-0">
          <div className="absolute inset-0 bg-[#8B93A1]/15 blur-2xl" />
        </div>
      )}

      {/* Rain / Drizzle / Heavy Rain / Thunderstorm Conditions */}
      {(condition === "drizzle" ||
        condition === "rain" ||
        condition === "heavy_rain" ||
        condition === "thunderstorm") && (
        <div className="absolute inset-0 opacity-30">
          {condition === "thunderstorm" && (
            <div className="animate-lightning absolute inset-0 bg-[#E8ECF1]/10" />
          )}
          {particleData.map((p, i) => (
            <div
              key={i}
              className={`absolute w-[1.5px] rounded-full bg-[#3EA8B8] ${
                condition === "drizzle"
                  ? "h-8 animate-rain-slow"
                  : condition === "rain"
                  ? "h-12 animate-rain-med"
                  : "h-16 animate-rain-fast"
              }`}
              style={{
                left: p.left,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
                top: p.top,
              }}
            />
          ))}
        </div>
      )}

      {/* Snow Condition */}
      {condition === "snow" && (
        <div className="absolute inset-0 opacity-40">
          {particleData.map((p, i) => (
            <div
              key={i}
              className="animate-snow-slow absolute h-2 w-2 rounded-full bg-[#E8ECF1]"
              style={{
                left: p.left,
                animationDelay: p.animationDelay,
                animationDuration: p.animationDuration,
                top: "-10px",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
