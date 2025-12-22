"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Crown, Heart, Shield, Zap, ArrowRight } from 'lucide-react';

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const handleSubscribe = (plan: string) => {
    // Aqui será integrado o sistema de pagamento (Stripe/PayPal)
    alert(`🎉 Você selecionou o plano: ${plan}\n\n📱 Em breve você será redirecionado para o pagamento seguro.\n\n💜 Obrigado por investir no seu bem-estar!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-5 shadow-2xl">
                <Crown className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Desbloqueie Todo o Potencial do
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Aura Premium
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Acesso completo a todos os exercícios, trilhas guiadas e conteúdos exclusivos para transformar seu bem-estar emocional
          </p>
        </div>

        {/* Toggle Mensal/Anual */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg inline-flex gap-2">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedPlan === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 relative ${
                selectedPlan === 'yearly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                -30%
              </span>
            </button>
          </div>
        </div>

        {/* Planos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Plano Gratuito */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border-2 border-gray-200">
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Plano Gratuito</h3>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                R$ 0
                <span className="text-lg font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-gray-600">Para começar sua jornada</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Quiz personalizado completo</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">2 exercícios básicos de respiração</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">1 trilha guiada introdutória</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-purple-500 flex-shrink-0 mt-1" />
                <span className="text-gray-700">Conteúdo motivacional diário</span>
              </li>
            </ul>

            <Link
              href="/quiz"
              className="block w-full bg-gray-100 text-gray-700 py-4 rounded-full text-center font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Continuar Gratuito
            </Link>
          </div>

          {/* Plano Premium */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-purple-900 text-xs px-3 py-1 rounded-full font-bold">
                RECOMENDADO
              </span>
            </div>

            <div className="text-center mb-6">
              <Crown className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Plano Premium</h3>
              <div className="text-5xl font-bold mb-2">
                {selectedPlan === 'monthly' ? 'R$ 29,90' : 'R$ 20,90'}
                <span className="text-lg font-normal">/mês</span>
              </div>
              {selectedPlan === 'yearly' && (
                <p className="text-purple-100 text-sm">
                  R$ 250,80/ano (economize R$ 108/ano)
                </p>
              )}
              <p className="text-purple-100 mt-2">Acesso completo e ilimitado</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span className="font-medium">Tudo do plano gratuito +</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>15+ exercícios exclusivos de respiração e grounding</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>10+ trilhas guiadas completas (ansiedade, estresse, sono)</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>Meditações guiadas para dormir</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>Diário emocional com insights personalizados</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>Acompanhamento de progresso e estatísticas</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>Conteúdos novos toda semana</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-1" />
                <span>Suporte prioritário</span>
              </li>
            </ul>

            <button
              onClick={() => handleSubscribe(selectedPlan === 'monthly' ? 'Premium Mensal' : 'Premium Anual')}
              className="w-full bg-white text-purple-600 py-4 rounded-full text-center font-bold hover:bg-purple-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
            >
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-purple-100 text-sm mt-4">
              Cancele quando quiser • Sem compromisso
            </p>
          </div>
        </div>

        {/* Benefícios Detalhados */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Por que escolher o Aura Premium?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Conteúdo Profissional</h3>
              <p className="text-gray-600 text-sm">
                Exercícios desenvolvidos por psicólogos e especialistas em mindfulness
              </p>
            </div>

            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Sempre Atualizado</h3>
              <p className="text-gray-600 text-sm">
                Novos exercícios e trilhas adicionados semanalmente
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-lg">100% Seguro</h3>
              <p className="text-gray-600 text-sm">
                Seus dados e progresso totalmente privados e protegidos
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-600">
                Sim! Você pode cancelar sua assinatura quando quiser, sem multas ou taxas. Seu acesso continuará até o fim do período pago.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Como funciona o pagamento?</h3>
              <p className="text-gray-600">
                Aceitamos cartão de crédito e PIX. O pagamento é processado de forma 100% segura através de plataformas certificadas.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Posso testar antes de assinar?</h3>
              <p className="text-gray-600">
                Sim! Você pode usar o plano gratuito para conhecer o Aura. Quando estiver pronto, faça upgrade para Premium a qualquer momento.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">O conteúdo realmente funciona?</h3>
              <p className="text-gray-600">
                Nossos exercícios são baseados em técnicas comprovadas de psicologia, mindfulness e terapia cognitivo-comportamental. Milhares de usuários já relataram melhoras significativas.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Final */}
        <div className="text-center">
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center gap-2 transition-colors"
          >
            ← Voltar para início
          </Link>
        </div>
      </div>
    </div>
  );
}
