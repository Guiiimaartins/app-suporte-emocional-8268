import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // Verificar se o cliente Supabase está disponível
    if (!supabase) {
      return NextResponse.json(
        { error: 'Configuração do Supabase não encontrada. Configure as variáveis de ambiente.' },
        { status: 500 }
      );
    }

    const { userId, messages } = await request.json();

    // Verificar se usuário tem acesso premium
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_status, free_trial_ends_at')
      .eq('id', userId)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    // Verificar acesso premium ou trial
    const isPremium = profile.subscription_status === 'premium';
    const isInTrial = profile.free_trial_ends_at && new Date(profile.free_trial_ends_at) > new Date();

    if (!isPremium && !isInTrial) {
      return NextResponse.json({ error: 'Acesso premium necessário' }, { status: 403 });
    }

    // Integração com OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `Você é Aura, uma assistente de bem-estar emocional empática e acolhedora. 
            
Seu papel é:
- Oferecer suporte emocional sem julgamentos
- Usar linguagem calorosa e acolhedora
- Validar os sentimentos do usuário
- Sugerir técnicas práticas de respiração, grounding e mindfulness quando apropriado
- Nunca substituir ajuda profissional - sempre incentivar buscar terapia se necessário
- Manter conversas em português brasileiro
- Usar emojis ocasionalmente para transmitir empatia (💜, 🌸, 💙, 🌿, ✨)

Lembre-se: você está conversando com alguém que pode estar passando por ansiedade, estresse ou momentos difíceis. Seja sempre gentil, paciente e acolhedora.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro na API da OpenAI');
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    // Salvar mensagens no histórico
    await supabase.from('chat_history').insert([
      {
        user_id: userId,
        role: 'user',
        content: messages[messages.length - 1].content,
      },
      {
        user_id: userId,
        role: 'assistant',
        content: aiMessage,
      },
    ]);

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error('Erro no chat:', error);
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    );
  }
}
