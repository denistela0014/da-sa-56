import React from 'react';
interface QuizState {
  currentWeight: string;
}
interface Step17CurrentWeightProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step17CurrentWeight: React.FC<Step17CurrentWeightProps> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const weightRanges = [{
    id: '50-69',
    text: '50kg–69kg'
  }, {
    id: '70-89',
    text: '70kg–89kg'
  }, {
    id: '90-100',
    text: '90kg–100kg'
  }, {
    id: '100+',
    text: '100kg+'
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 text-center">
              Selecione seu peso atual abaixo
            </h2>
          </div>
          <p className="text-center text-gray-700 mb-8">
            Vamos construir seu plano baseado no seu peso!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {weightRanges.map(range => <button key={range.id} onClick={() => {
            updateState({
              currentWeight: range.id
            });
            nextStep();
          }} className="p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex flex-col items-center">
                <div className="mb-4">
                  <img src="https://beliza0014.github.io/imagens-site/balanca-fita.png" alt="Balança com fita métrica" className="max-w-full h-auto" />
                </div>
                <span className="font-bold text-lg">{range.text}</span>
              </button>)}
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              📋 <strong>Calculando seu Índice de Massa Corporal</strong><br />
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
export default Step17CurrentWeight;