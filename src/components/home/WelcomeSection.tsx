import { Link } from 'react-router-dom';
import { churchData } from '../../data/church';

export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      <div className="welcome-container">
        {/* Header */}
        <div className="welcome-header">
          <p className="welcome-label">About Us</p>
          <h2>Welcome to TCF</h2>
          <p className="welcome-subtitle">Discover who we are and what we stand for</p>
        </div>

        {/* Content Grid */}
        <div className="welcome-grid">
          {/* Our Story */}
          <div className="welcome-card">
            <h3>Our Story</h3>
            <p>
              Tabernacle Christ Fellowship was founded in {churchData.established} by {churchData.pastor} and his wife Lalitha Modi. Born from a vision to extend God&apos;s salvation and build a church without boundaries, TCF has grown into a vibrant community of believers united in faith and service.
            </p>
          </div>

          {/* Our Mission */}
          <div className="welcome-card">
            <h3>Our Mission</h3>
            <p>
              Our mission is rooted in discipleship&mdash;helping believers grow deeper in their knowledge of Jesus Christ while experiencing the transformative presence of God. We believe that faith is meant to be shared and lived in community.
            </p>
          </div>

          {/* Our Vision */}
          <div className="welcome-card">
            <h3>Our Vision</h3>
            <p>
              A church without boundaries. A family over a community. We are passionate about bringing the good news to families and friends, sharing God&apos;s love, joy, and peace to inspire, empower, and transform lives.
            </p>
          </div>

          {/* Our Community */}
          <div className="welcome-card">
            <h3>Our Community</h3>
            <p>
              Whether you&apos;re a longtime believer or exploring faith for the first time, TCF welcomes you. We create an environment where every person can experience genuine community, belonging, and the life-changing love of God.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="welcome-cta">
          <a href="#worship" className="welcome-btn welcome-btn-primary">
            Join Us for Worship
          </a>
          <Link to="/contact" className="welcome-btn welcome-btn-secondary">
            Get in Touch
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
        }

        .welcome-header {
          text-align: center;
          margin-bottom: 4rem;
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
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        @media (max-width: 767px) {
          .welcome-header h2 {
            font-size: 2rem;
          }
        }

        .welcome-subtitle {
          font-size: 1.125rem;
          color: #6B7280;
          margin: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .welcome-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .welcome-card {
          padding: 2rem;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background-color: #f9fafb;
        }

        .welcome-card h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 1rem 0;
        }

        .welcome-card p {
          font-size: 0.95rem;
          color: #6B7280;
          line-height: 1.7;
          margin: 0;
        }

        .welcome-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 767px) {
          .welcome-cta {
            flex-direction: column;
          }
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

        .welcome-btn-secondary {
          background-color: transparent;
          color: #0B1F3A;
          border-color: #0B1F3A;
        }

        .welcome-btn-secondary:hover {
          background-color: #0B1F3A;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(11, 31, 58, 0.15);
        }
      `}</style>
    </section>
  );
}
