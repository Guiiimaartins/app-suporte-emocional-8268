"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { quizQuestions } from '@/lib/data';
import { QuizAnswers } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [selectedOption, setSelectedOption] = useState<string>('');

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleSelectOption = (value: string) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    // Salvar resposta
    const questionKey = ['reason', 'frequency', 'impact', 'expectation'][currentQuestion] as keyof QuizAnswers;
    const newAnswers = { ...answers, [questionKey]: selectedOption };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption('');
    } else {
      // Quiz completo - salvar no localStorage e ir para resultado
      localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      router.push('/quiz/result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const questionKey = ['reason', 'frequency', 'impact', 'expectation'][currentQuestion - 1] as keyof QuizAnswers;
      setSelectedOption(answers[questionKey] || '');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Pergunta {currentQuestion + 1} de {quizQuestions.length}</span>
            <span className="text-sm text-purple-600 font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            {question.question}
          </h2>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelectOption(option.value)}
                className={`w-full p-5 rounded-2xl text-left transition-all duration-300 ${
                  selectedOption === option.value
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md'
                }`}
              >
                <span className="text-lg font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex items-center gap-2 px-8 py-3 rounded-full transition-all duration-300 ${
                selectedOption
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Finalizar' : 'Próxima'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Suas respostas nos ajudam a personalizar sua experiência
        </p>
      </div>
    </div>
  );
}
