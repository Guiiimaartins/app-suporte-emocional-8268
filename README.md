# Aura - Seu espaço de calma

Aplicativo de bem-estar emocional com suporte de IA, exercícios de respiração e comunidade acolhedora.

## 🚀 Deploy na Vercel

### Passo 1: Preparar o Projeto

1. Certifique-se de que todos os arquivos estão commitados no Git
2. Faça push para o GitHub/GitLab/Bitbucket

### Passo 2: Configurar Variáveis de Ambiente na Vercel

Antes de fazer o deploy, configure estas variáveis de ambiente no painel da Vercel:

#### Obrigatórias:
- `NEXT_PUBLIC_SUPABASE_URL` - URL do seu projeto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Chave anônima do Supabase
- `OPENAI_API_KEY` - Chave da API OpenAI

#### Opcionais (para pagamentos):
- `STRIPE_SECRET_KEY` - Chave secreta do Stripe
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Chave pública do Stripe

### Passo 3: Deploy

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório
4. Configure as variáveis de ambiente (Settings → Environment Variables)
5. Clique em "Deploy"

### Passo 4: Configurar Banco de Dados

Execute os scripts SQL no Supabase (encontrados em `schema.sql`):

```sql
-- Execute no SQL Editor do Supabase
-- O arquivo schema.sql contém todas as tabelas necessárias
```

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Copiar arquivo de exemplo de variáveis
cp .env.example .env.local

# Editar .env.local com suas credenciais

# Rodar em desenvolvimento
npm run dev
```

## 📦 Estrutura do Projeto

```
src/
├── app/              # Páginas e rotas
│   ├── api/         # API routes
│   ├── auth/        # Autenticação
│   ├── chat/        # Chat com IA
│   ├── dashboard/   # Dashboard principal
│   └── ...
├── components/      # Componentes reutilizáveis
├── lib/            # Utilitários e configurações
└── hooks/          # React hooks customizados
```

## 🔧 Troubleshooting

### Erro "Project not found"
- Verifique se as variáveis de ambiente estão configuradas corretamente
- Certifique-se de que o Supabase está configurado
- Verifique se o build está passando sem erros

### Erro de autenticação
- Confirme que as chaves do Supabase estão corretas
- Verifique se as tabelas foram criadas no banco de dados
- Certifique-se de que as políticas RLS estão configuradas

### Erro no chat com IA
- Verifique se a chave da OpenAI está configurada
- Confirme que você tem créditos na conta OpenAI
- Verifique os logs da Vercel para mais detalhes

## 📝 Licença

Desenvolvido com 💜 para quem precisa de acolhimento
