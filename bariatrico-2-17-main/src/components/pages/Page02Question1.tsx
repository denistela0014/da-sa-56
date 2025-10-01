import React, { useState, useEffect } from 'react';
import { ProfessionalQuizLayout } from '@/components/layout/ProfessionalQuizLayout';
import { UnifiedQuizQuestion } from '@/components/quiz/UnifiedQuizQuestion';
import { useQuizStep } from '@/hooks/useQuizStep';
import { useQuiz } from '@/contexts/QuizContext';
import { QuizPageProps } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { GLOBAL_CONSTANTS, TRACKING_EVENTS } from '@/config/globalConstants';
import { useToast } from '@/hooks/use-toast';
import { QUIZ_EMOJIS } from '@/constants/quizEmojis';
export const Page02Question1: React.FC<QuizPageProps> = ({
  audio = {}
}) => {
  useQuizStep('Objetivo_Principal');
  const {
    addAnswer,
    nextPage
  } = useQuiz();
  const {
    toast
  } = useToast();
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [startTime] = useState(Date.now());

  // Novas opções de resposta
  const options = [{
    id: "perder_peso",
    goal_id: "weight_loss",
    goal_group: "body",
    text: "Perder peso",
    emoji: QUIZ_EMOJIS.page02.perder_peso
  }, {
    id: "queimar_gordura_figado",
    goal_id: "liver_fat",
    goal_group: "body",
    text: "Queimar gordura no fígado",
    emoji: QUIZ_EMOJIS.page02.queimar_gordura_figado
  }, {
    id: "eliminar_retencao",
    goal_id: "fluid_retention",
    goal_group: "body",
    text: "Eliminar a retenção de líquidos",
    emoji: QUIZ_EMOJIS.page02.eliminar_retencao
  }, {
    id: "acelerar_metabolismo",
    goal_id: "metabolism",
    goal_group: "energy",
    text: "Acelerar o metabolismo",
    emoji: QUIZ_EMOJIS.page02.acelerar_metabolismo
  }, {
    id: "expectativa_vida",
    goal_id: "life_expectancy",
    goal_group: "health",
    text: "Aumento na expectativa de vida",
    emoji: QUIZ_EMOJIS.page02.expectativa_vida
  }, {
    id: "emagrecer_menopausa",
    goal_id: "menopause_weight",
    goal_group: "health",
    text: "Emagrecer na menopausa",
    emoji: QUIZ_EMOJIS.page02.emagrecer_menopausa
  }, {
    id: "acabar_besteira",
    goal_id: "cravings_control",
    goal_group: "habits",
    text: "Acabar com desejo de comer besteira",
    emoji: QUIZ_EMOJIS.page02.acabar_besteira
  }, {
    id: "reduzir_colesterol",
    goal_id: "cholesterol",
    goal_group: "health",
    text: "Redução nos níveis de colesterol",
    emoji: QUIZ_EMOJIS.page02.reduzir_colesterol
  }];

  // Carregar seleção do localStorage ao inicializar
  useEffect(() => {
    const savedData = localStorage.getItem('lm_goal');
    if (savedData) {
      try {
        const goalData = JSON.parse(savedData);
        setSelectedGoal(goalData.goal_id || '');
      } catch (e) {
        // Handle invalid JSON
      }
    }
  }, []);
  const handleOptionSelect = (optionId: string) => {
    const option = options.find(opt => opt.id === optionId);
    if (!option) return;
    setSelectedGoal(option.goal_id);

    // Persistir objeto completo no localStorage
    const goalData = {
      goal_id: option.goal_id,
      goal_label: option.text,
      goal_group: option.goal_group,
      is_other: false,
      goal_other: '',
      ts: Date.now()
    };
    localStorage.setItem('lm_goal', JSON.stringify(goalData));

    // Salvar no contexto do quiz
    addAnswer('Objetivo_Principal', option.goal_id);

    // Audio feedback
    audio.onSelect?.();

    // Tracking goal_selected com guard
    if (typeof window !== 'undefined' && window.gtag) {
      const timeOnStep = Date.now() - startTime;

      // Guard contra tracking duplicado
      const lastTrackTime = parseInt(localStorage.getItem('last_goal_track') || '0');
      if (Date.now() - lastTrackTime < 500) return;
      localStorage.setItem('last_goal_track', Date.now().toString());
      window.gtag('event', 'goal_selected', {
        goal_id: option.goal_id,
        goal_label: option.text,
        goal_group: option.goal_group,
        is_other: false,
        ts: Date.now()
      });
    }

    // Não auto-avançar, aguardar clique no botão "Continuar"
  };
  return <ProfessionalQuizLayout headerTitle="Meu perfil" showBackButton={false}>
      <div className="space-y-6 max-w-lg mx-auto px-4">
        {/* Título e subtítulo */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Qual é o objetivo com seu corpo?
          </h1>
          <p className="text-sm text-muted-foreground underline">
            Escolha seus maiores interesses abaixo:
          </p>
        </div>

        {/* Fieldset com opções em grid 2x4 */}
        <fieldset className="space-y-4">
          <legend className="sr-only">Qual é o objetivo com seu corpo?</legend>
          <div className="grid grid-cols-2 gap-4">
            {options.map(option => {
            const isSelected = selectedGoal === option.goal_id;
            return <div key={option.id}>
                  {/* Label acessível com radio button no estilo da imagem */}
                  <label className={`
                      w-full h-[100px] p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                      focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2
                      flex items-center gap-3 text-left bg-white hover:bg-gray-50
                      ${isSelected ? 'border-green-500 bg-green-50' : 'border-green-400 hover:border-green-500'}
                    `}>
                    <input 
                      type="radio" 
                      name="objetivo" 
                      value={option.goal_id} 
                      checked={isSelected} 
                      onChange={() => handleOptionSelect(option.id)} 
                      className="sr-only" 
                    />
                    {/* Radio button visual */}
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
                      ${isSelected ? 'border-green-500 bg-white' : 'border-gray-300 bg-white'}
                    `}>
                      {isSelected && (
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      )}
                    </div>
                    {/* Texto da opção */}
                    <span className="text-sm font-medium text-gray-800 leading-tight flex-1">
                      {option.text}
                    </span>
                  </label>
                </div>;
          })}
          </div>
        </fieldset>

        {/* Botão Continuar */}
        {selectedGoal && (
          <div className="pt-4">
            <button
              onClick={() => {
                const option = options.find(opt => opt.goal_id === selectedGoal);
                if (option) {
                  // Tracking cta_click_next
                  if (typeof window !== 'undefined' && window.gtag) {
                    const timeOnStep = Date.now() - startTime;
                    window.gtag('event', 'cta_click_next', {
                      goal_id: option.goal_id,
                      goal_label: option.text,
                      goal_group: option.goal_group,
                      ab_variant: localStorage.getItem('ab_variant') || 'default',
                      step: 'P02',
                      time_on_step_ms: timeOnStep
                    });
                  }
                  audio.onNext?.();
                  nextPage();
                }
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-2xl transition-colors duration-200 text-lg"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </ProfessionalQuizLayout>;
};