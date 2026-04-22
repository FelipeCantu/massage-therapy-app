import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Mirrors the price data in the booking page
const SERVICE_PRICES: Record<string, number> = {
  'Swedish Relaxation — 60 min ($95)': 95,
  'Swedish Relaxation — 90 min ($130)': 130,
  'Aromatherapy Massage — 60 min ($115)': 115,
  'Aromatherapy Massage — 90 min ($150)': 150,
  'Deep Tissue — 60 min ($110)': 110,
  'Deep Tissue — 90 min ($150)': 150,
  'Myofascial Release — 60 min ($120)': 120,
  'Myofascial Release — 90 min ($165)': 165,
  'Sports & Athletic Recovery — 60 min ($115)': 115,
  'Sports & Athletic Recovery — 90 min ($155)': 155,
  'Hot Stone Ritual — 90 min ($165)': 165,
  'Prenatal Massage — 60 min ($105)': 105,
  'Craniosacral Therapy — 60 min ($130)': 130,
};

const ADD_ON_PRICES: Record<string, number> = {
  scalp: 25,
  reflexology: 25,
  cbd: 20,
};

export async function POST(request: Request) {
  const connectedAccountId = process.env.STRIPE_CONNECTED_ACCOUNT_ID;
  if (!connectedAccountId) {
    return Response.json(
      { error: 'Payment processing is not yet configured for this studio.' },
      { status: 503 }
    );
  }

  const body = await request.json();
  const { service, addOns } = body as { service: string; addOns: string[] };

  const basePrice = SERVICE_PRICES[service];
  if (!basePrice) {
    return Response.json({ error: 'Invalid service selected.' }, { status: 400 });
  }

  const addOnTotal = (addOns ?? []).reduce(
    (sum: number, id: string) => sum + (ADD_ON_PRICES[id] ?? 0),
    0
  );

  const totalCents = (basePrice + addOnTotal) * 100;
  const depositCents = 2500; // $25.00 flat deposit, remainder collected at studio

  // Destination charge: funds transfer directly to the connected account.
  const paymentIntent = await stripe.paymentIntents.create({
    amount: depositCents,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    transfer_data: {
      destination: connectedAccountId,
    },
    application_fee_amount: 100, // $1.00 platform fee per booking
    metadata: {
      service,
      addOns: (addOns ?? []).join(','),
      depositAmount: '25',
      totalAmount: String((basePrice + addOnTotal)),
      balanceDueAtStudio: String((basePrice + addOnTotal) - 25),
      connectedAccount: connectedAccountId,
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
