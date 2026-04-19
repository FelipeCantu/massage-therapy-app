import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--sage-dark)',
        color: 'var(--cream)',
        padding: '4rem 2rem 2.5rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}
      >
        {/* Brand */}
        <div>
          <div className="font-display" style={{ fontSize: '2rem', fontStyle: 'italic', fontWeight: 300, marginBottom: '0.75rem', color: 'var(--cream)' }}>
            Angel Face
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, opacity: 0.7, maxWidth: '240px' }}>
            Restorative massage therapy for the body, mind, and spirit. Your healing begins here.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="section-label" style={{ color: 'var(--gold)', marginBottom: '1.25rem' }}>Navigate</p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { href: '/', label: 'Home' },
              { href: '/about', label: 'About' },
              { href: '/services', label: 'Services' },
              { href: '/booking', label: 'Book a Session' },
              { href: '/contact', label: 'Contact' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{
                  textDecoration: 'none',
                  color: 'var(--cream)',
                  fontSize: '0.875rem',
                  opacity: 0.75,
                  transition: 'opacity 0.2s ease',
                }}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hours */}
        <div>
          <p className="section-label" style={{ color: 'var(--gold)', marginBottom: '1.25rem' }}>Studio Hours</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', opacity: 0.75 }}>
            {[
              ['Monday – Friday', '9 am – 7 pm'],
              ['Saturday', '10 am – 5 pm'],
              ['Sunday', 'By appointment'],
            ].map(([day, hours]) => (
              <div key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                <span>{day}</span>
                <span style={{ opacity: 0.85 }}>{hours}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="section-label" style={{ color: 'var(--gold)', marginBottom: '1.25rem' }}>Get in Touch</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', fontSize: '0.875rem', opacity: 0.75 }}>
            <a href="tel:+15555550123" style={{ color: 'var(--cream)', textDecoration: 'none' }}>
              (555) 555-0123
            </a>
            <a href="mailto:hello@angelfacemassage.com" style={{ color: 'var(--cream)', textDecoration: 'none' }}>
              hello@angelfacemassage.com
            </a>
            <address style={{ fontStyle: 'normal', marginTop: '0.25rem', lineHeight: 1.7 }}>
              123 Serenity Lane<br />
              Suite 4<br />
              Portland, OR 97201
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(247,239,224,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.75rem',
          opacity: 0.5,
        }}
      >
        <span>&copy; {new Date().getFullYear()} Angel Face Massage Therapy. All rights reserved.</span>
        <span>Crafted with care.</span>
      </div>
    </footer>
  );
}
