import { Link } from 'react-router-dom';
import { churchData } from '../../data/church';

export default function PastorSection() {
  return (
    <section className="pastor-section">
      {/* Background Pattern */}
      <div className="pastor-bg-pattern"></div>

      <div className="pastor-container">
        {/* Section Label */}
        <div className="pastor-label">
          <p>✦ LEADERSHIP ✦</p>
        </div>

        {/* Main Content */}
        <div className="pastor-grid">
          {/* Left: Image */}
          <div className="pastor-image-box">
            <img
              src="/pastor.jpg"
              alt="Pastor Daniel Modi"
              className="pastor-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Overlay gradient for depth */}
            <div className="pastor-image-overlay"></div>

            {/* Years badge */}
            <div className="pastor-years-badge">34+ Years</div>
          </div>

          {/* Right: Content */}
          <div className="pastor-content">
            {/* Heading */}
            <div className="pastor-heading">
              <h2>Meet</h2>
              <h2 className="pastor-name">Pastor Daniel</h2>
            </div>

            {/* Tagline */}
            <p className="pastor-tagline">Founder &amp; Senior Pastor</p>

            {/* Description */}
            <p className="pastor-description">
              {churchData.pastor} is the founder and senior pastor of Tabernacle Christ Fellowship. His heart for ministry extends beyond the pulpit—he serves as a father figure and mentor to many who find themselves far from home.
            </p>

            {/* Features Grid */}
            <div className="pastor-features">
              {/* Feature 1 */}
              <div className="pastor-feature">
                <div className="pastor-feature-icon">🤝</div>
                <p>Creates Community</p>
              </div>

              {/* Feature 2 */}
              <div className="pastor-feature">
                <div className="pastor-feature-icon">✝</div>
                <p>Discipleship Focus</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pastor-cta">
              <Link to="/pastor" className="pastor-btn">
                <svg viewBox="0 0 24 24">
                  <path d="M5 13h11.17l-4.88 4.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41L12.7 4.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L15.17 11H5c-.55 0-1 .45-1 1s.45 1 1 1z"/>
                </svg>
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .pastor-section {
          padding: 4rem 1.5rem;
          background-color: #0B1F3A;
          color: white;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .pastor-section {
            padding: 2rem 1rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .pastor-section {
            padding: 3rem 1.5rem;
          }
        }

        .pastor-bg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(circle at 20% 50%, rgba(201, 162, 39, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(201, 162, 39, 0.08) 0%, transparent 50%);
          z-index: 0;
        }

        .pastor-container {
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .pastor-label {
          text-align: center;
          margin-bottom: 2rem;
        }

        @media (max-width: 767px) {
          .pastor-label {
            margin-bottom: 1.5rem;
          }

          .pastor-label p {
            font-size: 0.7rem;
          }
        }

        .pastor-label p {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #C9A227;
          margin: 0;
        }

        .pastor-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 5rem;
          align-items: center;
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .pastor-grid {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        @media (min-width: 1024px) {
          .pastor-grid {
            gap: 5rem;
          }
        }

        .pastor-image-box {
          position: relative;
          height: 600px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.5);
          border: 3px solid #C9A227;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .pastor-image-box {
            height: 300px;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .pastor-image-box {
            height: 400px;
          }
        }

        .pastor-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pastor-image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 40%;
          background: linear-gradient(to top, rgba(11, 31, 58, 0.8), transparent);
          z-index: 1;
        }

        .pastor-years-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background-color: #C9A227;
          color: #0B1F3A;
          padding: 1rem 1.5rem;
          border-radius: 50px;
          font-weight: 900;
          font-size: 1.375rem;
          z-index: 2;
          box-shadow: 0 12px 28px rgba(201, 162, 39, 0.4);
        }

        @media (max-width: 767px) {
          .pastor-years-badge {
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
          }
        }

        .pastor-content {
          color: white;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 767px) {
          .pastor-content {
            gap: 1.5rem;
          }
        }

        .pastor-heading h2 {
          font-weight: 900;
          margin: 0 0 0.5rem 0;
          line-height: 1.1;
        }

        @media (max-width: 767px) {
          .pastor-heading h2 {
            font-size: 1.75rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .pastor-heading h2 {
            font-size: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .pastor-heading h2 {
            font-size: 3.75rem;
          }
        }

        .pastor-name {
          color: #C9A227;
        }

        .pastor-tagline {
          font-size: 1rem;
          color: #C9A227;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
        }

        @media (max-width: 767px) {
          .pastor-tagline {
            font-size: 0.85rem;
          }
        }

        .pastor-description {
          font-size: 1.1rem;
          color: #E5E7EB;
          line-height: 1.8;
          margin: 0;
        }

        @media (max-width: 767px) {
          .pastor-description {
            font-size: 0.95rem;
          }
        }

        .pastor-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        @media (max-width: 767px) {
          .pastor-features {
            margin-top: 0.5rem;
          }
        }

        .pastor-feature {
          background-color: rgba(201, 162, 39, 0.15);
          border-left: 4px solid #C9A227;
          padding: 1.5rem;
          border-radius: 8px;
        }

        @media (max-width: 767px) {
          .pastor-feature {
            padding: 1rem;
          }
        }

        .pastor-feature-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .pastor-feature p {
          font-size: 0.95rem;
          color: #E5E7EB;
          margin: 0;
          font-weight: 600;
        }

        @media (max-width: 767px) {
          .pastor-feature p {
            font-size: 0.85rem;
          }
        }

        .pastor-cta {
          margin-top: 1.5rem;
        }

        @media (max-width: 767px) {
          .pastor-cta {
            margin-top: 1rem;
          }
        }

        .pastor-btn {
          background-color: #C9A227;
          color: #0B1F3A;
          border-radius: 10px;
          padding: 1.375rem 2.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.35s ease;
          border: 2px solid #C9A227;
          box-shadow: 0 12px 28px rgba(201, 162, 39, 0.3);
          font-size: 1.0625rem;
          font-weight: 800;
          text-decoration: none;
          width: 100%;
          justify-content: center;
          box-sizing: border-box;
        }

        @media (min-width: 768px) {
          .pastor-btn {
            width: auto;
            justify-content: flex-start;
          }
        }

        @media (max-width: 767px) {
          .pastor-btn {
            padding: 1rem 1.5rem;
            font-size: 0.95rem;
          }
        }

        .pastor-btn:hover {
          background-color: white;
          color: #0B1F3A;
          box-shadow: 0 16px 36px rgba(201, 162, 39, 0.4);
          transform: translateY(-3px);
        }

        .pastor-btn svg {
          width: 20px;
          height: 20px;
          fill: currentColor;
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
