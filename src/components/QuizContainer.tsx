import React, { useState } from 'react';
import QuizStepsRemaining from './QuizStepsRemaining';

interface QuizState {
  currentStep: number;
  userName: string;
  goals: string[];
  fatAreas: string[];
  age: string;
  weightGoal: number;
  bodyType: string;
  relationshipImpact: string;
  appearance: string;
  difficulties: string[];
  timeBarrier: string;
  benefits: string[];
  currentWeight: string;
  height: string;
  routine: string;
  sleep: string;
  water: string;
  fruits: string[];
  hasHealthConditions: boolean;
  healthCondition: string;
  desiredBody: string;
}

const Step1Home = ({ nextStep }: { nextStep: () => void }) => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Descubra o poder deste Chá clicando abaixo.
        </h1>
        <div className="mb-6">
          <img
            src="https://beliza0014.github.io/imagens-site/home-cha-rotina.png"
            alt="Rotina dos Chás Emagrecedores"
            className="max-w-full h-auto mx-auto shadow-lg rounded-lg"
            style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
          />
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Faça sua avaliação de 1 minuto e pegue sua receita personalizada 👇
        </p>
        <button
          id="btn-start"
          onClick={nextStep}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg animate-pulse hover:animate-none transition-all duration-300 shadow-lg"
        >
          Quero minha receita
        </button>
      </div>
    </div>
    <footer className="text-black text-center py-4 px-4">
      <p className="text-sm">
        © 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.
      </p>
    </footer>
  </div>
);

const Step2UserGoals = ({
  quizState,
  updateState,
  toggleArrayItem,
  nextStep,
}: {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  toggleArrayItem: (array: string[], item: string) => string[];
  nextStep: () => void;
}) => {
  const goalOptions = [
    { id: 'perder-peso', text: 'Perder peso', emoji: '🧘‍♀️' },
    { id: 'queimar-gordura', text: 'Queimar gordura no fígado', emoji: '🔥' },
    { id: 'acelerar-metabolismo', text: 'Acelerar o metabolismo', emoji: '⚡' },
    { id: 'eliminar-retencao', text: 'Eliminar a retenção de líquidos', emoji: '💧' },
    { id: 'aumentar-expectativa', text: 'Aumentar a expectativa de vida', emoji: '💖' },
    { id: 'emagrecer-menopausa', text: 'Emagrecer na menopausa', emoji: '🌸' },
    { id: 'acabar-desejo', text: 'Acabar com o desejo de comer besteira', emoji: '🚫' },
    { id: 'reduzir-colesterol', text: 'Redução nos níveis de colesterol', emoji: '🩸' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Qual é o seu objetivo?</h2>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {goalOptions.map((goal) => (
              <button
                key={goal.id}
                onClick={() =>
                  updateState({
                    goals: toggleArrayItem(quizState.goals, goal.id),
                  })
                }
                className={`p-3 rounded-lg border-2 text-left transition-all duration-300 ${
                  quizState.goals.includes(goal.id)
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <span className="text-xl mb-2">{goal.emoji}</span>
                  <span className="font-medium text-sm leading-tight">{goal.text}</span>
                </div>
              </button>
            ))}
          </div>
          {quizState.goals.length > 0 && (
            <div className="text-center">
              <button
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">
          © 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.
        </p>
      </footer>
    </div>
  );
};

const Step3MotivationBox = ({ nextStep }: { nextStep: () => void }) => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-white border-4 border-green-400 rounded-lg p-8 shadow-lg mb-8">
          <h2 className="text-lg font-bold text-gray-800 leading-relaxed">
            Você está um passo do chá perfeito! Responda ao quiz hoje e receba uma receita personalizada que vai transformar seu momento. Aproveite agora!
          </h2>
        </div>
        <button
          onClick={nextStep}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg animate-pulse hover:animate-none transition-all duration-300"
        >
          Continuar
        </button>
      </div>
    </div>
    <footer className="text-black text-center py-4 px-4">
      <p className="text-sm">
        © 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.
      </p>
    </footer>
  </div>
);

const Step4FatLocation = ({
  quizState,
  updateState,
  toggleArrayItem,
  nextStep,
}: {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  toggleArrayItem: (array: string[], item: string) => string[];
  nextStep: () => void;
}) => {
  const fatAreas = [
    { id: 'barriga', text: 'Barriga', number: '1' },
    { id: 'culotes', text: 'Culotes', number: '2' },
    { id: 'pernas', text: 'Pernas', number: '3' },
    { id: 'bracos', text: 'Braços', number: '4' },
    { id: 'pochete', text: 'Pochete', number: '5' },
    { id: 'coxas', text: 'Coxas', number: '6' },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Em qual parte do corpo você quer perder gordura?
          </h2>

          {/* Image with labels */}
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://beliza0014.github.io/imagens-site/local-gordura-corpo.png"
              alt="Áreas do corpo para perda de gordura"
              className="max-w-full h-auto mx-auto"
              style={{ maxHeight: '500px' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {fatAreas.map((area) => (
              <button
                key={area.id}
                onClick={() =>
                  updateState({
                    fatAreas: toggleArrayItem(quizState.fatAreas, area.id),
                  })
                }
                className={`p-6 rounded-lg border-2 text-center font-medium transition-all duration-300 ${
                  quizState.fatAreas.includes(area.id)
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 bg-white hover:border-green-300'
                }`}
              >
                <span className="text-blue-500 font-bold mr-2">{area.number}.</span>
                {area.text}
              </button>
            ))}
          </div>
          {quizState.fatAreas.length > 0 && (
            <div className="text-center">
              <button
                onClick={nextStep}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">
          © 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.
        </p>
      </footer>
    </div>
  );
};

const Step5AgeSelection = ({
  updateState,
  nextStep,
}: {
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}) => {
  const ageRanges = [
    { id: '18-25', text: '18–25', image: 'https://beliza0014.github.io/imagens-site/idade-18-25.png' },
    { id: '26-35', text: '26–35', image: 'https://beliza0014.github.io/imagens-site/idade-26-35.png' },
    { id: '36-45', text: '36–45', image: 'https://beliza0014.github.io/imagens-site/idade-36-45.png' },
    { id: '46+', text: '46+', image: 'https://beliza0014.github.io/imagens-site/idade-46mais.png' },
  ];

  // Preload images for faster loading
  React.useEffect(() => {
    ageRanges.forEach((range) => {
      const img = new Image();
      img.src = range.image;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-4">📋</p>
            <h2 className="text-xl font-bold text-gray-800">
              Vamos criar um Plano Personalizado de Emagrecimento com base em Chás adaptado às suas necessidades. Selecione sua idade abaixo:
            </h2>
          </div>

          {/* 2x2 Grid with optimized images */}
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {ageRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => {
                  updateState({ age: range.id });
                  nextStep();
                }}
                className="bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 p-4 flex flex-col items-center justify-center overflow-hidden"
                style={{ minHeight: '200px' }}
              >
                <div className="flex flex-col items-center justify-center h-full space-y-3">
                  <img
                    src={range.image}
                    alt={`Faixa etária ${range.text}`}
                    className="w-full h-32 object-contain rounded-lg flex-shrink-0"
                    loading="eager"
                    decoding="async"
                    style={{ 
                      maxWidth: '100%',
                      height: 'auto',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  <span className="font-bold text-lg text-gray-800 text-center">{range.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className="text-black text-center py-4 px-4">
        <p className="text-sm">
          © 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.
        </p>
      </footer>
    </div>
  );
};

const Step6WeightGoal = ({
  quizState,
  updateState,
  nextStep,
  calculateDays,
}: {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
  calculateDays: (weight: number) => number;
}) => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="border-4 border-green-500 rounded-lg p-6 bg-green-50">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Calculadora de Meta de Peso</h2>
          <p className="text-center text-gray-600 mb-8">Quantos quilos você quer perder?</p>
          <div className="mb-6">
            <input
              type="number"
              min="1"
              placeholder="Digite o peso que quer perder"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-center text-lg focus:border-green-500 focus:outline-none"
              value={quizState.weightGoal || ''}
              onChange={(e) =>
                updateState({
                  weightGoal: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
        {quizState.weightGoal > 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6 mt-6">
            <p className="text-green-800 text-center">
              Para perder {quizState.weightGoal}kg, levará aproximadamente {calculateDays(quizState.weightGoal)} dias usando nossos Chás para Emagrecimento.
            </p>
          </div>
        )}
        {quizState.weightGoal > 0 && (
          <div className="text-center">
            <button
              onClick={nextStep}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
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

const Step7UserName = ({
  quizState,
  updateState,
  nextStep,
}: {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}) => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto text-center">
        <div className="border-4 border-green-500 rounded-lg p-6 bg-green-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Vamos lá! Como devo te chamar?</h2>
          <div className="mb-8">
            <input
              type="text"
              placeholder="Digite seu primeiro nome"
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-center text-lg focus:border-green-500 focus:outline-none"
              value={quizState.userName}
              onChange={(e) =>
                updateState({
                  userName: e.target.value,
                })
              }
            />
          </div>
          {quizState.userName.trim() && (
            <button
              id="btn-send-name"
              onClick={nextStep}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
            >
              Enviar
            </button>
          )}
        </div>
      </div>
    </div>
    <footer className="text-black text-center py-4 px-4">
      <p className="text-sm">© 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.</p>
    </footer>
  </div>
);

const Step8BodyType = ({
  quizState,
  updateState,
  nextStep,
}: {
  quizState: QuizState;
  updateState: (updates: Partial<QuizState>) => void;
  nextStep: () => void;
}) => {
  const bodyTypes = [
    { 
      id: 'barriga-falsa', 
      text: 'Barriga falsa',
      image: 'https://beliza0014.github.io/imagens-site/tipo-corpo-barriga-falsa.png'
    },
    { 
      id: 'regular', 
      text: 'Regular',
      image: 'https://beliza0014.github.io/imagens-site/tipo-corpo-regular.png'
    },
    { 
      id: 'flacida', 
      text: 'Flácida',
      image: 'https://beliza0014.github.io/imagens-site/tipo-corpo-flacida.png'
    },
    { 
      id: 'sobrepeso', 
      text: 'Sobrepeso',
      image: 'https://beliza0014.github.io/imagens-site/tipo-corpo-sobrepeso.png'
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto pt-8">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-8">
            {quizState.userName && `${quizState.userName}, `}encontre o Chá que funciona para seu tipo de corpo. Selecione seu tipo corporal abaixo.
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {bodyTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  updateState({
                    bodyType: type.id,
                  });
                  nextStep();
                }}
                className="bg-white border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all duration-300 p-6 flex flex-col items-center"
              >
                <div className="mb-4">
                  <img
                    src={type.image}
                    alt={type.text}
                    className="w-full h-auto rounded-lg"
                    style={{ maxWidth: '200px' }}
                  />
                </div>
                <span className="font-medium text-lg text-center">{type.text}</span>
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

const QuizContainer = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    userName: '',
    goals: [],
    fatAreas: [],
    age: '',
    weightGoal: 0,
    bodyType: '',
    relationshipImpact: '',
    appearance: '',
    difficulties: [],
    timeBarrier: '',
    benefits: [],
    currentWeight: '',
    height: '',
    routine: '',
    sleep: '',
    water: '',
    fruits: [],
    hasHealthConditions: false,
    healthCondition: '',
    desiredBody: '',
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const nextStep = () => {
    setQuizState((prev) => ({
      ...prev,
      currentStep: prev.currentStep + 1,
    }));
  };

  const skipToStep = (step: number) => {
    setQuizState((prev) => ({
      ...prev,
      currentStep: step,
    }));
  };

  const updateState = (updates: Partial<QuizState>) => {
    setQuizState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
  };

  const analyzeResponses = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      nextStep();
    }, 3000);
  };

  const calculateDays = (weight: number): number => {
    return Math.ceil((weight / 1.5) * 5);
  };

  // Loading/Analyzing state
  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-gray-700">Analisando suas respostas...</p>
          </div>
        </div>
        <footer className="bg-black text-white text-center py-4 px-4">
          <p className="text-sm">
            © 2025 Dra. Alice Moreira – Nutricionista. Todos os direitos reservados. Site oficial.
          </p>
        </footer>
      </div>
    );
  }

  switch (quizState.currentStep) {
    case 1:
      return <Step1Home nextStep={nextStep} />;
    case 2:
      return (
        <Step2UserGoals
          quizState={quizState}
          updateState={updateState}
          toggleArrayItem={toggleArrayItem}
          nextStep={nextStep}
        />
      );
    case 3:
      return <Step3MotivationBox nextStep={nextStep} />;
    case 4:
      return (
        <Step4FatLocation
          quizState={quizState}
          updateState={updateState}
          toggleArrayItem={toggleArrayItem}
          nextStep={nextStep}
        />
      );
    case 5:
      return <Step5AgeSelection updateState={updateState} nextStep={nextStep} />;
    case 6:
      return (
        <Step6WeightGoal
          quizState={quizState}
          updateState={updateState}
          nextStep={nextStep}
          calculateDays={calculateDays}
        />
      );
    case 7:
      return <Step7UserName quizState={quizState} updateState={updateState} nextStep={nextStep} />;
    case 8:
      return <Step8BodyType quizState={quizState} updateState={updateState} nextStep={nextStep} />;
    default:
      if (quizState.currentStep >= 9) {
        return (
          <QuizStepsRemaining
            quizState={quizState}
            updateState={updateState}
            nextStep={nextStep}
            skipToStep={skipToStep}
            toggleArrayItem={toggleArrayItem}
            analyzeResponses={analyzeResponses}
          />
        );
      }
      return <div>Etapa {quizState.currentStep} em desenvolvimento...</div>;
  }
};

export default QuizContainer;
