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
    const payments = await stripe.paymentIntents.list(
      { limit: 25, expand: ['data.charges'] },
      { stripeAccount: connectedAccountId }
    );

    const formatted = payments.data.map((pi) => {
      const charge = (pi as Stripe.PaymentIntent & { charges?: { data: Stripe.Charge[] } })
        .charges?.data?.[0];
      return {
        id:          pi.id,
        amount:      pi.amount / 100,
        status:      pi.status,
        created:     pi.created,
        service:     pi.metadata?.service    || null,
        addOns:      pi.metadata?.addOns     || null,
        totalAmount: pi.metadata?.totalAmount || null,
        balanceDue:  pi.metadata?.balanceDueAtStudio || null,
        receiptUrl:  charge?.receipt_url     || null,
      };
    });

    return NextResponse.json({ payments: formatted });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
