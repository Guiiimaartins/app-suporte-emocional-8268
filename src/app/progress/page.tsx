"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Award, TrendingUp, Target, Calendar,
  Flame, Star, Trophy, CheckCircle2, Lock
} from 'lucide-react';

type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
};

type Challenge = {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
};

export default function ProgressPage() {
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Primeiro Passo',
      description: 'Complete seu primeiro exercício',
      icon: '🎯',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    },
    {
      id: '2',
      name: 'Sequência de 7 Dias',
      description: 'Use o app por 7 dias seguidos',
      icon: '🔥',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: '3',
      name: 'Mestre da Respiração',
      description: 'Complete 10 exercícios de respiração',
      icon: '🌬️',
      unlocked: true,
      unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: '4',
      name: 'Comunidade Ativa',
      description: 'Faça 5 posts na comunidade',
      icon: '💬',
      unlocked: false,
    },
    {
      id: '5',
      name: 'Sequência de 30 Dias',
      description: 'Use o app por 30 dias seguidos',
      icon: '⭐',
      unlocked: false,
    },
    {
      id: '6',
      name: 'Mestre da Meditação',
      description: 'Complete 20 meditações guiadas',
      icon: '🧘',
      unlocked: false,
    },
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Desafio Semanal',
      description: 'Complete 5 exercícios esta semana',
      progress: 3,
      total: 5,
      reward: 'Badge "Dedicado"',
    },
    {
      id: '2',
      title: 'Diário Completo',
      description: 'Registre seu humor por 7 dias seguidos',
      progress: 3,
      total: 7,
      reward: 'Badge "Autoconhecimento"',
    },
    {
      id: '3',
      title: 'Explorador',
      description: 'Experimente 3 tipos diferentes de exercícios',
      progress: 2,
      total: 3,
      reward: 'Badge "Curioso"',
    },
  ]);

  const stats = {
    streak: 7,
    totalExercises: 24,
    totalMinutes: 180,
    badgesUnlocked: badges.filter(b => b.unlocked).length,
    totalBadges: badges.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Meu Progresso</h1>
              <p className="text-xs text-gray-500">Acompanhe sua jornada</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">{stats.streak}</p>
            <p className="text-sm text-gray-600">Dias seguidos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">{stats.totalExercises}</p>
            <p className="text-sm text-gray-600">Exercícios</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">{stats.totalMinutes}</p>
            <p className="text-sm text-gray-600">Minutos</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-800">
              {stats.badgesUnlocked}/{stats.totalBadges}
            </p>
            <p className="text-sm text-gray-600">Conquistas</p>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold">Nível 3</h3>
              <p className="text-white/80">Praticante Dedicado</p>
            </div>
            <Trophy className="w-12 h-12" />
          </div>
          <div className="bg-white/20 rounded-full h-4 overflow-hidden mb-2">
            <div 
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: '65%' }}
            />
          </div>
          <p className="text-sm text-white/90">
            650 / 1000 XP para o próximo nível
          </p>
        </div>

        {/* Active Challenges */}
        <div className="mb-8">
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-500" />
            Desafios Ativos
          </h3>
          <div className="space-y-4">
            {challenges.map((challenge) => {
              const percentage = (challenge.progress / challenge.total) * 100;
              return (
                <div key={challenge.id} className="bg-white rounded-2xl shadow-md p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{challenge.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-600">Recompensa: {challenge.reward}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-full h-3 overflow-hidden mb-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">
                    {challenge.progress} / {challenge.total} completo
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges Collection */}
        <div>
          <h3 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-500" />
            Conquistas ({stats.badgesUnlocked}/{stats.totalBadges})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-2xl shadow-md p-5 text-center transition-all duration-300 ${
                  badge.unlocked
                    ? 'bg-white hover:shadow-lg'
                    : 'bg-gray-100 opacity-60'
                }`}
              >
                <div className={`text-5xl mb-3 ${badge.unlocked ? '' : 'grayscale'}`}>
                  {badge.unlocked ? badge.icon : '🔒'}
                </div>
                <h4 className="font-bold text-gray-800 mb-1">{badge.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                {badge.unlocked && badge.unlockedAt && (
                  <p className="text-xs text-purple-600 font-semibold">
                    Desbloqueado em {badge.unlockedAt.toLocaleDateString('pt-BR')}
                  </p>
                )}
                {!badge.unlocked && (
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-2">
                    <Lock className="w-3 h-3" />
                    <span>Bloqueado</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-full p-3 shadow-md">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Continue assim! 🎉</h4>
              <p className="text-gray-700">
                Você está fazendo um trabalho incrível cuidando da sua saúde emocional. 
                Cada pequeno passo conta na sua jornada de bem-estar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
