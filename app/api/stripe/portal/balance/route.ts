import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const adminKey = req.headers.get('x-admin-key');
  if (!adminKey || adminKey !== process.env.CLIENT_PORTAL_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const connectedAccountId = process.env.STRIPE_CONNECTED_ACCOUNT_ID;
  if (!connectedAccountId) {
    return NextResponse.json({ error: 'No connected account configured.' }, { status: 503 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const balance = await stripe.balance.retrieve(
      {},
      { stripeAccount: connectedAccountId }
    );

    const available = balance.available.reduce((sum, b) => sum + b.amount, 0);
    const pending   = balance.pending.reduce((sum, b) => sum + b.amount, 0);

    return NextResponse.json({
      available: available / 100,
      pending:   pending / 100,
      currency:  balance.available[0]?.currency || 'usd',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
