import React, { useState } from 'react';
interface QuizState {
  healthCondition: string;
}
interface Step25EnterConditionProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step25EnterCondition: React.FC<Step25EnterConditionProps> = ({
  quizState,
  updateState,
  nextStep
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      nextStep();
    }, 2000);
  };
  if (isAnalyzing) {
    return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
        <div className="flex-1 p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Analisando...</p>
          </div>
        </div>
        <footer className="text-black text-center py-4 px-4">
          <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
        </footer>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Qual condição abaixo? 👇🏻
          </h2>
          <p className="text-gray-600 mb-8">Diabetes, Hipertensão, Asma, Doença cardíaca  etc.</p>
          <div className="mb-8">
            <textarea placeholder="Escreva seu problema aqui" className="w-full p-4 border-2 border-gray-200 rounded-lg text-center focus:border-green-500 focus:outline-none h-24 resize-none" value={quizState.healthCondition} onChange={e => updateState({
            healthCondition: e.target.value
          })} />
          </div>
          {quizState.healthCondition.trim() && <button onClick={handleAnalyze} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300">
              Enviar
            </button>}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>;
};
export default Step25EnterCondition;