import { churchData } from '../../data/church';

export default function WatchAndListen() {
  return (
    <section className="watch-listen-section">
      <div className="watch-listen-container">
        {/* Header */}
        <div className="watch-listen-header">
          <p className="watch-listen-label">Media & Resources</p>
          <h2>Watch & Listen</h2>
          <p className="watch-listen-subtitle">
            Experience transformative worship anytime, anywhere
          </p>
        </div>

        {/* Main Content */}
        <div className="watch-listen-content">
          <div className="watch-listen-text">
            <h3>TCF on YouTube</h3>
            <p>
              Join us online to watch our services, sermons, and teachings. Our YouTube channel features worship recordings, pastoral messages, and inspiring content for your spiritual journey.
            </p>
            <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" className="watch-listen-btn">
              <svg viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <span>Visit Channel</span>
            </a>
          </div>

          <div className="watch-listen-divider"></div>

          <div className="watch-listen-social">
            <h3>Stay Connected</h3>
            <p>Follow us on social media for updates and community moments.</p>
            <div className="watch-listen-social-links">
              <a href={churchData.social.youtube} target="_blank" rel="noopener noreferrer" title="YouTube" className="social-link">
                YouTube
              </a>
              <a href={churchData.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link">
                Instagram
              </a>
              <a href={churchData.social.facebook} target="_blank" rel="noopener noreferrer" title="Facebook" className="social-link">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .watch-listen-section {
          padding: 4rem 1.5rem;
          background-color: #f9fafb;
          width: 100%;
          box-sizing: border-box;
        }

        .watch-listen-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .watch-listen-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .watch-listen-label {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #C9A227;
          margin: 0;
          margin-bottom: 1rem;
        }

        .watch-listen-header h2 {
          font-size: 2.75rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .watch-listen-subtitle {
          font-size: 1.125rem;
          color: #6B7280;
          margin: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .watch-listen-content {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 3rem;
          align-items: start;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .watch-listen-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 1.5rem;
          }
        }

        .watch-listen-text h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 1rem 0;
        }

        .watch-listen-text p {
          font-size: 1rem;
          color: #6B7280;
          line-height: 1.7;
          margin: 0 0 1.5rem 0;
        }

        .watch-listen-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          background-color: #C9A227;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 700;
          transition: all 0.3s ease;
          border: 2px solid #C9A227;
        }

        .watch-listen-btn:hover {
          background-color: #B8921F;
          border-color: #B8921F;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.2);
        }

        .watch-listen-btn svg {
          width: 20px;
          height: 20px;
          fill: white;
        }

        .watch-listen-divider {
          width: 1px;
          background-color: #e5e7eb;
          margin: 0 1rem;
        }

        @media (max-width: 768px) {
          .watch-listen-divider {
            display: none;
          }
        }

        .watch-listen-social h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 1rem 0;
        }

        .watch-listen-social p {
          font-size: 1rem;
          color: #6B7280;
          line-height: 1.7;
          margin: 0 0 1.5rem 0;
        }

        .watch-listen-social-links {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .social-link {
          color: #0B1F3A;
          text-decoration: none;
          font-weight: 600;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
          display: inline-block;
          width: fit-content;
        }

        .social-link:hover {
          color: #C9A227;
        }
      `}</style>
    </section>
  );
}
