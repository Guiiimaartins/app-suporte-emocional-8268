"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, Send, Heart, Loader2, ArrowLeft, 
  Lock, Crown, MessageCircle, Smile
} from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

export default function ChatPage() {
  const [isPremium] = useState(false); // Simular status de assinatura
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Eu sou a Aura, sua companheira de bem-estar emocional. Este é um espaço seguro e sem julgamentos. Como você está se sentindo hoje? 💜',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    if (!isPremium) {
      // Redirecionar para página de assinatura se não for premium
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Aqui você integraria com a API da OpenAI
      // Por enquanto, simulando resposta
      await new Promise(resolve => setTimeout(resolve, 1500));

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getEmpathicResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getEmpathicResponse = (userInput: string): string => {
    // Respostas empáticas simuladas baseadas em palavras-chave
    const input = userInput.toLowerCase();
    
    if (input.includes('ansiedade') || input.includes('ansioso')) {
      return 'Entendo que você está sentindo ansiedade. Isso é muito comum e você não está sozinho. Vamos tentar algo juntos? Que tal começarmos com uma respiração profunda? Inspire contando até 4, segure por 4, e expire por 6. Faça isso 3 vezes e me conte como se sente depois. 🌸';
    }
    
    if (input.includes('triste') || input.includes('tristeza') || input.includes('sozinho')) {
      return 'Sinto muito que você esteja passando por isso. Seus sentimentos são válidos e é corajoso da sua parte compartilhar isso comigo. Lembre-se: sentir tristeza não é fraqueza, é parte de ser humano. Você gostaria de conversar mais sobre o que está sentindo? Estou aqui para ouvir. 💙';
    }
    
    if (input.includes('estresse') || input.includes('estressado') || input.includes('cansado')) {
      return 'Parece que você está carregando muito peso nos ombros. É importante reconhecer quando precisamos de uma pausa. Que tal tentarmos um exercício de grounding? Olhe ao seu redor e me diga: 5 coisas que você vê, 4 que você pode tocar, 3 que você ouve, 2 que você cheira, e 1 que você pode saborear. Isso ajuda a trazer sua mente de volta ao presente. 🌿';
    }
    
    if (input.includes('obrigado') || input.includes('obrigada') || input.includes('ajudou')) {
      return 'Fico muito feliz em poder ajudar! Você está fazendo um trabalho incrível ao cuidar da sua saúde emocional. Lembre-se: estou sempre aqui quando precisar conversar. Você merece todo o cuidado e acolhimento do mundo. 💜✨';
    }
    
    return 'Obrigada por compartilhar isso comigo. Seus sentimentos são importantes e válidos. Estou aqui para ouvir você, sem julgamentos. Quer me contar mais sobre como você está se sentindo? Às vezes, apenas colocar para fora já ajuda. 🌸';
  };

  const quickReplies = [
    'Estou me sentindo ansioso',
    'Preciso desabafar',
    'Não consigo dormir',
    'Me sinto sozinho',
  ];

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Recurso Premium
          </h2>
          <p className="text-gray-600 mb-6">
            O chat com IA é exclusivo para assinantes Premium. 
            Tenha acesso a conversas ilimitadas com nossa IA empática e acolhedora.
          </p>
          <div className="space-y-3">
            <Link 
              href="/subscription"
              className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              <Crown className="w-5 h-5 inline mr-2" />
              Assinar Premium
            </Link>
            <Link 
              href="/dashboard"
              className="block w-full bg-gray-100 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-800">Aura IA</h1>
                <p className="text-xs text-gray-500">Sempre aqui para você</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-purple-700">Online</span>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white shadow-md text-gray-800'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-semibold text-purple-600">Aura</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <span className={`text-xs mt-2 block ${
                  message.role === 'user' ? 'text-white/70' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white shadow-md rounded-2xl px-5 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />
                  <span className="text-sm text-gray-600">Aura está digitando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-gray-500 mb-2 text-center">Sugestões rápidas:</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => setInputMessage(reply)}
                  className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-all duration-300 shadow-sm"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-purple-100 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <div className="flex-1 bg-gray-100 rounded-3xl px-5 py-3 flex items-center gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                disabled={isLoading}
              />
              <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <Smile className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            <Heart className="w-3 h-3 inline text-pink-500" /> Este é um espaço seguro e confidencial
          </p>
        </div>
      </div>
    </div>
  );
}
