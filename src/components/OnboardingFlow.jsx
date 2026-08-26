import React, { useState } from 'react';
import { INITIAL_SURVEY_ANSWERS } from '../types/surveySchema';
import { generateProfile as defaultGenerateProfile } from '../mock/mockAiEngine';

import { WelcomeScreen } from './WelcomeScreen';
import { SurveyProgressBar } from './SurveyProgressBar';
import { Step1Personas } from './Step1Personas';
import { Step2Routine } from './Step2Routine';
import { Step3Sensitivities } from './Step3Sensitivities';
import { Step4MicroQuestions } from './Step4MicroQuestions';
import { Step5Location } from './Step5Location';
import { Step6Preferences } from './Step6Preferences';
import { LoadingScreen } from './LoadingScreen';
import { ProfileConfirmation } from './ProfileConfirmation';

/**
 * OnboardingFlow — Master Person 1 Controller Component
 * 
 * Props:
 * @param {Function} onComplete - Callback invoked with `(profile, surveyAnswers)` when user confirms
 * @param {Function} [generateProfileFn] - Optional Person 2 AI profile generator override
 */
export function OnboardingFlow({ onComplete, generateProfileFn = defaultGenerateProfile }) {
  // Navigation stage: 'welcome' | 'survey' | 'processing' | 'confirm'
  const [stage, setStage] = useState('welcome');
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyAnswers, setSurveyAnswers] = useState(INITIAL_SURVEY_ANSWERS);
  const [generatedProfile, setGeneratedProfile] = useState(null);

  // Helper to partially update survey state
  const updateAnswers = (patch) => {
    setSurveyAnswers((prev) => ({
      ...prev,
      ...patch
    }));
  };

  // Start manual 6-step survey
  const handleStartCustom = () => {
    setSurveyStep(1);
    setStage('survey');
  };

  // Handle Quick-Start Demo Presets
  const handleSelectPreset = async (presetData) => {
    setSurveyAnswers(presetData);
    setStage('processing');
    try {
      const profile = await generateProfileFn(presetData);
      setGeneratedProfile(profile);
      setStage('confirm');
    } catch (err) {
      console.error('Failed to generate profile from preset:', err);
      // Fallback
      setGeneratedProfile(await defaultGenerateProfile(presetData));
      setStage('confirm');
    }
  };

  // Submit completed survey & trigger AI Generation
  const handleSurveySubmit = async () => {
    setStage('processing');
    try {
      const profile = await generateProfileFn(surveyAnswers);
      setGeneratedProfile(profile);
      setStage('confirm');
    } catch (err) {
      console.error('AI Profile generation failed, using fallback engine:', err);
      const fallback = await defaultGenerateProfile(surveyAnswers);
      setGeneratedProfile(fallback);
      setStage('confirm');
    }
  };

  // Step Navigation
  const handleNextStep = () => {
    if (surveyStep < 6) {
      setSurveyStep((prev) => prev + 1);
    } else {
      handleSurveySubmit();
    }
  };

  const handlePrevStep = () => {
    if (surveyStep > 1) {
      setSurveyStep((prev) => prev - 1);
    } else {
      setStage('welcome');
    }
  };

  // Final confirmation to pass profile to Person 4 (Homepage)
  const handleFinalConfirm = (finalProfile) => {
    if (onComplete) {
      onComplete(finalProfile, surveyAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center px-4 py-8 selection:bg-cyan-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-emerald-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full mx-auto">
        {/* STAGE 1: Welcome Screen */}
        {stage === 'welcome' && (
          <WelcomeScreen
            onStartCustom={handleStartCustom}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {/* STAGE 2: 6-Step Survey Flow */}
        {stage === 'survey' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <SurveyProgressBar
              currentStep={surveyStep}
              totalSteps={6}
              onBack={handlePrevStep}
              canGoBack={true}
            />

            {surveyStep === 1 && (
              <Step1Personas
                selectedPersonas={surveyAnswers.selectedPersonas}
                onChange={(personas) => updateAnswers({ selectedPersonas: personas })}
                onNext={handleNextStep}
              />
            )}

            {surveyStep === 2 && (
              <Step2Routine
                answers={surveyAnswers}
                onChange={updateAnswers}
                onNext={handleNextStep}
              />
            )}

            {surveyStep === 3 && (
              <Step3Sensitivities
                sensitivities={surveyAnswers.sensitivities}
                onChange={(sens) => updateAnswers({ sensitivities: sens })}
                onNext={handleNextStep}
              />
            )}

            {surveyStep === 4 && (
              <Step4MicroQuestions
                selectedPersonas={surveyAnswers.selectedPersonas}
                details={surveyAnswers.personaDetails}
                onChange={(details) => updateAnswers({ personaDetails: details })}
                onNext={handleNextStep}
              />
            )}

            {surveyStep === 5 && (
              <Step5Location
                location={surveyAnswers.location}
                onChange={(loc) => updateAnswers({ location: loc })}
                onNext={handleNextStep}
              />
            )}

            {surveyStep === 6 && (
              <Step6Preferences
                answers={surveyAnswers}
                onChange={updateAnswers}
                onSubmit={handleSurveySubmit}
              />
            )}
          </div>
        )}

        {/* STAGE 3: Processing & AI Generation */}
        {stage === 'processing' && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-10 shadow-2xl backdrop-blur-xl">
            <LoadingScreen locationName={surveyAnswers.location?.city || 'your location'} />
          </div>
        )}

        {/* STAGE 4: Profile Confirmation */}
        {stage === 'confirm' && generatedProfile && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
            <ProfileConfirmation
              profile={generatedProfile}
              onConfirm={handleFinalConfirm}
              onEditSurvey={() => {
                setStage('survey');
                setSurveyStep(1);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
