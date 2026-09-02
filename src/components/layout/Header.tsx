import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(() => 
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1024;
  const isDesktop = screenWidth >= 1024;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Branches', path: '/branches' },
    { label: 'Daily Word', path: '/daily-word' },
    { label: 'Media', path: '/sermons' },
    { label: 'Events', path: '/events' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="header">
      <div className="header-accent"></div>

      <nav className={`header-nav ${isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'}`}>
        {/* Logo & Branding */}
        <Link to="/" className="header-logo-link">
          <div className="logo-container">
            <div className="logo-glow"></div>
            <img
              src="/tcf-logo.jpg"
              alt="TCF Logo"
              className="logo-image"
              style={{
                height: isMobile ? '65px' : isTablet ? '75px' : '85px',
                width: isMobile ? '65px' : isTablet ? '75px' : '85px',
              }}
            />
          </div>

          <div className="branding-text">
            <div className="branding-row">
              <span className="branding-tcf">TCF</span>
              {!isMobile && (
                <div className="branding-singapore">
                  <div className="branding-divider"></div>
                  <span>Singapore</span>
                </div>
              )}
            </div>

            <div className="branding-name">
              <div className="branding-line"></div>
              <span>{isMobile ? 'TCF' : 'Tabernacle Christ Fellowship'}</span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        {isDesktop && (
          <div className="nav-desktop">
            {navLinks.map((item) => (
              <Link key={item.path} to={item.path} className="nav-link">
                {item.label}
                <div className="nav-underline"></div>
              </Link>
            ))}
          </div>
        )}

        {/* Tablet Menu */}
        {isTablet && (
          <div className="nav-tablet">
            {navLinks.slice(0, 5).map((item) => (
              <Link key={item.path} to={item.path} className="nav-link-tablet">
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg fill="none" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </nav>

      {/* Mobile Menu */}
      {isMobile && isOpen && (
        <div className="mobile-menu">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="mobile-menu-link"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .header {
          width: 100%;
          background-color: #ffffff;
          border-bottom: 3px solid #C9A227;
          margin-bottom: 0;
          padding-bottom: 0;
          position: relative;
          box-shadow: 0 8px 24px rgba(11, 31, 58, 0.12), 0 0 1px rgba(201, 162, 39, 0.3);
        }

        .header-accent {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C9A227 0%, #E0B644 50%, #C9A227 100%);
        }

        .header-nav {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
        }

        .header-nav.mobile {
          padding: 0.75rem 1rem;
        }

        .header-nav.tablet {
          padding: 1rem 1.5rem;
        }

        .header-nav.desktop {
          padding: 1.25rem 1.5rem;
        }

        .header-logo-link {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .header-nav.mobile .header-logo-link {
          gap: 0.75rem;
        }

        .header-nav.tablet .header-logo-link {
          gap: 1.25rem;
        }

        .header-logo-link:hover {
          transform: translateY(-2px);
        }

        .logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .logo-glow {
          position: absolute;
          inset: -8px;
          background: linear-gradient(135deg, rgba(201, 162, 39, 0.2), rgba(201, 162, 39, 0.05));
          border-radius: 12px;
          z-index: 0;
        }

        .header-nav.mobile .logo-glow {
          inset: -4px;
        }

        .logo-image {
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.3), 0 0 1px rgba(201, 162, 39, 0.5);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          z-index: 1;
        }

        .logo-image:hover {
          transform: scale(1.08);
          box-shadow: 0 12px 28px rgba(201, 162, 39, 0.4), 0 0 20px rgba(201, 162, 39, 0.3);
        }

        .branding-text {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .header-nav.mobile .branding-text {
          gap: 0.2rem;
        }

        .branding-row {
          display: flex;
          align-items: baseline;
          gap: 1rem;
        }

        .header-nav.mobile .branding-row {
          gap: 0.5rem;
        }

        .header-nav.tablet .branding-row {
          gap: 0.75rem;
        }

        .branding-tcf {
          font-size: 2.25rem;
          font-weight: 950;
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a52 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .header-nav.mobile .branding-tcf {
          font-size: 1.5rem;
        }

        .header-nav.tablet .branding-tcf {
          font-size: 1.875rem;
        }

        .branding-singapore {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .branding-divider {
          width: 2px;
          height: 20px;
          background-color: #C9A227;
        }

        .header-nav.tablet .branding-divider {
          height: 16px;
        }

        .branding-singapore span {
          font-size: 0.85rem;
          color: #C9A227;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .header-nav.tablet .branding-singapore span {
          font-size: 0.75rem;
        }

        .branding-name {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .branding-line {
          width: 24px;
          height: 2px;
          background-color: #C9A227;
        }

        .header-nav.mobile .branding-line {
          width: 16px;
        }

        .header-nav.tablet .branding-line {
          width: 20px;
        }

        .branding-name span {
          font-size: 0.9rem;
          color: #0B1F3A;
          font-weight: 800;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .header-nav.mobile .branding-name span {
          font-size: 0.65rem;
          letter-spacing: 0.5px;
        }

        .header-nav.tablet .branding-name span {
          font-size: 0.8rem;
        }

        .nav-desktop {
          display: flex;
          gap: 3rem;
          align-items: center;
        }

        .nav-link {
          color: #374151;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.975rem;
          transition: all 0.3s ease;
          position: relative;
          padding-bottom: 0.35rem;
          letter-spacing: 0.3px;
        }

        .nav-link:hover {
          color: #C9A227;
        }

        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 0;
          background-color: #C9A227;
          transition: width 0.3s ease;
          border-radius: 1.5px;
        }

        .nav-link:hover .nav-underline {
          width: 100%;
        }

        .nav-tablet {
          display: flex;
          gap: 1.5rem;
          align-items: center;
          font-size: 0.875rem;
        }

        .nav-link-tablet {
          color: #374151;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-link-tablet:hover {
          color: #C9A227;
        }

        .mobile-menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #C9A227 0%, #E0B644 100%);
          border: none;
          cursor: pointer;
          padding: 0.65rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25);
          flex-shrink: 0;
          width: 44px;
          height: 44px;
        }

        .mobile-menu-button:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.35);
        }

        .mobile-menu-button svg {
          width: 1.5rem;
          height: 1.5rem;
          stroke: #0B1F3A;
          stroke-width: 2.5;
        }

        .mobile-menu {
          display: block;
          border-top: 2px solid #C9A227;
          background-color: #f9fafb;
          padding: 1rem;
          animation: slideDown 0.3s ease;
        }

        .mobile-menu-link {
          display: block;
          padding: 0.75rem 0.75rem;
          color: #374151;
          font-weight: 700;
          text-decoration: none;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .mobile-menu-link:hover {
          color: #C9A227;
          border-color: #C9A227;
          padding-left: 1.25rem;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </header>
  );
}
