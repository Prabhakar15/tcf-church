import { churchData } from '../../data/church';

const visionPoints = [
  {
    title: 'Authentic Worship',
    description: 'We gather to know Jesus Christ more deeply, worship Him authentically, and experience His presence in our midst.',
    icon: '✝'
  },
  {
    title: 'Spiritual Growth',
    description: 'Our mission focuses on equipping believers to grow spiritually, understand Scripture, and live out their faith with purpose.',
    icon: '📚'
  },
  {
    title: 'Shared Love',
    description: 'We are passionate about bringing the good news to all, sharing God&apos;s love, joy, and peace with those who seek belonging.',
    icon: '❤️'
  },
  {
    title: 'Life Transformation',
    description: 'Through faith, community, and God&apos;s grace, we seek to transform lives and bring hope to all who enter our doors.',
    icon: '✨'
  },
];

export default function VisionSection() {
  return (
    <section className="vision-section">
      <div className="vision-container">
        <div className="vision-inner">
          {/* Section Header */}
          <div className="vision-header">
            <div className="accent-bar-group">
              <div className="accent-bar"></div>
              <p className="accent-label">Our Core Values</p>
              <div className="accent-bar"></div>
            </div>
            
            <h2>Our Vision &amp; Mission</h2>
            
            <div className="vision-taglines">
              <p className="vision-tagline-primary">{churchData.vision}</p>
              <p className="vision-tagline-secondary">{churchData.community}</p>
            </div>
          </div>

          {/* Vision Points Grid */}
          <div className="vision-grid">
            {visionPoints.map((point, index) => (
              <div key={index} className="vision-card">
                {/* Decorative corner */}
                <div className="vision-card-deco"></div>

                {/* Icon + Number Badge */}
                <div className="vision-card-header">
                  <div className="vision-card-icon">{point.icon}</div>
                  <div className="vision-card-number">{index + 1}</div>
                </div>

                {/* Title */}
                <h3>{point.title}</h3>

                {/* Description */}
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .vision-section {
          padding: 4rem 1.5rem;
          background-color: #f9fafb;
          width: 100%;
          box-sizing: border-box;
        }

        .vision-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .vision-inner {
          max-width: 1100px;
          margin: 0 auto;
        }

        .vision-header {
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

        .vision-header h2 {
          font-size: 2.75rem;
          font-weight: 800;
          color: #0B1F3A;
          margin-bottom: 2rem;
        }

        .vision-taglines {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .vision-tagline-primary {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0B1F3A;
          line-height: 1.5;
          margin: 0;
        }

        .vision-tagline-secondary {
          font-size: 1.25rem;
          font-weight: 600;
          color: #C9A227;
          line-height: 1.5;
          margin: 0;
        }

        .vision-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .vision-card {
          background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
          border-radius: 12px;
          padding: 2rem;
          border: 2px solid #e5e7eb;
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .vision-card:hover {
          border-color: #C9A227;
          box-shadow: 0 12px 28px rgba(201, 162, 39, 0.15);
          transform: translateY(-4px);
        }

        .vision-card-deco {
          position: absolute;
          top: 0;
          right: 0;
          width: 100px;
          height: 100px;
          background-color: #C9A227;
          opacity: 0.05;
          border-radius: 0 0 0 80px;
        }

        .vision-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }

        .vision-card-icon {
          width: 60px;
          height: 60px;
          background-color: #0B1F3A;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.2);
        }

        .vision-card-number {
          width: 40px;
          height: 40px;
          background-color: #C9A227;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: white;
          font-size: 1.125rem;
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.3);
        }

        .vision-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0B1F3A;
          margin-bottom: 0.75rem;
          position: relative;
          z-index: 1;
        }

        .vision-card p {
          font-size: 0.95rem;
          color: #6B7280;
          line-height: 1.6;
          position: relative;
          z-index: 1;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
