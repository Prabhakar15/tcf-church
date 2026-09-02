import { useEffect, useState } from 'react';
import type { RecurringService } from '../types';
import { getPublishedServices } from '../lib/queries/services';
import { SERVICE_CATEGORIES, REGION_LABELS } from '../lib/constants/services';
import { formatServiceSchedule } from '../lib/utils/formatters';

type ServiceCategory = 'WORSHIP' | 'PRAYER' | 'FELLOWSHIP';
type Region = 'SINGAPORE' | 'INDIA';

export default function ServicesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [allServices, setAllServices] = useState<RecurringService[]>([]);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('WORSHIP');
  const [activePrayerRegion, setActivePrayerRegion] = useState<Region>('SINGAPORE');

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPublishedServices();
        setAllServices(data);
      } catch (err) {
        setError('Unable to load services at this time.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Get services by category
  const getWorshipServices = (): RecurringService[] => {
    return allServices
      .filter(s => s.serviceCategory === SERVICE_CATEGORIES.WORSHIP)
      .sort((a, b) => a.displayOrder - b.displayOrder);
  };

  const getPrayerServices = (region: Region): RecurringService[] => {
    return allServices
      .filter(s => s.serviceCategory === SERVICE_CATEGORIES.PRAYER && s.region === region)
      .sort((a, b) => {
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
      });
  };

  const getFellowshipServices = (groupKey?: string): RecurringService[] => {
    let services = allServices.filter(s => s.serviceCategory === SERVICE_CATEGORIES.FELLOWSHIP);
    if (groupKey) {
      services = services.filter(s => {
        if (groupKey === 'women') return s.fellowshipGroup === 'WOMEN_FELLOWSHIP';
        if (groupKey === 'dor') return s.fellowshipGroup === 'DOR_BROTHERS';
        return false;
      });
    }
    return services.sort((a, b) => a.displayOrder - b.displayOrder);
  };

  // Tab navigation
  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'WORSHIP', label: 'Worship' },
    { id: 'PRAYER', label: 'Prayer' },
    { id: 'FELLOWSHIP', label: 'Fellowship' },
  ];

  const prayerRegions: { id: Region; label: string }[] = [
    { id: 'SINGAPORE', label: 'Singapore' },
    { id: 'INDIA', label: 'India' },
  ];

  const renderServiceCard = (service: RecurringService) => (
    <div key={service.id} className="service-card">
      <h3>{service.title}</h3>
      <p className="service-day">
        <strong>Every {service.dayOfWeek}</strong>
      </p>
      <p className="service-hours">
        {formatServiceSchedule(service.startTime, service.endTime, service.timezone)}
      </p>
      {service.location ? (
        <p className="service-location">
          <span className="location-icon">📍</span>
          {service.location}
        </p>
      ) : (
        <p className="service-location empty">
          <span className="location-icon">📍</span>
          Location to be announced
        </p>
      )}
    </div>
  );

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>Services</h1>
          <p>Gathering together in worship, prayer and fellowship.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner" />
              <p>Loading services...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Category Tabs */}
              <div className="category-tabs">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`tab-button ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-selected={activeCategory === cat.id}
                    role="tab"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Worship Tab */}
              {activeCategory === 'WORSHIP' && (
                <div className="tab-content">
                  {getWorshipServices().length > 0 ? (
                    <div className="services-grid">
                      {getWorshipServices().map(renderServiceCard)}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No worship services available at this time.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Prayer Tab */}
              {activeCategory === 'PRAYER' && (
                <div className="tab-content">
                  {/* Prayer Region Tabs */}
                  <div className="prayer-region-tabs">
                    {prayerRegions.map(region => (
                      <button
                        key={region.id}
                        className={`region-button ${activePrayerRegion === region.id ? 'active' : ''}`}
                        onClick={() => setActivePrayerRegion(region.id)}
                        aria-selected={activePrayerRegion === region.id}
                        role="tab"
                      >
                        {region.label}
                      </button>
                    ))}
                  </div>

                  {/* Prayer Services for Selected Region */}
                  {getPrayerServices(activePrayerRegion).length > 0 ? (
                    <div className="services-grid">
                      {getPrayerServices(activePrayerRegion).map(renderServiceCard)}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No prayer services available for {REGION_LABELS[activePrayerRegion]} at this time.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Fellowship Tab */}
              {activeCategory === 'FELLOWSHIP' && (
                <div className="tab-content">
                  {/* Women Fellowship Section */}
                  <div className="fellowship-section">
                    <h2 className="fellowship-title">Women Fellowship</h2>
                    {getFellowshipServices('women').length > 0 ? (
                      <div className="services-grid">
                        {getFellowshipServices('women').map(renderServiceCard)}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>No Women Fellowship services available at this time.</p>
                      </div>
                    )}
                  </div>

                  {/* Dor Brothers Section */}
                  <div className="fellowship-section">
                    <h2 className="fellowship-title">Dor Brothers</h2>
                    {getFellowshipServices('dor').length > 0 ? (
                      <div className="services-grid">
                        {getFellowshipServices('dor').map(renderServiceCard)}
                      </div>
                    ) : (
                      <div className="empty-state">
                        <p>No Dor Brothers services available at this time.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
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
        
        .page-header { 
          background-color: #0B1F3A; 
          color: white; 
          padding: 5rem 1.5rem; 
        }
        @media (max-width: 767px) { .page-header { padding: 3rem 1rem; } }
        
        .page-header-container { 
          max-width: 1280px; 
          margin: 0 auto;
          text-align: center;
        }
        
        .page-header h1 { 
          font-size: 3rem; 
          font-weight: 800; 
          margin: 0; 
          letter-spacing: -0.02em;
        }
        @media (max-width: 767px) { 
          .page-header h1 { 
            font-size: 2rem;
          } 
        }
        
        .page-header p { 
          font-size: 1.125rem; 
          color: #E5E7EB; 
          margin: 0.75rem 0 0 0;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 1000px; margin: 0 auto; }
        
        .loading { 
          text-align: center; 
          padding: 4rem 2rem; 
          color: #6B7280;
        }
        
        .loading-spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #C9A227;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .error-state { 
          background-color: #fee2e2; 
          border: 1px solid #fecaca; 
          color: #dc2626; 
          padding: 2rem; 
          border-radius: 12px; 
          text-align: center;
        }
        .error-state p { margin: 0 0 1rem 0; }
        
        .retry-button {
          padding: 0.75rem 1.5rem;
          background-color: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .retry-button:hover {
          background-color: #b91c1c;
          transform: translateY(-2px);
        }
        
        /* Category Tabs */
        .category-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e5e7eb;
          flex-wrap: wrap;
        }
        @media (max-width: 767px) {
          .category-tabs {
            gap: 0.5rem;
          }
        }
        
        .tab-button {
          background: none;
          border: none;
          color: #6B7280;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-bottom: 3px solid transparent;
          position: relative;
          bottom: -2px;
        }
        
        .tab-button:hover {
          color: #0B1F3A;
        }
        
        .tab-button.active {
          color: #0B1F3A;
          border-bottom-color: #C9A227;
        }
        
        /* Prayer Region Tabs */
        .prayer-region-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem 0;
          border-top: 1px solid #e5e7eb;
          border-bottom: 1px solid #e5e7eb;
          background-color: #f9fafb;
        }
        @media (max-width: 767px) {
          .prayer-region-tabs {
            gap: 0.5rem;
          }
        }
        
        .region-button {
          background: white;
          border: 2px solid #e5e7eb;
          color: #6B7280;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .region-button:hover {
          border-color: #C9A227;
          color: #0B1F3A;
        }
        
        .region-button.active {
          background-color: #C9A227;
          border-color: #C9A227;
          color: #0B1F3A;
        }
        
        /* Tab Content */
        .tab-content {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Fellowship Sections */
        .fellowship-section {
          margin-bottom: 3rem;
        }
        
        .fellowship-section:last-child {
          margin-bottom: 0;
        }
        
        .fellowship-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 1.5rem 0;
          border-bottom: 3px solid #C9A227;
          padding-bottom: 0.75rem;
        }
        
        .services-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
          gap: 1.5rem; 
        }
        @media (max-width: 767px) { 
          .services-grid { grid-template-columns: 1fr; } 
        }
        
        .service-card { 
          padding: 1.5rem; 
          border: 1px solid #e5e7eb;
          border-top: 4px solid #C9A227;
          border-radius: 12px; 
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);
        }
        .service-card:hover { 
          border-color: #C9A227;
          border-top: 4px solid #C9A227;
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15); 
          transform: translateY(-2px);
        }
        
        .service-card h3 { 
          font-size: 1.25rem; 
          font-weight: 700; 
          color: #0B1F3A; 
          margin: 0 0 1rem 0; 
        }
        .service-day { 
          font-weight: 600; 
          color: #0B1F3A; 
          margin: 0 0 0.5rem 0; 
          font-size: 0.95rem; 
        }
        .service-hours { 
          font-size: 0.9rem; 
          color: #6B7280; 
          margin: 0 0 0.75rem 0; 
        }
        
        .service-location { 
          font-size: 0.9rem; 
          color: #6B7280; 
          margin: 0.75rem 0 0 0; 
          display: flex; 
          align-items: center; 
          gap: 0.5rem; 
        }
        .service-location.empty {
          color: #9CA3AF;
          font-style: italic;
        }
        .location-icon { font-size: 1.1rem; }
        
        .empty-state { 
          text-align: center; 
          padding: 2rem;
          background-color: #f9fafb; 
          border: 1px solid #e5e7eb; 
          border-radius: 12px; 
        }
        .empty-state p { 
          font-size: 1rem; 
          color: #6B7280; 
          margin: 0; 
        }
        
        .music-section { 
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a52 100%); 
          padding: 4rem 1.5rem; 
        }
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
        
        .music-content h2 { 
          font-size: 2rem; 
          font-weight: 700; 
          color: #C9A227; 
          margin: 0 0 0.75rem 0; 
        }
        .music-content p { 
          font-size: 1.1rem; 
          color: #E5E7EB; 
          margin: 0 0 1.5rem 0; 
        }
        
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
          border: none;
          cursor: pointer;
        }
        .music-button:hover { 
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(201, 162, 39, 0.4);
        }
      `}</style>
    </div>
  );
}
