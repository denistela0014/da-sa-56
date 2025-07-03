import React from 'react';
interface QuizState {
  height: string;
}
interface Step18HeightProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step18Height: React.FC<Step18HeightProps> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const heights = [{
    id: '1.40-1.50',
    text: '1.40 a 1.50',
    emoji: '🙋‍♀️'
  }, {
    id: '1.51-1.60',
    text: '1.51 a 1.60',
    emoji: '🙋‍♀️'
  }, {
    id: '1.61-1.70',
    text: '1.61 a 1.70',
    emoji: '🙋‍♀️'
  }, {
    id: '1.71-1.80+',
    text: '1.71 a 1.80+',
    emoji: '🙋‍♀️'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Selecione sua altura abaixo
            </h2>
          </div>
          <p className="text-center text-gray-700 mb-8">
            Vamos criar seu plano baseado na sua altura!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {heights.map(height => <button key={height.id} onClick={() => {
            updateState({
              height: height.id
            });
            nextStep();
          }} className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 text-left">
                <span className="text-xl mr-3">{height.emoji}</span>
                <span className="font-medium">{height.text}</span>
              </button>)}
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Calculando seu Índice de Massa Corporal</strong><br />
              IMC é amplamente usado como fator de risco para vários problemas de saúde.
            </p>
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>;
};
export default Step18Height;