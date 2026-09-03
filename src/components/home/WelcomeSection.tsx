import { Link } from 'react-router-dom';

export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        {/* Header */}
        <div className="welcome-header">
          <p className="welcome-label">About Us</p>
          <h2>Welcome to TCF</h2>
        </div>

        {/* Brief teaser content */}
        <div className="welcome-teaser">
          <p className="welcome-teaser-text">
            Tabernacle Christ Fellowship is a vibrant church community dedicated to authentic worship, spiritual growth, and shared love. Founded on a vision of a church without boundaries, we invite you to experience genuine community and the transformative power of God's grace.
          </p>
        </div>

        {/* CTA */}
        <div className="welcome-cta">
          <Link to="/about" className="welcome-btn welcome-btn-primary">
            Learn More About TCF
          </Link>
        </div>
      </div>

      <style>{`
        .welcome-section {
          padding: 5rem 1.5rem;
          background-color: #ffffff;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .welcome-section {
            padding: 3rem 1rem;
          }
        }

        .welcome-container {
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
        }

        .welcome-header {
          margin-bottom: 2.5rem;
        }

        .welcome-label {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #C9A227;
          margin: 0;
          margin-bottom: 1rem;
        }

        .welcome-header h2 {
          font-size: 2.75rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0;
          line-height: 1.2;
        }

        @media (max-width: 767px) {
          .welcome-header h2 {
            font-size: 2rem;
          }
        }

        .welcome-teaser {
          max-width: 700px;
          margin: 0 auto 2.5rem auto;
        }

        .welcome-teaser-text {
          font-size: 1.125rem;
          color: #6B7280;
          line-height: 1.7;
          margin: 0;
        }

        @media (max-width: 767px) {
          .welcome-teaser-text {
            font-size: 1rem;
          }
        }

        .welcome-cta {
          display: flex;
          justify-content: center;
        }

        .welcome-btn {
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
          .welcome-btn {
            width: 100%;
          }
        }

        .welcome-btn-primary {
          background-color: #C9A227;
          color: white;
          border-color: #C9A227;
        }

        .welcome-btn-primary:hover {
          background-color: #B8921F;
          border-color: #B8921F;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25);
        }
      `}</style>
    </section>
  );
}
