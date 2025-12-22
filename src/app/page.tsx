"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Heart, Shield, Brain, Moon, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

type QuizQuestion = {
  id: number;
  question: string;
  options: { value: number; label: string }[];
};

export default function WelcomePage() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [anxietyLevel, setAnxietyLevel] = useState<string>('');

  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Com que frequência você se sente nervoso ou ansioso?",
      options: [
        { value: 0, label: "Nunca" },
        { value: 1, label: "Raramente" },
        { value: 2, label: "Às vezes" },
        { value: 3, label: "Frequentemente" },
        { value: 4, label: "Sempre" },
      ]
    },
    {
      id: 2,
      question: "Você tem dificuldade para controlar suas preocupações?",
      options: [
        { value: 0, label: "Nenhuma dificuldade" },
        { value: 1, label: "Pouca dificuldade" },
        { value: 2, label: "Alguma dificuldade" },
        { value: 3, label: "Muita dificuldade" },
        { value: 4, label: "Extrema dificuldade" },
      ]
    },
    {
      id: 3,
      question: "Você sente tensão muscular ou inquietação?",
      options: [
        { value: 0, label: "Nunca" },
        { value: 1, label: "Raramente" },
        { value: 2, label: "Às vezes" },
        { value: 3, label: "Frequentemente" },
        { value: 4, label: "Sempre" },
      ]
    },
    {
      id: 4,
      question: "Com que frequência você tem dificuldade para dormir devido a preocupações?",
      options: [
        { value: 0, label: "Nunca" },
        { value: 1, label: "Raramente" },
        { value: 2, label: "Às vezes" },
        { value: 3, label: "Frequentemente" },
        { value: 4, label: "Sempre" },
      ]
    },
    {
      id: 5,
      question: "Você evita situações sociais por medo ou ansiedade?",
      options: [
        { value: 0, label: "Nunca" },
        { value: 1, label: "Raramente" },
        { value: 2, label: "Às vezes" },
        { value: 3, label: "Frequentemente" },
        { value: 4, label: "Sempre" },
      ]
    }
  ];

  const handleAnswerSelect = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular resultado
      const total = newAnswers.reduce((sum, val) => sum + val, 0);
      const maxScore = quizQuestions.length * 4;
      const percentage = (total / maxScore) * 100;

      let level = '';
      if (percentage <= 20) level = 'Baixa';
      else if (percentage <= 40) level = 'Leve';
      else if (percentage <= 60) level = 'Moderada';
      else if (percentage <= 80) level = 'Alta';
      else level = 'Muito Alta';

      setAnxietyLevel(level);
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizComplete(false);
    setAnxietyLevel('');
  };

  if (showQuiz && !quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600">
                Pergunta {currentQuestion + 1} de {quizQuestions.length}
              </span>
              <span className="text-sm font-semibold text-purple-600">
                {Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {quizQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswerSelect(option.value)}
                  className="w-full bg-gray-50 hover:bg-purple-50 border-2 border-gray-200 hover:border-purple-500 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                >
                  <span className="text-lg font-semibold text-gray-700 group-hover:text-purple-700">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={resetQuiz}
            className="mt-6 text-gray-500 hover:text-gray-700 text-sm font-semibold mx-auto block"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-6">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Resultado do Quiz
            </h2>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Seu nível de ansiedade é:</p>
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {anxietyLevel}
              </p>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {anxietyLevel === 'Baixa' && "Você está lidando bem com a ansiedade! Continue cuidando da sua saúde mental."}
              {anxietyLevel === 'Leve' && "Você apresenta sinais leves de ansiedade. Exercícios de respiração podem ajudar."}
              {anxietyLevel === 'Moderada' && "Você apresenta ansiedade moderada. Recomendamos práticas diárias de relaxamento."}
              {anxietyLevel === 'Alta' && "Você apresenta alta ansiedade. Considere buscar apoio profissional e usar nossas ferramentas diárias."}
              {anxietyLevel === 'Muito Alta' && "Você apresenta ansiedade muito alta. Recomendamos fortemente buscar apoio profissional."}
            </p>

            <div className="space-y-3">
              <Link 
                href="/auth"
                className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
              >
                Começar Minha Jornada no Aura
              </Link>
              <button
                onClick={resetQuiz}
                className="block w-full bg-gray-100 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Refazer Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header com Logo */}
      <header className="w-full py-6 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-40"></div>
              <div className="relative bg-white rounded-full p-3 shadow-lg">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Aura
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/auth"
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors hidden sm:inline"
            >
              Já tenho conta
            </Link>
            <Link 
              href="/auth"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Entrar →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex items-center justify-center px-4 py-12 md:py-20">
        <div className="max-w-4xl w-full text-center space-y-8 animate-fade-in">
          {/* Logo Central */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-8 shadow-2xl">
                <Sparkles className="w-20 h-20 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Título Principal */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
              Seu espaço de calma
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
                em qualquer momento
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 font-light max-w-2xl mx-auto">
              Para quem enfrenta ansiedade, estresse ou solidão todos os dias. 
              Um lugar seguro, sem julgamentos, apenas acolhimento.
            </p>
          </div>

          {/* CTA Quiz */}
          <div className="pt-4 space-y-4">
            <button 
              onClick={() => setShowQuiz(true)}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-5 rounded-full text-xl font-semibold shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
            >
              <Brain className="w-6 h-6" />
              Fazer Quiz de Ansiedade
              <ArrowRight className="w-6 h-6" />
            </button>
            <p className="text-sm text-gray-500">
              Descubra seu nível de ansiedade em 2 minutos
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Exercícios Diários</h3>
              <p className="text-sm text-gray-600">
                Práticas guiadas de respiração, meditação e grounding personalizadas
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Chat com IA Empática</h3>
              <p className="text-sm text-gray-600">
                Desabafe sem julgamentos com nossa IA acolhedora disponível 24/7
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Brain className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Comunidade Segura</h3>
              <p className="text-sm text-gray-600">
                Conecte-se anonimamente com pessoas que entendem sua jornada
              </p>
            </div>
          </div>

          {/* Benefícios Específicos */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-12 mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
              O Aura foi feito para você que:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Sente ansiedade constante</h4>
                  <p className="text-sm text-gray-600">
                    Exercícios de respiração e grounding para momentos de crise
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Está sobrecarregado</h4>
                  <p className="text-sm text-gray-600">
                    Rotinas antiestresse e técnicas de relaxamento profundo
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Moon className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Não consegue dormir</h4>
                  <p className="text-sm text-gray-600">
                    Práticas noturnas para acalmar a mente e melhorar o sono
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Se sente sozinho</h4>
                  <p className="text-sm text-gray-600">
                    Comunidade acolhedora e chat com IA sempre disponível
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-8">
            <p className="text-gray-500 text-sm mb-4">Milhares de pessoas já encontraram alívio</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="pt-12">
            <Link 
              href="/auth"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-16 py-5 rounded-full text-xl font-semibold shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
            >
              Começar Agora - É Gratuito
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-4 border-t border-purple-100">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>Aura • Seu bem-estar emocional em primeiro lugar</p>
          <p className="mt-2">Desenvolvido com 💜 para quem precisa de acolhimento</p>
        </div>
      </footer>
    </div>
  );
}
