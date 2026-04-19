'use client';

import { useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const update = (field: string, value: string) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Nav />

      {/* Header */}
      <section
        style={{
          background: 'var(--sage-dark)',
          padding: '10rem 2rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div className="botanical-ring" style={{ width: '500px', height: '500px', top: '-150px', right: '-100px', opacity: 0.1 }} />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-label animate-fade-in" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1.5rem' }}>
            Reach Out
          </p>
          <h1
            className="font-display animate-fade-up delay-100"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--cream)',
              lineHeight: 1.05,
            }}
          >
            Get in Touch
          </h1>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '6rem',
            alignItems: 'start',
          }}
        >
          {/* Info column */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 300,
                color: 'var(--sage-dark)',
                marginBottom: '0.75rem',
                lineHeight: 1.15,
              }}
            >
              We&apos;d love to hear from you.
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.65, lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '3rem' }}>
              Whether you have questions about a specific service, want to discuss your health history before booking, or simply want to say hello — please reach out. We typically respond within one business day.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Phone */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--mist)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  color: 'var(--sage)',
                }}>
                  ☎
                </div>
                <div>
                  <p className="section-label" style={{ marginBottom: '0.3rem' }}>Phone</p>
                  <a href="tel:+15555550123" style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    (555) 555-0123
                  </a>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.5, marginTop: '0.2rem' }}>
                    Mon–Fri, 9am – 7pm
                  </p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--mist)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  color: 'var(--sage)',
                }}>
                  ✉
                </div>
                <div>
                  <p className="section-label" style={{ marginBottom: '0.3rem' }}>Email</p>
                  <a href="mailto:hello@angelfacemassage.com" style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    hello@angelfacemassage.com
                  </a>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.5, marginTop: '0.2rem' }}>
                    Response within 1 business day
                  </p>
                </div>
              </div>

              {/* Address */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid var(--mist)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1rem',
                  color: 'var(--sage)',
                }}>
                  ◎
                </div>
                <div>
                  <p className="section-label" style={{ marginBottom: '0.3rem' }}>Studio</p>
                  <address style={{ fontStyle: 'normal', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7 }}>
                    123 Serenity Lane, Suite 4<br />
                    Portland, OR 97201
                  </address>
                  <p style={{ fontSize: '0.75rem', color: 'var(--ink)', opacity: 0.5, marginTop: '0.2rem' }}>
                    Street parking available
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div
              style={{
                marginTop: '3rem',
                padding: '1.75rem',
                background: 'var(--mist)',
                borderLeft: '2px solid var(--sage)',
              }}
            >
              <h3
                className="font-display"
                style={{ fontSize: '1.3rem', fontWeight: 400, color: 'var(--sage-dark)', marginBottom: '1.25rem' }}
              >
                Studio Hours
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {[
                  ['Monday – Friday', '9:00 AM – 7:00 PM'],
                  ['Saturday', '10:00 AM – 5:00 PM'],
                  ['Sunday', 'By appointment only'],
                ].map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--ink)', opacity: 0.8 }}>
                    <span>{day}</span>
                    <span style={{ fontWeight: 500 }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick booking link */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--ink)', opacity: 0.65, marginBottom: '1rem' }}>
                Ready to schedule? You can book directly online.
              </p>
              <Link href="/booking" className="btn-primary">Book Online</Link>
            </div>
          </div>

          {/* Contact form */}
          <div>
            {sent ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  background: 'white',
                  border: '1px solid var(--mist)',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  border: '1px solid var(--sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: 'var(--sage)',
                  fontSize: '1.5rem',
                }}>
                  ✓
                </div>
                <h3
                  className="font-display"
                  style={{ fontSize: '1.8rem', fontStyle: 'italic', fontWeight: 300, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}
                >
                  Message received.
                </h3>
                <p style={{ color: 'var(--ink)', opacity: 0.65, fontSize: '0.9rem', lineHeight: 1.7 }}>
                  Thank you for reaching out, {form.name.split(' ')[0]}. I&apos;ll be in touch at {form.email} within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  background: 'white',
                  border: '1px solid var(--mist)',
                  padding: '2.5rem',
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'var(--sage-dark)',
                    marginBottom: '2rem',
                  }}
                >
                  Send a message
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div className="form-field">
                    <label>Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Jane Smith"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="jane@example.com"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => update('subject', e.target.value)}
                      required
                    >
                      <option value="">Select a topic…</option>
                      <option value="booking">Booking question</option>
                      <option value="services">Service inquiry</option>
                      <option value="health">Health & suitability question</option>
                      <option value="gift">Gift certificates</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>Message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us what's on your mind…"
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section
        style={{
          background: 'var(--sage)',
          height: '280px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08 }}>
          {/* Decorative grid lines (map simulation) */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`h${i}`} style={{ position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 12.5}%`, height: '1px', background: 'white' }} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`v${i}`} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(i + 1) * 8.33}%`, width: '1px', background: 'white' }} />
          ))}
        </div>
        <div style={{
          background: 'var(--cream)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          position: 'relative',
          boxShadow: '0 4px 24px rgba(28,28,25,0.15)',
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'var(--terracotta)',
            flexShrink: 0,
          }} />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--sage-dark)' }}>Angel Face Massage Therapy</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--ink)', opacity: 0.6 }}>123 Serenity Lane, Suite 4 · Portland, OR 97201</div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
