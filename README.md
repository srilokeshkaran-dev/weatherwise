# 🌦️ KAIROS — Person 1 (Survey & Onboarding UI)

This package contains the complete, production-ready implementation of **Person 1 (Survey & Onboarding)** for the **KAIROS Personalized Weather Intelligence** application.

---

## 🎯 What Person 1 Builds & Delivers

1. **`WelcomeScreen.jsx`**: Hero branding, value proposition, and 4 **Quick-Start Demo Presets** (Farmer, Runner, Asthma/Health, Commuter) for fast testing and judge demos.
2. **`SurveyProgressBar.jsx`**: Responsive 6-step progress indicator and backward navigation.
3. **`Step1Personas.jsx`**: Multi-select chips for all 8 target personas with auto-prioritization (Primary vs Secondary).
4. **`Step2Routine.jsx`**: Active time-of-day slots, outdoor activity badges, commute departure times (`07:30 AM`), and transport modes.
5. **`Step3Sensitivities.jsx`**: Calibrated threshold inputs (Heat sensitivity slider, AQI sensitivity trigger, Rain tolerance, UV alert threshold, and environmental allergens).
6. **`Step4MicroQuestions.jsx`**: Dynamic conditional questions (Crop type & growth stage for Agriculture, workout windows & heat cutoffs for Fitness, school commute for Parents, wave limits for Surfers).
7. **`Step5Location.jsx`**: Real-time city search powered by the free Open-Meteo Geocoding API + GPS Auto-detection + 1-click popular cities.
8. **`Step6Preferences.jsx`**: Language selection (`en`, `hi`, `ta`, `te`, `es`), unit system (`metric` / `imperial`), and free-form natural language notes for Person 2 AI personalizer.
9. **`LoadingScreen.jsx`**: Futuristic radar pulse animation with cycling status messages while AI profile generation executes.
10. **`ProfileConfirmation.jsx`**: Comprehensive profile breakdown with persona weight percentages, calibrated threshold triggers, and 1-click confirmation.
11. **`mockAiEngine.js`**: A built-in fallback/stub simulating Person 2's AI profile generation with a 1.5s delay so Person 1 can build and test 100% independently!

---

## 🚀 How to Run Standalone

```bash
cd /Users/admin/.gemini/antigravity/scratch/kairos-onboarding
npm install
npm run dev
```

---

## 🔗 Integration with the Team

### 1. Connecting with Person 2 (AI Personalization Engine)
When Person 2 finishes `aiEngine.js`, simply pass their `generateProfile` function to `<OnboardingFlow />`:

```jsx
import { OnboardingFlow } from './onboarding';
import { generateProfile } from './aiEngine'; // Person 2

function App() {
  return (
    <OnboardingFlow
      generateProfileFn={generateProfile}
      onComplete={(profile, surveyAnswers) => {
        // Hand off to Person 4 (Homepage)
      }}
    />
  );
}
```

### 2. Passing Data to Person 4 (Homepage & Integration Lead)
When the user finishes the survey and confirms their profile, `onComplete(profile, surveyAnswers)` is fired.

Person 4 receives:
- `profile.primary_persona`: `'fitness'` | `'agriculture'` | `'health'` | `'parent'` ...
- `profile.personas`: `[{ id: 'fitness', percentage: 65 }, { id: 'health', percentage: 35 }]`
- `profile.thresholds`: `{ aqi_alert: 55, uv_alert: 6, max_temp_alert: 33, rain_prob_alert: 45 }`
- `profile.location`: `{ city: 'Chennai', latitude: 13.0827, longitude: 80.2707, timezone: 'Asia/Kolkata' }`
- `profile.language`: `'en'` or `'hi'`
- `profile.ai_summary`: AI generated advisory context

---

## 🧪 Testing Presets (For Person 5 QA & Person 6 Pitch)
On the Welcome Screen, you can click any of the 4 quick demo cards to instantly populate and test:
- **🌾 Farmer**: Wheat sowing in Punjab, high rain alert sensitivity, frost warning.
- **🏃 Runner**: Morning 10k in Chennai, 32°C heat cutoff, UV ≥ 6 alert.
- **🫁 Asthma / Health**: Delhi NCR, AQI threshold 50, humidity/dust allergen triggers.
- **👨‍👩‍👧 Commuter Parent**: Bengaluru, 7:30 AM scooter commute, rain radar priority.
