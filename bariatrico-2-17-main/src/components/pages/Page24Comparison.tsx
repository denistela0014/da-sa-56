import React, { useState, useEffect, useRef } from 'react';
import { ProfessionalQuizLayout } from '@/components/layout/ProfessionalQuizLayout';
import { useQuiz } from '@/contexts/QuizContext';
import { useQuizStep } from '@/hooks/useQuizStep';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ChevronRight, Clock, Target, TrendingUp, Zap, Heart, Award } from 'lucide-react';
import { QuizPageProps } from '@/types/quiz';
import { SmartImage } from '@/components/ui/SmartImage';
import { GLOBAL_CONSTANTS } from '@/config/globalConstants';
import { SocialBadges } from '@/components/ui/SocialBadges';
import { useReservationTimer } from '@/hooks/useReservationTimer';
import { trackP20View, trackP20CTAClick, trackTimerExpired, trackProgressBarView, getPersonaFromAnswers } from '@/utils/trackingEnhanced';
export const Page24Comparison: React.FC<QuizPageProps> = ({
  audio = {}
}) => {
  useQuizStep('Comparacao');
  const {
    nextPage,
    userInfo,
    getAnswer
  } = useQuiz();
  const [showComparison, setShowComparison] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Get user's quiz responses (updated keys)
  const genderAnswer = getAnswer('Qual é o seu gênero?');
  const bodyTypeAnswer = getAnswer('Qual seu tipo de corpo?'); // Archived but keep fallback
  const barriersAnswer = getAnswer('barreiras'); // Now string[]
  const routineAnswer = getAnswer('daily_routine'); // Now uses IDs
  const objectiveAnswer = getAnswer('Objetivo_Principal'); // New objective system
  const isUserMale = ['homem', 'masculino', 'm'].includes((genderAnswer?.answer || '').toString().toLowerCase());

  // Stable A/B Test variants (avoid re-render flickering)
  const headlineVariantRef = useRef(Math.random() < 0.5 ? 'A' : 'B');
  const ctaVariantRef = useRef(Math.random() < 0.5 ? 'A' : 'B');
  const headlineVariant = headlineVariantRef.current;
  const ctaVariant = ctaVariantRef.current;

  // Timer system for reservation
  const timer = useReservationTimer({
    initialMinutes: 15,
    pauseOnBlur: true,
    onExpired: () => {
      trackTimerExpired();
    }
  });

  // Enhanced personalization based on quiz responses
  const getPersonalizedContent = () => {
    // A/B Test Headlines
    const headlines = {
      A: userInfo.name ? `${userInfo.name}, seu plano foi gerado com base no seu perfil. ${isUserMale ? 'Pronto' : 'Pronta'} para começar?` : `Seu plano foi gerado com base no seu perfil. ${isUserMale ? 'Pronto' : 'Pronta'} para começar?`,
      B: userInfo.name ? `${userInfo.name}, criamos seu plano ideal para a sua rotina (em 3 min por dia).` : `Criamos seu plano ideal para a sua rotina (em 3 min por dia).`
    };

    // Personalized subtitle based on barriers and routine (updated logic)
    const getPersonalizedSubtitle = () => {
      const persona = getPersonaFromAnswers(getAnswer);
      switch (persona) {
        case 'tempo_apertado':
          return 'Ajustado ao seu tempo limitado — 3 minutos que cabem na sua correria diária';
        case 'controle_impulso':
          return 'Fórmula que reduz a vontade de besteira — você vai se surpreender';
        default:
          return 'Ajustado ao seu tempo, rotina e objetivo — o quiz virou seu passo-a-passo';
      }
    };
    return {
      headline: headlines[headlineVariant as keyof typeof headlines],
      subtitle: getPersonalizedSubtitle(),
      planMessage: 'Com base no seu perfil, criamos um protocolo nutricional simples e eficiente para seus objetivos'
    };
  };
  const personalizedContent = getPersonalizedContent();

  // Same image mapping as Page 7
  const femaleImages = {
    regular: '/lovable-uploads/c24837e6-ee61-4ba9-b6de-9a200a46762d.png',
    barriga_falsa: '/lovable-uploads/57837bef-7591-4ef9-89b1-8e47b0c1eae5.png',
    flacida: '/lovable-uploads/377a8cff-1ed1-469f-980d-ba2699a23f70.png',
    sobrepeso: '/lovable-uploads/40f7afd4-e4e2-4df2-8901-489d1700d3c4.png'
  };
  const maleImages = {
    regular: '/lovable-uploads/9d6020ae-3512-402e-acda-4b8509bdee18.png',
    barriga_falsa: '/lovable-uploads/d6dd4652-ad6e-498c-8155-e875e0910b1f.png',
    flacida: '/lovable-uploads/96f23253-562e-4671-b88e-44f725230de4.png',
    sobrepeso: '/lovable-uploads/a3fb2acc-8c03-4939-b86a-93c5ac1f0efc.png'
  };

  // Map body type text to image key
  const getBodyTypeKey = (bodyType: string) => {
    const mapping: {
      [key: string]: string;
    } = {
      'Regular': 'regular',
      'Barriga Falsa': 'barriga_falsa',
      'Flácida': 'flacida',
      'Sobrepeso': 'sobrepeso'
    };
    return mapping[bodyType] || 'regular';
  };

  // Get the correct "before" image
  const getCurrentBodyImage = () => {
    if (!bodyTypeAnswer?.answer) {
      // Fallback to default if no body type selected
      return isUserMale ? maleImages.regular : femaleImages.regular;
    }
    const bodyTypeKey = getBodyTypeKey(bodyTypeAnswer.answer as string);
    return isUserMale ? maleImages[bodyTypeKey as keyof typeof maleImages] : femaleImages[bodyTypeKey as keyof typeof femaleImages];
  };
  const currentBodyImage = getCurrentBodyImage();

  // DEBUG: Log quiz data to understand the issue
  if (process.env.NODE_ENV !== 'production') {
    console.log('DEBUG P20 - Quiz Data:', {
      genderAnswer: genderAnswer?.answer,
      bodyTypeAnswer: bodyTypeAnswer?.answer,
      barriersAnswer: barriersAnswer?.answer,
      routineAnswer: routineAnswer?.answer,
      isUserMale,
      currentBodyImage,
      showComparison
    });
  }

  // Progress bars calculation based on current vs projected state (updated mapping)
  const getProgressBars = () => {
    // Base current state on body type and barriers (updated keys)
    const currentGordura = bodyTypeAnswer?.answer === 'Sobrepeso' ? 80 : bodyTypeAnswer?.answer === 'Barriga Falsa' ? 70 : bodyTypeAnswer?.answer === 'Flácida' ? 60 : 50;

    // Map new daily_routine IDs to energy levels
    const currentEnergia = routineAnswer?.answer === 'morning_rush' ? 30 : routineAnswer?.answer === 'shift_work' ? 40 : routineAnswer?.answer === 'weekend_focus' ? 45 : routineAnswer?.answer === 'afternoon_free' ? 60 : routineAnswer?.answer === 'night_free' ? 70 : 50;

    // Map barriers array to consistency levels
    const barriers = Array.isArray(barriersAnswer?.answer) ? barriersAnswer.answer : [];
    const currentConstancia = barriers.includes('falta_constancia') ? 40 : barriers.includes('ansiedade') ? 50 : 60;
    return {
      current: {
        gordura: currentGordura,
        energia: currentEnergia,
        constancia: currentConstancia
      },
      projected: {
        gordura: 20,
        // Low body fat goal
        energia: 90,
        // High energy goal
        constancia: 85 // High consistency goal
      }
    };
  };
  const progressBars = getProgressBars();

  // Social proof matching user profile
  const getContextualTestimonial = () => {
    const persona = getPersonaFromAnswers(getAnswer);
    const testimonials = {
      tempo_apertado: {
        text: "Eu também tinha pouco tempo. Ajustei os horários do chá e perdi os inchaços na 1ª semana.",
        author: "Deyse, 34, Recife"
      },
      estresse_alto: {
        text: "O estresse estava me sabotando. O ritual me acalmou e ainda perdi 3kg no primeiro mês.",
        author: "Carla, 41, São Paulo"
      },
      controle_impulso: {
        text: "Não conseguia parar de beliscar. Depois do chá, a vontade de besteira sumiu.",
        author: "Juliana, 28, Fortaleza"
      },
      geral: {
        text: "Resultado rápido e natural. Já estou no meu peso ideal em 6 semanas!",
        author: "Patricia, 35, Rio de Janeiro"
      }
    };
    return testimonials[persona] || testimonials.geral;
  };
  const testimonial = getContextualTestimonial();

  // Effects
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('DEBUG P20 - useEffect running, timer:', timer.timeRemaining);
    }

    // Track page view with full context
    trackP20View(getAnswer, timer.timeRemaining);
    const showTimer = setTimeout(() => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('DEBUG P20 - Setting showComparison to true');
      }
      setShowComparison(true);
      audio.onReveal?.();
      // Track progress bar view
      trackProgressBarView(`gordura_${progressBars.current.gordura}%`, `gordura_${progressBars.projected.gordura}%`);
    }, 600);
    return () => clearTimeout(showTimer);
  }, [audio, getAnswer, timer.timeRemaining, progressBars]);
  const handleContinue = () => {
    // Enhanced tracking with full context
    trackP20CTAClick(getAnswer, ctaVariant === 'A' ? 'começar_plano_ajustado' : 'ver_receita_completa', timer.timeRemaining, userInfo.name);
    audio.onSelect?.();
    setTimeout(() => {
      audio.onNext?.();
      nextPage();
    }, 80);
  };

  // Progress bar component
  const ProgressBar = ({
    label,
    current,
    projected,
    icon: Icon,
    ariaLabel
  }: {
    label: string;
    current: number;
    projected: number;
    icon: React.ElementType;
    ariaLabel: string;
  }) => <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-muted-foreground" aria-label={ariaLabel} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-muted-foreground">Atual: {current > 60 ? 'Alta' : current > 40 ? 'Média' : 'Baixa'}</div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div className="h-full bg-muted-foreground/60 rounded-full transition-all duration-300" style={{
          width: `${current}%`
        }} />
        </div>
      </div>
    </div>;
  const ProjectedProgressBar = ({
    label,
    projected,
    icon: Icon,
    ariaLabel
  }: {
    label: string;
    projected: number;
    icon: React.ElementType;
    ariaLabel: string;
  }) => <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-primary" aria-label={ariaLabel} />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="space-y-1">
        <div className="text-xs text-primary font-medium">Meta: {projected > 80 ? 'Alta' : projected > 40 ? 'Média' : 'Baixa'}</div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300" style={{
          width: `${projected}%`
        }} />
        </div>
      </div>
    </div>;
  return <ProfessionalQuizLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Enhanced Header with A/B Testing */}
        <div className="text-center space-y-4">
          <div className="professional-question-header">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {personalizedContent.headline}
            </h1>
            
            <p className="text-base text-muted-foreground mt-3 max-w-lg mx-auto leading-relaxed">
              {personalizedContent.subtitle}
            </p>

            {/* Value Badge */}
            <div className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full px-4 py-2 border border-primary/20">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Inclui: horários ideais + doses + versão rápida para dias corridos
              </span>
            </div>
          </div>
        </div>

        {/* Enhanced Before vs After Comparison with Dynamic Progress */}
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          <div className="max-w-lg mx-auto">
            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Before - Current State */}
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 border border-muted rounded-2xl p-4 text-center space-y-4 backdrop-blur-sm">
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-sm font-bold text-foreground" id="current-state-heading">Agora</h3>
                </div>
                
                <div className="relative">
                  <SmartImage src={currentBodyImage} alt={`Situação atual - ${bodyTypeAnswer?.answer || 'Regular'}`} className="w-16 h-24 object-cover mx-auto rounded-xl grayscale shadow-lg" currentPage={20} priority="critical" skeletonType="body" loading="lazy" decoding="async" />
                </div>

                <div className="space-y-3" role="region" aria-labelledby="current-state-heading">
                  <ProgressBar label="Gordura" current={progressBars.current.gordura} projected={0} icon={TrendingUp} ariaLabel="Gordura atual alta" />
                  <ProgressBar label="Energia" current={progressBars.current.energia} projected={0} icon={Zap} ariaLabel="Energia atual baixa" />
                  <ProgressBar label="Constância" current={progressBars.current.constancia} projected={0} icon={Target} ariaLabel="Constância atual média" />
                </div>
              </div>

              {/* Animated Arrow with Enhanced Pulse */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg" style={{
                animation: 'pulse-twice 2s ease-in-out'
              }} role="img" aria-label="Transformação de agora para o objetivo">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* After - Goal State */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-4 text-center space-y-4 backdrop-blur-sm shadow-lg relative">
                {/* Recommended Badge */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-primary to-secondary text-white text-xs px-3 py-1 shadow-md">
                    <Award className="w-3 h-3 mr-1" />
                    Recomendado para você
                  </Badge>
                </div>
                
                <div className="flex items-center justify-center mb-2 mt-2">
                  <h3 className="text-sm font-bold text-foreground" id="goal-state-heading">Seu objetivo</h3>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-sm"></div>
                  <SmartImage src={isUserMale ? maleImages.regular : femaleImages.regular} alt={`Seu objetivo - Corpo definido (${isUserMale ? 'Masculino' : 'Feminino'})`} className="relative w-16 h-24 object-cover mx-auto rounded-xl shadow-lg" currentPage={20} priority="critical" skeletonType="body" loading="lazy" decoding="async" />
                </div>

                <div className="space-y-3" role="region" aria-labelledby="goal-state-heading">
                  <ProjectedProgressBar label="Gordura" projected={progressBars.projected.gordura} icon={TrendingUp} ariaLabel="Gordura projetada baixa" />
                  <ProjectedProgressBar label="Energia" projected={progressBars.projected.energia} icon={Zap} ariaLabel="Energia projetada alta" />
                  <ProjectedProgressBar label="Constância" projected={progressBars.projected.constancia} icon={Target} ariaLabel="Constância projetada alta" />
                </div>
              </div>
            </div>

            {/* Plan Ready Message */}
            <div className="mt-6 text-center space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 backdrop-blur-sm transition-all duration-300" style={{
              minHeight: 'auto'
            }}>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Seu Plano Personalizado está pronto!
                </h3>
                <p className="text-muted-foreground text-sm">
                  {personalizedContent.planMessage}
                </p>
              </div>

              {/* Contextual Social Proof */}
              <div className="bg-background/50 rounded-xl p-4 border border-muted/50 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden border-2 border-primary/20 shadow-sm">
                    <SmartImage src="/lovable-uploads/53b5bee8-0364-4359-a2cb-5a098011a989.png" alt={`Foto de ${testimonial.author.split(',')[0]} - depoimento autorizado`} className="w-full h-full object-cover" currentPage={20} priority="high" loading="lazy" decoding="async" width={48} height={48} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-foreground italic mb-2">
                      "{testimonial.text}"
                    </p>
                    <p className="text-xs text-muted-foreground">
                      — {testimonial.author}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Badge variant="outline" className="text-xs">
                        ✅ Imagem autorizada
                      </Badge>
                      <span className="text-xs text-muted-foreground">• Resultados variam</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Timer and CTA Section */}
        <div className="text-center space-y-4 pt-4">
          {/* Reservation Timer */}
          {!timer.isExpired && <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full px-4 py-2 border border-orange-400/30">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">
                Reserva do seu plano e bônus por {timer.formattedTime}
              </span>
            </div>}
          
          {timer.isExpired && <div className="text-sm text-muted-foreground">
              A oferta foi atualizada para o lote atual
            </div>}

          {/* Enhanced CTA with A/B Test */}
          <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)} onFocus={() => setShowTooltip(true)} onBlur={() => setShowTooltip(false)}>
            <Button onClick={handleContinue} variant="emerald" size="betterme" className="w-full max-w-md relative leading-tight" aria-describedby={showTooltip ? "cta-tooltip" : undefined}>
              <span className="text-center w-full">
                {ctaVariant === 'A' ? 'COMEÇAR MEU PLANO AJUSTADO' : 'VER RECEITA COMPLETA AGORA'}
              </span>
            </Button>
            
            {/* Tooltip */}
            {showTooltip && <div id="cta-tooltip" className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10 shadow-lg" role="tooltip">
                Você verá a receita completa + horários ideais + modo turbo para dias corridos
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground"></div>
              </div>}
          </div>

          {/* Micro-urgency below CTA */}
          {!timer.isExpired && <p className="text-xs text-muted-foreground">
              ⏱️ Mantemos seu plano reservado por 15 min para garantir preço e bônus
            </p>}
        </div>

        {/* Enhanced Social Proof */}
        <div className="text-center">
          <SocialBadges variant="compact" />
          
        </div>
      </div>

      {/* Custom styles */}
      <style dangerouslySetInnerHTML={{
      __html: `
          @keyframes pulse-twice {
            0%, 100% { transform: scale(1); }
            15%, 45% { transform: scale(1.1); }
            30%, 60% { transform: scale(1); }
          }
        `
    }} />
    </ProfessionalQuizLayout>;
};