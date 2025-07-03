
import React from 'react';

interface QuizState {
  sleep: string;
}

interface Step20SleepProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}

const Step20Sleep: React.FC<Step20SleepProps> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const sleepOptions = [
    { id: 'menos-5h', text: 'Menos de 5h', emoji: '⏰' },
    { id: '5-7h', text: '5–7h', emoji: '⏰' },
    { id: '7-9h', text: '7–9h', emoji: '⏰' },
    { id: 'mais-9h', text: 'Mais de 9h', emoji: '⏰' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Quantas horas de sono você costuma ter por noite?
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Você queimará gordura enquanto dorme!
          </p>
          <div className="grid grid-cols-2 gap-4">
            {sleepOptions.map(sleep => (
              <button 
                key={sleep.id} 
                onClick={() => {
                  updateState({ sleep: sleep.id });
                  nextStep();
                }} 
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-center"
              >
                <span className="text-2xl block mb-2">{sleep.emoji}</span>
                <span className="font-medium">{sleep.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
};

export default Step20Sleep;
