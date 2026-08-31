import { churchInfo, churchDescription } from '../data/church';

export default function PastorPage() {
  return (
    <div className="pastor-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>{churchInfo.pastorName}</h1>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          <div className="pastor-grid">
            <div className="pastor-image">
              <img src="/pastor.jpg" alt={churchInfo.pastorName} />
            </div>

            <div className="pastor-info">
              <p className="pastor-role">Founder & Pastor</p>
              <h2>Pastor Daniel Modi</h2>
              <p>{churchDescription.pastorRole}</p>
              <p>
                Pastor Daniel's heart for ministry extends beyond the pulpit. He serves as a spiritual father and mentor 
                to many in our community, particularly those far from family. Under his leadership, TCF has grown into a 
                welcoming fellowship centered on discipleship and God's transformative love.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .pastor-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        .page-header-container { max-width: 1280px; margin: 0 auto; }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        .page-container { max-width: 1000px; margin: 0 auto; }
        .pastor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center; }
        @media (max-width: 768px) { .pastor-grid { grid-template-columns: 1fr; gap: 2rem; } }
        .pastor-image { width: 100%; max-width: 400px; margin: 0 auto; }
        .pastor-image img { width: 100%; height: auto; border-radius: 12px; }
        .pastor-role { font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #C9A227; margin: 0; }
        .pastor-info h2 { font-size: 2rem; font-weight: 700; color: #0B1F3A; margin: 0.5rem 0 1.5rem 0; }
        .pastor-info p { font-size: 1rem; color: #6B7280; line-height: 1.8; margin: 0 0 1.5rem 0; }
      `}</style>
    </div>
  );
}
