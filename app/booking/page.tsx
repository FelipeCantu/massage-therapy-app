'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const services = [
  'Swedish Relaxation — 60 min ($95)',
  'Swedish Relaxation — 90 min ($130)',
  'Aromatherapy Massage — 60 min ($115)',
  'Aromatherapy Massage — 90 min ($150)',
  'Deep Tissue — 60 min ($110)',
  'Deep Tissue — 90 min ($150)',
  'Myofascial Release — 60 min ($120)',
  'Myofascial Release — 90 min ($165)',
  'Sports & Athletic Recovery — 60 min ($115)',
  'Sports & Athletic Recovery — 90 min ($155)',
  'Hot Stone Ritual — 90 min ($165)',
  'Prenatal Massage — 60 min ($105)',
  'Craniosacral Therapy — 60 min ($130)',
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
];

type Step = 1 | 2 | 3 | 4;

interface FormData {
  service: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isNewClient: string;
  healthNotes: string;
  addOns: string[];
}

const addOnOptions = [
  { id: 'scalp', label: 'Scalp & Face Massage (+$25)' },
  { id: 'reflexology', label: 'Foot Reflexology (+$25)' },
  { id: 'cbd', label: 'CBD Muscle Balm (+$20)' },
];

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    service: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isNewClient: 'yes',
    healthNotes: '',
    addOns: [],
  });

  const update = (field: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAddOn = (id: string) => {
    setForm((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(id)
        ? prev.addOns.filter((a) => a !== id)
        : [...prev.addOns, id],
    }));
  };

  const canProceed = () => {
    if (step === 1) return !!form.service;
    if (step === 2) return !!form.date && !!form.time;
    if (step === 3) return !!form.firstName && !!form.lastName && !!form.email && !!form.phone;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { n: 1, label: 'Service' },
    { n: 2, label: 'Date & Time' },
    { n: 3, label: 'Your Details' },
    { n: 4, label: 'Confirm' },
  ];

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (submitted) {
    return (
      <>
        <Nav />
        <main style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8rem 2rem 4rem' }}>
          <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '1px solid var(--sage)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              color: 'var(--sage)',
              fontSize: '1.75rem',
            }}>
              ✓
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--sage-dark)',
                marginBottom: '1.25rem',
              }}
            >
              You&apos;re all set.
            </h1>
            <p style={{ color: 'var(--ink)', opacity: 0.7, lineHeight: 1.8, marginBottom: '0.75rem' }}>
              A confirmation has been sent to <strong>{form.email}</strong>.
            </p>
            <p style={{ color: 'var(--ink)', opacity: 0.7, lineHeight: 1.8, marginBottom: '2.5rem' }}>
              <strong>{form.service}</strong><br />
              {new Date(form.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {form.time}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--terracotta)', marginBottom: '2.5rem' }}>
              Please arrive 10 minutes early. If this is your first visit, a health intake form will be waiting for you.
            </p>
            <Link href="/" className="btn-primary">Return Home</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <main style={{ minHeight: '100vh', background: 'var(--cream)', paddingTop: '72px' }}>

        {/* Header */}
        <div style={{ background: 'var(--sage-dark)', padding: '4rem 2rem 3rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <p className="section-label" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1rem' }}>Schedule</p>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.05,
              }}
            >
              Book a Session
            </h1>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ background: 'white', borderBottom: '1px solid var(--mist)', padding: '1.25rem 2rem' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', gap: '0', alignItems: 'center' }}>
            {steps.map(({ n, label }, i) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : undefined }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    background: step >= n ? 'var(--sage-dark)' : 'var(--mist)',
                    color: step >= n ? 'var(--cream)' : 'var(--ink)',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}>
                    {step > n ? '✓' : n}
                  </div>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: step >= n ? 'var(--sage-dark)' : 'var(--ink)',
                    opacity: step >= n ? 1 : 0.4,
                    display: 'none',
                  }}
                    className="step-label"
                  >
                    {label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 1, height: '1px', background: step > n ? 'var(--sage)' : 'var(--mist)', margin: '0 0.75rem', transition: 'background 0.3s ease' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
          <form onSubmit={handleSubmit}>

            {/* STEP 1: Service selection */}
            {step === 1 && (
              <div className="animate-fade-up">
                <h2
                  className="font-display"
                  style={{ fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--sage-dark)', marginBottom: '0.5rem' }}
                >
                  Choose your service
                </h2>
                <p style={{ color: 'var(--ink)', opacity: 0.6, fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Not sure? <Link href="/services" style={{ color: 'var(--terracotta)', textDecoration: 'underline' }}>Browse all services</Link> or reach out and we&apos;ll help you decide.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                  {services.map((s) => (
                    <label
                      key={s}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        background: form.service === s ? 'rgba(45,74,62,0.06)' : 'white',
                        border: `1px solid ${form.service === s ? 'var(--sage)' : 'var(--mist)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={s}
                        checked={form.service === s}
                        onChange={() => update('service', s)}
                        style={{ accentColor: 'var(--sage-dark)' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--ink)' }}>{s}</span>
                    </label>
                  ))}
                </div>

                {/* Add-ons */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3
                    className="font-display"
                    style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--sage-dark)', marginBottom: '0.5rem' }}
                  >
                    Add-on enhancements
                  </h3>
                  <p style={{ color: 'var(--ink)', opacity: 0.6, fontSize: '0.85rem', marginBottom: '1.25rem' }}>
                    Optional additions to your session.
                  </p>
                  {addOnOptions.map(({ id, label }) => (
                    <label
                      key={id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.875rem 1.25rem',
                        background: form.addOns.includes(id) ? 'rgba(196,113,74,0.06)' : 'white',
                        border: `1px solid ${form.addOns.includes(id) ? 'var(--terracotta)' : 'var(--mist)'}`,
                        cursor: 'pointer',
                        marginBottom: '0.5rem',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={form.addOns.includes(id)}
                        onChange={() => toggleAddOn(id)}
                        style={{ accentColor: 'var(--terracotta)' }}
                      />
                      <span style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Date & Time */}
            {step === 2 && (
              <div className="animate-fade-up">
                <h2
                  className="font-display"
                  style={{ fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--sage-dark)', marginBottom: '0.5rem' }}
                >
                  Pick your date &amp; time
                </h2>
                <p style={{ color: 'var(--ink)', opacity: 0.6, fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Appointments available Monday–Friday 9am–7pm, Saturday 10am–5pm.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div className="form-field">
                    <label>Date</label>
                    <input
                      type="date"
                      min={minDate}
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      required
                    />
                  </div>
                </div>

                {form.date && (
                  <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--sage-dark)', display: 'block', marginBottom: '1rem' }}>
                      Available Times
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.5rem' }}>
                      {timeSlots.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => update('time', t)}
                          style={{
                            padding: '0.625rem 0.5rem',
                            fontSize: '0.8rem',
                            background: form.time === t ? 'var(--sage-dark)' : 'white',
                            color: form.time === t ? 'var(--cream)' : 'var(--ink)',
                            border: `1px solid ${form.time === t ? 'var(--sage-dark)' : 'var(--mist)'}`,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-dm)',
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Contact details */}
            {step === 3 && (
              <div className="animate-fade-up">
                <h2
                  className="font-display"
                  style={{ fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--sage-dark)', marginBottom: '0.5rem' }}
                >
                  Your details
                </h2>
                <p style={{ color: 'var(--ink)', opacity: 0.6, fontSize: '0.9rem', marginBottom: '2rem' }}>
                  All information is confidential and used only to contact you about your appointment.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-field">
                    <label>First Name</label>
                    <input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required placeholder="Jane" />
                  </div>
                  <div className="form-field">
                    <label>Last Name</label>
                    <input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required placeholder="Smith" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div className="form-field">
                    <label>Email</label>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required placeholder="jane@example.com" />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="(555) 000-0000" />
                  </div>
                </div>

                <div className="form-field" style={{ marginBottom: '1.25rem' }}>
                  <label>Are you a new client?</label>
                  <select value={form.isNewClient} onChange={(e) => update('isNewClient', e.target.value)}>
                    <option value="yes">Yes, this is my first visit</option>
                    <option value="no">No, I&apos;ve been before</option>
                  </select>
                </div>

                <div className="form-field" style={{ marginBottom: '2.5rem' }}>
                  <label>Health notes or concerns (optional)</label>
                  <textarea
                    value={form.healthNotes}
                    onChange={(e) => update('healthNotes', e.target.value)}
                    placeholder="E.g. pregnancy, recent injury, areas to avoid, specific concerns..."
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div className="animate-fade-up">
                <h2
                  className="font-display"
                  style={{ fontSize: '2rem', fontWeight: 300, fontStyle: 'italic', color: 'var(--sage-dark)', marginBottom: '0.5rem' }}
                >
                  Review &amp; confirm
                </h2>
                <p style={{ color: 'var(--ink)', opacity: 0.6, fontSize: '0.9rem', marginBottom: '2rem' }}>
                  Please review your booking details before confirming.
                </p>

                <div style={{
                  background: 'white',
                  border: '1px solid var(--mist)',
                  padding: '2rem',
                  marginBottom: '2rem',
                }}>
                  {[
                    ['Service', form.service],
                    ['Date', form.date ? new Date(form.date + 'T12:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : ''],
                    ['Time', form.time],
                    ['Add-ons', form.addOns.length > 0 ? form.addOns.map(id => addOnOptions.find(a => a.id === id)?.label).join(', ') : 'None'],
                    ['Name', `${form.firstName} ${form.lastName}`],
                    ['Email', form.email],
                    ['Phone', form.phone],
                    ['New Client', form.isNewClient === 'yes' ? 'Yes' : 'No'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '0.875rem 0',
                        borderBottom: '1px solid var(--mist)',
                      }}
                    >
                      <span style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', width: '120px', flexShrink: 0, paddingTop: '2px' }}>
                        {label}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.5 }}>{value}</span>
                    </div>
                  ))}
                </div>

                {form.healthNotes && (
                  <div style={{ background: 'rgba(74,103,65,0.06)', padding: '1.25rem', marginBottom: '2rem', borderLeft: '2px solid var(--sage)' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-dark)', marginBottom: '0.5rem' }}>Health Notes</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.7 }}>{form.healthNotes}</p>
                  </div>
                )}

                <p style={{ fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.6, lineHeight: 1.7, marginBottom: '2rem' }}>
                  By confirming, you agree to our 24-hour cancellation policy. A confirmation email will be sent to {form.email}.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--sage-dark)',
                    fontFamily: 'var(--font-dm)',
                    opacity: 0.7,
                    padding: '0.5rem 0',
                  }}
                >
                  ← Back
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => { if (canProceed()) setStep((s) => (s + 1) as Step); }}
                  className="btn-primary"
                  style={{ opacity: canProceed() ? 1 : 0.45, cursor: canProceed() ? 'pointer' : 'not-allowed' }}
                >
                  Continue →
                </button>
              ) : (
                <button type="submit" className="btn-terracotta">
                  Confirm Booking
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />

      <style>{`
        @media (min-width: 600px) {
          .step-label { display: inline !important; }
        }
      `}</style>
    </>
  );
}
