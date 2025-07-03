
import React from 'react';

interface QuizState {
  hasHealthConditions: boolean;
}

interface Step24HealthConditionsProps {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
  skipToStep: (step: number) => void;
}

const Step24HealthConditions: React.FC<Step24HealthConditionsProps> = ({
  quizState,
  updateState,
  nextStep,
  skipToStep
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">
            Você tem algum problema de saúde?
          </h2>
          <div className="space-y-6">
            <button 
              onClick={() => {
                updateState({ hasHealthConditions: true });
                nextStep();
              }} 
              className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300"
            >
              <span className="text-2xl mr-4">✅</span>
              <span className="font-medium text-lg">Sim</span>
            </button>
            <button 
              onClick={() => {
                updateState({ hasHealthConditions: false });
                skipToStep(26);
              }} 
              className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300"
            >
              <span className="text-2xl mr-4">❌</span>
              <span className="font-medium text-lg">Não</span>
            </button>
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
};

export default Step24HealthConditions;
