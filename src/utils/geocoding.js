/**
 * Geocoding Utility for KAIROS
 * Connects to Open-Meteo Geocoding API (free, no API key needed).
 */

export const POPULAR_CITIES = [
  { city: 'Chennai', region: 'Tamil Nadu', country: 'India', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' },
  { city: 'Bengaluru', region: 'Karnataka', country: 'India', latitude: 12.9716, longitude: 77.5946, timezone: 'Asia/Kolkata' },
  { city: 'New Delhi', region: 'Delhi', country: 'India', latitude: 28.6139, longitude: 77.2090, timezone: 'Asia/Kolkata' },
  { city: 'Mumbai', region: 'Maharashtra', country: 'India', latitude: 19.0760, longitude: 72.8777, timezone: 'Asia/Kolkata' },
  { city: 'Hyderabad', region: 'Telangana', country: 'India', latitude: 17.3850, longitude: 78.4867, timezone: 'Asia/Kolkata' },
  { city: 'Kolkata', region: 'West Bengal', country: 'India', latitude: 22.5726, longitude: 88.3639, timezone: 'Asia/Kolkata' },
  { city: 'Ludhiana', region: 'Punjab', country: 'India', latitude: 30.9010, longitude: 75.8573, timezone: 'Asia/Kolkata' },
  { city: 'London', region: 'Greater London', country: 'United Kingdom', latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  { city: 'San Francisco', region: 'California', country: 'United States', latitude: 37.7749, longitude: -122.4194, timezone: 'America/Los_Angeles' }
];

export async function searchCities(query) {
  if (!query || query.trim().length < 2) return [];

  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Geocoding search failed');
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      // Fallback to filtering popular cities locally
      return POPULAR_CITIES.filter((c) =>
        c.city.toLowerCase().includes(query.toLowerCase())
      );
    }

    return data.results.map((r) => ({
      city: r.name,
      region: r.admin1 || r.country || '',
      country: r.country || '',
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone || 'UTC'
    }));
  } catch (err) {
    console.warn('Live geocoding error, falling back to local list:', err);
    return POPULAR_CITIES.filter((c) =>
      c.city.toLowerCase().includes(query.toLowerCase())
    );
  }
}

export async function detectCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Open-Meteo reverse search via nominatim or elevation/timezone fallback
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          resolve({
            city: 'My Location',
            region: 'Detected GPS',
            country: 'Current Area',
            latitude: parseFloat(latitude.toFixed(4)),
            longitude: parseFloat(longitude.toFixed(4)),
            timezone: tz
          });
        } catch {
          resolve({
            city: 'My Location',
            region: 'GPS Coords',
            country: '',
            latitude: parseFloat(latitude.toFixed(4)),
            longitude: parseFloat(longitude.toFixed(4)),
            timezone: 'Asia/Kolkata'
          });
        }
      },
      (error) => {
        reject(error);
      },
      { timeout: 8000 }
    );
  });
}
