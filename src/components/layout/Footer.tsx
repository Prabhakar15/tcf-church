import { Link } from 'react-router-dom';
import { churchData } from '../../data/church';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#0B1F3A', color: 'white', marginTop: 'auto', width: '100%' }}>
      {/* Main Footer */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {/* About */}
        <div style={{ padding: '1.5rem', backgroundColor: 'rgba(201, 162, 39, 0.08)', borderRadius: '0.75rem', border: '1px solid rgba(201, 162, 39, 0.2)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', marginTop: '-0.75rem' }}>
            <span style={{ fontSize: '1.75rem', display: 'block', marginTop: '-0.25rem' }}>⛪</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 0, color: '#C9A227', margin: 0 }}>
              {churchData.shortName}
            </h3>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'white', marginBottom: '1rem', fontWeight: '500', marginTop: '0.5rem' }}>
            {churchData.name}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>
            A welcoming church family in Singapore, growing together in faith, worship, and discipleship.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1.5rem', color: '#C9A227', fontSize: '1.1rem' }}>Navigate</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '0.375rem' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span>→</span>
              <span>Home</span>
            </Link>
            <Link to="/about" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '0.375rem' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span>→</span>
              <span>About</span>
            </Link>
            <Link to="/daily-word" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '0.375rem' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span>→</span>
              <span>Daily Word</span>
            </Link>
            <Link to="/sermons" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '0.375rem' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span>→</span>
              <span>Sermons</span>
            </Link>
            <Link to="/events" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '0.375rem' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span>→</span>
              <span>Events</span>
            </Link>
            <Link to="/contact" style={{ fontSize: '0.875rem', color: '#d1d5db', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.5rem', transition: 'all 0.3s ease', cursor: 'pointer', borderRadius: '0.375rem' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A227'; e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#d1d5db'; e.currentTarget.style.backgroundColor = 'transparent'; }}>
              <span>→</span>
              <span>Contact</span>
            </Link>
          </nav>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontWeight: '600', marginBottom: '1rem', color: '#C9A227' }}>Worship Times</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {churchData.services.map((service) => (
              <div key={service.id} style={{ padding: '1rem', backgroundColor: 'rgba(201, 162, 39, 0.1)', borderLeft: '3px solid #C9A227', borderRadius: '0.375rem', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.2)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 162, 39, 0.15)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📅</span>
                  <p style={{ fontWeight: '700', color: 'white', fontSize: '1rem', margin: 0 }}>{service.day}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1rem' }}>⏰</span>
                  <p style={{ color: '#C9A227', fontSize: '0.875rem', fontWeight: '600', margin: 0 }}>{service.time} {service.timezone}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1rem', marginTop: '0.125rem' }}>📍</span>
                  <div>
                    <p style={{ color: '#d1d5db', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{service.venue}</p>
                    <p style={{ color: '#9ca3af', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>{service.address}</p>
                  </div>
                </div>
                <a href={service.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.75rem', fontSize: '0.75rem', color: '#C9A227', textDecoration: 'none', fontWeight: '500', padding: '0.375rem 0.75rem', backgroundColor: 'rgba(201, 162, 39, 0.15)', borderRadius: '0.25rem', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.3)'; e.currentTarget.style.transform = 'translateX(2px)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(201, 162, 39, 0.15)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                  <span>🗺️</span>
                  <span>View on Maps</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <h4 style={{ fontWeight: '600', marginBottom: '1.25rem', color: '#C9A227', fontSize: '1.1rem' }}>Connect With Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', backgroundColor: '#EF4444', borderRadius: '0.5rem', transition: 'all 0.3s ease', border: 'none', fontWeight: '500', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#DC2626'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#EF4444'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: '1.1rem' }}>▶</span>
                <span>YouTube</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.9rem' }}>→</span>
              </a>
              <a href={churchData.social.instagram} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', backgroundColor: '#EC4899', borderRadius: '0.5rem', transition: 'all 0.3s ease', border: 'none', fontWeight: '500', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#DB2777'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(236, 72, 153, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#EC4899'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: '1.1rem' }}>📷</span>
                <span>Instagram</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.9rem' }}>→</span>
              </a>
              <a href={churchData.social.facebook} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.875rem', color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', backgroundColor: '#3B82F6', borderRadius: '0.5rem', transition: 'all 0.3s ease', border: 'none', fontWeight: '500', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1D4ED8'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.5)'; }} onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#3B82F6'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <span style={{ fontSize: '1.1rem' }}>f</span>
                <span>Facebook</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.9rem' }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ textAlign: 'center', maxWidth: '1280px', margin: '0 auto', padding: '1.5rem' }}>
        <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
          © {currentYear} {churchData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
