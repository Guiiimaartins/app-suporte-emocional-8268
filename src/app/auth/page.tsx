"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validação básica
      if (!formData.email || !formData.password) {
        setError('Por favor, preencha todos os campos');
        setLoading(false);
        return;
      }

      if (!isLogin && !formData.name) {
        setError('Por favor, informe seu nome');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        setLoading(false);
        return;
      }

      // Simular autenticação (substituir por Supabase real)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Salvar dados do usuário no localStorage
      localStorage.setItem('aura_user', JSON.stringify({
        name: formData.name || formData.email.split('@')[0],
        email: formData.email,
        authenticated: true,
      }));

      // Redirecionar para dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Ocorreu um erro. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 py-8">
      {/* Logo no topo */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-3">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Aura
        </h1>
      </Link>

      {/* Card de Autenticação */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Bem-vindo de volta!' : 'Comece sua jornada'}
            </h2>
            <p className="text-gray-600">
              {isLogin 
                ? 'Entre para continuar seu progresso' 
                : 'Crie sua conta e encontre seu espaço de calma'}
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nome (apenas no cadastro) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nome
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Seu nome"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">
                  Mínimo de 6 caracteres
                </p>
              )}
            </div>

            {/* Mensagem de erro */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3">
                <p className="text-sm text-red-600 text-center">{error}</p>
              </div>
            )}

            {/* Botão de submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          {/* Link para alternar entre login e cadastro */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              {isLogin 
                ? 'Não tem uma conta? Cadastre-se' 
                : 'Já tem uma conta? Faça login'}
            </button>
          </div>

          {/* Esqueceu a senha (apenas no login) */}
          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-500 hover:text-gray-700">
                Esqueceu sua senha?
              </button>
            </div>
          )}
        </div>

        {/* Informação adicional */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade
        </p>
      </div>
    </div>
  );
}
