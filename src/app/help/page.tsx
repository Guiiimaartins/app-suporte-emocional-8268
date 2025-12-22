"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, HelpCircle, MessageCircle, Mail, Phone, 
  ChevronDown, ChevronUp, Search, ExternalLink
} from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: 'Começando',
      questions: [
        {
          q: 'Como funciona o Aura?',
          a: 'O Aura é um app de suporte emocional que oferece exercícios diários, chat com IA empática, comunidade anônima e ferramentas para gerenciar ansiedade e estresse. Você pode começar gratuitamente e fazer upgrade para Premium quando quiser.'
        },
        {
          q: 'Preciso pagar para usar?',
          a: 'Não! O Aura tem um plano gratuito com acesso a exercícios básicos, diário emocional e acompanhamento de progresso. O plano Premium oferece recursos adicionais como chat ilimitado com IA e acesso à comunidade.'
        },
        {
          q: 'O Aura substitui terapia?',
          a: 'Não. O Aura é uma ferramenta complementar de autocuidado, mas não substitui tratamento profissional. Se você está em crise ou precisa de ajuda especializada, procure um psicólogo ou psiquiatra.'
        }
      ]
    },
    {
      category: 'Conta e Assinatura',
      questions: [
        {
          q: 'Como cancelo minha assinatura Premium?',
          a: 'Vá em Configurações > Assinatura > Cancelar Assinatura. Você continuará tendo acesso Premium até o fim do período pago. Não há taxas de cancelamento.'
        },
        {
          q: 'Posso ter reembolso?',
          a: 'Sim! Oferecemos reembolso total em até 7 dias após a compra, sem perguntas. Após esse período, o reembolso é proporcional ao tempo não utilizado.'
        },
        {
          q: 'Como altero meu email ou senha?',
          a: 'Acesse Configurações > Conta > Editar Perfil. Para alterar a senha, clique em "Esqueci minha senha" na tela de login.'
        }
      ]
    },
    {
      category: 'Privacidade e Segurança',
      questions: [
        {
          q: 'Minhas conversas com a IA são privadas?',
          a: 'Sim! Todas as conversas são criptografadas end-to-end. Apenas você tem acesso ao conteúdo. Usamos dados anonimizados para melhorar a IA, mas nunca compartilhamos informações pessoais.'
        },
        {
          q: 'Como funciona o anonimato na comunidade?',
          a: 'Na comunidade, você escolhe um nome de usuário anônimo. Seu nome real e email nunca são exibidos. Você controla o que compartilha.'
        },
        {
          q: 'Vocês vendem meus dados?',
          a: 'Nunca! Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros para fins comerciais. Leia nossa Política de Privacidade para mais detalhes.'
        }
      ]
    },
    {
      category: 'Recursos e Funcionalidades',
      questions: [
        {
          q: 'Como funcionam os exercícios diários?',
          a: 'Todo dia você recebe exercícios personalizados de respiração, meditação e grounding. Complete-os para manter sua sequência e desbloquear conquistas!'
        },
        {
          q: 'O que é a IA empática?',
          a: 'É uma inteligência artificial treinada para oferecer suporte emocional acolhedor. Ela não julga, está disponível 24/7 e aprende com suas conversas para oferecer respostas cada vez mais personalizadas.'
        },
        {
          q: 'Posso usar o Aura offline?',
          a: 'Alguns recursos como diário emocional e exercícios salvos funcionam offline. Chat com IA e comunidade precisam de conexão com internet.'
        }
      ]
    },
    {
      category: 'Problemas Técnicos',
      questions: [
        {
          q: 'O app está lento ou travando',
          a: 'Tente: 1) Fechar e reabrir o app, 2) Limpar cache nas configurações, 3) Atualizar para a versão mais recente, 4) Reiniciar seu dispositivo. Se persistir, entre em contato conosco.'
        },
        {
          q: 'Não recebi o email de verificação',
          a: 'Verifique sua pasta de spam. Se não encontrar, vá em Configurações > Conta > Reenviar Email de Verificação. Aguarde até 10 minutos.'
        },
        {
          q: 'Perdi meu progresso',
          a: 'Seus dados são salvos automaticamente na nuvem. Faça login com a mesma conta para recuperar tudo. Se o problema persistir, contate o suporte.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq => 
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Aura
            </h1>
          </Link>
          <Link 
            href="/dashboard"
            className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
          >
            Voltar ao App
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 rounded-full p-6">
              <HelpCircle className="w-16 h-16 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Como podemos ajudar?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Encontre respostas rápidas ou fale com nossa equipe
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por dúvidas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none text-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a 
            href="mailto:suporte@aura.app"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
          >
            <Mail className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-3">
              Resposta em até 24h
            </p>
            <span className="text-purple-600 font-semibold">
              suporte@aura.app
            </span>
          </a>

          <a 
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
          >
            <Phone className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">WhatsApp</h3>
            <p className="text-sm text-gray-600 mb-3">
              Atendimento rápido
            </p>
            <span className="text-green-600 font-semibold">
              (11) 99999-9999
            </span>
          </a>

          <button className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
            <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Chat ao Vivo</h3>
            <p className="text-sm text-gray-600 mb-3">
              Segunda a sexta, 9h-18h
            </p>
            <span className="text-blue-600 font-semibold">
              Iniciar conversa
            </span>
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Perguntas Frequentes
          </h2>

          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                Nenhuma pergunta encontrada para "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="text-purple-600 font-semibold hover:underline"
              >
                Limpar busca
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-xl font-bold text-purple-600 mb-4">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openFaq === globalIndex;
                      
                      return (
                        <div
                          key={faqIndex}
                          className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors"
                        >
                          <button
                            onClick={() => setOpenFaq(isOpen ? null : globalIndex)}
                            className="w-full flex items-center justify-between p-5 text-left hover:bg-purple-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-800 pr-4">
                              {faq.q}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 text-gray-700 bg-purple-50/50">
                              {faq.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link 
            href="/privacy"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
          >
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Política de Privacidade</h3>
              <p className="text-sm text-gray-600">
                Como protegemos seus dados
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            href="/terms"
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
          >
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Termos de Uso</h3>
              <p className="text-sm text-gray-600">
                Regras e diretrizes do app
              </p>
            </div>
            <ExternalLink className="w-5 h-5 text-purple-500 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Emergency Banner */}
        <div className="mt-12 bg-red-50 border-2 border-red-200 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-red-800 mb-3">
            🚨 Em caso de emergência
          </h3>
          <p className="text-red-700 mb-4">
            Se você está em crise ou pensando em se machucar, procure ajuda imediatamente:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white rounded-xl px-4 py-2 shadow">
              <strong>CVV:</strong> 188 (24h)
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow">
              <strong>SAMU:</strong> 192
            </div>
            <div className="bg-white rounded-xl px-4 py-2 shadow">
              <strong>Emergência:</strong> 190
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
