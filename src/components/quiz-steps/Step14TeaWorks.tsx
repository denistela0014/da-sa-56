
import React from 'react';

interface Step14Props {
  nextStep: () => void;
  userName?: string;
}

const Step14TeaWorks: React.FC<Step14Props> = ({
  nextStep,
  userName
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-lg p-8 mb-8">
            
            {/* Primeiro texto sem destaque */}
            <p className="text-green-700 mb-4 text-xl">
              {userName}, temos a solução perfeita para você!
            </p>
            
            {/* Segundo texto com destaque */}
            <p className="text-green-800 font-bold mb-6 text-2xl">
              Nosso protocolo resolve isso para você!
            </p>
            
            {/* Imagem em tamanho original com sombreamento discreto */}
            <div className="mb-6">
              <img 
                src="https://beliza0014.github.io/imagens-site/cha-funciona.png" 
                alt="Como funciona o chá - processo de queima de gordura" 
                className="mx-auto max-w-full h-auto shadow-lg" 
              />
            </div>
            
            {/* Texto em destaque abaixo da imagem */}
            <p className="text-green-800 font-bold text-2xl">
              Nosso protocolo funciona enquanto você dorme, queimando gordura rapidamente!
            </p>
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

export default Step14TeaWorks;
