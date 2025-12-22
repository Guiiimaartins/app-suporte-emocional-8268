"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, Heart, MessageCircle, BookOpen, Users, 
  TrendingUp, Award, Calendar, Moon, Sun, Cloud,
  Flame, Target, CheckCircle2, Lock, Crown, LogOut
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isPremium] = useState(false);
  const [streak] = useState(7);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Verificar se usuário está autenticado
    const userData = localStorage.getItem('aura_user');
    if (!userData) {
      router.push('/auth');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch {
      router.push('/auth');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('aura_user');
    router.push('/');
  };

  const moods = [
    { value: 1, emoji: '😢', label: 'Muito mal', color: 'text-red-500' },
    { value: 2, emoji: '😔', label: 'Mal', color: 'text-orange-500' },
    { value: 3, emoji: '😐', label: 'Ok', color: 'text-yellow-500' },
    { value: 4, emoji: '🙂', label: 'Bem', color: 'text-green-500' },
    { value: 5, emoji: '😊', label: 'Muito bem', color: 'text-emerald-500' },
  ];

  const dailyExercises = [
    {
      id: 1,
      title: 'Respiração 4-7-8',
      duration: '5 min',
      type: 'breathing',
      icon: Moon,
      description: 'Acalme sua mente antes de dormir',
      isPremium: false,
      completed: false,
    },
    {
      id: 2,
      title: 'Grounding 5-4-3-2-1',
      duration: '8 min',
      type: 'grounding',
      icon: Target,
      description: 'Conecte-se com o presente',
      isPremium: false,
      completed: true,
    },
    {
      id: 3,
      title: 'Meditação Guiada',
      duration: '15 min',
      type: 'meditation',
      icon: Sparkles,
      description: 'Encontre paz interior',
      isPremium: true,
      completed: false,
    },
    {
      id: 4,
      title: 'Diário de Gratidão',
      duration: '10 min',
      type: 'reflection',
      icon: Heart,
      description: 'Reflita sobre momentos positivos',
      isPremium: true,
      completed: false,
    },
  ];

  const quickActions = [
    {
      title: 'Conversar com IA',
      description: 'Desabafe sem julgamentos',
      icon: MessageCircle,
      href: '/chat',
      color: 'from-purple-500 to-pink-500',
      isPremium: true,
    },
    {
      title: 'Comunidade',
      description: 'Conecte-se com outros',
      icon: Users,
      href: '/community',
      color: 'from-blue-500 to-cyan-500',
      isPremium: true,
    },
    {
      title: 'Meu Diário',
      description: 'Registre suas emoções',
      icon: BookOpen,
      href: '/diary',
      color: 'from-emerald-500 to-teal-500',
      isPremium: false,
    },
    {
      title: 'Meu Progresso',
      description: 'Veja sua evolução',
      icon: TrendingUp,
      href: '/progress',
      color: 'from-orange-500 to-red-500',
      isPremium: false,
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-16 h-16 text-purple-500 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Aura
            </h1>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700">{user.name}</span>
            </div>
            
            {!isPremium && (
              <Link 
                href="/subscription"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Seja Premium</span>
              </Link>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Saudação e Streak */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Olá, {user.name}! Como você está hoje?
          </h2>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-gray-800">{streak} dias</span>
              <span className="text-sm text-gray-600">de sequência</span>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Award className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-gray-600">3 conquistas</span>
            </div>
          </div>
        </div>

        {/* Registro de Humor */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-500" />
            Como você está se sentindo agora?
          </h3>
          <div className="flex gap-3 justify-between flex-wrap">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setTodayMood(mood.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 flex-1 min-w-[80px] ${
                  todayMood === mood.value
                    ? 'bg-purple-100 scale-105 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className={`text-xs font-semibold ${mood.color}`}>
                  {mood.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.isPremium && !isPremium ? '/subscription' : action.href}
              className="relative group"
            >
              <div className={`bg-gradient-to-br ${action.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                {action.isPremium && !isPremium && (
                  <div className="absolute top-3 right-3">
                    <Lock className="w-5 h-5 text-white/80" />
                  </div>
                )}
                <action.icon className="w-10 h-10 text-white mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-white/90">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Exercícios Diários */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Target className="w-7 h-7 text-purple-500" />
              Seus Exercícios de Hoje
            </h3>
            <span className="text-sm text-gray-500">
              2 de 4 completos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`relative border-2 rounded-2xl p-5 transition-all duration-300 ${
                  exercise.completed
                    ? 'border-green-300 bg-green-50'
                    : exercise.isPremium && !isPremium
                    ? 'border-gray-200 bg-gray-50 opacity-60'
                    : 'border-purple-200 bg-purple-50 hover:border-purple-300 hover:shadow-lg'
                }`}
              >
                {exercise.isPremium && !isPremium && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                
                {exercise.completed && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    exercise.completed ? 'bg-green-200' : 'bg-purple-200'
                  }`}>
                    <exercise.icon className={`w-6 h-6 ${
                      exercise.completed ? 'text-green-700' : 'text-purple-700'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1">
                      {exercise.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {exercise.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold text-purple-600">
                        {exercise.duration}
                      </span>
                      {exercise.isPremium && (
                        <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!exercise.completed && (!exercise.isPremium || isPremium) && (
                  <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                    Começar Agora
                  </button>
                )}

                {exercise.isPremium && !isPremium && (
                  <Link 
                    href="/subscription"
                    className="block w-full mt-4 bg-gray-300 text-gray-600 py-2 rounded-xl font-semibold text-center hover:bg-gray-400 transition-all duration-300"
                  >
                    Desbloquear com Premium
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Banner Premium */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-center text-white mb-8">
            <Crown className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold mb-3">
              Desbloqueie Todo o Potencial do Aura
            </h3>
            <p className="text-lg mb-6 text-white/90">
              Acesso ilimitado a exercícios, chat com IA, comunidade e muito mais
            </p>
            <Link 
              href="/subscription"
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Ver Planos Premium
            </Link>
          </div>
        )}

        {/* Dica do Dia */}
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-full p-3 shadow-md">
              <Sparkles className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">💡 Dica do Dia</h4>
              <p className="text-gray-700">
                Quando sentir ansiedade chegando, pare por 30 segundos e respire profundamente. 
                Inspire contando até 4, segure por 4, expire por 6. Repita 3 vezes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
