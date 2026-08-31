import { churchData } from '../../data/church';

export default function WorshipWithUs() {
  return (
    <section id="worship" className="worship-section">
      <div className="worship-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="accent-bar-group">
            <div className="accent-bar"></div>
            <p className="accent-label">Join Us</p>
            <div className="accent-bar"></div>
          </div>

          <h2>Worship With Us</h2>

          <p className="section-description">
            Experience authentic worship, fellowship, and the presence of God. Visit us at either of our worship locations.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="service-cards">
          {churchData.services.map((service) => (
            <div key={service.id} className="service-card">
              {/* Decorative corner */}
              <div className="service-card-deco"></div>

              {/* Content */}
              <div className="service-card-content">
                {/* Day badge */}
                <div className="service-badge">{service.day}</div>

                {/* Time */}
                <div className="service-time">
                  <p className="time-value">{service.time}</p>
                  <p className="time-zone">{service.timezone}</p>
                </div>

                {/* Divider */}
                <div className="service-divider"></div>

                {/* Location */}
                <div className="service-location">
                  <h3>{service.venue}</h3>
                  <p>{service.address}</p>
                </div>

                {/* Get Directions Button */}
                <a href={service.mapsUrl} target="_blank" rel="noopener noreferrer" className="service-btn">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
                  </svg>
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="worship-cta">
          <div className="accent-bar-group accent-bar-group-small">
            <div className="accent-bar accent-bar-small"></div>
            <p className="accent-label accent-label-small">Online Worship</p>
            <div className="accent-bar accent-bar-small"></div>
          </div>

          <h3>Unable to Attend in Person?</h3>

          <p>
            Join us online on YouTube and experience worship from anywhere. Watch live services and past messages anytime.
          </p>

          {/* Large YouTube CTA */}
          <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" className="youtube-cta">
            <svg viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            
            <div className="youtube-cta-text">
              <p className="youtube-label">Watch</p>
              <p className="youtube-title">On YouTube</p>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        .worship-section {
          padding: 4rem 1.5rem;
          background-color: #ffffff;
          width: 100%;
          box-sizing: border-box;
        }

        .worship-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .accent-bar-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .accent-bar {
          width: 40px;
          height: 3px;
          background-color: #C9A227;
        }

        .accent-label {
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #C9A227;
          margin: 0;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0B1F3A;
          margin-bottom: 1rem;
        }

        .section-description {
          font-size: 1.0625rem;
          color: #6B7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .service-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1000px;
          margin: 0 auto 4rem auto;
        }

        .service-card {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 12px;
          padding: 2rem;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card:hover {
          border-color: #C9A227;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .service-card-deco {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background-color: #C9A227;
          opacity: 0.08;
          border-radius: 0 0 0 50px;
        }

        .service-card-content {
          position: relative;
          z-index: 1;
        }

        .service-badge {
          display: inline-block;
          background-color: #0B1F3A;
          color: #C9A227;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 1.5rem;
        }

        .service-time {
          margin-bottom: 1.5rem;
        }

        .time-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0 0 0.25rem 0;
        }

        .time-zone {
          font-size: 0.875rem;
          color: #6B7280;
          margin: 0;
        }

        .service-divider {
          height: 2px;
          background-color: #C9A227;
          margin-bottom: 1.5rem;
          width: 60%;
        }

        .service-location {
          margin-bottom: 2rem;
        }

        .service-location h3 {
          font-size: 1.125rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 0.5rem 0;
        }

        .service-location p {
          font-size: 0.95rem;
          color: #6B7280;
          margin: 0;
          line-height: 1.5;
        }

        .service-btn {
          background-color: #0B1F3A;
          border-radius: 8px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid #0B1F3A;
          width: 100%;
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.2);
          text-decoration: none;
          font-weight: 700;
          color: white;
        }

        .service-btn:hover {
          background-color: #C9A227;
          border-color: #C9A227;
          box-shadow: 0 8px 16px rgba(201, 162, 39, 0.3);
          transform: translateY(-2px);
        }

        .service-btn svg {
          width: 20px;
          height: 20px;
          fill: white;
        }

        .worship-cta {
          background: linear-gradient(135deg, #F8F7F3 0%, #f3f4f6 100%);
          border-radius: 16px;
          padding: 4rem 2rem;
          border: 2px solid #e5e7eb;
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }

        .accent-bar-group-small {
          margin-bottom: 1rem;
        }

        .accent-bar-small {
          width: 30px;
          height: 2px;
        }

        .accent-label-small {
          font-size: 0.75rem;
          letter-spacing: 1.5px;
        }

        .worship-cta h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin-bottom: 0.75rem;
        }

        .worship-cta p {
          font-size: 1rem;
          color: #6B7280;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }

        .youtube-cta {
          background-color: #C9A227;
          border-radius: 8px;
          padding: 1.5rem 3rem;
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid #C9A227;
          text-decoration: none;
        }

        .youtube-cta:hover {
          background-color: #0B1F3A;
          border-color: #C9A227;
          transform: scale(1.05);
        }

        .youtube-cta svg {
          width: 48px;
          height: 48px;
          fill: white;
        }

        .youtube-cta-text {
          text-align: left;
        }

        .youtube-label {
          font-size: 0.875rem;
          color: white;
          margin: 0;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .youtube-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
