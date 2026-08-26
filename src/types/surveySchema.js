/**
 * KAIROS Data Types & Schema Definition for Person 1 (Survey & Onboarding)
 * 
 * Shared contracts between Person 1 (Survey), Person 2 (AI Engine),
 * Person 3 (Weather API), and Person 4 (Homepage).
 */

export const PERSONA_TYPES = {
  FITNESS: 'fitness',
  AGRICULTURE: 'agriculture',
  HEALTH: 'health',
  PARENT: 'parent',
  COMMUTER: 'commuter',
  BEACH_MARINE: 'beach_marine',
  TRAVELER: 'traveler',
  EVENT_PLANNER: 'event_planner'
};

export const PERSONA_METADATA = {
  [PERSONA_TYPES.FITNESS]: {
    id: PERSONA_TYPES.FITNESS,
    label: 'Fitness & Athletics',
    icon: '🏃',
    tagline: 'Running windows, heat index, wind & UV alerts',
    accentColor: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500',
    bgColor: 'bg-emerald-500/10'
  },
  [PERSONA_TYPES.AGRICULTURE]: {
    id: PERSONA_TYPES.AGRICULTURE,
    label: 'Farming & Agriculture',
    icon: '🌱',
    tagline: 'Soil moisture, rain probability, frost & sowing conditions',
    accentColor: 'from-lime-500 to-emerald-600',
    borderColor: 'border-lime-500/30 hover:border-lime-500',
    bgColor: 'bg-lime-500/10'
  },
  [PERSONA_TYPES.HEALTH]: {
    id: PERSONA_TYPES.HEALTH,
    label: 'Health & Sensitivities',
    icon: '🫁',
    tagline: 'AQI alerts, pollen count, humidity, allergens & UV',
    accentColor: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-500/30 hover:border-rose-500',
    bgColor: 'bg-rose-500/10'
  },
  [PERSONA_TYPES.PARENT]: {
    id: PERSONA_TYPES.PARENT,
    label: 'Parent & Family',
    icon: '👨‍👩‍👧',
    tagline: 'School commute weather, rain timing & outdoor play safety',
    accentColor: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-500/30 hover:border-amber-500',
    bgColor: 'bg-amber-500/10'
  },
  [PERSONA_TYPES.COMMUTER]: {
    id: PERSONA_TYPES.COMMUTER,
    label: 'Daily Commuter',
    icon: '🚗',
    tagline: 'Route visibility, commute-hour rain & fog delays',
    accentColor: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-500/30 hover:border-blue-500',
    bgColor: 'bg-blue-500/10'
  },
  [PERSONA_TYPES.BEACH_MARINE]: {
    id: PERSONA_TYPES.BEACH_MARINE,
    label: 'Beach, Surf & Marine',
    icon: '🏄',
    tagline: 'Wave height, tide cycles, wind & water temperature',
    accentColor: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-500/30 hover:border-cyan-500',
    bgColor: 'bg-cyan-500/10'
  },
  [PERSONA_TYPES.TRAVELER]: {
    id: PERSONA_TYPES.TRAVELER,
    label: 'Frequent Traveler',
    icon: '✈️',
    tagline: 'Packing suggestions, flight weather & destination storm alerts',
    accentColor: 'from-indigo-500 to-purple-600',
    borderColor: 'border-indigo-500/30 hover:border-indigo-500',
    bgColor: 'bg-indigo-500/10'
  },
  [PERSONA_TYPES.EVENT_PLANNER]: {
    id: PERSONA_TYPES.EVENT_PLANNER,
    label: 'Event & Outdoor Planner',
    icon: '🎪',
    tagline: 'Hourly rain probability, comfort index & wind gusts',
    accentColor: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-500/30 hover:border-purple-500',
    bgColor: 'bg-purple-500/10'
  }
};

export const INITIAL_SURVEY_ANSWERS = {
  // Step 1: Selected Personas (multi-select)
  selectedPersonas: ['fitness', 'health'],

  // Step 2: Daily routine & activity timings
  activities: ['Running / Jogging', 'Morning Commute'],
  activityTimes: ['early_morning', 'morning'],
  commuteTime: '07:30',
  commuteMode: 'two_wheeler',

  // Step 3: Sensitivities & Threshold preferences
  sensitivities: {
    heatSensitivity: 2, // 1: Low, 2: Moderate, 3: High
    aqiSensitivity: 'sensitive', // 'sensitive' (<60), 'moderate' (<100), 'resilient' (<150)
    rainTolerance: 'medium', // 'low', 'medium', 'high'
    uvAlertThreshold: 6, // 3, 6, 8, 10
    allergens: ['dust', 'humidity']
  },

  // Step 4: Persona-specific micro-answers
  personaDetails: {
    // Agriculture micro-answers
    cropType: 'Wheat',
    cropStage: 'Sowing',
    irrigationType: 'Drip / Tube-well',
    
    // Fitness micro-answers
    fitnessType: 'Running / Jogging',
    targetWorkoutWindow: '06:00 - 07:30',
    maxHeatToleranceC: 33,
    
    // Beach/Marine micro-answers
    waterSport: 'Surfing',
    maxWaveHeightM: 1.8,
    
    // Parent micro-answers
    childrenSchoolDeparture: '07:30',
    strollerWalkPreferredTime: '17:00'
  },

  // Step 5: Location
  location: {
    city: 'Chennai',
    region: 'Tamil Nadu',
    country: 'India',
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: 'Asia/Kolkata'
  },

  // Step 6: Preferences & Free text
  language: 'en',
  unitSystem: 'metric',
  freeformNotes: ''
};
