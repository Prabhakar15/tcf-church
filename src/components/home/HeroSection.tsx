import { churchInfo, socialLinks } from '../../data/church';

export default function HeroSection() {
  return (
    <section className="hero-section">
      {/* Decorative background elements */}
      <div className="hero-deco hero-deco-top"></div>
      <div className="hero-deco hero-deco-bottom"></div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Left: Content */}
          <div className="hero-content">
            {/* Accent bar */}
            <div className="accent-bar-group">
              <div className="accent-bar"></div>
              <p className="accent-label">Welcome Home</p>
            </div>

            {/* Main heading - Using real TCF vision */}
            <div className="hero-heading">
              <h1>{churchInfo.vision}</h1>
              <p className="hero-subheading">{churchInfo.community}</p>
            </div>

            {/* Description */}
            <p className="hero-description">
              A welcoming church family in Singapore, gathering together for worship, fellowship, and discipleship. Discover a community where faith is lived, relationships matter, and everyone belongs.
            </p>

            {/* Buttons */}
            <div className="hero-buttons">
              <a href="#worship" className="hero-btn hero-btn-primary">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                </svg>
                <span>Attend a Service</span>
              </a>

              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn-outline">
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <span>Watch Online</span>
              </a>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="hero-visual">
            <div className="hero-visual-deco hero-visual-deco-top"></div>
            <div className="hero-visual-content">
              <div className="hero-visual-icon">✝</div>
              <h3>Worship With Us</h3>
              <p>Join us in faith and fellowship</p>
            </div>
            <div className="hero-visual-deco hero-visual-deco-bottom"></div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a52 50%, #0B1F3A 100%);
          color: white;
          padding: 4rem 1.5rem;
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .hero-section {
            padding: 2rem 1rem;
          }
        }

        .hero-deco {
          position: absolute;
          background-color: #C9A227;
          border-radius: 50%;
          opacity: 0.05;
        }

        .hero-deco-top {
          top: -50px;
          right: -50px;
          width: 300px;
          height: 300px;
        }

        .hero-deco-bottom {
          bottom: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        .accent-bar-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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

        .hero-heading h1 {
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1rem;
          color: white;
          font-size: 3.5rem;
        }

        @media (max-width: 767px) {
          .hero-heading h1 {
            font-size: 2rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .hero-heading h1 {
            font-size: 2.5rem;
          }
        }

        .hero-subheading {
          font-weight: 300;
          color: #C9A227;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        @media (max-width: 767px) {
          .hero-subheading {
            font-size: 1rem;
          }
        }

        .hero-description {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #e5e7eb;
          max-width: 100%;
        }

        @media (max-width: 767px) {
          .hero-description {
            font-size: 0.95rem;
          }
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          padding-top: 1rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .hero-buttons {
            flex-direction: column;
          }
        }

        .hero-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          text-align: center;
          padding: 1.25rem 2rem;
          font-size: 1.0625rem;
        }

        @media (max-width: 767px) {
          .hero-btn {
            width: 100%;
            padding: 1rem 1.5rem;
            font-size: 0.95rem;
          }
        }

        .hero-btn svg {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .hero-btn-primary {
          background-color: #C9A227;
          border-color: #C9A227;
          color: white;
          box-shadow: 0 8px 16px rgba(201, 162, 39, 0.3);
        }

        .hero-btn-primary:hover {
          background-color: #B8921F;
          box-shadow: 0 12px 24px rgba(201, 162, 39, 0.4);
          transform: translateY(-3px);
        }

        .hero-btn-primary svg {
          fill: white;
        }

        .hero-btn-outline {
          background-color: transparent;
          border-color: white;
          color: white;
          box-shadow: 0 8px 16px rgba(255, 255, 255, 0.1);
        }

        .hero-btn-outline:hover {
          background-color: white;
          box-shadow: 0 12px 24px rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
          color: #0B1F3A;
        }

        .hero-btn-outline:hover svg {
          fill: #0B1F3A;
        }

        .hero-btn-outline svg {
          fill: white;
          transition: fill 0.3s ease;
        }

        .hero-visual {
          background: linear-gradient(135deg, rgba(201, 162, 39, 0.1), rgba(201, 162, 39, 0.05));
          border-radius: 12px;
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          border: 2px solid rgba(201, 162, 39, 0.3);
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 1023px) {
          .hero-visual {
            display: none;
          }
        }

        .hero-visual-deco {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(201, 162, 39, 0.2);
        }

        .hero-visual-deco-top {
          top: 20px;
          right: 20px;
          width: 100px;
          height: 100px;
        }

        .hero-visual-deco-bottom {
          bottom: 20px;
          left: 20px;
          width: 60px;
          height: 60px;
        }

        .hero-visual-content {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .hero-visual-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .hero-visual-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
        }

        .hero-visual-content p {
          font-size: 1rem;
          color: #C9A227;
          font-weight: 500;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
