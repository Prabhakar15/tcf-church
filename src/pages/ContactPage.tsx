import { useState, useEffect } from 'react';
import { socialLinks } from '../data/church';
import { getPublishedServices } from '../lib/queries/services';
import type { RecurringService } from '../types';

export default function ContactPage() {
  const [worshipServices, setWorshipServices] = useState<RecurringService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const services = await getPublishedServices();
        // Filter to only Worship services (Sunday/Saturday)
        const worship = services.filter(s => s.serviceCategory === 'WORSHIP');
        setWorshipServices(worship);
      } catch (err) {
        console.error('Error loading worship services:', err);
        setWorshipServices([]);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>Contact TCF</h1>
          <p>Get in touch with our community</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          <div className="contact-grid">
            <div className="contact-section">
              <h2>Service Times & Locations</h2>
              {loading ? (
                <p>Loading service times...</p>
              ) : worshipServices.length > 0 ? (
                worshipServices.map((service) => (
                  <div key={service.id} className="service-info">
                    <h3>{service.dayOfWeek} Service</h3>
                    <p className="time">{service.startTime} {service.timezone}</p>
                    {service.location && <p className="venue">{service.location}</p>}
                  </div>
                ))
              ) : (
                <p>Service times not available. Please check the Services page.</p>
              )}
            </div>

            <div className="contact-section">
              <h2>Connect With Us</h2>
              <p>Follow TCF on social media for updates and community moments.</p>
              <div className="social-links">
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0.5rem 0 0 0; }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        .page-container { max-width: 1000px; margin: 0 auto; }
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .contact-section h2 { font-size: 1.5rem; font-weight: 700; color: #0B1F3A; margin: 0 0 2rem 0; }
        .service-info { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb; }
        .service-info h3 { font-size: 1.125rem; font-weight: 700; color: #0B1F3A; margin: 0 0 0.5rem 0; }
        .time { font-weight: 600; color: #C9A227; margin: 0 0 0.5rem 0; }
        .venue { font-weight: 600; color: #0B1F3A; margin: 0; }
        .contact-section p { font-size: 1rem; color: #6B7280; line-height: 1.6; }
        .social-links { display: flex; gap: 2rem; margin-top: 1.5rem; }
        .social-links a { color: #0B1F3A; text-decoration: none; font-weight: 600; transition: color 0.3s ease; }
        .social-links a:hover { color: #C9A227; }
      `}</style>
    </div>
  );
}
