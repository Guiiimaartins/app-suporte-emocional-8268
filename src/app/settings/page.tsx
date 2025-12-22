"use client";

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { 
  User, Mail, Bell, Lock, Palette, Globe, 
  Shield, CreditCard, Download, Trash2, LogOut,
  ChevronRight, Check, Moon, Sun
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    daily: true,
    community: true,
    achievements: true,
    marketing: false,
  });

  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navigation />
      
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Configurações
            </h1>
            <p className="text-gray-600">
              Gerencie sua conta e preferências
            </p>
          </div>

          {/* Profile Section */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-6 h-6 text-purple-500" />
              Perfil
            </h2>
            
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">Usuário</h3>
                <p className="text-gray-600">usuario@email.com</p>
              </div>
              <button className="text-purple-600 font-semibold hover:text-purple-700">
                Editar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  defaultValue="Usuário"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="usuario@email.com"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-6 h-6 text-purple-500" />
              Notificações
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Lembretes Diários</h3>
                  <p className="text-sm text-gray-600">Exercícios e check-ins</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, daily: !prev.daily }))}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.daily ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.daily ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Comunidade</h3>
                  <p className="text-sm text-gray-600">Respostas e menções</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, community: !prev.community }))}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.community ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.community ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Conquistas</h3>
                  <p className="text-sm text-gray-600">Marcos e badges</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, achievements: !prev.achievements }))}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.achievements ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.achievements ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Marketing</h3>
                  <p className="text-sm text-gray-600">Novidades e ofertas</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    notifications.marketing ? 'bg-purple-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    notifications.marketing ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Palette className="w-6 h-6 text-purple-500" />
              Aparência
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === 'light'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Sun className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <p className="text-sm font-semibold text-gray-800">Claro</p>
                {theme === 'light' && (
                  <Check className="w-5 h-5 text-purple-600 mx-auto mt-2" />
                )}
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Moon className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <p className="text-sm font-semibold text-gray-800">Escuro</p>
                {theme === 'dark' && (
                  <Check className="w-5 h-5 text-purple-600 mx-auto mt-2" />
                )}
              </button>

              <button
                onClick={() => setTheme('auto')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  theme === 'auto'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-sm font-semibold text-gray-800">Auto</p>
                {theme === 'auto' && (
                  <Check className="w-5 h-5 text-purple-600 mx-auto mt-2" />
                )}
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-500" />
              Segurança e Privacidade
            </h2>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">Alterar Senha</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <Link 
                href="/privacy"
                className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">Política de Privacidade</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600" />
                  <span className="font-semibold text-gray-800">Baixar Meus Dados</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple-500" />
              Assinatura
            </h2>

            <div className="bg-purple-50 rounded-2xl p-6 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-purple-600">PLANO ATUAL</span>
                <span className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-bold">
                  GRATUITO
                </span>
              </div>
              <p className="text-gray-700 mb-4">
                Você está no plano gratuito. Faça upgrade para desbloquear todos os recursos!
              </p>
              <Link 
                href="/subscription"
                className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Ver Planos Premium
              </Link>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-red-200">
            <h2 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <Trash2 className="w-6 h-6" />
              Zona de Perigo
            </h2>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-600">Sair de Todos os Dispositivos</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-red-50 transition-colors border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <span className="font-semibold text-red-600">Excluir Conta Permanentemente</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>

            <p className="text-sm text-red-600 mt-4">
              ⚠️ Ações irreversíveis. Seus dados serão perdidos permanentemente.
            </p>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
