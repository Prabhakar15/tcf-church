import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                <p>Service times not available. Please check the {' '}<Link to="/services">Services page</Link>.</p>
              )}
            </div>

            <div className="contact-section">
              <h2>Connect With Us</h2>
              <p>Follow TCF on social media for updates and community moments.</p>
              <div className="social-links">
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="Visit TCF on YouTube (opens in new window)">YouTube</a>
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Visit TCF on Facebook (opens in new window)">Facebook</a>
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Visit TCF on Instagram (opens in new window)">Instagram</a>
              </div>
            </div>
          </div>

          <div className="prayer-cta-section">
            <h2>Have a prayer need?</h2>
            <p>Our prayer team would be glad to pray with you. Share your prayer request with us.</p>
            <Link to="/prayer" className="prayer-cta-btn">Submit a Prayer Request</Link>
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
        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 3rem; } }
        .contact-section h2 { font-size: 1.5rem; font-weight: 700; color: #0B1F3A; margin: 0 0 2rem 0; }
        .service-info { margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb; }
        .service-info h3 { font-size: 1.125rem; font-weight: 700; color: #0B1F3A; margin: 0 0 0.5rem 0; }
        .time { font-weight: 600; color: #C9A227; margin: 0 0 0.5rem 0; }
        .venue { font-weight: 600; color: #0B1F3A; margin: 0; }
        .contact-section p { font-size: 1rem; color: #6B7280; line-height: 1.6; }
        .social-links { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem; }
        .social-links a { color: white; text-decoration: none; font-weight: 600; background-color: #0B1F3A; padding: 0.75rem 1.5rem; border-radius: 8px; transition: all 0.3s ease; display: inline-block; min-height: 44px; display: flex; align-items: center; }
        .social-links a:hover { background-color: #C9A227; color: #0B1F3A; }
        .social-links a:focus { outline: 2px solid #C9A227; outline-offset: 2px; }
        .prayer-cta-section { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 2rem; text-align: center; }
        .prayer-cta-section h2 { font-size: 1.5rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1rem 0; }
        .prayer-cta-section p { font-size: 1rem; color: #6B7280; line-height: 1.6; margin: 0 0 1.5rem 0; }
        .prayer-cta-btn { background-color: #C9A227; color: white; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 700; transition: all 0.3s ease; display: inline-block; min-height: 44px; display: inline-flex; align-items: center; }
        .prayer-cta-btn:hover { background-color: #B8921F; transform: translateY(-2px); box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25); }
        .prayer-cta-btn:focus { outline: 2px solid #0B1F3A; outline-offset: 2px; }
        @media (max-width: 768px) { .prayer-cta-section { padding: 1.5rem; } }
      `}</style>
    </div>
  );
}
