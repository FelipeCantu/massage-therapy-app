import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  // Create a new Express connected account
  const account = await stripe.accounts.create({
    type: 'express',
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  // Generate a one-time onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${appUrl}/angelface?refresh=true`,
    return_url: `${appUrl}/angelface?connected=${account.id}`,
    type: 'account_onboarding',
  });

  return Response.json({ url: accountLink.url, accountId: account.id });
}
