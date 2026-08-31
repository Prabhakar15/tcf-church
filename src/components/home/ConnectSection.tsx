import { Link } from 'react-router-dom';

interface ConnectOption {
  title: string;
  description: string;
  cta: string;
  link: string;
  icon: string;
  color: string;
}

const connectOptions: ConnectOption[] = [
  {
    title: 'Prayer Request',
    description: 'Share your prayer requests and let us pray with you.',
    cta: 'Submit Request',
    link: '/prayer',
    icon: '🙏',
    color: '#C9A227'
  },
  {
    title: 'Daily Word',
    description: 'Daily encouragement and reflection from Scripture.',
    cta: 'Read Today&apos;s Word',
    link: '/daily-word',
    icon: '📖',
    color: '#0B1F3A'
  },
  {
    title: 'Sermons',
    description: 'Watch and listen to messages from TCF.',
    cta: 'Browse Sermons',
    link: '/sermons',
    icon: '🎙️',
    color: '#C9A227'
  },
  {
    title: 'Contact Us',
    description: 'Have questions? Get in touch with our team.',
    cta: 'Send Message',
    link: '/contact',
    icon: '✉️',
    color: '#0B1F3A'
  },
];

export default function ConnectSection() {
  return (
    <section className="connect-section">
      {/* Decorative background */}
      <div className="connect-deco connect-deco-top"></div>
      <div className="connect-deco connect-deco-bottom"></div>

      <div className="connect-container">
        <div className="connect-inner">
          {/* Section Header */}
          <div className="section-header">
            <div className="accent-bar-group">
              <div className="accent-bar"></div>
              <p className="accent-label">Get Involved</p>
              <div className="accent-bar"></div>
            </div>
            <h2>Ways to Connect</h2>
            <p className="section-description">
              Explore resources, share prayer requests, or reach out to our community.
            </p>
          </div>

          {/* Grid */}
          <div className="connect-grid">
            {connectOptions.map((option) => (
              <Link key={option.link} to={option.link} className="connect-card-link">
                <div className="connect-card" style={{ '--card-color': option.color } as React.CSSProperties}>
                  {/* Decorative corner accent */}
                  <div className="connect-card-deco"></div>

                  {/* Icon Container */}
                  <div className="connect-icon">{option.icon}</div>

                  {/* Title */}
                  <h3>{option.title}</h3>

                  {/* Description */}
                  <p className="connect-description">{option.description}</p>

                  {/* Divider */}
                  <div className="connect-divider"></div>

                  {/* CTA */}
                  <div className="connect-cta">
                    <span>{option.cta}</span>
                    <span className="connect-arrow">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .connect-section {
          padding: 5rem 1.5rem;
          background-color: #ffffff;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .connect-deco {
          position: absolute;
          background-color: #C9A227;
          border-radius: 50%;
          opacity: 0.04;
        }

        .connect-deco-top {
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
        }

        .connect-deco-bottom {
          bottom: -150px;
          right: -150px;
          width: 500px;
          height: 500px;
          background-color: #0B1F3A;
          opacity: 0.03;
        }

        .connect-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .connect-inner {
          max-width: 1100px;
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
          margin-bottom: 1.5rem;
        }

        .accent-bar {
          width: 50px;
          height: 3px;
          background-color: #C9A227;
        }

        .accent-label {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #C9A227;
          margin: 0;
        }

        .section-header h2 {
          font-size: 3.5rem;
          font-weight: 900;
          color: #0B1F3A;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .section-description {
          font-size: 1.25rem;
          color: #6B7280;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .connect-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .connect-card-link {
          text-decoration: none;
          height: 100%;
        }

        .connect-card {
          height: 100%;
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
          border-radius: 16px;
          padding: 2.5rem;
          border: 2px solid #e5e7eb;
          transition: all 0.35s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .connect-card:hover {
          border-color: var(--card-color);
          box-shadow: 0 20px 50px calc(var(--card-color) + 20);
          transform: translateY(-6px);
        }

        .connect-card-deco {
          position: absolute;
          top: 0;
          right: 0;
          width: 120px;
          height: 120px;
          background-color: var(--card-color);
          border-radius: 0 0 0 50px;
          opacity: 0.08;
        }

        .connect-icon {
          width: 80px;
          height: 80px;
          background-color: var(--card-color);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 8px 20px calc(var(--card-color) + 30);
          transition: all 0.35s ease;
          position: relative;
          z-index: 1;
        }

        .connect-card:hover .connect-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .connect-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0B1F3A;
          margin-bottom: 1rem;
          position: relative;
          z-index: 1;
        }

        .connect-description {
          font-size: 1rem;
          color: #6B7280;
          margin-bottom: 1.5rem;
          line-height: 1.6;
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .connect-divider {
          height: 2px;
          background-color: var(--card-color);
          margin-bottom: 1.5rem;
          width: 50px;
          position: relative;
          z-index: 1;
        }

        .connect-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1rem;
          font-weight: 800;
          color: var(--card-color);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .connect-arrow {
          transition: transform 0.3s ease;
        }

        .connect-card:hover .connect-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
