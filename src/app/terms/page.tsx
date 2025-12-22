import Link from 'next/link';
import { Sparkles, FileText, Shield, Users, CreditCard, Ban, AlertCircle } from 'lucide-react';

export default function TermsPage() {
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
              <FileText className="w-16 h-16 text-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Termos de Uso
          </h1>
          <p className="text-xl text-gray-600">
            Regras claras para uma comunidade saudável e acolhedora
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-500" />
              1. Aceitação dos Termos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Ao acessar e usar o Aura, você concorda com estes Termos de Uso e 
                nossa Política de Privacidade. Se você não concorda, por favor, 
                não utilize nossos serviços.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-500" />
              2. Elegibilidade
            </h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Você deve ter pelo menos 18 anos para usar o Aura</li>
                <li>Menores de 18 anos precisam de consentimento dos pais/responsáveis</li>
                <li>Você é responsável por manter suas credenciais seguras</li>
                <li>Uma conta por pessoa - contas múltiplas são proibidas</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-500" />
              3. Uso Aceitável
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>O Aura é um espaço seguro. Você concorda em:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tratar todos os membros com respeito e empatia</li>
                <li>Não compartilhar conteúdo ofensivo, discriminatório ou ilegal</li>
                <li>Não fazer spam ou propaganda não autorizada</li>
                <li>Não se passar por outra pessoa ou entidade</li>
                <li>Não tentar hackear ou comprometer a segurança do app</li>
                <li>Respeitar a privacidade de outros usuários</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-purple-500" />
              4. Limitações do Serviço
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                <p className="font-semibold text-yellow-800 mb-2">
                  ⚠️ IMPORTANTE: O Aura NÃO substitui tratamento profissional
                </p>
                <ul className="list-disc list-inside space-y-1 text-yellow-700 text-sm ml-4">
                  <li>Não somos um serviço de emergência médica</li>
                  <li>A IA não substitui terapeutas ou psicólogos</li>
                  <li>Em caso de crise, procure ajuda profissional imediatamente</li>
                  <li>CVV: 188 (24h) | SAMU: 192 | Emergência: 190</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-purple-500" />
              5. Assinaturas e Pagamentos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Plano Gratuito:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Acesso limitado a exercícios básicos</li>
                <li>Diário emocional e progresso</li>
                <li>Sem compromisso ou cartão de crédito</li>
              </ul>
              
              <p className="pt-4"><strong>Plano Premium:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Renovação automática mensal ou anual</li>
                <li>Você pode cancelar a qualquer momento</li>
                <li>Reembolso disponível em até 7 dias após compra</li>
                <li>Preços sujeitos a alteração com aviso prévio de 30 dias</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              6. Propriedade Intelectual
            </h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Todo conteúdo do Aura (textos, design, código) é protegido por direitos autorais</li>
                <li>Você mantém propriedade do conteúdo que cria (diário, posts)</li>
                <li>Ao postar na comunidade, você nos concede licença para exibir esse conteúdo</li>
                <li>Não copie, modifique ou distribua nosso conteúdo sem permissão</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Ban className="w-6 h-6 text-purple-500" />
              7. Suspensão e Encerramento
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>Podemos suspender ou encerrar sua conta se:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Você violar estes Termos de Uso</li>
                <li>Seu comportamento prejudicar outros usuários</li>
                <li>Houver atividade fraudulenta ou ilegal</li>
                <li>Você solicitar o encerramento da conta</li>
              </ul>
              <p className="pt-2">
                Você pode encerrar sua conta a qualquer momento nas Configurações.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              8. Isenção de Responsabilidade
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                O Aura é fornecido "como está". Não garantimos que o serviço será 
                ininterrupto ou livre de erros. Não nos responsabilizamos por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Decisões tomadas com base em informações do app</li>
                <li>Conteúdo gerado por outros usuários</li>
                <li>Problemas técnicos ou perda de dados</li>
                <li>Danos indiretos ou consequenciais</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              9. Modificações dos Termos
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Podemos atualizar estes termos periodicamente. Mudanças significativas 
                serão notificadas por email ou no app. Continuar usando o Aura após 
                mudanças significa que você aceita os novos termos.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              10. Lei Aplicável
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Estes termos são regidos pelas leis brasileiras. Disputas serão 
                resolvidas nos tribunais do Brasil.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              11. Contato
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Para dúvidas sobre estes termos:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li>📧 Email: legal@aura.app</li>
                <li>📱 WhatsApp: (11) 99999-9999</li>
                <li>🌐 Formulário: <Link href="/help" className="text-purple-600 hover:underline">aura.app/help</Link></li>
              </ul>
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">
            Pronto para começar?
          </h3>
          <p className="mb-6 text-white/90">
            Junte-se a milhares de pessoas cuidando do bem-estar emocional
          </p>
          <Link 
            href="/login"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-colors"
          >
            Criar Conta Gratuita
          </Link>
        </div>
      </div>
    </div>
  );
}
