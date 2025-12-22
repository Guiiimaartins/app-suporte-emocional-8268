import Link from 'next/link';
import { Sparkles, Shield, Lock, Eye, Heart, FileText } from 'lucide-react';

export default function PrivacyPage() {
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

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-purple-100 rounded-full p-6">
              <Shield className="w-16 h-16 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Política de Privacidade
          </h1>
          <p className="text-xl text-gray-600">
            Sua privacidade e segurança são nossa prioridade máxima
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Lock className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Dados Criptografados</h3>
            <p className="text-sm text-gray-600">
              Todas as informações são protegidas com criptografia de ponta
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Eye className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Anonimato Garantido</h3>
            <p className="text-sm text-gray-600">
              Você controla o que compartilha e com quem
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <Heart className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Sem Venda de Dados</h3>
            <p className="text-sm text-gray-600">
              Nunca vendemos ou compartilhamos seus dados pessoais
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-500" />
              1. Informações que Coletamos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                No Aura, coletamos apenas as informações essenciais para proporcionar 
                a melhor experiência de suporte emocional:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Informações de Conta:</strong> Nome, email e senha (criptografada)</li>
                <li><strong>Dados de Uso:</strong> Exercícios realizados, humor registrado, progresso</li>
                <li><strong>Conversas com IA:</strong> Armazenadas de forma criptografada para melhorar o suporte</li>
                <li><strong>Preferências:</strong> Configurações de notificações e personalização</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              2. Como Usamos Suas Informações
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Utilizamos seus dados exclusivamente para:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personalizar sua experiência e recomendações de exercícios</li>
                <li>Melhorar a qualidade das respostas da IA empática</li>
                <li>Enviar lembretes e notificações (se você permitir)</li>
                <li>Analisar padrões agregados para melhorar o app (dados anonimizados)</li>
                <li>Garantir a segurança e prevenir fraudes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              3. Proteção de Dados Sensíveis
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Entendemos que você compartilha informações pessoais e emocionais. 
                Por isso, implementamos medidas rigorosas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Criptografia end-to-end para conversas com a IA</li>
                <li>Servidores seguros com certificação SSL/TLS</li>
                <li>Acesso restrito apenas a equipe autorizada</li>
                <li>Backups automáticos criptografados</li>
                <li>Conformidade com LGPD (Lei Geral de Proteção de Dados)</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              4. Compartilhamento de Dados
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Nunca vendemos seus dados.</strong> Compartilhamos informações apenas em casos específicos:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Comunidade:</strong> Apenas o que você escolhe compartilhar anonimamente</li>
                <li><strong>Provedores de Serviço:</strong> Empresas que nos ajudam a operar o app (sob contrato de confidencialidade)</li>
                <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou para proteger direitos</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              5. Seus Direitos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Você tem total controle sobre seus dados:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Acessar:</strong> Solicite uma cópia de todos os seus dados</li>
                <li><strong>Corrigir:</strong> Atualize informações incorretas</li>
                <li><strong>Excluir:</strong> Delete sua conta e todos os dados associados</li>
                <li><strong>Exportar:</strong> Baixe seus dados em formato legível</li>
                <li><strong>Optar por não receber:</strong> Desative notificações a qualquer momento</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Cookies e Tecnologias Similares
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Utilizamos cookies essenciais para funcionamento do app e cookies 
                analíticos (com seu consentimento) para melhorar a experiência.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              7. Retenção de Dados
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Mantemos seus dados enquanto sua conta estiver ativa. Após exclusão, 
                removemos todas as informações pessoais em até 30 dias, exceto dados 
                necessários para cumprimento legal.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              8. Menores de Idade
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O Aura é destinado a maiores de 18 anos. Se você tem entre 13-17 anos, 
                precisa de consentimento dos pais ou responsáveis.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              9. Alterações nesta Política
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar esta política periodicamente. Notificaremos você 
                sobre mudanças significativas por email ou notificação no app.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              10. Contato
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Para dúvidas sobre privacidade ou exercer seus direitos:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li>📧 Email: privacidade@aura.app</li>
                <li>📱 WhatsApp: (11) 99999-9999</li>
                <li>🌐 Formulário: <Link href="/help" className="text-purple-600 hover:underline">aura.app/help</Link></li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Tem dúvidas sobre privacidade?
          </h3>
          <p className="mb-6 text-white/90">
            Nossa equipe está pronta para ajudar você
          </p>
          <Link 
            href="/help"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
          >
            Falar com Suporte
          </Link>
        </div>
      </div>
    </div>
  );
}
