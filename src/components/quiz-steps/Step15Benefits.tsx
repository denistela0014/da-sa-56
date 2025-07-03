
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
interface Step15Props {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  toggleArrayItem: (array: string[], item: string) => string[];
  analyzeResponses: () => void;
}
const Step15Benefits: React.FC<Step15Props> = ({
  quizState,
  updateState,
  toggleArrayItem,
  analyzeResponses
}) => {
  const benefitOptions = [{
    id: 'melhor-sono',
    text: 'Melhor sono',
    emoji: '😴'
  }, {
    id: 'reducao-dores',
    text: 'Redução das dores',
    emoji: '🤕'
  }, {
    id: 'mais-energia',
    text: 'Mais energia',
    emoji: '⚡'
  }, {
    id: 'reducao-estresse',
    text: 'Redução do estresse',
    emoji: '😌'
  }, {
    id: 'aumento-autoestima',
    text: 'Aumento da autoestima',
    emoji: '💖'
  }, {
    id: 'reduzir-risco',
    text: 'Reduzir risco de doenças',
    emoji: '🛡️'
  }, {
    id: 'facilidade-atividades',
    text: 'Mais facilidade para atividades físicas',
    emoji: '🏃'
  }, {
    id: 'menos-compulsao',
    text: 'Menos compulsão alimentar',
    emoji: '🍽️'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Qual desses benefícios você gostaria de ter?
            </h2>
          </div>
          <p className="text-center text-gray-700 mb-8">
            Vamos adicionar ingredientes para te ajudar a conseguir isso.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {benefitOptions.map(benefit => <button key={benefit.id} onClick={() => updateState({
            benefits: toggleArrayItem(quizState.benefits, benefit.id)
          })} className={`p-3 rounded-lg border-2 text-center font-medium transition-all duration-300 ${quizState.benefits.includes(benefit.id) ? 'border-green-500 bg-green-50 text-green-800' : 'border-gray-200 bg-white hover:border-green-300'}`}>
                <div className="flex flex-col items-center">
                  <span className="text-xl mb-2">{benefit.emoji}</span>
                  <span className="text-sm leading-tight">{benefit.text}</span>
                </div>
              </button>)}
          </div>
          {quizState.benefits.length > 0 && <div className="text-center">
              <button onClick={analyzeResponses} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
                Continuar
              </button>
            </div>}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>;
};
export default Step15Benefits;
