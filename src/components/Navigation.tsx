"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, Home, MessageCircle, Users, BookOpen, 
  TrendingUp, Crown, Menu, X, Settings, HelpCircle,
  LogOut, Bell, User
} from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isPremium = false; // Simular status

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Início' },
    { href: '/chat', icon: MessageCircle, label: 'Chat IA', premium: true },
    { href: '/community', icon: Users, label: 'Comunidade', premium: true },
    { href: '/diary', icon: BookOpen, label: 'Diário' },
    { href: '/progress', icon: TrendingUp, label: 'Progresso' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-purple-100 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Aura
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-purple-100 flex-col z-40">
        {/* Logo */}
        <div className="p-6 border-b border-purple-100">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Aura
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.premium && !isPremium ? '/subscription' : item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.premium && !isPremium && (
                <Crown className="w-4 h-4 ml-auto" />
              )}
            </Link>
          ))}
        </nav>

        {/* Premium Banner */}
        {!isPremium && (
          <div className="p-4 m-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white">
            <Crown className="w-8 h-8 mb-2" />
            <h3 className="font-bold mb-1">Seja Premium</h3>
            <p className="text-sm text-white/90 mb-3">
              Desbloqueie todos os recursos
            </p>
            <Link 
              href="/subscription"
              className="block w-full bg-white text-purple-600 text-center py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Ver Planos
            </Link>
          </div>
        )}

        {/* User Menu */}
        <div className="p-4 border-t border-purple-100 space-y-2">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Configurações</span>
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Ajuda</span>
          </Link>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Usuário</h3>
                  <p className="text-sm text-gray-500">
                    {isPremium ? 'Premium' : 'Gratuito'}
                  </p>
                </div>
              </div>
            </div>

            <nav className="p-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.premium && !isPremium ? '/subscription' : item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {item.premium && !isPremium && (
                    <Crown className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              ))}
            </nav>

            {!isPremium && (
              <div className="p-4 m-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl text-white">
                <Crown className="w-8 h-8 mb-2" />
                <h3 className="font-bold mb-1">Seja Premium</h3>
                <p className="text-sm text-white/90 mb-3">
                  Desbloqueie todos os recursos
                </p>
                <Link 
                  href="/subscription"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-white text-purple-600 text-center py-2 rounded-lg font-semibold"
                >
                  Ver Planos
                </Link>
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-purple-100 space-y-2">
              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Configurações</span>
              </Link>
              <Link
                href="/help"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-purple-50 transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="font-medium">Ajuda</span>
              </Link>
              <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
