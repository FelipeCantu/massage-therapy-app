'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { defaultServices, type Service } from '@/lib/services';

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

// ---------------------------------------------------------------------------
// Services Editor
// ---------------------------------------------------------------------------
function ServicesEditor() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const dragIndex = useRef<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setServices(data))
      .catch(() => setServices(defaultServices))
      .finally(() => setLoading(false));
  }, []);

  const save = async (updated: Service[]) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Save failed');
      setServices(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = editing ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [editing]);

  const openNew = () => {
    setEditing({ id: Date.now().toString(), name: '', duration: '', price: '', desc: '' });
    setIsNew(true);
  };

  const openEdit = (s: Service) => {
    setEditing({ ...s });
    setIsNew(false);
  };

  const cancelEdit = () => {
    setEditing(null);
    setIsNew(false);
  };

  const commitEdit = () => {
    if (!editing) return;
    const trimmed = {
      ...editing,
      name: editing.name.trim(),
      duration: editing.duration.trim(),
      price: editing.price.trim(),
      desc: editing.desc.trim(),
    };
    if (!trimmed.name || !trimmed.price) {
      setError('Name and price are required.');
      return;
    }
    setError('');
    const updated = isNew
      ? [...services, trimmed]
      : services.map((s) => (s.id === trimmed.id ? trimmed : s));
    save(updated);
    setEditing(null);
    setIsNew(false);
  };

  const deleteService = (id: string) => {
    if (!confirm('Remove this service?')) return;
    save(services.filter((s) => s.id !== id));
  };

  const onDragStart = (i: number) => { dragIndex.current = i; };

  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    // Show indicator below last item when dragging into the bottom half of it
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    const target = e.clientY > midY ? i + 1 : i;
    setDragOver(target);
  };

  const onDrop = (dropTarget: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    setDragOver(null);
    if (from === null || from === dropTarget || from === dropTarget - 1) return;
    const next = [...services];
    const [moved] = next.splice(from, 1);
    const insertAt = dropTarget > from ? dropTarget - 1 : dropTarget;
    next.splice(insertAt, 0, moved);
    save(next);
  };

  if (loading) return <p style={{ color: 'var(--ink)', opacity: 0.5, fontSize: '0.9rem' }}>Loading services…</p>;

  return (
    <div>
      {/* Service list */}
      <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--mist)', gap: '1px', marginBottom: '1.5rem' }}>
        {services.map((s, i) => {
          const isDragging = dragIndex.current === i;
          const showIndicatorAbove = dragOver === i && !isDragging && dragIndex.current !== i - 1;
          return (
            <div key={s.id}>
              {/* Drop indicator above */}
              <div style={{
                height: showIndicatorAbove ? '3px' : '0px',
                background: 'var(--sage)',
                transition: 'height 0.15s ease',
                overflow: 'hidden',
              }} />

              <div
                draggable
                onDragStart={() => onDragStart(i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDrop={() => onDrop(dragOver ?? i)}
                onDragLeave={() => setDragOver(null)}
                onDragEnd={() => { dragIndex.current = null; setDragOver(null); }}
                style={{
                  background: 'white',
                  padding: '1.25rem 1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '1rem',
                  alignItems: 'start',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  opacity: isDragging ? 0.35 : 1,
                  transition: 'opacity 0.15s ease',
                }}
              >
                {/* Drag handle — hidden on mobile */}
                <div className="drag-handle" style={{
                  paddingTop: '3px',
                  color: 'var(--ink)',
                  opacity: 0.25,
                  fontSize: '0.9rem',
                  userSelect: 'none',
                  lineHeight: 1,
                }}>
                  ⠿
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                    <span className="font-display" style={{ fontSize: '1.15rem', fontWeight: 400, color: 'var(--sage-dark)' }}>
                      {s.name}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--terracotta)', fontWeight: 500 }}>{s.price}</span>
                    <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', opacity: 0.8 }}>{s.duration}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.6, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexShrink: 0 }}>
                  <button onClick={(e) => { e.stopPropagation(); openEdit(s); }} style={iconBtn}>Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); deleteService(s.id); }} style={{ ...iconBtn, color: 'var(--terracotta)' }}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Drop indicator at end of list */}
        <div style={{
          height: dragOver === services.length ? '3px' : '0px',
          background: 'var(--sage)',
          transition: 'height 0.15s ease',
          overflow: 'hidden',
        }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={openNew} className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.7rem 1.75rem' }}>
          + Add Service
        </button>
        {saved && (
          <p style={{ fontSize: '0.85rem', color: 'var(--sage-dark)', fontWeight: 500, margin: 0 }}>
            ✓ Services saved and live.
          </p>
        )}
      </div>

      {/* Modal editor */}
      {editing && (
        <>
          {/* Backdrop */}
          <div
            onClick={cancelEdit}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(28,28,25,0.5)',
              zIndex: 200,
              backdropFilter: 'blur(2px)',
            }}
          />

          {/* Panel */}
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '480px',
            background: 'var(--cream)',
            zIndex: 201,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-8px 0 40px rgba(28,28,25,0.15)',
          }}>
            {/* Panel header */}
            <div style={{
              background: 'var(--sage-dark)',
              padding: '2rem 2rem 1.75rem',
              flexShrink: 0,
            }}>
              <p className="section-label" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '0.5rem' }}>
                {isNew ? 'New Service' : 'Edit Service'}
              </p>
              <h2 className="font-display" style={{
                fontSize: '2rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.1,
              }}>
                {isNew ? 'Add a service' : editing.name || 'Edit service'}
              </h2>
            </div>

            {/* Scrollable form body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-field">
                  <label>Service Name *</label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="e.g. Swedish Relaxation"
                    autoFocus
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-field">
                    <label>Price *</label>
                    <input
                      type="text"
                      value={editing.price}
                      onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                      placeholder="e.g. $95 / $130"
                    />
                  </div>
                  <div className="form-field">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={editing.duration}
                      onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                      placeholder="e.g. 60 / 90 min"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label>Description</label>
                  <textarea
                    value={editing.desc}
                    onChange={(e) => setEditing({ ...editing, desc: e.target.value })}
                    placeholder="Brief description of this service…"
                    style={{ minHeight: '110px' }}
                  />
                </div>

                {error && (
                  <p style={{ fontSize: '0.85rem', color: 'var(--terracotta)', margin: 0 }}>{error}</p>
                )}
              </div>
            </div>

            {/* Panel footer */}
            <div style={{
              padding: '1.5rem 2rem',
              borderTop: '1px solid var(--mist)',
              background: 'var(--cream)',
              display: 'flex',
              gap: '0.75rem',
              flexShrink: 0,
            }}>
              <button
                onClick={commitEdit}
                disabled={saving}
                className="btn-primary"
                style={{ flex: 1, opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Saving…' : 'Save Service'}
              </button>
              <button onClick={cancelEdit} style={{ ...iconBtn, padding: '0.875rem 1.5rem' }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const iconBtn: React.CSSProperties = {
  background: 'none',
  border: '1px solid var(--mist)',
  padding: '0.3rem 0.75rem',
  fontSize: '0.72rem',
  fontWeight: 500,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  color: 'var(--sage-dark)',
  fontFamily: 'var(--font-dm)',
};


// ---------------------------------------------------------------------------
// Payment Portal
// ---------------------------------------------------------------------------
const fmt = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n ?? 0);

const fmtDate = (unix: number) =>
  new Date(unix * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function PaymentPortal({ adminKey }: { adminKey: string }) {
  const [balance, setBalance]   = useState<{ available: number; pending: number } | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [payouts, setPayouts]   = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [tab, setTab]           = useState<'payments' | 'payouts'>('payments');

  useEffect(() => {
    const headers = { 'x-admin-key': adminKey };
    Promise.all([
      fetch('/api/stripe/portal/balance',  { headers }).then(r => r.json()),
      fetch('/api/stripe/portal/payments', { headers }).then(r => r.json()),
      fetch('/api/stripe/portal/payouts',  { headers }).then(r => r.json()),
    ]).then(([bal, pay, po]) => {
      setBalance(bal);
      setPayments(pay.payments || []);
      setPayouts(po.payouts   || []);
    }).finally(() => setLoading(false));
  }, [adminKey]);

  if (loading) return <p style={{ color: 'var(--ink)', opacity: 0.5, fontSize: '0.9rem' }}>Loading payment data…</p>;

  const statusColor = (s: string) => s === 'succeeded' || s === 'paid' ? 'var(--sage-dark)' : s === 'pending' ? '#b45309' : 'var(--terracotta)';

  return (
    <div>
      {/* Balance cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--mist)', marginBottom: '2.5rem' }}>
        {[
          { label: 'Available Balance', value: fmt(balance?.available ?? 0), sub: 'Ready to payout' },
          { label: 'Pending',           value: fmt(balance?.pending ?? 0),   sub: 'In transit' },
          { label: 'Total Bookings',    value: payments.length.toString(),   sub: 'Recent payments' },
        ].map(({ label, value, sub }) => (
          <div key={label} style={{ background: 'white', padding: '1.5rem' }}>
            <p style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sage)', margin: '0 0 0.5rem' }}>{label}</p>
            <p className="font-display" style={{ fontSize: '1.75rem', fontWeight: 400, color: 'var(--sage-dark)', margin: '0 0 0.2rem' }}>{value}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--terracotta)', margin: 0 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--mist)', marginBottom: '1.5rem' }}>
        {(['payments', 'payouts'] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: 'none', border: 'none',
            borderBottom: tab === t ? '2px solid var(--sage-dark)' : '2px solid transparent',
            padding: '0.75rem 1.25rem', marginBottom: '-1px',
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: tab === t ? 'var(--sage-dark)' : 'var(--ink)', opacity: tab === t ? 1 : 0.45,
            cursor: 'pointer', fontFamily: 'var(--font-dm)', transition: 'all 0.2s ease',
          }}>
            {t === 'payments' ? `Bookings (${payments.length})` : `Payouts (${payouts.length})`}
          </button>
        ))}
      </div>

      {/* Payments list */}
      {tab === 'payments' && (
        payments.length === 0
          ? <p style={{ color: 'var(--ink)', opacity: 0.4, fontSize: '0.9rem' }}>No payments yet.</p>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--mist)' }}>
              {payments.map((p) => (
                <div key={p.id} style={{ background: 'white', padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'start' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--sage-dark)', margin: '0 0 0.2rem' }}>
                      {p.service || 'Booking deposit'}
                    </p>
                    {p.addOns && <p style={{ fontSize: '0.72rem', color: 'var(--ink)', opacity: 0.5, margin: '0 0 0.35rem' }}>Add-ons: {p.addOns}</p>}
                    <p style={{ fontSize: '0.72rem', color: 'var(--ink)', opacity: 0.4, margin: 0 }}>{fmtDate(p.created)}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--sage-dark)', margin: '0 0 0.25rem' }}>{fmt(p.amount)}</p>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor(p.status) }}>{p.status}</span>
                    {p.totalAmount && (
                      <p style={{ fontSize: '0.68rem', color: 'var(--ink)', opacity: 0.4, margin: '0.25rem 0 0' }}>Total: {fmt(Number(p.totalAmount))}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
      )}

      {/* Payouts list */}
      {tab === 'payouts' && (
        payouts.length === 0
          ? <p style={{ color: 'var(--ink)', opacity: 0.4, fontSize: '0.9rem' }}>No payouts yet.</p>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--mist)' }}>
              {payouts.map((p) => (
                <div key={p.id} style={{ background: 'white', padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--sage-dark)', margin: '0 0 0.2rem' }}>
                      {p.description || 'Payout to bank'}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--ink)', opacity: 0.4, margin: 0 }}>
                      Initiated {fmtDate(p.created)} · Arrives {fmtDate(p.arrivalDate)}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--sage-dark)', margin: '0 0 0.25rem' }}>{fmt(p.amount)}</p>
                    <span style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: statusColor(p.status) }}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
      )}
    </div>
  );
}

  return (
    <>
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

      {!status?.connected && !justConnected && (
        <div>
          <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>
            Connect your Stripe account
          </h2>
          <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Clicking the button below will open Stripe&apos;s secure onboarding flow. We never see or store your financial credentials.
          </p>
          <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>
              To get started you only need
            </p>
            {['An email address', 'Your name and basic business info'].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--sage)', marginTop: '3px', flexShrink: 0 }}>—</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink)', opacity: 0.8, lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
          {error && (
            <div style={{ background: 'rgba(196,113,74,0.08)', border: '1px solid var(--terracotta)', padding: '0.875rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--terracotta)' }}>
              {error}
            </div>
          )}
          <button onClick={handleConnect} disabled={connecting} className="btn-terracotta" style={{ opacity: connecting ? 0.6 : 1, cursor: connecting ? 'not-allowed' : 'pointer' }}>
            {connecting ? 'Redirecting to Stripe…' : 'Connect Stripe Account →'}
          </button>
        </div>
      )}

      {justConnected && (
        <div>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--sage)', fontSize: '1.5rem' }}>✓</div>
          <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>Stripe account connected</h2>
          <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            {status?.detailsSubmitted
              ? 'Onboarding is complete. Save your connected account ID below.'
              : 'Stripe is still verifying your account. Your account ID is below — save it now.'}
          </p>
          <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>Your Connected Account ID</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <code style={{ flex: 1, background: 'rgba(45,74,62,0.05)', border: '1px solid var(--mist)', padding: '0.625rem 1rem', fontSize: '0.875rem', color: 'var(--sage-dark)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                {justConnected}
              </code>
              <button onClick={() => copyAccountId(justConnected)} style={{ background: copied ? 'var(--sage-dark)' : 'white', color: copied ? 'var(--cream)' : 'var(--sage-dark)', border: '1px solid var(--sage)', padding: '0.625rem 1.25rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'var(--font-dm)', flexShrink: 0 }}>
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
          </div>
          {status && (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Details submitted', ok: !!status.detailsSubmitted },
                { label: 'Charges enabled', ok: !!status.chargesEnabled },
                { label: 'Payouts enabled', ok: !!status.payoutsEnabled },
              ].map(({ label, ok }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--mist)', padding: '0.5rem 0.875rem', fontSize: '0.8rem', color: 'var(--ink)' }}>
                  <StatusDot ok={ok} />{label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {status?.connected && !justConnected && (
        <div>
          <h2 className="font-display" style={{ fontSize: '1.75rem', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}>Stripe is connected</h2>
          <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Payments from bookings will be deposited directly into the connected account.
          </p>
          <div style={{ background: 'white', border: '1px solid var(--mist)', padding: '1.5rem', marginBottom: '2rem' }}>
            {([
              ['Account ID', status.accountId],
              ...(status.displayName ? [['Display name', status.displayName]] : []),
              ...(status.email ? [['Email', status.email]] : []),
            ] as [string, string][]).map(([label, value]) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--mist)' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', width: '140px', flexShrink: 0, paddingTop: '2px' }}>{label}</span>
                <span style={{ fontSize: '0.875rem', color: 'var(--ink)', fontFamily: label === 'Account ID' ? 'monospace' : 'inherit' }}>{value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { label: 'Details submitted', ok: !!status.detailsSubmitted },
              { label: 'Charges enabled', ok: !!status.chargesEnabled },
              { label: 'Payouts enabled', ok: !!status.payoutsEnabled },
            ].map(({ label, ok }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid var(--mist)', padding: '0.5rem 0.875rem', fontSize: '0.8rem', color: 'var(--ink)' }}>
                <StatusDot ok={ok} />{label}
              </div>
            ))}
          </div>
          {(!status.chargesEnabled || !status.payoutsEnabled) && (
            <div style={{ background: 'rgba(196,113,74,0.08)', border: '1px solid var(--terracotta)', padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--terracotta)', lineHeight: 1.7 }}>
              Stripe is still reviewing the account. Payments will activate once verification is complete.
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Password gate
// ---------------------------------------------------------------------------
const SESSION_KEY = 'af_admin_key';

function PasswordGate({ children }: { children: (adminKey: string) => React.ReactNode }) {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(SESSION_KEY) || '');
  const [input, setInput]       = useState('');
  const [error, setError]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [show, setShow]         = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch('/api/stripe/portal/balance', {
        headers: { 'x-admin-key': input },
      });
      if (res.ok) {
        sessionStorage.setItem(SESSION_KEY, input);
        setAdminKey(input);
      } else {
        setError(true);
        setInput('');
        setTimeout(() => setError(false), 2500);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (adminKey) return <>{children(adminKey)}</>;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--sage-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,113,74,0.12) 0%, transparent 70%)',
        top: '-100px',
        right: '-100px',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '380px', position: 'relative' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="font-display" style={{
            fontSize: '2.5rem',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--cream)',
            lineHeight: 1,
            marginBottom: '0.4rem',
          }}>
            Angel Face
          </div>
          <div style={{
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--terracotta)',
          }}>
            Studio Admin
          </div>
        </div>

        {/* Form card */}
        <form onSubmit={submit} style={{
          background: 'var(--cream)',
          padding: '2.5rem',
        }}>
          <h2 className="font-display" style={{
            fontSize: '1.5rem',
            fontWeight: 300,
            color: 'var(--sage-dark)',
            marginBottom: '1.75rem',
          }}>
            Enter password to continue
          </h2>

          <div className="form-field" style={{ marginBottom: '1.25rem' }}>
            <label>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={show ? 'text' : 'password'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="••••••••••••"
                autoFocus
                style={{
                  paddingRight: '3rem',
                  borderColor: error ? 'var(--terracotta)' : undefined,
                  background: error ? 'rgba(196,113,74,0.04)' : undefined,
                }}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                style={{
                  position: 'absolute',
                  right: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  color: 'var(--sage-dark)',
                  opacity: 0.5,
                  fontFamily: 'var(--font-dm)',
                  letterSpacing: '0.05em',
                  padding: 0,
                }}
              >
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--terracotta)',
              marginBottom: '1rem',
              marginTop: '-0.5rem',
            }}>
              Incorrect password. Please try again.
            </p>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Verifying…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main admin page
// ---------------------------------------------------------------------------
type Tab = 'services' | 'payments';

function AdminContent({ adminKey }: { adminKey: string }) {
  const [tab, setTab] = useState<Tab>('services');

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '72px' }}>

        {/* Header */}
        <div style={{ background: 'var(--sage-dark)', padding: '4rem 2rem 3rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p className="section-label" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1rem' }}>Studio Admin</p>
            <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.05 }}>
              Manage Your Studio
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid var(--mist)', background: 'white' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 2rem', display: 'flex', gap: '0' }}>
            {([['services', 'Services'], ['payments', 'Payments']] as [Tab, string][]).map(([t, label]) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: tab === t ? '2px solid var(--sage-dark)' : '2px solid transparent',
                  padding: '1rem 1.5rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: tab === t ? 'var(--sage-dark)' : 'var(--ink)',
                  opacity: tab === t ? 1 : 0.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-dm)',
                  marginBottom: '-1px',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>
          {tab === 'services' && <ServicesEditor />}
          {tab === 'payments' && <PaymentPortal adminKey={adminKey} />}

          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--mist)' }}>
            <Link href="/" style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', opacity: 0.6, textDecoration: 'none' }}>
              ← Back to site
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .drag-handle { display: none !important; }
        }
      `}</style>
    </>
  );
}

export default function AdminPage() {
  return (
    <PasswordGate>
      {(adminKey) => <AdminContent adminKey={adminKey} />}
    </PasswordGate>
  );
}
