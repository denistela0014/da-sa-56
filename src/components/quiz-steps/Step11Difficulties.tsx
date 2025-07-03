
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

interface Step11Props {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
  toggleArrayItem: (array: string[], item: string) => string[];
}

const Step11Difficulties: React.FC<Step11Props> = ({
  quizState,
  updateState,
  nextStep,
  toggleArrayItem
}) => {
  const difficultyOptions = [
    { id: 'subir-escadas', text: 'Subir escadas', emoji: '🤦‍♀️' },
    { id: 'sentar', text: 'Se sentar', emoji: '🪑' },
    { id: 'agachar', text: 'Agachar', emoji: '🦵' },
    { id: 'deitar', text: 'Deitar na cama', emoji: '🛌' },
    { id: 'outras', text: 'Outras', emoji: '😶' },
    { id: 'nao-tenho', text: 'Não tenho dificuldade', emoji: '✅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Você experimenta alguma dessas dificuldades?
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {difficultyOptions.map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => updateState({ difficulties: toggleArrayItem(quizState.difficulties, difficulty.id) })}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-300 ${
                  quizState.difficulties.includes(difficulty.id)
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <span className="text-xl mr-3">{difficulty.emoji}</span>
                <span className="font-medium text-sm">{difficulty.text}</span>
              </button>
            ))}
          </div>
          {quizState.difficulties.length > 0 && (
            <div className="text-center">
              <button
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
};

export default Step11Difficulties;
