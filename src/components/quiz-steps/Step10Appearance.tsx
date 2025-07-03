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
interface Step10Props {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step10Appearance: React.FC<Step10Props> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const appearanceOptions = [{
    id: 'acima-peso',
    text: 'Não, porque me sinto acima do peso',
    emoji: '😪'
  }, {
    id: 'posso-melhorar',
    text: 'Sim, mas sei que posso melhorar minha saúde',
    emoji: '😞'
  }, {
    id: 'gostaria-perder',
    text: 'Não, gostaria de perder peso',
    emoji: '😪'
  }, {
    id: 'nao-corresponde',
    text: 'Não, minha aparência não corresponde aos meus objetivos',
    emoji: '🤦‍♀️'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Você está satisfeito com sua aparência física atual?
            </h2>
          </div>
          <div className="space-y-4">
            {appearanceOptions.map(option => <button key={option.id} onClick={() => {
            updateState({
              appearance: option.id
            });
            nextStep();
          }} className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left">
                <span className="text-xl mr-3">{option.emoji}</span>
                <span className="font-medium">{option.text}</span>
              </button>)}
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>;
};
export default Step10Appearance;