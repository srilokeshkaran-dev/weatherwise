import { PERSONA_IDS } from "../../contracts/enums.js";

export const DEFAULT_HERO_FIELDS = ["tempC", "feelsLikeC", "aqi", "uv"];

export const heroFieldsByPersona = {
  fitness: ["tempC", "feelsLikeC", "windKph", "uv"],
  health: ["aqi", "pm25", "uv", "humidityPct"],
  farmer: ["soilMoisturePct", "rainProbPct", "tempC", "uv"],
  parent: ["rainProbPct", "aqi", "uv", "tempC"],
  commuter: ["visibilityKm", "rainProbPct", "tempC", "aqi"],
  outdoor: ["uv", "aqi", "tempC", "windKph"],
  elderly: ["tempC", "aqi", "humidityPct", "uv"],
};

export const personaExplainers = {
  fitness: "Prioritized for outdoor workouts: temperature, feels like, wind speed, and UV index.",
  health: "Prioritized for health sensitivity: air quality, PM2.5, UV index, and humidity.",
  farmer: "Prioritized for farming: soil moisture, rain, temperature, and UV index.",
  parent: "Prioritized for family & school run: rain, air quality, UV index, and temperature.",
  commuter: "Prioritized for daily commute: visibility, rain, temperature, and air quality.",
  outdoor: "Prioritized for outdoor activities: UV index, air quality, temperature, and wind speed.",
  elderly: "Prioritized for comfort & well-being: temperature, air quality, humidity, and UV index.",
};

export const DEFAULT_EXPLAINER = "Your top weather priorities";

export default DEFAULT_HERO_FIELDS;
