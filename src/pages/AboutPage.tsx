import { churchInfo, churchDescription } from '../data/church';

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>About TCF</h1>
          <p>Discover our vision, mission, and community</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          <div className="about-intro">
            <h2>Who We Are</h2>
            <p>
              {churchInfo.name} was established in {churchInfo.establishedYear} by Pastor Daniel Modi and his wife Lalitha Modi. 
              Built on a God-given vision of extending salvation and creating a church without boundaries, TCF has grown into a 
              vibrant community of believers united in faith.
            </p>
          </div>

          <div className="about-grid">
            <div className="about-card">
              <h3>Our Vision</h3>
              <p><strong>{churchInfo.vision}</strong></p>
              <p>{churchInfo.community}</p>
            </div>

            <div className="about-card">
              <h3>Our Mission</h3>
              <p>{churchDescription.mission}</p>
            </div>

            <div className="about-card">
              <h3>Our Purpose</h3>
              <p>{churchDescription.purpose}</p>
            </div>

            <div className="about-card">
              <h3>Our Community</h3>
              <p>
                We serve expat communities and are focused on discipleship. Everyone is welcome here—we are committed to 
                creating an environment where faith is lived, relationships matter, and everyone belongs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        @media (max-width: 767px) { .page-header { padding: 2rem 1rem; } }
        .page-header-container { max-width: 1280px; margin: 0 auto; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0.5rem 0 0 0; }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 900px; margin: 0 auto; }
        .about-intro { margin-bottom: 3rem; }
        .about-intro h2 { font-size: 2rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1.5rem 0; }
        .about-intro p { font-size: 1rem; color: #6B7280; line-height: 1.8; margin: 0; }
        .about-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
        .about-card { padding: 2rem; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb; }
        .about-card h3 { font-size: 1.25rem; font-weight: 700; color: #0B1F3A; margin: 0 0 1rem 0; }
        .about-card p { font-size: 0.95rem; color: #6B7280; line-height: 1.7; margin: 0; }
      `}</style>
    </div>
  );
}
