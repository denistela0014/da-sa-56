
import React, { memo } from 'react';
import OptimizedImage from '../ui/optimized-image';

interface QuizState {
  fruits: string[];
}

interface Step22FruitsProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
  toggleArrayItem: (array: string[], item: string) => string[];
}

const Step22Fruits: React.FC<Step22FruitsProps> = memo(({
  quizState,
  updateState,
  nextStep,
  toggleArrayItem
}) => {
  const fruitOptions = [
    { id: 'limao', text: 'Limão', image: 'https://beliza0014.github.io/imagens-site/limao.png' },
    { id: 'laranja', text: 'Laranja', image: 'https://beliza0014.github.io/imagens-site/laranja.png' },
    { id: 'banana', text: 'Banana', image: 'https://beliza0014.github.io/imagens-site/banana.png' },
    { id: 'maca', text: 'Maçã', image: 'https://beliza0014.github.io/imagens-site/maca.png' },
    { id: 'morango', text: 'Morango', image: 'https://beliza0014.github.io/imagens-site/morango.png' },
    { id: 'abacaxi', text: 'Abacaxi', image: 'https://beliza0014.github.io/imagens-site/abacaxi.png' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Qual dessas frutas você prefere diariamente?
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Selecione uma fruta abaixo.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {fruitOptions.map(fruit => (
              <button 
                key={fruit.id} 
                onClick={() => updateState({
                  fruits: toggleArrayItem(quizState.fruits, fruit.id)
                })} 
                className={`p-6 rounded-lg border-2 text-center font-medium transition-all duration-300 ${
                  quizState.fruits.includes(fruit.id) 
                    ? 'border-green-500 bg-green-50 text-green-800' 
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="mb-4 flex justify-center">
                  <OptimizedImage 
                    src={fruit.image} 
                    alt={fruit.text} 
                    className="max-w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <span className="font-bold text-lg">{fruit.text}</span>
              </button>
            ))}
          </div>
          {quizState.fruits.length > 0 && (
            <div className="text-center">
              <button onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
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
});

Step22Fruits.displayName = 'Step22Fruits';

export default Step22Fruits;
