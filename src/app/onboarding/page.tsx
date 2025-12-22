"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Heart, Brain, Moon, Users, ArrowRight, Check } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    goals: [] as string[],
    struggles: [] as string[],
    notifications: true,
  });

  const goals = [
    { id: 'anxiety', label: 'Reduzir ansiedade', icon: Brain },
    { id: 'sleep', label: 'Melhorar o sono', icon: Moon },
    { id: 'stress', label: 'Gerenciar estresse', icon: Heart },
    { id: 'community', label: 'Conectar com outros', icon: Users },
  ];

  const struggles = [
    'Ansiedade constante',
    'Dificuldade para dormir',
    'Estresse no trabalho',
    'Solidão',
    'Ataques de pânico',
    'Pensamentos negativos',
  ];

  const toggleGoal = (goalId: string) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const toggleStruggle = (struggle: string) => {
    setUserData(prev => ({
      ...prev,
      struggles: prev.struggles.includes(struggle)
        ? prev.struggles.filter(s => s !== struggle)
        : [...prev.struggles, struggle]
    }));
  };

  const handleComplete = () => {
    // Salvar dados do usuário
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Passo {step} de 4
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round((step / 4) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                <div className="relative bg-white rounded-full p-6 shadow-xl">
                  <Sparkles className="w-16 h-16 text-purple-500" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Bem-vindo ao Aura! 💜
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Vamos personalizar sua experiência em apenas alguns passos. 
              Isso nos ajudará a oferecer o melhor suporte para você.
            </p>
            
            <div className="space-y-4 mb-8">
              <input
                type="text"
                placeholder="Como podemos te chamar?"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg"
              />
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!userData.name.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Continuar
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
              Quais são seus objetivos?
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Selecione todos que se aplicam a você
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {goals.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                    userData.goals.includes(goal.id)
                      ? 'border-purple-500 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      userData.goals.includes(goal.id)
                        ? 'bg-purple-200'
                        : 'bg-gray-100'
                    }`}>
                      <goal.icon className={`w-6 h-6 ${
                        userData.goals.includes(goal.id)
                          ? 'text-purple-600'
                          : 'text-gray-600'
                      }`} />
                    </div>
                    <span className="font-semibold text-gray-800 flex-1">
                      {goal.label}
                    </span>
                    {userData.goals.includes(goal.id) && (
                      <Check className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={userData.goals.length === 0}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Struggles */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
              O que você enfrenta?
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Compartilhe seus desafios para personalizarmos sua experiência
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {struggles.map((struggle) => (
                <button
                  key={struggle}
                  onClick={() => toggleStruggle(struggle)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    userData.struggles.includes(struggle)
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">
                      {struggle}
                    </span>
                    {userData.struggles.includes(struggle) && (
                      <Check className="w-5 h-5 text-purple-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(4)}
                disabled={userData.struggles.length === 0}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Notifications */}
        {step === 4 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 rounded-full p-6">
                <Heart className="w-16 h-16 text-purple-500" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Quase lá! 🎉
            </h2>
            <p className="text-gray-600 mb-8">
              Quer receber lembretes diários para cuidar de você?
            </p>

            <div className="bg-purple-50 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  id="notifications"
                  checked={userData.notifications}
                  onChange={(e) => setUserData(prev => ({ ...prev, notifications: e.target.checked }))}
                  className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="notifications" className="text-left flex-1 cursor-pointer">
                  <div className="font-semibold text-gray-800 mb-1">
                    Ativar lembretes diários
                  </div>
                  <div className="text-sm text-gray-600">
                    Receba notificações gentis para fazer seus exercícios, 
                    registrar seu humor e cuidar do seu bem-estar.
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleComplete}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Começar Jornada
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
