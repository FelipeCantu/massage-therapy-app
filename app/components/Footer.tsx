import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--sage-dark)',
        color: 'var(--cream)',
        padding: '2.5rem 2rem',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: 0,
        right: 0,
        height: '100px',
        background: 'linear-gradient(to bottom, transparent, var(--sage-dark))',
        pointerEvents: 'none',
      }} />
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div className="font-display" style={{ fontSize: '1.5rem', fontStyle: 'italic', fontWeight: 300 }}>
          Angel Face
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="tel:+15555550123" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.75 }}>
            (555) 555-0123
          </a>
          <a href="mailto:hello@angelfacemassage.com" style={{ color: 'var(--cream)', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.75 }}>
            hello@angelfacemassage.com
          </a>
          <Link href="/booking" style={{ color: 'var(--terracotta)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500 }}>
            Book Now
          </Link>
        </div>

        <span style={{ fontSize: '0.72rem', opacity: 0.4 }}>
          &copy; {new Date().getFullYear()} Angel Face Massage Therapy
        </span>
      </div>
    </footer>
  );
}
