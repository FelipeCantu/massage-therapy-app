'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isHome = pathname === '/';

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.4s ease, box-shadow 0.4s ease',
          background: scrolled || !isHome ? 'rgba(247,239,224,0.96)' : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(8px)' : 'none',
          boxShadow: scrolled || !isHome ? '0 1px 0 rgba(28,28,25,0.08)' : 'none',
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 2rem',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
            }}
          >
            <span
              className="font-display"
              style={{
                fontSize: '1.6rem',
                fontWeight: 400,
                fontStyle: 'italic',
                color: scrolled || !isHome ? 'var(--sage-dark)' : 'var(--cream)',
                transition: 'color 0.4s ease',
                letterSpacing: '0.02em',
              }}
            >
              Angel Face
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: scrolled || !isHome ? 'var(--terracotta)' : 'rgba(247,239,224,0.7)',
                transition: 'color 0.4s ease',
              }}
            >
              Massage Therapy
            </span>
          </Link>

          {/* Desktop links */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}
            className="hidden-mobile"
          >
            {links.map(({ href, label }) => {
              const isActive = href === '/' ? pathname === '/' : false;
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    textDecoration: 'none',
                    fontSize: '0.72rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: scrolled || !isHome ? 'var(--ink)' : 'var(--cream)',
                    opacity: isActive ? 1 : 0.75,
                    borderBottom: isActive ? '1px solid var(--terracotta)' : '1px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.3s ease, opacity 0.3s ease, border-color 0.3s ease',
                  }}
                >
                  {label}
                </Link>
              );
            })}
            <Link
              href="/booking"
              className="btn-primary"
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.7rem' }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              flexDirection: 'column',
              gap: '5px',
            }}
            className="show-mobile"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '1.5px',
                  background: scrolled || !isHome ? 'var(--ink)' : 'var(--cream)',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  transformOrigin: 'center',
                  transform:
                    open && i === 0 ? 'translateY(6.5px) rotate(45deg)'
                    : open && i === 1 ? 'scaleX(0)'
                    : open && i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                    : 'none',
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'var(--sage-dark)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
        }}
      >
        {links.map(({ href, label }, i) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            style={{
              textDecoration: 'none',
              color: 'var(--cream)',
              fontSize: '2.5rem',
              fontWeight: 300,
              fontStyle: 'italic',
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              opacity: open ? 1 : 0,
              transform: open ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.5s ease ${0.1 + i * 0.07}s, transform 0.5s ease ${0.1 + i * 0.07}s`,
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/booking"
          style={{
            marginTop: '1rem',
            textDecoration: 'none',
            color: 'var(--cream)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            border: '1px solid rgba(247,239,224,0.4)',
            padding: '0.875rem 2rem',
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.5s ease 0.35s, transform 0.5s ease 0.35s`,
          }}
        >
          Book a Session
        </Link>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
