"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { emotionalProfiles, tracks, exercises } from '@/lib/data';
import { EmotionalProfile, QuizAnswers } from '@/lib/types';
import { Sparkles, CheckCircle, ArrowRight, Heart, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function QuizResultPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<EmotionalProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Recuperar respostas do localStorage
    const answersStr = localStorage.getItem('quizAnswers');
    if (!answersStr) {
      router.push('/quiz');
      return;
    }

    const answers: QuizAnswers = JSON.parse(answersStr);
    
    // Determinar perfil baseado na primeira resposta (motivo)
    const profileType = answers.reason || 'explore';
    const userProfile = emotionalProfiles[profileType];
    
    setProfile(userProfile);
    setLoading(false);
  }, [router]);

  const handleStartNow = () => {
    // Salvar que o usuário completou o onboarding
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userProfile', profile?.type || 'explore');
    
    alert('🎉 Perfeito! Seu plano personalizado está pronto.\n\n📱 Próximos passos:\n\n1. Comece com o primeiro exercício recomendado\n2. Pratique diariamente por 5-10 minutos\n3. Acompanhe seu progresso\n\n💜 Lembre-se: você não está sozinho nessa jornada.');
    router.push('/');
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Analisando suas respostas...</p>
          <p className="text-gray-500 text-sm mt-2">Criando seu plano personalizado</p>
        </div>
      </div>
    );
  }

  const recommendedTracks = tracks.filter(track => 
    profile.recommendedTracks.includes(track.id)
  );

  const recommendedExercises = exercises.filter(exercise => 
    profile.recommendedExercises.includes(exercise.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header com Animação */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-5 shadow-2xl">
                <Sparkles className="w-14 h-14 text-white" />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
              {profile.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {profile.description}
            </p>
          </div>

          {/* Mensagem de Encorajamento */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 max-w-2xl mx-auto">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <p className="text-gray-700 font-medium">
              Você deu o primeiro passo. Isso já é uma grande vitória. 💜
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Preparamos um plano personalizado para te acompanhar nessa jornada.
            </p>
          </div>
        </div>

        {/* Trilhas Recomendadas */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-7 h-7 text-purple-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Suas Trilhas Personalizadas
            </h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Programas estruturados para te guiar passo a passo:
          </p>

          <div className="space-y-4">
            {recommendedTracks.map((track, index) => (
              <div 
                key={track.id}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-purple-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{track.title}</h3>
                    <p className="text-gray-600 mb-4">{track.description}</p>
                  </div>
                  {track.isPremium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4">
                      Premium
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">{track.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-pink-500" />
                    <span className="font-medium">{track.steps} passos</span>
                  </div>
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {track.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercícios Recomendados */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-7 h-7 text-pink-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Comece Hoje com Estes Exercícios
            </h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            Práticas rápidas e eficazes para você começar agora:
          </p>

          <div className="space-y-4">
            {recommendedExercises.map((exercise, index) => (
              <div 
                key={exercise.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 border-transparent hover:border-blue-200"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                  </div>
                  {exercise.isPremium && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4">
                      Premium
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{exercise.duration} minutos</span>
                  </div>
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold capitalize">
                    {exercise.type === 'breathing' ? '🫁 Respiração' : '🧘 Grounding'}
                  </div>
                </div>

                {/* Preview das instruções */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2 font-medium">Primeiros passos:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {exercise.instructions.slice(0, 2).map((instruction, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">•</span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-2 italic">
                    + {exercise.instructions.length - 2} passos adicionais
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dicas Importantes */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-lg p-6 md:p-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Dicas para Aproveitar ao Máximo
          </h3>
          <div className="space-y-3 text-gray-700">
            <div className="flex gap-3">
              <span className="text-2xl">🌅</span>
              <div>
                <p className="font-semibold">Comece devagar</p>
                <p className="text-sm text-gray-600">5 minutos por dia já fazem diferença. Não se cobre perfeição.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">📅</span>
              <div>
                <p className="font-semibold">Crie uma rotina</p>
                <p className="text-sm text-gray-600">Escolha um horário fixo. Manhã ou noite, o que funcionar melhor para você.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl">💜</span>
              <div>
                <p className="font-semibold">Seja gentil consigo</p>
                <p className="text-sm text-gray-600">Alguns dias serão mais difíceis. Tudo bem. Continue no seu ritmo.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Final - Mais Direto e Acolhedor */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-10 text-center text-white animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Seu plano está pronto! 🎉
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-xl mx-auto">
            Comece agora com exercícios gratuitos ou desbloqueie todo o potencial do Aura Premium.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button
              onClick={handleStartNow}
              className="bg-white text-purple-600 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              Começar Gratuito
              <ArrowRight className="w-5 h-5" />
            </button>

            <Link
              href="/subscription"
              className="bg-yellow-400 text-purple-900 px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:shadow-yellow-400/30 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center gap-3"
            >
              Ver Plano Premium
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Sem cadastro inicial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>100% seguro</span>
            </div>
          </div>
        </div>

        {/* Botão Voltar */}
        <div className="text-center">
          <Link 
            href="/quiz"
            className="text-purple-600 hover:text-purple-700 font-medium text-sm inline-flex items-center gap-2 transition-colors"
          >
            ← Refazer o quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
