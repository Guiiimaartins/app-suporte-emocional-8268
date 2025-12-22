import { NextRequest, NextResponse } from 'next/server';
import { supabase, canUseSupabase } from '@/lib/supabase';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    // Parse do body
    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, senha e nome são obrigatórios' },
        { status: 400 }
      );
    }

    // Verificar se Supabase está configurado
    if (!canUseSupabase() || !supabase) {
      return NextResponse.json(
        { error: 'Sistema de autenticação não configurado. Configure as variáveis de ambiente do Supabase.' },
        { status: 503 }
      );
    }

    // Criar usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json(
      { error: 'Erro ao processar registro' },
      { status: 500 }
    );
  }
}
