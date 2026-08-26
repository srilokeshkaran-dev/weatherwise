/**
 * Quick-fill Demo Presets for KAIROS
 * Perfect for quick hackathon demos, judge walkthroughs, and QA testing.
 */

export const DEMO_PRESETS = [
  {
    id: 'farmer',
    name: '🌱 Farmer / Agriculture',
    subtitle: 'Wheat sowing in Punjab / North India',
    badge: 'Agromet Focus',
    color: 'border-lime-500/40 bg-lime-500/10 text-lime-400',
    data: {
      selectedPersonas: ['agriculture', 'parent'],
      activities: ['Field Irrigation', 'Pesticide Spraying', 'School Drop'],
      activityTimes: ['early_morning', 'morning'],
      commuteTime: '06:30',
      commuteMode: 'two_wheeler',
      sensitivities: {
        heatSensitivity: 1,
        aqiSensitivity: 'moderate',
        rainTolerance: 'high',
        uvAlertThreshold: 8,
        allergens: ['dust']
      },
      personaDetails: {
        cropType: 'Wheat',
        cropStage: 'Sowing / Germination',
        irrigationType: 'Canal & Tube-well',
        fitnessType: 'Walking',
        targetWorkoutWindow: '05:30 - 07:00',
        maxHeatToleranceC: 38,
        waterSport: 'None',
        maxWaveHeightM: 1.0,
        childrenSchoolDeparture: '07:30',
        strollerWalkPreferredTime: '17:30'
      },
      location: {
        city: 'Ludhiana',
        region: 'Punjab',
        country: 'India',
        latitude: 30.9010,
        longitude: 75.8573,
        timezone: 'Asia/Kolkata'
      },
      language: 'hi',
      unitSystem: 'metric',
      freeformNotes: 'Sowing wheat this week. Need early frost alerts and heavy rain warnings before fertilizer application.'
    }
  },
  {
    id: 'fitness',
    name: '🏃 Fitness Runner',
    subtitle: 'Morning 10k runner in coastal Chennai',
    badge: 'Heat & UV Sensitive',
    color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
    data: {
      selectedPersonas: ['fitness', 'health'],
      activities: ['Road Running (10K)', 'Cycling', 'Outdoor Stretch'],
      activityTimes: ['early_morning'],
      commuteTime: '08:45',
      commuteMode: 'car',
      sensitivities: {
        heatSensitivity: 3,
        aqiSensitivity: 'sensitive',
        rainTolerance: 'low',
        uvAlertThreshold: 6,
        allergens: ['humidity', 'dust']
      },
      personaDetails: {
        cropType: '',
        cropStage: '',
        irrigationType: '',
        fitnessType: 'Marathon Training (Running)',
        targetWorkoutWindow: '05:30 - 07:00',
        maxHeatToleranceC: 32,
        waterSport: 'Swimming',
        maxWaveHeightM: 1.2,
        childrenSchoolDeparture: '08:00',
        strollerWalkPreferredTime: '18:00'
      },
      location: {
        city: 'Chennai',
        region: 'Tamil Nadu',
        country: 'India',
        latitude: 13.0827,
        longitude: 80.2707,
        timezone: 'Asia/Kolkata'
      },
      language: 'en',
      unitSystem: 'metric',
      freeformNotes: 'High humidity makes running dangerous above 30°C. Need the ideal morning running window before heat peaks.'
    }
  },
  {
    id: 'health_sensitive',
    name: '🫁 Health & Asthma Care',
    subtitle: 'Air quality sensitive in Delhi NCR',
    badge: 'AQI & Pollen Priority',
    color: 'border-rose-500/40 bg-rose-500/10 text-rose-400',
    data: {
      selectedPersonas: ['health', 'commuter'],
      activities: ['Office Commute', 'Evening Walk'],
      activityTimes: ['morning', 'evening'],
      commuteTime: '08:30',
      commuteMode: 'metro',
      sensitivities: {
        heatSensitivity: 2,
        aqiSensitivity: 'sensitive', // Alert if AQI > 50
        rainTolerance: 'medium',
        uvAlertThreshold: 5,
        allergens: ['pollen', 'dust', 'humidity', 'cold']
      },
      personaDetails: {
        cropType: '',
        cropStage: '',
        irrigationType: '',
        fitnessType: 'Brisk Walking',
        targetWorkoutWindow: '18:00 - 19:00',
        maxHeatToleranceC: 34,
        waterSport: 'None',
        maxWaveHeightM: 1.0,
        childrenSchoolDeparture: '08:00',
        strollerWalkPreferredTime: '17:00'
      },
      location: {
        city: 'New Delhi',
        region: 'Delhi',
        country: 'India',
        latitude: 28.6139,
        longitude: 77.2090,
        timezone: 'Asia/Kolkata'
      },
      language: 'en',
      unitSystem: 'metric',
      freeformNotes: 'Severe pollen allergy and asthma trigger when PM2.5/AQI exceeds 80 or sudden temperature drops occur.'
    }
  },
  {
    id: 'parent_commuter',
    name: '👨‍👩‍👧 Parent & Daily Commuter',
    subtitle: 'School drop & rain route planning in Bengaluru',
    badge: 'Commute & Safety',
    color: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
    data: {
      selectedPersonas: ['parent', 'commuter', 'event_planner'],
      activities: ['School Drop-off', 'Motorcycle Commute', 'Weekend Kids Playground'],
      activityTimes: ['morning', 'evening', 'afternoon'],
      commuteTime: '07:30',
      commuteMode: 'two_wheeler',
      sensitivities: {
        heatSensitivity: 2,
        aqiSensitivity: 'moderate',
        rainTolerance: 'low',
        uvAlertThreshold: 7,
        allergens: ['cold', 'dust']
      },
      personaDetails: {
        cropType: '',
        cropStage: '',
        irrigationType: '',
        fitnessType: 'Walking',
        targetWorkoutWindow: '06:30 - 07:15',
        maxHeatToleranceC: 35,
        waterSport: 'None',
        maxWaveHeightM: 1.0,
        childrenSchoolDeparture: '07:30',
        strollerWalkPreferredTime: '16:30'
      },
      location: {
        city: 'Bengaluru',
        region: 'Karnataka',
        country: 'India',
        latitude: 12.9716,
        longitude: 77.5946,
        timezone: 'Asia/Kolkata'
      },
      language: 'en',
      unitSystem: 'metric',
      freeformNotes: 'Ride a scooter with a 6-year-old at 7:30 AM. Need rain radar and sudden downpour alerts 45 mins ahead.'
    }
  }
];
