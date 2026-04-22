'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

interface AccountStatus {
  connected: boolean;
  accountId?: string;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
  detailsSubmitted?: boolean;
  displayName?: string | null;
  email?: string | null;
}

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span style={{
      display: 'inline-block',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: ok ? '#2D4A3E' : '#C4714A',
      marginRight: '0.5rem',
      flexShrink: 0,
    }} />
  );
}

function AdminContent() {
  const searchParams = useSearchParams();
  const justConnected = searchParams.get('connected');
  const needsRefresh = searchParams.get('refresh');

  const [status, setStatus] = useState<AccountStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [connecting, setConnecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Fetch account status — use query param account ID after onboarding, else env var
  useEffect(() => {
    const url = justConnected
      ? `/api/stripe/connect/status?accountId=${justConnected}`
      : '/api/stripe/connect/status';

    fetch(url)
      .then((r) => r.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus({ connected: false }))
      .finally(() => setLoading(false));
  }, [justConnected]);

  const handleConnect = async () => {
    setConnecting(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/connect', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error ?? 'Could not start onboarding.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
      setConnecting(false);
    }
  };

  const copyAccountId = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '72px' }}>

        {/* Header */}
        <div style={{ background: 'var(--sage-dark)', padding: '4rem 2rem 3rem' }}>
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <p className="section-label" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1rem' }}>Studio Admin</p>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.25rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.05,
              }}
            >
              Payment Setup
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>

          {/* Refresh notice */}
          {needsRefresh && (
            <div style={{
              background: 'rgba(196,113,74,0.08)',
              border: '1px solid var(--terracotta)',
              padding: '1rem 1.5rem',
              marginBottom: '2rem',
              fontSize: '0.875rem',
              color: 'var(--terracotta)',
            }}>
              Your onboarding link expired. Please start again below.
            </div>
          )}

          {loading ? (
            <p style={{ color: 'var(--ink)', opacity: 0.5, fontSize: '0.9rem' }}>Checking connection status…</p>
          ) : (

            <>
              {/* ── NOT CONNECTED ── */}
              {!status?.connected && !justConnected && (
                <div>
                  <h2
                    className="font-display"
                    style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}
                  >
                    Connect your Stripe account
                  </h2>
                  <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                    Clicking the button below will open Stripe&apos;s secure onboarding flow. You&apos;ll enter your banking details, verify your identity, and set up payouts — directly with Stripe. We never see or store your financial credentials.
                  </p>

                  <div style={{
                    background: 'white',
                    border: '1px solid var(--mist)',
                    padding: '1.5rem',
                    marginBottom: '2rem',
                  }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>
                      What you&apos;ll need
                    </p>
                    {[
                      'Business or personal bank account (for payouts)',
                      'Government-issued ID or SSN for identity verification',
                      'Business address and phone number',
                    ].map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--sage)', marginTop: '3px', flexShrink: 0 }}>—</span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--ink)', opacity: 0.8, lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div style={{
                      background: 'rgba(196,113,74,0.08)',
                      border: '1px solid var(--terracotta)',
                      padding: '0.875rem 1.25rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--terracotta)',
                    }}>
                      {error}
                    </div>
                  )}

                  <button
                    onClick={handleConnect}
                    disabled={connecting}
                    className="btn-terracotta"
                    style={{ opacity: connecting ? 0.6 : 1, cursor: connecting ? 'not-allowed' : 'pointer' }}
                  >
                    {connecting ? 'Redirecting to Stripe…' : 'Connect Stripe Account →'}
                  </button>
                </div>
              )}

              {/* ── JUST COMPLETED ONBOARDING ── */}
              {justConnected && (
                <div>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: '1px solid var(--sage)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--sage)',
                    fontSize: '1.5rem',
                  }}>
                    ✓
                  </div>

                  <h2
                    className="font-display"
                    style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}
                  >
                    Stripe account connected
                  </h2>

                  {status?.detailsSubmitted ? (
                    <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                      Onboarding is complete. Save your connected account ID below — add it to your <code style={{ background: 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', fontSize: '0.85em' }}>.env.local</code> file and you&apos;re ready to accept payments.
                    </p>
                  ) : (
                    <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                      Stripe is still verifying your account. This usually takes a few minutes. Your account ID is below — save it now and add it to your environment once verification is complete.
                    </p>
                  )}

                  {/* Account ID copy block */}
                  <div style={{
                    background: 'white',
                    border: '1px solid var(--mist)',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                  }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>
                      Your Connected Account ID
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <code style={{
                        flex: 1,
                        background: 'rgba(45,74,62,0.05)',
                        border: '1px solid var(--mist)',
                        padding: '0.625rem 1rem',
                        fontSize: '0.875rem',
                        color: 'var(--sage-dark)',
                        fontFamily: 'monospace',
                        wordBreak: 'break-all',
                      }}>
                        {justConnected}
                      </code>
                      <button
                        onClick={() => copyAccountId(justConnected)}
                        style={{
                          background: copied ? 'var(--sage-dark)' : 'white',
                          color: copied ? 'var(--cream)' : 'var(--sage-dark)',
                          border: '1px solid var(--sage)',
                          padding: '0.625rem 1.25rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontFamily: 'var(--font-dm)',
                          flexShrink: 0,
                        }}
                      >
                        {copied ? 'Copied ✓' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div style={{
                    background: 'rgba(45,74,62,0.04)',
                    border: '1px solid var(--mist)',
                    borderLeft: '3px solid var(--sage)',
                    padding: '1.25rem 1.5rem',
                    marginBottom: '2rem',
                  }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>
                      Next step
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                      Add this line to your <code style={{ background: 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em' }}>.env.local</code> file:
                    </p>
                    <code style={{
                      display: 'block',
                      background: 'white',
                      border: '1px solid var(--mist)',
                      padding: '0.75rem 1rem',
                      fontSize: '0.8rem',
                      color: 'var(--ink)',
                      fontFamily: 'monospace',
                    }}>
                      STRIPE_CONNECTED_ACCOUNT_ID={justConnected}
                    </code>
                  </div>

                  {/* Account status pills */}
                  {status && (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Details submitted', ok: !!status.detailsSubmitted },
                        { label: 'Charges enabled', ok: !!status.chargesEnabled },
                        { label: 'Payouts enabled', ok: !!status.payoutsEnabled },
                      ].map(({ label, ok }) => (
                        <div
                          key={label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'white',
                            border: '1px solid var(--mist)',
                            padding: '0.5rem 0.875rem',
                            fontSize: '0.8rem',
                            color: 'var(--ink)',
                          }}
                        >
                          <StatusDot ok={ok} />
                          {label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── ALREADY CONNECTED (env var set) ── */}
              {status?.connected && !justConnected && (
                <div>
                  <h2
                    className="font-display"
                    style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}
                  >
                    Stripe is connected
                  </h2>
                  <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                    Payments from bookings will be deposited directly into the connected account.
                  </p>

                  <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '1.5rem', marginBottom: '2rem' }}>
                    {(
                      [
                        ['Account ID', status.accountId],
                        ...(status.displayName ? [['Display name', status.displayName]] : []),
                        ...(status.email ? [['Email', status.email]] : []),
                      ] as [string, string][]
                    ).map(([label, value]) => (
                      <div key={label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--mist)' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', width: '140px', flexShrink: 0, paddingTop: '2px' }}>
                          {label}
                        </span>
                        <span style={{ fontSize: '0.875rem', color: 'var(--ink)', fontFamily: label === 'Account ID' ? 'monospace' : 'inherit' }}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                    {[
                      { label: 'Details submitted', ok: !!status.detailsSubmitted },
                      { label: 'Charges enabled', ok: !!status.chargesEnabled },
                      { label: 'Payouts enabled', ok: !!status.payoutsEnabled },
                    ].map(({ label, ok }) => (
                      <div
                        key={label}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'white',
                          border: '1px solid var(--mist)',
                          padding: '0.5rem 0.875rem',
                          fontSize: '0.8rem',
                          color: 'var(--ink)',
                        }}
                      >
                        <StatusDot ok={ok} />
                        {label}
                      </div>
                    ))}
                  </div>

                  {(!status.chargesEnabled || !status.payoutsEnabled) && (
                    <div style={{
                      background: 'rgba(196,113,74,0.08)',
                      border: '1px solid var(--terracotta)',
                      padding: '1rem 1.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--terracotta)',
                      lineHeight: 1.7,
                    }}>
                      Stripe is still reviewing the account. Payments will activate once verification is complete — usually within a few minutes to a few hours.
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--mist)' }}>
            <Link
              href="/"
              style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', opacity: 0.6, textDecoration: 'none' }}
            >
              ← Back to site
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={null}>
      <AdminContent />
    </Suspense>
  );
}
