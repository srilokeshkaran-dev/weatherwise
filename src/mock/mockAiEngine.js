/**
 * Mock AI Personalization Engine (Person 2 Integration Stub)
 * 
 * Person 1 uses this stub during parallel development with a 1.5s delay.
 * When Person 2 delivers `aiEngine.js`, this stub can easily be swapped!
 */

export async function generateProfile(surveyAnswers) {
  // Simulate 1.5-second AI inference delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const selected = surveyAnswers.selectedPersonas && surveyAnswers.selectedPersonas.length > 0
    ? surveyAnswers.selectedPersonas
    : ['fitness', 'health'];

  // Calculate persona weights dynamically based on order & count
  const weights = {};
  const personasList = [];

  if (selected.length === 1) {
    weights[selected[0]] = 1.0;
    personasList.push({ id: selected[0], weight: 1.0, percentage: 100 });
  } else if (selected.length === 2) {
    weights[selected[0]] = 0.65;
    weights[selected[1]] = 0.35;
    personasList.push({ id: selected[0], weight: 0.65, percentage: 65 });
    personasList.push({ id: selected[1], weight: 0.35, percentage: 35 });
  } else {
    // 3 or more personas: distribute intelligently
    const primary = selected[0];
    const secondary = selected[1];
    const remainingWeight = 0.20 / (selected.length - 2);

    weights[primary] = 0.50;
    weights[secondary] = 0.30;
    personasList.push({ id: primary, weight: 0.50, percentage: 50 });
    personasList.push({ id: secondary, weight: 0.30, percentage: 30 });

    for (let i = 2; i < selected.length; i++) {
      weights[selected[i]] = parseFloat(remainingWeight.toFixed(2));
      personasList.push({
        id: selected[i],
        weight: parseFloat(remainingWeight.toFixed(2)),
        percentage: Math.round(remainingWeight * 100)
      });
    }
  }

  // Derive customized smart thresholds from user sensitivities
  const heatSens = surveyAnswers.sensitivities?.heatSensitivity || 2;
  const maxTempAlert = heatSens === 3 ? 31 : heatSens === 2 ? 34 : 38;

  const aqiMap = { sensitive: 55, moderate: 90, resilient: 140 };
  const aqiAlert = aqiMap[surveyAnswers.sensitivities?.aqiSensitivity] || 85;

  const rainMap = { low: 30, medium: 50, high: 75 };
  const rainAlert = rainMap[surveyAnswers.sensitivities?.rainTolerance] || 45;

  const uvAlert = surveyAnswers.sensitivities?.uvAlertThreshold || 6;

  // Build AI Summary text based on profile
  const primaryPersona = selected[0] || 'fitness';
  let aiSummary = '';
  if (primaryPersona === 'agriculture') {
    aiSummary = `Prioritizing soil moisture, precipitation radar, and frost warnings for ${surveyAnswers.personaDetails?.cropType || 'crops'} during ${surveyAnswers.personaDetails?.cropStage || 'growth'}.`;
  } else if (primaryPersona === 'fitness') {
    aiSummary = `Optimizing for peak outdoor training windows (${surveyAnswers.personaDetails?.targetWorkoutWindow || 'morning'}) with active thermal index & UV triggers.`;
  } else if (primaryPersona === 'health') {
    aiSummary = `Monitoring high-precision AQI (threshold ${aqiAlert}), airborne allergen spikes, and humidity swings to safeguard respiratory health.`;
  } else if (primaryPersona === 'parent' || primaryPersona === 'commuter') {
    aiSummary = `Tracking commute weather, visibility conditions, and sudden downpours for safe school & office transit at ${surveyAnswers.commuteTime || '7:30 AM'}.`;
  } else {
    aiSummary = `Customized weather intelligence tuned for ${selected.join(', ')} priorities.`;
  }

  // Construct complete normalized Profile object
  const profile = {
    id: `user_${Date.now()}`,
    createdAt: new Date().toISOString(),
    primary_persona: primaryPersona,
    personas: personasList,
    persona_weights: weights,
    thresholds: {
      aqi_alert: aqiAlert,
      uv_alert: uvAlert,
      max_temp_alert: maxTempAlert,
      rain_prob_alert: rainAlert,
      wind_speed_alert: 25, // km/h
      visibility_min_alert: 2500 // meters
    },
    persona_details: {
      commute_time: surveyAnswers.commuteTime || '07:30',
      commute_mode: surveyAnswers.commuteMode || 'two_wheeler',
      workout_window: surveyAnswers.personaDetails?.targetWorkoutWindow || '06:00 - 07:30',
      max_heat_tolerance_c: maxTempAlert,
      crop: surveyAnswers.personaDetails?.cropType || 'Wheat',
      crop_stage: surveyAnswers.personaDetails?.cropStage || 'Sowing',
      irrigation_type: surveyAnswers.personaDetails?.irrigationType || 'Drip',
      water_sport: surveyAnswers.personaDetails?.waterSport || 'Surfing',
      allergens: surveyAnswers.sensitivities?.allergens || []
    },
    location: surveyAnswers.location || {
      city: 'Chennai',
      region: 'Tamil Nadu',
      country: 'India',
      latitude: 13.0827,
      longitude: 80.2707,
      timezone: 'Asia/Kolkata'
    },
    language: surveyAnswers.language || 'en',
    unit_system: surveyAnswers.unitSystem || 'metric',
    freeform_notes: surveyAnswers.freeformNotes || '',
    ai_summary: aiSummary,
    raw_survey: surveyAnswers
  };

  return profile;
}
