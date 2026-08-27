// ============================================================================
// P7 — PROFILE / LOCATIONS      STATUS: STUB (written by P4)
// ----------------------------------------------------------------------------
// P7: NEVER mutate the profile you are given. Always return a new object,
// or React will not re-render and it will look like your feature is broken.
// switchLocation does NOT fetch weather — P4 reacts to the profile change.
// ============================================================================
import { validateProfile } from "../../contracts/index.js";

export async function updateProfile(profile, changes) {
  const next = {
    ...profile,
    ...changes,
    thresholds: { ...profile.thresholds, ...(changes.thresholds || {}) },
    personaDetails: { ...profile.personaDetails, ...(changes.personaDetails || {}) },
  };
  if (import.meta.env.DEV) {
    const errs = validateProfile(next);
    if (errs.length) console.warn("[profile] contract violation:", errs);
  }
  return next;
}

export async function switchLocation(profile, locationId) {
  const target = profile.locations.find((l) => l.id === locationId);
  if (!target) return profile;
  const rest = profile.locations.filter((l) => l.id !== locationId);
  return { ...profile, locations: [target, ...rest] };
}

export async function addLocation(profile, location) {
  if (profile.locations.some((l) => l.id === location.id)) {
    return switchLocation(profile, location.id);
  }
  return { ...profile, locations: [location, ...profile.locations] };
}
