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
    const payouts = await stripe.payouts.list(
      { limit: 10 },
      { stripeAccount: connectedAccountId }
    );

    const formatted = payouts.data.map((p) => ({
      id:            p.id,
      amount:        p.amount / 100,
      status:        p.status,
      created:       p.created,
      arrivalDate:   p.arrival_date,
      currency:      p.currency,
      description:   p.description,
    }));

    return NextResponse.json({ payouts: formatted });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
