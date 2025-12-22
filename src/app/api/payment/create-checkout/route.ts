import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { plan, userId } = await request.json();

    // Aqui você integraria com Stripe ou outro gateway de pagamento
    // Por enquanto, vamos simular o processo

    // Criar sessão de checkout do Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const priceId = plan === 'monthly' 
      ? process.env.STRIPE_PRICE_MONTHLY 
      : process.env.STRIPE_PRICE_YEARLY;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription`,
      client_reference_id: userId,
      metadata: {
        userId,
        plan,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Erro ao criar sessão de pagamento:', error);
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    );
  }
}
