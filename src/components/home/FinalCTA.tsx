import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="final-cta-section">
      {/* Subtle background */}
      <div className="final-cta-bg-accent"></div>

      <div className="final-cta-container">
        <div className="final-cta-content">
          {/* Label */}
          <p className="final-cta-label">Join Our Community</p>

          {/* Main heading */}
          <h2 className="final-cta-heading">
            You&apos;re Welcome at TCF
          </h2>

          {/* Description */}
          <p className="final-cta-description">
            Whether you&apos;re visiting for the first time or seeking a spiritual home, Tabernacle Christ Fellowship welcomes you. We invite you to join us for worship, fellowship, and spiritual growth.
          </p>

          {/* Accent divider */}
          <div className="final-cta-divider"></div>

          {/* Primary CTA */}
          <div className="final-cta-buttons">
            <Link to="/services" className="final-cta-btn final-cta-btn-primary">
              Find Service Times
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .final-cta-section {
          padding: 6rem 1.5rem;
          background-color: #ffffff;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .final-cta-section {
            padding: 4rem 1rem;
          }
        }

        .final-cta-bg-accent {
          position: absolute;
          top: 50%;
          right: -100px;
          width: 300px;
          height: 300px;
          background-color: #C9A227;
          border-radius: 50%;
          opacity: 0.04;
          transform: translateY(-50%);
        }

        @media (max-width: 1024px) {
          .final-cta-bg-accent {
            display: none;
          }
        }

        .final-cta-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .final-cta-content {
          text-align: center;
          padding: 3rem 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
        }

        @media (max-width: 767px) {
          .final-cta-content {
            padding: 2rem 1.5rem;
          }
        }

        .final-cta-label {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #C9A227;
          margin: 0 0 1.5rem 0;
        }

        .final-cta-heading {
          font-size: 2.75rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        @media (max-width: 767px) {
          .final-cta-heading {
            font-size: 2rem;
          }
        }

        .final-cta-description {
          font-size: 1.125rem;
          color: #6B7280;
          line-height: 1.7;
          max-width: 700px;
          margin: 0 auto 2rem auto;
        }

        @media (max-width: 767px) {
          .final-cta-description {
            font-size: 1rem;
          }
        }

        .final-cta-divider {
          height: 2px;
          width: 60px;
          background-color: #C9A227;
          margin: 2rem auto;
        }

        .final-cta-buttons {
          display: flex;
          justify-content: center;
          margin-top: 2rem;
        }

        .final-cta-btn {
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 2px solid;
          display: inline-block;
          min-width: 200px;
        }

        @media (max-width: 767px) {
          .final-cta-btn {
            width: 100%;
          }
        }

        .final-cta-btn-primary {
          background-color: #C9A227;
          color: white;
          border-color: #C9A227;
        }

        .final-cta-btn-primary:hover {
          background-color: #B8921F;
          border-color: #B8921F;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25);
        }
      `}</style>
    </section>
  );
}
