
import React from 'react';

interface QuizState {
  userName: string;
}

interface Step26PersonalizedMessageProps {
  quizState: QuizState;
  nextStep: () => void;
}

const Step26PersonalizedMessage: React.FC<Step26PersonalizedMessageProps> = ({
  quizState,
  nextStep
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white border-4 border-green-400 rounded-lg p-8 shadow-lg mb-8">
            <h2 className="text-lg font-bold text-gray-800 leading-relaxed">
              {quizState.userName && `${quizState.userName}, `}não se preocupe—vamos adaptar as receitas para que você possa queimar gordura com segurança e facilidade! ❤️
            </h2>
          </div>
          <button onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300">
            Continuar
          </button>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
      </footer>
    </div>
  );
};

export default Step26PersonalizedMessage;
