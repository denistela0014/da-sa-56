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
interface Step09Props {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step09RelationshipImpact: React.FC<Step09Props> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const relationshipOptions = [{
    id: 'vergonha-fotos',
    text: 'Tenho vergonha de tirar fotos',
    emoji: '🤦‍♀️'
  }, {
    id: 'parceiro-preocupado',
    text: 'Meu parceiro está preocupado com minha saúde',
    emoji: '😞'
  }, {
    id: 'julgado',
    text: 'Sinto-me julgado por amigos e colegas',
    emoji: '😪'
  }, {
    id: 'evito-encontros',
    text: 'Evito encontros românticos por não me sentir atraente',
    emoji: '💔'
  }, {
    id: 'nenhuma',
    text: 'Nenhuma das opções',
    emoji: '👋'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Como seu peso afeta seus relacionamentos?
            </h2>
          </div>
          <p className="text-gray-700 mb-8 text-center">
            Ignorar como seu peso impacta seus relacionamentos pode prejudicar sua qualidade de vida e bem-estar emocional.
          </p>
          <div className="space-y-4 mb-8">
            {relationshipOptions.map(option => <button key={option.id} onClick={() => {
            updateState({
              relationshipImpact: option.id
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
export default Step09RelationshipImpact;