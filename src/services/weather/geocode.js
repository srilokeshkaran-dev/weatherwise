// KAIROS — services/weather/geocode.js
// Owner: Person 3. Used by Person 1's location-search survey step.
//
// async geocodeCity(query): Promise<GeocodeResult[]>
//   Never throws — resolves to [] on any failure (P1's autocomplete just
//   shows "no results" rather than crashing the survey).

const GEOCODE_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FETCH_TIMEOUT_MS = 6000;

/**
 * @typedef {Object} GeocodeResult
 * @property {string} name
 * @property {number} latitude
 * @property {number} longitude
 * @property {string|null} country
 * @property {string|null} admin1     state/region, if available
 * @property {string} timezone
 */

export async function geocodeCity(query) {
  if (!query || typeof query !== "string" || query.trim().length < 2) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const url = `${GEOCODE_BASE_URL}?name=${encodeURIComponent(query.trim())}&count=5&language=en&format=json`;
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data.results)) return [];

    return data.results.map((r) => ({
      name: r.name ?? "Unknown",
      latitude: typeof r.latitude === "number" ? r.latitude : null,
      longitude: typeof r.longitude === "number" ? r.longitude : null,
      country: r.country ?? null,
      admin1: r.admin1 ?? null,
      timezone: r.timezone ?? "UTC",
    }));
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
