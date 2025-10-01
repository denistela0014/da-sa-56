import { useMemo } from 'react';

// HOOK ESTÁVEL: Previne re-renders desnecessários dos testimonials
export const useStableTestimonials = () => {
  return useMemo(() => [{
    name: 'Marina',
    message: 'Fiz a análise gratuita e em 30 dias já -8kg! Melhor decisão! 🔥',
    mediaSrc: '/lovable-uploads/c980fb3d-da8b-4b95-9002-15f028d30295.png',
    time: '14:23'
  }, {
    name: 'Carla',
    message: 'Comecei pelo teste grátis, 6 semanas depois: -9kg! Surreal! 💚',
    mediaSrc: '/lovable-uploads/54b3c3f2-87cc-4d91-8d31-780f4504436e.png',
    time: '09:15'
  }, {
    name: 'Juliana',
    message: 'Teste sem pagar nada = -7kg em 35 dias! Não custa tentar! ✨',
    mediaSrc: '/lovable-uploads/86c2973f-151d-4f3c-83d2-88a5385330a2.png',
    time: '16:42'
  }, {
    name: 'Patricia',
    message: 'Quiz gratuito mudou tudo! 2 meses e -11kg depois! Incrível! 🙏',
    mediaSrc: '/lovable-uploads/ada15dba-52ca-49ab-94d3-35c97f62b1ef.png',
    time: '11:30'
  }, {
    name: 'Beatriz',
    message: 'Fiz de curiosidade (grátis né?), resultado: -6kg em 1 mês! 😍',
    mediaSrc: '/lovable-uploads/dc9cdcec-8795-45ee-b8e7-056499336614.png',
    time: '13:57'
  }, {
    name: 'Amanda',
    message: 'Análise grátis revelou tudo! 40 dias: -8kg! Nem acredito! 😱',
    mediaSrc: '/lovable-uploads/fc166cd7-abce-4b6d-ba41-59d0e07e2546.png',
    time: '15:20'
  }, {
    name: 'Fernanda',
    message: 'Teste gratuito foi o start! Hoje -10kg em 7 semanas! 💪',
    mediaSrc: '/lovable-uploads/c5f57ed6-f3a1-42d2-bffa-ac8264c5b613.png',
    time: '10:08'
  }, {
    name: 'Roberta',
    message: 'Comecei com o quiz free, 1 mês depois: -7,5kg! Testem! 🎉',
    mediaSrc: '/lovable-uploads/0f0b3e5e-9991-4f75-a127-6d03019104b3.png',
    time: '17:45'
  }], []);
};