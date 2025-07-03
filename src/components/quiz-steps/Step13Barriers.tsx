import React from 'react';
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
interface Step13Props {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step13Barriers: React.FC<Step13Props> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const barriers = [{
    id: 'falta-tempo',
    text: 'Falta de tempo',
    emoji: '⏰'
  }, {
    id: 'autocontrole',
    text: 'Autocontrole',
    emoji: '😬'
  }, {
    id: 'financeiro',
    text: 'Financeiro',
    emoji: '💵'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-16">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              O que está te impedindo de emagrecer?
            </h2>
          </div>
          <p className="text-center text-gray-700 mb-8">Você já pensou nisso?</p>
          <div className="space-y-4">
            {barriers.map(barrier => <button key={barrier.id} onClick={() => {
            updateState({
              timeBarrier: barrier.id
            });
            nextStep();
          }} className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left">
                <span className="text-2xl mr-4">{barrier.emoji}</span>
                <span className="font-medium text-lg">{barrier.text}</span>
              </button>)}
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>;
};
export default Step13Barriers;