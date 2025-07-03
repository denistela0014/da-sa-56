
import React from 'react';

interface QuizState {
  routine: string;
}

interface Step19RoutineProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}

const Step19Routine: React.FC<Step19RoutineProps> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const routines = [
    { id: 'trabalho-fora', text: 'Trabalho fora e tenho rotina agitada', emoji: '🤯' },
    { id: 'trabalho-casa', text: 'Trabalho em casa', emoji: '🤭' },
    { id: 'cuidando-familia', text: 'Em casa cuidando da família', emoji: '👨‍👩‍👦' },
    { id: 'outro', text: 'Outro', emoji: '😶‍🌫️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Como é sua rotina diária?
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Vamos adequar seu plano à sua rotina.
          </p>
          <div className="space-y-4">
            {routines.map(routine => (
              <button 
                key={routine.id} 
                onClick={() => {
                  updateState({ routine: routine.id });
                  nextStep();
                }} 
                className="w-full p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left"
              >
                <span className="text-xl mr-3">{routine.emoji}</span>
                <span className="font-medium">{routine.text}</span>
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

export default Step19Routine;
