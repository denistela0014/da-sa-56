import React, { memo } from 'react';
import { 
  Step09RelationshipImpact, 
  Step10Appearance, 
  Step11Difficulties, 
  Step12VideoVSL, 
  Step13Barriers, 
  Step14TeaWorks, 
  Step15Benefits,
  Step16SuccessStory,
  Step17CurrentWeight,
  Step18Height,
  Step19Routine,
  Step20Sleep,
  Step21Water,
  Step22Fruits,
  Step23NutritionistAudio,
  Step24HealthConditions,
  Step25EnterCondition,
  Step26PersonalizedMessage,
  Step27DesiredBody,
  Step28FinalCheckout
} from './quiz-steps';
import { Progress } from '@/components/ui/progress';

interface QuizState {
  currentStep: number;
  userName: string;
  goals: string[];
  fatAreas: string[];
  age: string;
  weightGoal: number;
  bodyType: string;
  relationshipImpact: string;
  appearance: string;
  difficulties: string[];
  timeBarrier: string;
  benefits: string[];
  currentWeight: string;
  height: string;
  routine: string;
  sleep: string;
  water: string;
  fruits: string[];
  hasHealthConditions: boolean;
  healthCondition: string;
  desiredBody: string;
}

interface QuizStepsRemainingProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
  skipToStep: (step: number) => void;
  toggleArrayItem: (array: string[], item: string) => string[];
  analyzeResponses: () => void;
}

const QuizStepsRemaining: React.FC<QuizStepsRemainingProps> = memo(({
  quizState,
  updateState,
  nextStep,
  skipToStep,
  toggleArrayItem,
  analyzeResponses
}) => {
  // Step 9 - Relationship Impact
  if (quizState.currentStep === 9) {
    return <Step09RelationshipImpact quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 10 - Satisfaction with Appearance
  if (quizState.currentStep === 10) {
    return <Step10Appearance quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 11 - Physical Difficulties
  if (quizState.currentStep === 11) {
    return <Step11Difficulties quizState={quizState} updateState={updateState} nextStep={nextStep} toggleArrayItem={toggleArrayItem} />;
  }

  // Step 12 - First Nutritionist VSL
  if (quizState.currentStep === 12) {
    return <Step12VideoVSL nextStep={nextStep} />;
  }

  // Step 13 - What's Stopping You
  if (quizState.currentStep === 13) {
    return <Step13Barriers quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 14 - How Tea Works
  if (quizState.currentStep === 14) {
    return <Step14TeaWorks nextStep={nextStep} />;
  }

  // Step 15 - Choose Benefits
  if (quizState.currentStep === 15) {
    return <Step15Benefits quizState={quizState} updateState={updateState} toggleArrayItem={toggleArrayItem} analyzeResponses={analyzeResponses} />;
  }

  // Step 16 - Success Story
  if (quizState.currentStep === 16) {
    return <Step16SuccessStory nextStep={nextStep} />;
  }

  // Step 17 - Current Weight
  if (quizState.currentStep === 17) {
    return <Step17CurrentWeight quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 18 - Height
  if (quizState.currentStep === 18) {
    return <Step18Height quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 19 - Routine
  if (quizState.currentStep === 19) {
    return <Step19Routine quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 20 - Sleep
  if (quizState.currentStep === 20) {
    return <Step20Sleep quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 21 - Water
  if (quizState.currentStep === 21) {
    return <Step21Water quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 22 - Fruits
  if (quizState.currentStep === 22) {
    return <Step22Fruits quizState={quizState} updateState={updateState} nextStep={nextStep} toggleArrayItem={toggleArrayItem} />;
  }

  // Step 23 - Nutritionist Audio
  if (quizState.currentStep === 23) {
    return <Step23NutritionistAudio nextStep={nextStep} />;
  }

  // Step 24 - Health Conditions
  if (quizState.currentStep === 24) {
    return <Step24HealthConditions quizState={quizState} updateState={updateState} nextStep={nextStep} skipToStep={skipToStep} />;
  }

  // Step 25 - Enter Condition
  if (quizState.currentStep === 25) {
    return <Step25EnterCondition quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 26 - Personalized Message
  if (quizState.currentStep === 26) {
    return <Step26PersonalizedMessage quizState={quizState} nextStep={nextStep} />;
  }

  // Step 27 - Desired Body Selection
  if (quizState.currentStep === 27) {
    return <Step27DesiredBody quizState={quizState} updateState={updateState} nextStep={nextStep} />;
  }

  // Step 28 - Final Congratulations + VSL + Checkout
  if (quizState.currentStep === 28) {
    return <Step28FinalCheckout quizState={quizState} />;
  }

  return <div>Etapa {quizState.currentStep} em desenvolvimento...</div>;
});

QuizStepsRemaining.displayName = 'QuizStepsRemaining';

export default QuizStepsRemaining;
