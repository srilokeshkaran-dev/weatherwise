// KAIROS — services/weather/index.js
// Owner: Person 3. Only file you edit besides geocode.js below.
//
// async getReading(location): Promise<Reading>
//   location = { id, latitude, longitude }
//
// Contract rules followed here (see docs/FROZEN.md + src/contracts/reading.js):
//  - EVERY key from EMPTY_READING always present. Missing data = null, never 0/undefined.
//  - Units baked into key names, always metric. Never throws/rejects — resolves to
//    failedReading() on any failure.
//  - locationId echoes location.id back exactly.
//  - condition mapped onto the CONDITIONS enum, "unknown" if unmappable.
//  - forecast is always an array, [] if unavailable.

import { EMPTY_READING, failedReading } from "../../contracts/reading.js";
import { CONDITIONS } from "../../contracts/enums.js";

const WEATHER_BASE_URL =
  import.meta.env.VITE_WEATHER_BASE_URL || "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_BASE_URL =
  import.meta.env.VITE_AIR_QUALITY_BASE_URL ||
  "https://air-quality-api.open-meteo.com/v1/air-quality";
const MARINE_BASE_URL = "https://marine-api.open-meteo.com/v1/marine";

const FETCH_TIMEOUT_MS = 8000;

// ---------------------------------------------------------------------------
// WMO weather code -> CONDITIONS enum
// https://open-meteo.com/en/docs (WMO Weather interpretation codes)
// ---------------------------------------------------------------------------
function mapWeatherCode(code) {
  if (code === 0) return "clear";
  if (code === 1 || code === 2) return "partly_cloudy";
  if (code === 3) return "cloudy";
  if (code === 45 || code === 48) return "fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 66, 80, 81].includes(code)) return "rain";
  if ([65, 82].includes(code)) return "heavy_rain";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  return CONDITIONS.includes("unknown") ? "unknown" : "unknown";
}

// ---------------------------------------------------------------------------
// small fetch-with-timeout helper. Never throws past this — callers catch.
// ---------------------------------------------------------------------------
async function fetchJson(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

// "2026-08-27T05:58" (Open-Meteo local ISO, timezone=auto) -> "05:58"
function isoToHHMM(iso) {
  if (!iso || typeof iso !== "string") return null;
  const match = iso.match(/T(\d{2}:\d{2})/);
  return match ? match[1] : null;
}

function round(n, dp = 1) {
  if (n === null || n === undefined || Number.isNaN(n)) return null;
  const f = 10 ** dp;
  return Math.round(n * f) / f;
}

// ---------------------------------------------------------------------------
// Forecast + current + air quality + marine, each isolated so one failing
// endpoint never blanks the others.
// ---------------------------------------------------------------------------
async function fetchForecast(lat, lon) {
  const url =
    `${WEATHER_BASE_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,` +
    `wind_speed_10m,wind_direction_10m,weather_code,precipitation,` +
    `is_day,visibility` +
    `&hourly=temperature_2m,precipitation_probability,uv_index,soil_moisture_0_to_1cm` +
    `&daily=temperature_2m_max,temperature_2m_min,weather_code,` +
    `precipitation_probability_max,uv_index_max,sunrise,sunset` +
    `&visibility=true` +
    `&forecast_days=7&timezone=auto`;
  return fetchJson(url);
}

async function fetchAirQuality(lat, lon) {
  const url =
    `${AIR_QUALITY_BASE_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=us_aqi,pm2_5,uv_index,alder_pollen,birch_pollen,grass_pollen,` +
    `ragweed_pollen,olive_pollen,mugwort_pollen` +
    `&timezone=auto`;
  return fetchJson(url);
}

async function fetchMarine(lat, lon) {
  const url =
    `${MARINE_BASE_URL}?latitude=${lat}&longitude=${lon}` +
    `&current=wave_height,sea_surface_temperature&timezone=auto`;
  return fetchJson(url);
}

// Rough pollen -> LEVELS mapping (grains/m3 style scale varies by species;
// this is intentionally conservative — never invents a number, only a level).
function pollenToLevel(aq) {
  if (!aq || !aq.current) return null;
  const vals = [
    aq.current.alder_pollen,
    aq.current.birch_pollen,
    aq.current.grass_pollen,
    aq.current.ragweed_pollen,
    aq.current.olive_pollen,
    aq.current.mugwort_pollen,
  ].filter((v) => typeof v === "number" && !Number.isNaN(v));
  if (vals.length === 0) return null;
  const max = Math.max(...vals);
  if (max <= 0) return null;
  if (max < 20) return "low";
  if (max < 50) return "moderate";
  if (max < 100) return "high";
  return "very_high";
}

// ---------------------------------------------------------------------------
// getReading — the frozen entry point.
// ---------------------------------------------------------------------------
export async function getReading(location) {
  const { id, latitude, longitude } = location || {};

  if (id == null || typeof latitude !== "number" || typeof longitude !== "number") {
    return failedReading(id ?? null, "BAD_LOCATION", "Missing or invalid coordinates.");
  }

  const results = await Promise.allSettled([
    fetchForecast(latitude, longitude),
    fetchAirQuality(latitude, longitude),
    fetchMarine(latitude, longitude), // fine if this fails (inland) — stays null
  ]);

  const [forecastRes, aqRes, marineRes] = results;
  const forecast = forecastRes.status === "fulfilled" ? forecastRes.value : null;
  const aq = aqRes.status === "fulfilled" ? aqRes.value : null;
  const marine = marineRes.status === "fulfilled" ? marineRes.value : null;

  // If the primary forecast call failed, there's nothing to build a Reading from.
  if (!forecast) {
    const reason = forecastRes.reason;
    const timedOut = reason && reason.name === "AbortError";
    return failedReading(
      id,
      timedOut ? "TIMEOUT" : "NETWORK",
      timedOut ? "Weather request timed out." : "Could not reach weather service."
    );
  }

  try {
    const cur = forecast.current || {};
    const daily = forecast.daily || {};
    const hourly = forecast.hourly || {};

    // visibility comes in METERS — convert to km.
    const visibilityKm =
      typeof cur.visibility === "number" ? round(cur.visibility / 1000, 1) : null;

    // soil moisture comes as a 0–0.5 FRACTION — convert to a 0–100 percent.
    // pull the first hourly value (current hour) if present.
    let soilMoisturePct = null;
    if (Array.isArray(hourly.soil_moisture_0_to_1cm) && hourly.soil_moisture_0_to_1cm.length > 0) {
      const frac = hourly.soil_moisture_0_to_1cm[0];
      soilMoisturePct = typeof frac === "number" ? round(frac * 100, 1) : null;
    }

    // current UV isn't in the `current` block on the forecast endpoint by
    // default — prefer air-quality's current.uv_index, fall back to hourly[0].
    let uv = null;
    if (aq && aq.current && typeof aq.current.uv_index === "number") {
      uv = round(aq.current.uv_index, 1);
    } else if (Array.isArray(hourly.uv_index) && hourly.uv_index.length > 0) {
      uv = round(hourly.uv_index[0], 1);
    }

    const rainProbPct =
      Array.isArray(hourly.precipitation_probability) && hourly.precipitation_probability.length > 0
        ? hourly.precipitation_probability[0]
        : null;

    const sunrise = Array.isArray(daily.sunrise) ? isoToHHMM(daily.sunrise[0]) : null;
    const sunset = Array.isArray(daily.sunset) ? isoToHHMM(daily.sunset[0]) : null;

    const forecastDays = [];
    if (Array.isArray(daily.time)) {
      for (let i = 0; i < daily.time.length && i < 7; i++) {
        forecastDays.push({
          date: daily.time[i],
          tempMaxC: typeof daily.temperature_2m_max?.[i] === "number" ? round(daily.temperature_2m_max[i]) : null,
          tempMinC: typeof daily.temperature_2m_min?.[i] === "number" ? round(daily.temperature_2m_min[i]) : null,
          condition: mapWeatherCode(daily.weather_code?.[i]),
          rainProbPct: typeof daily.precipitation_probability_max?.[i] === "number" ? daily.precipitation_probability_max[i] : null,
          uvMax: typeof daily.uv_index_max?.[i] === "number" ? round(daily.uv_index_max[i], 1) : null,
        });
      }
    }

    // marine — null everywhere inland. Never guess.
    let waveM = null;
    let waterTempC = null;
    if (marine && marine.current) {
      waveM = typeof marine.current.wave_height === "number" ? round(marine.current.wave_height, 2) : null;
      waterTempC =
        typeof marine.current.sea_surface_temperature === "number"
          ? round(marine.current.sea_surface_temperature, 1)
          : null;
    }

    // frost / fog — derive from available signals, null if we can't tell.
    const frost = typeof cur.temperature_2m === "number" ? cur.temperature_2m <= 2 : null;
    const fog = typeof cur.weather_code === "number" ? [45, 48].includes(cur.weather_code) : null;

    const reading = {
      ...EMPTY_READING,
      fetchedAt: new Date().toISOString(),
      locationId: id,
      units: "metric",

      tempC: typeof cur.temperature_2m === "number" ? round(cur.temperature_2m) : null,
      feelsLikeC: typeof cur.apparent_temperature === "number" ? round(cur.apparent_temperature) : null,
      humidityPct: typeof cur.relative_humidity_2m === "number" ? cur.relative_humidity_2m : null,
      windKph: typeof cur.wind_speed_10m === "number" ? round(cur.wind_speed_10m, 1) : null,
      windDirDeg: typeof cur.wind_direction_10m === "number" ? cur.wind_direction_10m : null,
      condition: typeof cur.weather_code === "number" ? mapWeatherCode(cur.weather_code) : "unknown",

      uv,
      aqi: aq?.current?.us_aqi ?? null,
      pm25: aq?.current?.pm2_5 ?? null,
      pollen: pollenToLevel(aq),

      rainProbPct,
      precipMm: typeof cur.precipitation === "number" ? round(cur.precipitation, 1) : null,
      visibilityKm,

      soilMoisturePct,
      frost,
      fog,

      sunrise,
      sunset,

      waveM,
      waterTempC,

      forecast: forecastDays,
      stale: false,
      source: "open-meteo",
      error: null,
    };

    return reading;
  } catch (err) {
    return failedReading(id, "UNKNOWN", "Unexpected error while parsing weather data.");
  }
}
