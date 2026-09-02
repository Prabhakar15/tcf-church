import { useEffect, useState } from 'react';
import type { RecurringService } from '../types';
import { getPublishedServices } from '../lib/queries/services';
import { formatServiceSchedule } from '../lib/utils/formatters';

interface ServiceGroup {
  groupName: string;
  sectionTitle: string;
  services: RecurringService[];
  isSpecial?: boolean;
}

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPublishedServices();
        groupServices(data);
      } catch (err) {
        setError('Unable to load services. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const groupServices = (allServices: RecurringService[]): void => {
    const groups: ServiceGroup[] = [];

    // Regular Services (Sunday & Saturday)
    const regularServices = allServices.filter(s => 
      s.category === 'Sunday Service' || s.category === 'Saturday Service'
    );
    if (regularServices.length > 0) {
      groups.push({
        groupName: 'regular',
        sectionTitle: 'Regular Services',
        services: regularServices.sort((a, b) => a.displayOrder - b.displayOrder)
      });
    }

    // Dormitory Brothers
    const dormServices = allServices.filter(s => s.category === 'Dormitory Brothers');
    if (dormServices.length > 0) {
      groups.push({
        groupName: 'dormitory',
        sectionTitle: 'Dormitory Brothers Fellowship',
        services: dormServices.sort((a, b) => a.displayOrder - b.displayOrder)
      });
    }

    // Women's Fellowship
    const womenServices = allServices.filter(s => s.category === 'Women\'s Fellowship');
    if (womenServices.length > 0) {
      groups.push({
        groupName: 'women',
        sectionTitle: 'Women\'s Fellowship',
        services: womenServices.sort((a, b) => a.displayOrder - b.displayOrder)
      });
    }

    // Early Morning Prayer - Group by timezone
    const prayerServices = allServices.filter(s => s.category === 'Early Morning Prayer');
    if (prayerServices.length > 0) {
      const singaporePrayer = prayerServices.filter(s => s.timezone === 'Asia/Singapore');
      const indiaPrayer = prayerServices.filter(s => s.timezone === 'Asia/Kolkata');

      if (singaporePrayer.length > 0) {
        groups.push({
          groupName: 'prayer-sg',
          sectionTitle: 'Early Morning Prayer - Singapore',
          services: [{
            id: 'prayer-sg-group',
            title: 'Tuesday – Friday',
            category: 'Early Morning Prayer',
            dayOfWeek: 'Tuesday',
            startTime: singaporePrayer[0].startTime,
            endTime: singaporePrayer[0].endTime,
            timezone: 'Asia/Singapore',
            status: 'published',
            displayOrder: singaporePrayer[0].displayOrder
          }],
          isSpecial: true
        });
      }

      if (indiaPrayer.length > 0) {
        groups.push({
          groupName: 'prayer-in',
          sectionTitle: 'Early Morning Prayer - India',
          services: [{
            id: 'prayer-in-group',
            title: 'Tuesday – Friday',
            category: 'Early Morning Prayer',
            dayOfWeek: 'Tuesday',
            startTime: indiaPrayer[0].startTime,
            endTime: indiaPrayer[0].endTime,
            timezone: 'Asia/Kolkata',
            status: 'published',
            displayOrder: indiaPrayer[0].displayOrder
          }],
          isSpecial: true
        });
      }
    }

    setServiceGroups(groups);
  };

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>Services & Fellowships</h1>
          <p>Join us for worship, fellowship, and community gatherings throughout the week</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {loading ? (
            <div className="loading">Loading services...</div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
            </div>
          ) : serviceGroups.length > 0 ? (
            <div className="services-sections">
              {serviceGroups.map((group) => (
                <div key={group.groupName} className="services-section">
                  <h2 className="section-title">{group.sectionTitle}</h2>
                  <div className={group.isSpecial ? "services-special" : "services-grid"}>
                    {group.services.map((service) => (
                      <div key={service.id} className="service-card">
                        <h3>{service.title}</h3>
                        {group.isSpecial ? (
                          <>
                            <p className="service-time">
                              <strong>{service.title}</strong>
                            </p>
                            <p className="service-hours">
                              {formatServiceSchedule(service.startTime, service.endTime, service.timezone)}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="service-time">
                              <strong>Every {service.dayOfWeek}</strong>
                            </p>
                            <p className="service-hours">
                              {formatServiceSchedule(service.startTime, service.endTime, service.timezone)}
                            </p>
                          </>
                        )}
                        {service.location && (
                          <p className="service-location">
                            <span className="location-icon">📍</span>
                            {service.location}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* TCF Selah Music Section */}
      <section className="music-section">
        <div className="music-container">
          <div className="music-content">
            <h2>TCF Selah Music</h2>
            <p>Worship, praise, and music from TCF</p>
            <a
              href="https://www.youtube.com/@tcfselahmusic"
              target="_blank"
              rel="noopener noreferrer"
              className="music-button"
            >
              Visit TCF Selah Music
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .services-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        @media (max-width: 767px) { .page-header { padding: 2rem 1rem; } }
        .page-header-container { max-width: 1280px; margin: 0 auto; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0.5rem 0 0 0; }
        
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 1000px; margin: 0 auto; }
        
        .loading { text-align: center; padding: 2rem; color: #6B7280; }
        .error-state { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; padding: 1.5rem; border-radius: 12px; text-align: center; }
        .error-state p { margin: 0; }
        
        .services-sections { display: flex; flex-direction: column; gap: 3rem; }
        
        .services-section { }
        .section-title { font-size: 1.75rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1.5rem 0; border-bottom: 3px solid #C9A227; padding-bottom: 0.75rem; }
        
        .services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
        .services-special { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; }
        @media (max-width: 767px) { 
          .services-grid { grid-template-columns: 1fr; } 
          .services-special { grid-template-columns: 1fr; }
        }
        
        .service-card { 
          padding: 1.5rem; 
          border: 2px solid #e5e7eb; 
          border-radius: 12px; 
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);
        }
        .service-card:hover { border-color: #C9A227; box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15); }
        
        .service-card h3 { font-size: 1.25rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1rem 0; }
        .service-time { font-weight: 600; color: #0B1F3A; margin: 0 0 0.5rem 0; font-size: 0.95rem; }
        .service-hours { font-size: 0.9rem; color: #6B7280; margin: 0 0 0.75rem 0; }
        
        .service-location { font-size: 0.9rem; color: #6B7280; margin: 0.75rem 0 0 0; display: flex; align-items: center; gap: 0.5rem; }
        .location-icon { font-size: 1.1rem; }
        
        .empty-state { text-align: center; padding: 4rem 2rem; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; }
        .empty-state p { font-size: 1.125rem; color: #6B7280; margin: 0; }
        
        .music-section { background: linear-gradient(135deg, #0B1F3A 0%, #1a3a52 100%); padding: 4rem 1.5rem; }
        @media (max-width: 767px) { .music-section { padding: 2rem 1rem; } }
        
        .music-container { max-width: 1000px; margin: 0 auto; }
        .music-content { 
          background: rgba(255, 255, 255, 0.05); 
          border: 2px solid rgba(201, 162, 39, 0.3);
          border-radius: 16px; 
          padding: 3rem 2rem;
          text-align: center;
          backdrop-filter: blur(10px);
        }
        
        .music-content h2 { font-size: 2rem; font-weight: 700; color: #C9A227; margin: 0 0 0.75rem 0; }
        .music-content p { font-size: 1.1rem; color: #E5E7EB; margin: 0 0 1.5rem 0; }
        
        .music-button {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #C9A227 0%, #E0B644 100%);
          color: #0B1F3A;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(201, 162, 39, 0.3);
        }
        .music-button:hover { 
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 39, 0.4);
        }
      `}</style>
    </div>
  );
}
