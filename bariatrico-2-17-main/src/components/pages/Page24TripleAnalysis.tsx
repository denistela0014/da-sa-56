import React, { useState, useEffect } from 'react';
import { ProfessionalQuizLayout } from '@/components/layout/ProfessionalQuizLayout';
import { useQuiz } from '@/contexts/QuizContext';
import { useQuizStep } from '@/hooks/useQuizStep';
import { CheckCircle2, UserCheck, Activity, BarChart3 } from 'lucide-react';
import { QuizPageProps } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { NewInformationalPage } from '@/components/ui/NewInformationalPage';
interface AnalysisStep {
  label: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  completed: boolean;
}
export const Page24TripleAnalysis: React.FC<QuizPageProps> = ({
  audio = {}
}) => {
  useQuizStep('Analise_Tripla');
  const {
    nextPage,
    userInfo
  } = useQuiz();
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [analyses, setAnalyses] = useState<AnalysisStep[]>([{
    label: "Análise Corporal",
    description: "IMC e composição",
    icon: <BarChart3 className="w-4 h-4" />,
    progress: 0,
    completed: false
  }, {
    label: "Avaliação Nutricional",
    description: "Análise especializada",
    icon: <UserCheck className="w-4 h-4" />,
    progress: 0,
    completed: false
  }, {
    label: "Cálculo Metabólico",
    description: "Taxa metabólica",
    icon: <Activity className="w-4 h-4" />,
    progress: 0,
    completed: false
  }]);
  useEffect(() => {
    audio.onEnter?.();
    const animateProgress = async () => {
      for (let i = 0; i < analyses.length; i++) {
        setCurrentStep(i);
        await animateStep(i);
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      setOverallProgress(100);
      setTimeout(() => {
        setShowResults(true);
        audio.onReveal?.();
      }, 1000);
    };
    const animateStep = (stepIndex: number) => {
      return new Promise<void>(resolve => {
        const duration = 1800;
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration * 100, 100);
          setAnalyses(prev => prev.map((analysis, index) => index === stepIndex ? {
            ...analysis,
            progress: Math.round(progress)
          } : analysis));
          setOverallProgress((stepIndex + progress / 100) / analyses.length * 100);
          if (progress < 100) {
            requestAnimationFrame(animate);
          } else {
            setAnalyses(prev => prev.map((analysis, index) => index === stepIndex ? {
              ...analysis,
              progress: 100,
              completed: true
            } : analysis));
            resolve();
          }
        };
        animate();
      });
    };
    const timer = setTimeout(animateProgress, 800);
    return () => clearTimeout(timer);
  }, [analyses.length]);
  return <ProfessionalQuizLayout showBackButton={false}>
      {!showResults ?
    // Análise em progresso - versão compacta e leve
    <div className="space-y-4 animate-fade-in">
          {/* Header simples */}
          <div className="text-center space-y-3">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-primary" />
            </div>
            
            <div className="space-y-1">
              <h1 className="text-xl font-bold text-foreground">
                {userInfo.name && `${userInfo.name}, `}analisando suas respostas
              </h1>
              <p className="text-sm text-muted-foreground">
                Processando dados para seu plano personalizado
              </p>
            </div>
          </div>

          {/* Progress principal compacto */}
          <div className="max-w-sm mx-auto space-y-3">
            <div className="text-center">
              <span className="text-sm font-medium text-primary">
                {Math.round(overallProgress)}% concluído
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1200 ease-out ${overallProgress === 100 ? 'bg-emerald-500' : 'bg-primary'}`} style={{
            width: `${overallProgress}%`
          }} />
            </div>
          </div>

          {/* Análises compactas */}
          <div className="space-y-3">
            {analyses.map((analysis, index) => <div key={analysis.label} className={`
                bg-background rounded-lg border p-3 transition-all duration-300
                ${index === currentStep && !analysis.completed ? 'border-primary shadow-sm' : analysis.completed ? 'border-emerald-500/30 bg-emerald-50/50' : 'border-border'}
              `}>
                <div className="flex items-center gap-3">
                  {/* Ícone simples */}
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${analysis.completed ? 'bg-emerald-500 text-white' : index === currentStep ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}
                  `}>
                    {analysis.completed ? <CheckCircle2 className="w-4 h-4" /> : React.cloneElement(analysis.icon as React.ReactElement, {
                className: "w-4 h-4"
              })}
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-foreground">
                        {analysis.label}
                      </h3>
                      {(index === currentStep || analysis.completed) && <span className="text-xs font-medium text-primary">
                          {analysis.progress}%
                        </span>}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {analysis.description}
                    </p>
                    
                    {/* Barra de progresso simples */}
                    {(index === currentStep || analysis.completed) && <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1200 ease-out ${analysis.completed ? 'bg-emerald-500' : 'bg-primary'}`} style={{
                  width: `${analysis.progress}%`
                }} />
                      </div>}
                  </div>
                </div>
                
                {/* Dados técnicos compactos */}
                {analysis.completed && <div className="mt-2 pt-2 border-t border-muted/50 text-xs text-center">
                    {index === 0 && userInfo.height && userInfo.weight && <span className="text-primary font-medium">
                        {userInfo.height}cm | {userInfo.weight}kg
                      </span>}
                    {index === 1}
                    {index === 2 && <span className="text-primary font-medium">Algoritmo Concluído</span>}
                  </div>}
              </div>)}
          </div>

          {/* Footer simples */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <div>Análise baseada em evidências científicas</div>
          </div>
        </div> :
    // Nova página informativa pós-análise
    <NewInformationalPage userInfo={userInfo} onNext={() => {
      audio.onNext?.();
      nextPage();
    }} />}
    </ProfessionalQuizLayout>;
};