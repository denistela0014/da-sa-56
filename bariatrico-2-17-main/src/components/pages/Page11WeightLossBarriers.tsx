import React, { useState, useEffect, useRef } from 'react';
import { ProfessionalQuizLayout } from '@/components/layout/ProfessionalQuizLayout';
import { useQuizStep } from '@/hooks/useQuizStep';
import { useQuiz } from '@/contexts/QuizContext';
import { Heart } from 'lucide-react';
import { QuizPageProps } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { QUIZ_EMOJIS } from '@/constants/quizEmojis';
export const Page11WeightLossBarriers: React.FC<QuizPageProps> = ({
  audio = {}
}) => {
  useQuizStep('Satisfacao_Aparencia_Fisica');
  const {
    addAnswer,
    nextPage
  } = useQuiz();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const startTimeRef = useRef(Date.now());

  // Ordered options as requested
  const options = [{
    id: "insatisfeita_acima_peso",
    text: "Não, porque me sinto acima do peso e isso afeta minha autoestima",
    emoji: QUIZ_EMOJIS.page11.insatisfeita_acima_peso
  }, {
    id: "satisfeita_pode_melhorar",
    text: "Sim, mas sei que posso melhorar minha saúde",
    emoji: QUIZ_EMOJIS.page11.satisfeita_pode_melhorar
  }, {
    id: "perder_peso_bem_estar",
    text: "Não, gostaria de perder peso para melhorar meu bem-estar",
    emoji: QUIZ_EMOJIS.page11.perder_peso_bem_estar
  }, {
    id: "nao_corresponde_objetivos",
    text: "Não, minha aparência física não corresponde aos meus objetivos de saúde",
    emoji: QUIZ_EMOJIS.page11.nao_corresponde_objetivos
  }];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('satisfacao_aparencia');
    if (saved) {
      setSelectedOption(saved);
    }
  }, []);

  // Save to localStorage and track changes
  useEffect(() => {
    if (selectedOption) {
      localStorage.setItem('satisfacao_aparencia', selectedOption);

      // Track selection
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'appearance_satisfaction_selected', {
          option: selectedOption,
          page: 'P11'
        });
      }
    }
  }, [selectedOption]);
  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);

    // Track selection
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'appearance_option_selected', {
        page: 'P11',
        option: optionId
      });
    }
    audio.onSelect?.();

    // Auto advance after selection with 800ms delay
    setTimeout(() => {
      audio.onValid?.();
      addAnswer('satisfacao_aparencia', optionId);
      setTimeout(() => {
        audio.onNext?.();
        nextPage();
      }, 200);
    }, 800);
  };
  const handleContinue = () => {
    if (!selectedOption) {
      toast.error("Selecione uma opção para continuar", {
        duration: 2500
      });
      audio.onInvalid?.();
      return;
    }

    // Track continue click
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'continue_clicked', {
        from: 'P11',
        selected: selectedOption
      });
    }

    // Save answer
    addAnswer('satisfacao_aparencia', selectedOption);
    audio.onValid?.();
    setTimeout(() => {
      audio.onNext?.();
      nextPage();
    }, 200);
  };
  return <ProfessionalQuizLayout headerTitle="Análise pessoal">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          
          <h1 id="appearance-title" className="text-2xl font-bold text-foreground">
            Você se sente satisfeita com a sua aparência física atual?
          </h1>
          
        </div>

        <div role="group" aria-labelledby="appearance-title" className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
          {options.map(option => {
          const isSelected = selectedOption === option.id;
          return <div key={option.id} role="button" aria-pressed={isSelected} tabIndex={0} className={`
                  flex items-start gap-4 p-4 rounded-lg border cursor-pointer transition-all
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                  ${isSelected ? 'bg-primary/5 border-primary text-primary' : 'bg-card border-border hover:border-primary/50'}
                `} onClick={() => handleOptionSelect(option.id)} onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleOptionSelect(option.id);
            }
          }}>
                <div className="mt-1 text-2xl">
                  {option.emoji}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-sm leading-relaxed">
                    {option.text}
                  </span>
                </div>
                <div className={`
                  w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center mt-1
                  ${isSelected ? 'bg-primary border-primary text-primary-foreground' : 'border-gray-400 bg-white'}
                `}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
              </div>;
        })}
        </div>

        <div className="flex justify-center pt-4">
          
        </div>
      </div>
    </ProfessionalQuizLayout>;
};