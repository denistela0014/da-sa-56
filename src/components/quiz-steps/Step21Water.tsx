
import React from 'react';

interface QuizState {
  water: string;
}

interface Step21WaterProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}

const Step21Water: React.FC<Step21WaterProps> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const waterOptions = [
    { id: 'cha-cafe', text: 'Apenas chá ou café', emoji: '☕' },
    { id: '1-2-copos', text: '1–2 copos', emoji: '🚰' },
    { id: '2-6-copos', text: '2–6 copos', emoji: '🚰' },
    { id: 'mais-6-copos', text: 'Mais de 6 copos', emoji: '🚰' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Quanta água você bebe diariamente?
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Selecione abaixo.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {waterOptions.map(water => (
              <button 
                key={water.id} 
                onClick={() => {
                  updateState({ water: water.id });
                  nextStep();
                }} 
                className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-center"
              >
                <span className="text-2xl block mb-2">{water.emoji}</span>
                <span className="font-medium">{water.text}</span>
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

export default Step21Water;
