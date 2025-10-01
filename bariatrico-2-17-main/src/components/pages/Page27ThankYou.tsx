import React, { useEffect, useState } from 'react';
import { ProfessionalQuizLayout } from '@/components/layout/ProfessionalQuizLayout';
import { useQuiz } from '@/contexts/QuizContext';
import { useQuizStep } from '@/hooks/useQuizStep';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Shield, Clock } from 'lucide-react';
import { QuizPageProps } from '@/types/quiz';
import { SocialBadges } from '@/components/ui/SocialBadges';
import { SocialProofCarousel } from '@/components/ui/SocialProofCarousel';
import { GLOBAL_CONSTANTS, TRACKING_EVENTS } from '@/config/globalConstants';

export const Page27ThankYou: React.FC<QuizPageProps> = ({ audio = {} }) => {
  useQuizStep('Obrigado');
  const { userInfo } = useQuiz();

  const [isProcessingAccess, setIsProcessingAccess] = useState(false);
  const [isReturnToCheckout, setIsReturnToCheckout] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseCompleted =
      urlParams.get('purchase') === 'completed' ||
      urlParams.get('status') === 'success' ||
      localStorage.getItem('purchase_completed') === 'true';

    setHasPurchased(purchaseCompleted);
    audio.onShow?.();

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', TRACKING_EVENTS.COMPLETION, {
        name: userInfo.name,
        purchased: purchaseCompleted,
        timestamp: Date.now()
      });
    }

    if (purchaseCompleted) {
      localStorage.removeItem('purchase_completed');
    }
  }, [audio, userInfo.name]);

  const handleAccessRecipe = () => {
    audio.onSelect?.();
    window.open('https://pay.kiwify.com.br/I7LKmAh', '_blank');
  };

  const handleReturnToCheckout = () => {
    audio.onSelect?.();


    // Google Analytics (opcional)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'thankyou_secondary_cta_click', {
        name: userInfo.name,
        action: 'direct_checkout_redirect'
      });
    }

    window.open('https://pay.kiwify.com.br/I7LKmAh', '_blank');
  };

  if (hasPurchased) {
    return (
      <ProfessionalQuizLayout showProgress={false} showBackButton={false}>
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              Parabéns {userInfo.name || ''}, sua nova versão começa agora.
            </h1>
            <p className="text-muted-foreground text-lg">Sua compra foi confirmada com sucesso!</p>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 rounded-xl p-6 text-center max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Próximos Passos
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Verifique seu email para acessar suas receitas personalizadas e começar sua transformação hoje mesmo!
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-500/20 rounded-xl p-4 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 text-emerald-600">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Garantia de {GLOBAL_CONSTANTS.GUARANTEE_DAYS}</span>
            </div>
            <p className="text-emerald-600 text-sm mt-1">Compra 100% protegida</p>
          </div>

          <SocialBadges variant="compact" showPix={false} />

          <div className="text-center">
            <Button
              onClick={handleAccessRecipe}
              variant="emerald"
              size="betterme"
              className="w-full max-w-md"
            >
              ACESSAR MINHA ÁREA
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Dúvidas? Entre em contato conosco através do suporte</p>
          </div>
        </div>
      </ProfessionalQuizLayout>
    );
  }

  return (
    <ProfessionalQuizLayout showProgress={false} showBackButton={false}>
      <div className="text-center space-y-8">
        <div className="flex justify-center">
          <span className="text-6xl">🎁</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            hoje é o seu dia de <span className="text-emerald-600">sorte</span>, {userInfo.name || ''}
          </h1>
          <p className="text-3xl font-bold text-foreground">
            você foi uma das nossas escolhidas desse mês, para ganhar o nosso <span className="text-emerald-600">super desconto</span>
          </p>
          
          {/* Timer warning card */}
          <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-medium mt-2">
            ⚠️ atenção, o desconto é válido somente por 15 minutos aproveite
          </div>

          {/* Botão 1 - rastreado */}
          <div className="pt-4">
            <Button
              onClick={handleReturnToCheckout}
              variant="emerald"
              size="betterme"
              className="w-full max-w-md"
            >
              QUERO MINHA RECEITA AGORA
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <img 
              src="/lovable-uploads/cupom-desconto-50-off.png" 
              alt="Cupom de desconto especial - 50% OFF para as escolhidas do mês"
              className="w-full max-w-md h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>


          {/* Botão 2 - rastreado */}
          <div className="pt-6">
            <Button
              onClick={handleReturnToCheckout}
              variant="emerald"
              size="betterme"
              className="w-full max-w-md"
            >
              QUERO MINHA RECEITA AGORA
            </Button>
          </div>

          {/* Social Proof Carousel */}
          <div className="space-y-6 mt-8">
            <SocialProofCarousel images={[{
              src: "/lovable-uploads/3027f407-e3e3-49d9-b580-9b2a2e329a97.png",
              alt: "Depoimento Karolina - Perdeu 13kg em 27 dias com os chás bariátricos"
            }, {
              src: "/lovable-uploads/0c6d3fef-1fb2-4895-9686-e0182a8e27a9.png",
              alt: "Depoimento Jessica - Transformação incrível com os chás"
            }, {
              src: "/lovable-uploads/ba7ba216-78ee-425f-a50d-dc289dcb1b8e.png",
              alt: "Depoimento Paulinha - Perdeu 6kg em 10 dias"
            }]} autoplayInterval={4000} />
          </div>

          {/* Seu Plano Inclui Section */}
          <div className="space-y-6 mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Seu plano inclui:
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <img 
                src="/lovable-uploads/seu-plano-inclui.png" 
                alt="Seu plano inclui: Chá Bariátrico do Jeito Certo, Definição de metas diárias, Anti Efeito Sanfona, Desafio de 21 dias, Grupo VIP, Acompanhamento" 
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Aplicativo Fácil Acesso Section */}
          <div className="space-y-6 mt-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Todas as instruções e bônus em um aplicativo de <span className="text-emerald-600">fácil acesso</span>📲
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <img 
                src="/lovable-uploads/aplicativo-facil-acesso.png" 
                alt="Aplicativo LeveMe - Rotina dos Chás Bariátricos com comunidade, grupo de dicas, conteúdo sobre chá bariátrico, definição de metas e programa anti efeito sanfona" 
                className="w-full h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Garantia Section */}
          <div className="space-y-6 mt-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/garantia-30-dias.png" 
                alt="Garantia de 30 dias" 
                className="w-32 h-32"
                loading="lazy"
              />
            </div>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-foreground">
                    Garantia de Reembolso
                  </h3>
                  
                  <div className="flex justify-center space-x-1 mb-4">
                    <span className="text-yellow-400 text-lg">⭐⭐⭐⭐⭐</span>
                  </div>
                  
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Todo produto é obrigado a dar no mínimo 7 dias de garantia, porém confiamos tanto na fórmula que oferecemos <strong className="text-foreground">30 dias corridos</strong>.
                    </p>
                    
                    <p>
                      Ou seja, se você não gostar ou não conseguir perder 1kg sequer no primeiro mês de uso, nós reembolsaremos cada centavo que você pagou, <strong className="text-foreground">sem questionar</strong>.
                    </p>
                    
                    <p className="text-sm">
                      Basta enviar um e-mail para o suporte em <strong className="text-emerald-600">contato@chabriatrico.com</strong> ou pedir direto pelo aplicativo!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Imagem da Nutricionista */}
          <div className="flex justify-center mt-6">
            <img 
              src="/lovable-uploads/nutricionista-camila-santos.png" 
              alt="Nutricionista Camila Santos - CRN SP 10-9552"
              className="w-48 h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Card da Nutricionista */}
          <div className="bg-card border border-border rounded-xl p-6 max-w-md mx-auto mt-4 shadow-lg">
            <div className="text-center space-y-2">
              <p className="text-foreground font-semibold">
                Protocolo gerado por: <span className="text-primary">Camila Santos</span>
              </p>
              <p className="text-muted-foreground">
                Nutricionista: <span className="font-medium">CRN SP 10-9552</span>
              </p>
            </div>
          </div>

          {/* Botão 3 - após quadro de bônus */}
          <div className="pt-6">
            <Button
              onClick={handleReturnToCheckout}
              variant="emerald"
              size="betterme"
              className="w-full max-w-md"
            >
              QUERO MINHA RECEITA AGORA
            </Button>
          </div>
        </div>

          <div className="flex justify-center mt-6">
            <img 
              src="/lovable-uploads/progress-chart-transformation.png?v=2" 
              alt="Gráfico de progresso semanal - transformação em 4 semanas usando o protocolo"
              className="w-full max-w-2xl h-auto rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Botão 3 - após imagem */}
          <div className="pt-6">
            <Button
              onClick={handleReturnToCheckout}
              variant="emerald"
              size="betterme"
              className="w-full max-w-md"
            >
              QUERO MINHA RECEITA AGORA
            </Button>
          </div>

        {/* FAQ Section */}
        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold text-foreground text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border border-gray-200 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  Preciso fazer dieta junto com o uso dos chás?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  👉 NÃO. O protocolo funciona independentemente de dietas restritivas. Ele acelera o metabolismo e ajuda na queima de gordura mesmo sem você mudar nada na sua alimentação.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border border-gray-200 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  Preciso fazer exercícios para ter resultado?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  👉 Não. O grande diferencial do Ritual é que ele age diretamente no metabolismo e no acúmulo de gordura, sem depender de exercícios.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border border-gray-200 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  Funciona para qualquer idade?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  👉 Sim. Os chás foram desenvolvidos para o corpo feminino em diferentes fases da vida.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border border-gray-200 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  É seguro? Tem algum efeito colateral?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  👉 100% seguro. O Ritual é baseado em chás naturais, sem química, sem cápsulas artificiais e sem risco de dependência.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border border-gray-200 rounded-lg px-4">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  Os ingredientes são caros ou difíceis de achar?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  👉 Não. Todos os ingredientes dos chás são naturais, baratos e encontrados facilmente em qualquer supermercado ou feira. Nada de fórmulas caras ou produtos importados.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Botão 4 - após FAQ */}
          <div className="pt-6">
            <Button
              onClick={handleReturnToCheckout}
              variant="emerald"
              size="betterme"
              className="w-full max-w-md"
            >
              QUERO MINHA RECEITA AGORA
            </Button>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-500/20 rounded-xl p-4 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 text-emerald-600">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Garantia de {GLOBAL_CONSTANTS.GUARANTEE_DAYS}</span>
          </div>
          <p className="text-emerald-600 text-sm mt-1">Compra 100% protegida - risco zero para você</p>
        </div>

        <SocialBadges variant="compact" showPix={true} />

        <div className="text-sm text-muted-foreground">
          <p>Dúvidas? Entre em contato conosco através do suporte</p>
        </div>
      </div>
    </ProfessionalQuizLayout>
  );
};
