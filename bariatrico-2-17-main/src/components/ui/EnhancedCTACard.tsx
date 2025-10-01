import React from 'react';
import { Button } from './button';
import { ChevronRight, Shield, Check, Lock, Settings } from 'lucide-react';

interface EnhancedCTACardProps {
  onClickAction: () => void;
  disabled?: boolean;
  isProcessing?: boolean;
}

export const EnhancedCTACard: React.FC<EnhancedCTACardProps> = ({
  onClickAction,
  disabled = false,
  isProcessing = false
}) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Container Principal Compacto */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 mb-3">
        {/* Header Verde - Protocolo Completo */}
        <div className="bg-emerald-500 text-white py-1.5 px-3 text-center">
          <h3 className="text-sm font-bold">Protocolo Completo</h3>
        </div>
        
        {/* Conteúdo Principal - Produto e Preço */}
        <div className="bg-white p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex-1">
              <h4 className="text-base font-bold text-gray-900">Chá Bariátrico</h4>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500">de 97,90 por</div>
              <div className="text-lg font-bold text-emerald-600">R$ 37,90</div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button
            onClick={onClickAction}
            disabled={disabled}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 text-sm rounded-lg"
          >
            {isProcessing ? 'PROCESSANDO...' : 'Comprar o Chá Bariátrico'}
          </Button>
        </div>
      </div>

      {/* Selos de Segurança - Fora do container */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Check className="w-3 h-3 text-gray-600" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-[10px] leading-none">COMPRA</div>
            <div className="font-semibold text-[10px] leading-none">SEGURA</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Settings className="w-3 h-3 text-gray-600" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-[10px] leading-none">SATISFAÇÃO</div>
            <div className="font-semibold text-[10px] leading-none">GARANTIDA</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <Lock className="w-3 h-3 text-gray-600" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-[10px] leading-none">PRIVACIDADE</div>
            <div className="font-semibold text-[10px] leading-none">PROTEGIDA</div>
          </div>
        </div>
      </div>
    </div>
  );
};