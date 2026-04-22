import Stripe from 'stripe';
import type { NextRequest } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(request: NextRequest) {
  const accountId = request.nextUrl.searchParams.get('accountId')
    ?? process.env.STRIPE_CONNECTED_ACCOUNT_ID;

  if (!accountId) {
    return Response.json({ connected: false });
  }

  const account = await stripe.accounts.retrieve(accountId);

  return Response.json({
    connected: true,
    accountId: account.id,
    chargesEnabled: account.charges_enabled,
    payoutsEnabled: account.payouts_enabled,
    detailsSubmitted: account.details_submitted,
    displayName: account.settings?.dashboard?.display_name ?? null,
    email: account.email ?? null,
  });
}
