import React, { useState, memo } from 'react';
import OptimizedImage from '../ui/optimized-image';
interface QuizState {
  desiredBody: string;
}
interface Step27DesiredBodyProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}
const Step27DesiredBody: React.FC<Step27DesiredBodyProps> = memo(({
  quizState,
  updateState,
  nextStep
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const handleBodySelection = (bodyType: string) => {
    updateState({
      desiredBody: bodyType
    });
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
            <p className="text-xl font-semibold text-gray-700">Analisando resposta...</p>
          </div>
        </div>
        <footer className="text-black text-center py-4 px-4">
          <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
        </footer>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Escolha o corpo que você quer ter para criarmos seu Plano.
          </h2>
          <p className="text-center text-gray-700 mb-8">
            Selecione abaixo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => handleBodySelection('fit')} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-all duration-300">
              <div className="text-center">
                <div className="mb-4 rounded-lg overflow-hidden">
                  <OptimizedImage src="https://beliza0014.github.io/imagens-site/corpo-fitness.jpg" alt="Corpo Fitness" className="w-full h-48 object-cover" loading="lazy" />
                </div>
                <div className="bg-gradient-to-r from-pink-100 to-pink-200 rounded-lg p-4 mb-4">
                  <p className="text-pink-800 font-semibold">Corpo Natural</p>
                </div>
                
              </div>
            </button>
            <button onClick={() => handleBodySelection('slim')} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-green-500 hover:bg-green-50 transition-all duration-300">
              <div className="text-center">
                <div className="mb-4 rounded-lg overflow-hidden">
                  <OptimizedImage src="https://beliza0014.github.io/imagens-site/corpo-esbelto.jpg" alt="Corpo Esbelto" className="w-full h-48 object-cover" loading="lazy" />
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg p-4 mb-4">
                  <p className="text-purple-800 font-semibold">Corpo Definido</p>
                </div>
                
              </div>
            </button>
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>;
});
Step27DesiredBody.displayName = 'Step27DesiredBody';
export default Step27DesiredBody;