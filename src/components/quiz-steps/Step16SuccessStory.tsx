
import React from 'react';

interface Step16SuccessStoryProps {
  nextStep: () => void;
}

const Step16SuccessStory: React.FC<Step16SuccessStoryProps> = ({ nextStep }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">História de Sucesso da Cláudia</h2>
          
          {/* Before/After transformation image */}
          <div className="mb-8 flex justify-center">
            <img 
              src="https://beliza0014.github.io/imagens-site/claudia-transformacao.png" 
              alt="Transformação da Cláudia - Antes e Depois" 
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex flex-col items-center mb-6">
              <img src="https://beliza0014.github.io/imagens-site/claudia-perfil.png" alt="Cláudia" className="w-24 h-24 rounded-full object-cover mb-4" />
              <h3 className="font-bold text-lg">Cláudia, 52 anos</h3>
              <div className="flex text-yellow-400 text-xl mt-2">
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <blockquote className="text-gray-700 italic text-center leading-relaxed">
              "Eliminei 12kg em só 3 meses usando os chás personalizados! Juro que nunca imaginei que dava pra emagrecer de um jeito tão leve e natural. Minha autoestima voltou com tudo — tô me sentindo outra pessoa!"
            </blockquote>
          </div>
          <div className="text-center">
            <button onClick={nextStep} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300">
              Continuar
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

export default Step16SuccessStory;
