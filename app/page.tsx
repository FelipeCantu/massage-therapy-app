import Link from 'next/link';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { defaultServices, type Service } from '@/lib/services';

async function getServices(): Promise<Service[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
    const res = await fetch(`${base}/api/services`, { next: { revalidate: 60 } });
    if (!res.ok) return defaultServices;
    return res.json();
  } catch {
    return defaultServices;
  }
}

export default async function HomePage() {
  const services = await getServices();
  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--sage-dark)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,113,74,0.18) 0%, transparent 70%)',
          top: '5%',
          right: '-5%',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 2rem 5rem', width: '100%' }}>
          <div style={{ maxWidth: '640px' }}>
            <p className="section-label animate-fade-in" style={{ color: 'rgba(247,239,224,0.6)', marginBottom: '1.75rem' }}>
              Restorative Touch &bull; Portland, OR
            </p>
            <h1
              className="font-display animate-fade-up delay-100"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 6.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.05,
                color: 'var(--cream)',
                marginBottom: '1.75rem',
              }}
            >
              Healing hands.<br />
              <span style={{ color: 'var(--terracotta)' }}>Peaceful mind.</span>
            </h1>
            <p
              className="animate-fade-up delay-300"
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.85,
                color: 'rgba(247,239,224,0.75)',
                maxWidth: '460px',
                marginBottom: '2.75rem',
              }}
            >
              Bespoke massage therapy tailored to your body&apos;s unique needs. Step into stillness and let the healing begin.
            </p>
            <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/booking" className="btn-terracotta">Book a Session</Link>
              <a href="#services" className="btn-outline">View Services</a>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100px',
          background: 'linear-gradient(to bottom, transparent, var(--cream))',
        }} />
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: 'var(--cream)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>What We Offer</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--sage-dark)',
              }}
            >
              Services &amp; Pricing
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5px',
            background: 'var(--mist)',
          }}>
            {services.map((s) => (
              <div key={s.name} style={{ background: 'var(--cream)', padding: '2.25rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                  <h3
                    className="font-display"
                    style={{ fontSize: '1.35rem', fontWeight: 400, color: 'var(--sage-dark)', lineHeight: 1.2 }}
                  >
                    {s.name}
                  </h3>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--terracotta)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                    {s.price}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--ink)', opacity: 0.7, marginBottom: '0.75rem' }}>
                  {s.desc}
                </p>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', opacity: 0.8 }}>
                  {s.duration}
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2.5rem' }}>
            <Link href="/booking" className="btn-primary">Book a Session</Link>
          </div>
        </div>
      </section>

      {/* ABOUT — disabled until updated. To re-enable: change `false` to `true` below */}
      {false && (
      <section id="about" style={{ background: 'var(--mist)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          {/* Photo placeholder */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(135deg, var(--sage) 0%, var(--sage-dark) 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(247,239,224,0.2)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="font-display" style={{ fontSize: '7rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(247,239,224,0.1)', userSelect: 'none' }}>
                  SM
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', color: 'var(--cream)' }}>
                <div className="font-display" style={{ fontSize: '1.3rem', fontStyle: 'italic', marginBottom: '0.2rem' }}>
                  Sarah Mitchell, LMT
                </div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.65 }}>
                  Licensed Massage Therapist
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="section-label" style={{ marginBottom: '1.25rem' }}>About the Therapist</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--sage-dark)',
                marginBottom: '1.5rem',
              }}
            >
              Touch is medicine.<br />
              <em>I practice it as such.</em>
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.75, lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              With over a decade of practice, I specialize in therapeutic bodywork that addresses both the physical and energetic dimensions of tension. I graduated from the Oregon School of Massage in 2013 and hold certifications in deep tissue, prenatal, craniosacral therapy, and myofascial release.
            </p>
            <p style={{ color: 'var(--ink)', opacity: 0.75, lineHeight: 1.9, fontSize: '0.95rem' }}>
              Every session is custom-designed. No two bodies are alike, and no two sessions will ever be the same.
            </p>
          </div>
        </div>
      </section>
      )}

      {/* CONTACT */}
      <section id="contact" style={{ background: 'var(--cream)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label" style={{ marginBottom: '0.75rem' }}>Get in Touch</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--sage-dark)',
              }}
            >
              Let&apos;s connect.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '0.75rem' }}>Phone</p>
              <a href="tel:+15555550123" style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '1.05rem' }}>
                (555) 555-0123
              </a>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.5, marginTop: '0.3rem' }}>Mon–Fri 9am–7pm · Sat 10am–5pm</p>
            </div>

            <div>
              <p className="section-label" style={{ marginBottom: '0.75rem' }}>Email</p>
              <a href="mailto:hello@angelfacemassage.com" style={{ color: 'var(--ink)', textDecoration: 'none', fontSize: '1.05rem' }}>
                hello@angelfacemassage.com
              </a>
              <p style={{ fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.5, marginTop: '0.3rem' }}>Response within 1 business day</p>
            </div>

            <div>
              <p className="section-label" style={{ marginBottom: '0.75rem' }}>Studio</p>
              <address style={{ fontStyle: 'normal', color: 'var(--ink)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                123 Serenity Lane, Suite 4<br />
                Portland, OR 97201
              </address>
            </div>

            <div>
              <p className="section-label" style={{ marginBottom: '0.75rem' }}>Hours</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.9rem', color: 'var(--ink)', opacity: 0.8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <span>Mon – Fri</span><span>9am – 7pm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <span>Saturday</span><span>10am – 5pm</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
                  <span>Sunday</span><span>By appointment</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid var(--mist)', textAlign: 'center' }}>
            <h3 className="font-display" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, fontStyle: 'italic', color: 'var(--sage-dark)', marginBottom: '1.5rem' }}>
              Ready to book your session?
            </h3>
            <Link href="/booking" className="btn-terracotta">Book Online</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
