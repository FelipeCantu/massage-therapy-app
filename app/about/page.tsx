import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const credentials = [
  { year: '2013', title: 'Licensed Massage Therapist', org: 'Oregon Board of Massage Therapists · LMT #12345' },
  { year: '2014', title: 'Deep Tissue Certification', org: 'Oregon School of Massage' },
  { year: '2016', title: 'Prenatal Massage Certification', org: 'Body Therapy Associates' },
  { year: '2018', title: 'Craniosacral Therapy Level I & II', org: 'Upledger Institute International' },
  { year: '2019', title: 'Myofascial Release Advanced Training', org: 'John F. Barnes Approach' },
  { year: '2022', title: 'Hot Stone & Thermotherapy', org: 'Associated Bodywork & Massage Professionals' },
];

const values = [
  {
    title: 'Presence',
    text: 'I bring complete attention to each session. You are not a slot in a schedule — you are a person with a story, and I take that seriously.',
  },
  {
    title: 'Listening',
    text: 'The body speaks constantly. My job is to hear it and respond — not with a pre-set routine, but with genuine responsiveness to what I find.',
  },
  {
    title: 'Integrity',
    text: 'I work within my scope and refer out when appropriate. Your health and safety are always the priority — above any single treatment.',
  },
  {
    title: 'Continuity',
    text: 'Lasting change happens over time. I keep detailed session notes and check in between appointments to support your ongoing well-being.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section
        style={{
          background: 'var(--sage-dark)',
          padding: '10rem 2rem 6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(184,150,90,0.12) 0%, transparent 70%)',
            bottom: '-200px',
            right: '-100px',
          }} />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'end' }}>
          <div>
            <p className="section-label animate-fade-in" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1.5rem' }}>
              The Practitioner
            </p>
            <h1
              className="font-display animate-fade-up delay-100"
              style={{
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--cream)',
                lineHeight: 1.05,
                marginBottom: '1.5rem',
              }}
            >
              Sarah<br />Mitchell
            </h1>
            <p className="section-label" style={{ color: 'var(--gold)' }}>
              Licensed Massage Therapist · 10+ Years Practice
            </p>
          </div>
          <div className="animate-fade-up delay-200">
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.85,
                color: 'rgba(247,239,224,0.75)',
                fontStyle: 'italic',
              }}
              className="font-display"
            >
              &ldquo;I came to massage therapy through my own healing. After years of chronic tension headaches and a stubborn shoulder injury, I discovered that thoughtful, attentive bodywork could accomplish what years of other treatments could not. That experience changed the course of my life.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '7rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'start' }}>

          {/* Photo placeholder */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '4/5',
                background: 'linear-gradient(160deg, #7A9B6E 0%, #2D4A3E 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Inner decorative frame */}
              <div style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(247,239,224,0.15)', pointerEvents: 'none' }} />
              {/* Centered monogram/symbol */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div
                  className="font-display"
                  style={{
                    fontSize: '8rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(247,239,224,0.12)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  SM
                </div>
              </div>
              {/* Caption */}
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
              }}>
                <div style={{ height: '1px', background: 'rgba(247,239,224,0.2)', marginBottom: '0.75rem' }} />
                <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(247,239,224,0.5)' }}>
                  Place your photo here
                </p>
              </div>
            </div>
            {/* Offset decorative square */}
            <div style={{
              position: 'absolute',
              bottom: '-1.5rem',
              right: '-1.5rem',
              width: '80px',
              height: '80px',
              border: '1px solid var(--terracotta)',
              opacity: 0.35,
            }} />
          </div>

          {/* Text */}
          <div>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>My Story</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 300,
                lineHeight: 1.2,
                color: 'var(--sage-dark)',
                marginBottom: '2rem',
              }}
            >
              From patient to practitioner —{' '}
              <em>a decade of dedicated practice.</em>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', color: 'var(--ink)', opacity: 0.75, lineHeight: 1.9, fontSize: '0.95rem' }}>
              <p>
                I graduated from the Oregon School of Massage in 2013, driven by a deep curiosity about how the body holds and releases tension. What began as clinical training quickly deepened into a genuine fascination with the nervous system, the fascia, and the relationship between emotional history and physical holding patterns.
              </p>
              <p>
                Over the past decade, I&apos;ve had the privilege of working with clients at every stage of life — from athletes recovering from injury to new mothers navigating the profound changes of pregnancy, from office workers managing chronic tension to elders seeking gentle, sustaining touch.
              </p>
              <p>
                My approach is integrative and always evolving. I draw on Swedish, deep tissue, myofascial, and craniosacral techniques, adapting fluidly to what each client&apos;s body needs on any given day. I believe the best massage therapy session is one where you feel both deeply heard and deeply held.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--mist)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>How I Work</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--sage-dark)',
              }}
            >
              My practice principles
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', background: 'var(--cream-dark)' }}>
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: 'var(--cream)',
                  padding: '2.5rem 2rem',
                  borderBottom: 'none',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '1px',
                  background: 'var(--terracotta)',
                  marginBottom: '1.5rem',
                }} />
                <h3
                  className="font-display"
                  style={{ fontSize: '1.5rem', fontWeight: 400, color: 'var(--sage-dark)', marginBottom: '1rem' }}
                >
                  {v.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--ink)', opacity: 0.7 }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section style={{ padding: '6rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3.5rem' }}>
            <p className="section-label" style={{ marginBottom: '1rem' }}>Education &amp; Training</p>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--sage-dark)',
              }}
            >
              Credentials
            </h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Timeline line */}
            <div style={{
              position: 'absolute',
              left: '52px',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'var(--mist)',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {credentials.map((c, i) => (
                <div
                  key={c.title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr',
                    gap: '2rem',
                    padding: '1.5rem 0',
                    borderBottom: i < credentials.length - 1 ? '1px solid var(--mist)' : 'none',
                    alignItems: 'start',
                  }}
                >
                  <div style={{ textAlign: 'right', paddingRight: '1rem', position: 'relative' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--terracotta)', letterSpacing: '0.05em' }}>
                      {c.year}
                    </span>
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      right: '-5px',
                      top: '4px',
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      background: 'var(--sage)',
                      border: '2px solid var(--cream)',
                    }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--ink)', marginBottom: '0.25rem' }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--ink)', opacity: 0.55, lineHeight: 1.5 }}>
                      {c.org}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--sage-dark)', padding: '5rem 2rem', textAlign: 'center' }}>
        <h2
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--cream)',
            marginBottom: '2rem',
          }}
        >
          Let&apos;s work together.
        </h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/booking" className="btn-terracotta">Book a Session</Link>
          <Link href="/contact" className="btn-outline">Get in Touch</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
