import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { RecurringService } from '../../types';
import { getPublishedServices } from '../../lib/queries/services';

export default function ServicesPreview() {
  const [services, setServices] = useState<RecurringService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getPublishedServices();
        setServices(data.slice(0, 3));
      } catch (err) {
        console.error('Error loading services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading || services.length === 0) {
    return null;
  }

  return (
    <section className="services-preview">
      <div className="services-preview-container">
        <h2>Join Us Throughout the Week</h2>
        <p>Regular gatherings for worship, fellowship, and prayer</p>

        <div className="services-preview-grid">
          {services.map((service) => (
            <div key={service.id} className="service-preview-card">
              <h3>{service.title}</h3>
              <p className="service-day">
                <strong>Every {service.dayOfWeek}</strong>
              </p>
              <p className="service-time">
                {service.startTime}
                {service.timezone && <span className="service-tz">{service.timezone}</span>}
              </p>
              {service.location && (
                <p className="service-location">📍 {service.location}</p>
              )}
            </div>
          ))}
        </div>

        <Link to="/services" className="services-cta">
          View All Services
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </Link>
      </div>

      <style>{`
        .services-preview {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          padding: 4rem 1.5rem;
        }

        .services-preview-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }

        .services-preview h2 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0 0 0.75rem 0;
        }

        .services-preview-container > p {
          font-size: 1.1rem;
          color: #6B7280;
          margin: 0 0 2.5rem 0;
        }

        .services-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .service-preview-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);
          transition: all 0.3s ease;
          text-align: left;
          border: 1px solid #e5e7eb;
        }

        .service-preview-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15);
          border-color: #C9A227;
        }

        .service-preview-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 0.75rem 0;
        }

        .service-day {
          font-weight: 600;
          color: #0B1F3A;
          margin: 0 0 0.5rem 0;
          font-size: 0.95rem;
        }

        .service-time {
          font-size: 0.9rem;
          color: #6B7280;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .service-tz {
          font-size: 0.75rem;
          background-color: #E0D5B7;
          color: #0B1F3A;
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
          font-weight: 600;
        }

        .service-location {
          font-size: 0.85rem;
          color: #6B7280;
          margin: 0.5rem 0 0 0;
        }

        .services-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #C9A227 0%, #E0B644 100%);
          color: white;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 162, 39, 0.3);
        }

        .services-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 39, 0.4);
        }

        @media (max-width: 767px) {
          .services-preview {
            padding: 2rem 1rem;
          }

          .services-preview h2 {
            font-size: 1.75rem;
          }

          .services-preview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
