import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Assinatura ausente' }, { status: 400 });
    }

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Erro ao verificar webhook:', err);
      return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 });
    }

    // Processar eventos do Stripe
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.client_reference_id;

        // Atualizar usuário para premium
        await supabase
          .from('user_profiles')
          .update({
            subscription_status: 'premium',
            subscription_started_at: new Date().toISOString(),
          })
          .eq('id', userId);

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata.userId;

        // Downgrade para free
        await supabase
          .from('user_profiles')
          .update({
            subscription_status: 'free',
          })
          .eq('id', userId);

        break;
      }

      default:
        console.log(`Evento não tratado: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    );
  }
}
