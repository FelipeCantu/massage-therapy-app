import Link from 'next/link';
import Nav from './components/Nav';
import Footer from './components/Footer';

const services = [
  {
    name: 'Swedish Relaxation',
    duration: '60 / 90 min',
    price: '$95 / $130',
    desc: 'Gentle, flowing strokes to ease tension and restore calm throughout the whole body.',
  },
  {
    name: 'Deep Tissue',
    duration: '60 / 90 min',
    price: '$110 / $150',
    desc: 'Targeted pressure on chronic muscle tension and adhesions for lasting relief.',
  },
  {
    name: 'Hot Stone Ritual',
    duration: '90 min',
    price: '$165',
    desc: 'Warmed basalt stones melt away stress while balancing energy through the body.',
  },
  {
    name: 'Prenatal Massage',
    duration: '60 min',
    price: '$105',
    desc: 'Specially adapted techniques to support comfort and well-being throughout pregnancy.',
  },
];

const testimonials = [
  {
    quote: 'The most restorative hour of my week. I leave feeling like a completely new person.',
    name: 'Maria T.',
    subtitle: 'Monthly Member',
  },
  {
    quote: 'My chronic back pain has improved tremendously. The care and attention here is exceptional.',
    name: 'James R.',
    subtitle: 'Deep Tissue Client',
  },
  {
    quote: 'An absolutely serene experience. The studio is beautiful and the work is transformative.',
    name: 'Priya S.',
    subtitle: 'Hot Stone Regular',
  },
];

export default function HomePage() {
  return (
    <>
      <Nav />

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--sage-dark)',
          overflow: 'hidden',
        }}
      >
        {/* Decorative rings */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div className="botanical-ring" style={{ width: '600px', height: '600px', top: '-200px', right: '-150px', opacity: 0.12 }} />
          <div className="botanical-ring" style={{ width: '400px', height: '400px', top: '-100px', right: '50px', opacity: 0.08 }} />
          <div className="botanical-ring" style={{ width: '300px', height: '300px', bottom: '-80px', left: '-80px', opacity: 0.1 }} />
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,113,74,0.18) 0%, transparent 70%)',
            top: '10%',
            right: '5%',
          }} />
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(74,103,65,0.3) 0%, transparent 70%)',
            bottom: '-10%',
            left: '20%',
          }} />
        </div>

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '8rem 2rem 5rem',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            <p className="section-label animate-fade-in" style={{ color: 'rgba(247,239,224,0.6)', marginBottom: '2rem' }}>
              Restorative Touch &#x2022; Portland, OR
            </p>

            <h1
              className="font-display animate-fade-up delay-100"
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.05,
                color: 'var(--cream)',
                marginBottom: '2rem',
                letterSpacing: '-0.01em',
              }}
            >
              Healing hands.<br />
              <span style={{ color: 'var(--terracotta)' }}>Peaceful mind.</span>
            </h1>

            <p
              className="animate-fade-up delay-300"
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'rgba(247,239,224,0.75)',
                maxWidth: '480px',
                marginBottom: '3rem',
              }}
            >
              Bespoke massage therapy tailored to your body&apos;s unique needs. Step into stillness and let the healing begin.
            </p>

            <div className="animate-fade-up delay-400" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/booking" className="btn-terracotta">Book a Session</Link>
              <Link href="/services" className="btn-outline">View Services</Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, var(--cream))',
        }} />
      </section>

      {/* TRUST BAR */}
      <section style={{ background: 'var(--cream)', padding: '3rem 2rem', borderBottom: '1px solid var(--mist)' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            ['10+', 'Years Experience'],
            ['800+', 'Happy Clients'],
            ['LMT #12345', 'Licensed & Insured'],
            ['5.0 ★', 'Average Rating'],
          ].map(([stat, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div
                className="font-display"
                style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--sage-dark)', lineHeight: 1 }}
              >
                {stat}
              </div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--terracotta)', marginTop: '0.35rem' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section style={{ padding: '7rem 2rem', background: 'var(--cream)', overflow: 'hidden' }}>
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '5rem',
            alignItems: 'center',
          }}
        >
          {/* Visual placeholder */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, var(--sage) 0%, var(--sage-dark) 100%)',
                borderRadius: '2px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute',
                inset: '16px',
                border: '1px solid rgba(247,239,224,0.2)',
                borderRadius: '1px',
                pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.15,
              }}>
                <svg viewBox="0 0 200 200" width="80%" height="80%" fill="none">
                  <path d="M100 20 C60 20, 20 60, 20 100 C20 140, 60 180, 100 180 C140 180, 180 140, 180 100 C180 60, 140 20, 100 20 Z" stroke="white" strokeWidth="1" fill="none" />
                  <path d="M100 50 C75 50, 50 75, 50 100 C50 125, 75 150, 100 150 C125 150, 150 125, 150 100 C150 75, 125 50, 100 50 Z" stroke="white" strokeWidth="0.5" fill="none" />
                  <path d="M100 20 L100 180" stroke="white" strokeWidth="0.5" />
                  <path d="M20 100 L180 100" stroke="white" strokeWidth="0.5" />
                  <circle cx="100" cy="100" r="8" stroke="white" strokeWidth="0.5" fill="none" />
                </svg>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                right: '2rem',
                color: 'var(--cream)',
              }}>
                <div className="font-display" style={{ fontSize: '1.4rem', fontStyle: 'italic', marginBottom: '0.25rem' }}>
                  Sarah Mitchell, LMT
                </div>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.7 }}>
                  Licensed Massage Therapist
                </div>
              </div>
            </div>
            <div style={{
              position: 'absolute',
              top: '-1.5rem',
              left: '-1.5rem',
              width: '120px',
              height: '120px',
              border: '1px solid var(--terracotta)',
              opacity: 0.3,
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Text */}
          <div>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>About the Therapist</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                color: 'var(--sage-dark)',
                marginBottom: '1.75rem',
              }}
            >
              Touch is medicine.<br />
              <em>I practice it as such.</em>
            </h2>
            <p style={{ color: 'var(--ink)', opacity: 0.75, lineHeight: 1.9, marginBottom: '1.25rem' }}>
              With over a decade of practice, I specialize in therapeutic bodywork that addresses both the physical and energetic dimensions of tension. My approach is deeply listening — to your body, your history, your breath.
            </p>
            <p style={{ color: 'var(--ink)', opacity: 0.75, lineHeight: 1.9, marginBottom: '2.5rem' }}>
              Every session is custom-designed. No two bodies are alike, and no two sessions will ever be the same.
            </p>
            <Link href="/about" className="btn-primary">Meet Sarah</Link>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section style={{ background: 'var(--mist)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>What We Offer</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--sage-dark)',
              }}
            >
              Services &amp; Treatments
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5px',
              background: 'var(--cream-dark)',
            }}
          >
            {services.map((s) => (
              <div
                key={s.name}
                style={{
                  background: 'var(--cream)',
                  padding: '2.5rem 2rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <h3
                    className="font-display"
                    style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--sage-dark)', lineHeight: 1.2 }}
                  >
                    {s.name}
                  </h3>
                  <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--terracotta)', whiteSpace: 'nowrap', marginLeft: '1rem' }}>
                    {s.price}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--ink)', opacity: 0.7, marginBottom: '1rem' }}>
                  {s.desc}
                </p>
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage)', opacity: 0.8 }}>
                  {s.duration}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          background: 'var(--sage-dark)',
          padding: '7rem 2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,113,74,0.1) 0%, transparent 70%)',
            top: '-100px',
            left: '-100px',
          }} />
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1rem' }}>Client Stories</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--cream)',
              }}
            >
              What our clients say
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  padding: '2.5rem',
                  border: '1px solid rgba(247,239,224,0.1)',
                }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: '4rem',
                    lineHeight: 0.8,
                    color: 'var(--terracotta)',
                    marginBottom: '1.25rem',
                    opacity: 0.6,
                  }}
                >
                  &ldquo;
                </div>
                <p
                  className="font-display"
                  style={{
                    fontSize: '1.25rem',
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: 'var(--cream)',
                    lineHeight: 1.6,
                    marginBottom: '2rem',
                  }}
                >
                  {t.quote}
                </p>
                <div style={{ borderTop: '1px solid rgba(247,239,224,0.12)', paddingTop: '1.25rem' }}>
                  <div style={{ fontWeight: 500, color: 'var(--cream)', fontSize: '0.875rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold)', marginTop: '0.2rem', letterSpacing: '0.1em' }}>{t.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ background: 'var(--terracotta)', padding: '5rem 2rem', textAlign: 'center' }}>
        <p className="section-label" style={{ color: 'rgba(247,239,224,0.6)', marginBottom: '1.5rem' }}>Ready to begin?</p>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--cream)',
            marginBottom: '2rem',
          }}
        >
          Your first session awaits.
        </h2>
        <p style={{ color: 'rgba(247,239,224,0.8)', fontSize: '1rem', maxWidth: '450px', margin: '0 auto 2.5rem' }}>
          New clients receive a complimentary 15-minute consultation to tailor your perfect session.
        </p>
        <Link
          href="/booking"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 3rem',
            background: 'var(--cream)',
            color: 'var(--terracotta)',
            fontFamily: 'var(--font-dm)',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Book Your Session
        </Link>
      </section>

      <Footer />
    </>
  );
}
