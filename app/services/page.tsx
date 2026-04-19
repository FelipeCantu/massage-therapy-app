import Link from 'next/link';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const categories = [
  {
    category: 'Relaxation & Wellness',
    items: [
      {
        name: 'Swedish Relaxation Massage',
        duration: ['60 min — $95', '90 min — $130'],
        desc: 'The foundation of therapeutic massage. Long, flowing effleurage strokes promote circulation, ease muscular tension, and usher the nervous system into deep rest. Ideal for first-time clients or anyone seeking pure relaxation.',
        benefits: ['Reduces cortisol & stress hormones', 'Improves sleep quality', 'Boosts circulation', 'Eases general muscle soreness'],
      },
      {
        name: 'Aromatherapy Massage',
        duration: ['60 min — $115', '90 min — $150'],
        desc: 'Swedish techniques enhanced with therapeutic-grade essential oils selected for your specific needs — calming lavender, grounding cedarwood, uplifting bergamot. A full sensory restoration experience.',
        benefits: ['Elevated mood & mental clarity', 'Enhanced relaxation response', 'Custom oil blending', 'Immune & lymph support'],
      },
    ],
  },
  {
    category: 'Therapeutic & Corrective',
    items: [
      {
        name: 'Deep Tissue Massage',
        duration: ['60 min — $110', '90 min — $150'],
        desc: 'Methodical, sustained pressure penetrates beyond superficial muscle layers to release chronic holding patterns, adhesions, and scar tissue. Communicative and intentional — never just forceful.',
        benefits: ['Chronic pain relief', 'Postural correction support', 'Athletic recovery', 'Injury rehabilitation'],
      },
      {
        name: 'Myofascial Release',
        duration: ['60 min — $120', '90 min — $165'],
        desc: 'Gentle, sustained holds applied to the connective tissue that surrounds every muscle and organ. Fascia responds to slow, patient work — and the results are profound and lasting.',
        benefits: ['Systemic tension relief', 'Range of motion improvement', 'Chronic pain management', 'Nervous system regulation'],
      },
      {
        name: 'Sports & Athletic Recovery',
        duration: ['60 min — $115', '90 min — $155'],
        desc: 'Targeted pre- and post-event work combining compression, friction, stretching, and deep tissue techniques. Designed around your training schedule and athletic goals.',
        benefits: ['Faster recovery times', 'Injury prevention', 'Pre-event activation', 'Performance support'],
      },
    ],
  },
  {
    category: 'Specialty Treatments',
    items: [
      {
        name: 'Hot Stone Ritual',
        duration: ['90 min — $165'],
        desc: 'Smooth basalt stones, heated to the ideal therapeutic temperature, are used as an extension of the hands and placed along energetic pathways. Deeply grounding, profoundly warming.',
        benefits: ['Deep muscle relaxation', 'Improved circulation', 'Stress & anxiety relief', 'Balances energy flow'],
      },
      {
        name: 'Prenatal Massage',
        duration: ['60 min — $105'],
        desc: 'Nurturing, side-lying bodywork designed for the unique needs of pregnancy. Addresses common discomforts including lower back pain, hip tension, and swollen feet — with the utmost care for mother and baby.',
        benefits: ['Reduced back & hip pain', 'Better sleep during pregnancy', 'Reduced swelling', 'Emotional well-being'],
      },
      {
        name: 'Craniosacral Therapy',
        duration: ['60 min — $130'],
        desc: 'Subtle touch at the skull, sacrum, and spine to facilitate the body\'s self-correcting mechanisms. A profound experience of stillness that addresses the deepest layers of tension and stress.',
        benefits: ['Headache & migraine relief', 'TMJ dysfunction', 'Trauma release', 'Deep nervous system rest'],
      },
    ],
  },
  {
    category: 'Add-On Enhancements',
    items: [
      {
        name: 'Scalp & Face Massage',
        duration: ['15 min add-on — $25'],
        desc: 'Tension-relieving work on the scalp, temples, jaw, and face. Exceptional for headache relief and profound relaxation.',
        benefits: ['Headache relief', 'Jaw tension release', 'Relaxation deepening'],
      },
      {
        name: 'Foot Reflexology',
        duration: ['15 min add-on — $25'],
        desc: 'Targeted pressure to reflex points on the feet that correspond to organs and systems throughout the body.',
        benefits: ['Systemic relaxation', 'Improved energy flow', 'Grounding'],
      },
      {
        name: 'CBD Muscle Balm',
        duration: ['Add-on — $20'],
        desc: 'Topical CBD-infused balm applied to areas of acute tension or inflammation for enhanced therapeutic benefit.',
        benefits: ['Localized pain relief', 'Reduced inflammation', 'Extended results'],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Nav />

      {/* Page Header */}
      <section
        style={{
          background: 'var(--sage-dark)',
          padding: '10rem 2rem 5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,113,74,0.15) 0%, transparent 70%)',
            top: '-150px',
            right: '-100px',
          }} />
        </div>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-label animate-fade-in" style={{ color: 'rgba(247,239,224,0.5)', marginBottom: '1.5rem' }}>
            Treatments &amp; Pricing
          </p>
          <h1
            className="font-display animate-fade-up delay-100"
            style={{
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--cream)',
              lineHeight: 1.05,
              maxWidth: '600px',
            }}
          >
            Services &amp;<br />Treatments
          </h1>
          <p
            className="animate-fade-up delay-200"
            style={{
              color: 'rgba(247,239,224,0.65)',
              fontSize: '1rem',
              lineHeight: 1.8,
              maxWidth: '460px',
              marginTop: '1.5rem',
            }}
          >
            Every service is adapted to you. Before each session, we discuss your current needs, health history, and goals to create a truly personalized experience.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ padding: '5rem 2rem', background: 'var(--cream)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {categories.map((cat, ci) => (
            <div key={cat.category} style={{ marginBottom: ci < categories.length - 1 ? '5rem' : 0 }}>
              {/* Category header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2.5rem',
              }}>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 400,
                    color: 'var(--sage-dark)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.category}
                </h2>
                <div style={{ flex: 1, height: '1px', background: 'var(--mist)' }} />
              </div>

              {/* Service cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'var(--mist)' }}>
                {cat.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      background: 'var(--cream)',
                      padding: '2.5rem 2rem',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '2rem',
                      alignItems: 'start',
                    }}
                  >
                    <div>
                      <h3
                        className="font-display"
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 400,
                          color: 'var(--sage-dark)',
                          marginBottom: '0.75rem',
                        }}
                      >
                        {item.name}
                      </h3>
                      <p style={{ color: 'var(--ink)', opacity: 0.7, lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '580px' }}>
                        {item.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {item.benefits.map((b) => (
                          <span
                            key={b}
                            style={{
                              fontSize: '0.7rem',
                              letterSpacing: '0.08em',
                              padding: '0.3rem 0.75rem',
                              background: 'rgba(74,103,65,0.08)',
                              color: 'var(--sage-dark)',
                              borderRadius: '1px',
                            }}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '140px' }}>
                      {item.duration.map((d) => (
                        <div key={d} style={{ marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.875rem', color: 'var(--terracotta)', fontWeight: 500 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policies */}
      <section style={{ background: 'var(--mist)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--sage-dark)',
              marginBottom: '2.5rem',
              textAlign: 'center',
            }}
          >
            Booking &amp; Policies
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '2rem' }}>
            {[
              {
                title: 'Cancellation',
                text: '24-hour notice required for cancellations. Late cancellations and no-shows are charged 50% of the session fee.',
              },
              {
                title: 'Arrival',
                text: 'Please arrive 10 minutes early for your first visit to complete intake paperwork. Subsequent visits, arrive 5 minutes early.',
              },
              {
                title: 'Gratuity',
                text: 'Gratuity is appreciated but never expected. 15–20% is customary if you feel moved to offer it.',
              },
              {
                title: 'Health Intake',
                text: 'A short health history form is required before your first session. This helps us provide the safest, most effective care.',
              },
            ].map((p) => (
              <div key={p.title}>
                <h3
                  className="font-display"
                  style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--sage-dark)', marginBottom: '0.75rem' }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.8, color: 'var(--ink)', opacity: 0.7 }}>
                  {p.text}
                </p>
              </div>
            ))}
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
          Ready to book?
        </h2>
        <Link href="/booking" className="btn-terracotta">Schedule Your Session</Link>
      </section>

      <Footer />
    </>
  );
}
