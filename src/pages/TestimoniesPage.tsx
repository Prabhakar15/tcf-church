import { useEffect, useState } from 'react';
import type { Testimony, Branch } from '../types';
import { getPublishedTestimonies } from '../lib/queries/testimonies';
import { getPublishedBranches } from '../lib/queries/branches';

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [testimoniesData, branchesData] = await Promise.all([
        getPublishedTestimonies(),
        getPublishedBranches()
      ]);
      setTestimonies(testimoniesData);
      setBranches(branchesData);
    } catch (err) {
      setError('Unable to load testimonies. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPublicDisplayName = (testimony: Testimony): string => {
    if (testimony.displayPreference === 'ANONYMOUS') {
      return 'Anonymous';
    }

    if (testimony.displayPreference === 'FIRST_NAME_ONLY') {
      const trimmed = testimony.submittedName.trim();
      if (!trimmed) return 'Anonymous';
      return trimmed.split(/\s+/)[0];
    }

    // FULL_NAME
    return testimony.submittedName;
  };

  const getBranchName = (branchId?: string): string | null => {
    if (!branchId) return null;
    const branch = branches.find(b => b.id === branchId);
    return branch?.branchName || null;
  };

  const contentPreview = (content: string, maxLength: number = 200): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trimEnd() + '...';
  };

  return (
    <div className="testimonies-page">
      <section className="page-header">
        <div className="page-header-container">
          <p className="page-eyebrow">TCF SINGAPORE</p>
          <h1>Stories of God's Faithfulness</h1>
          <p className="page-subtitle">Read stories of faith, hope, and God's faithfulness from our TCF community.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {error && (
            <div className="error-state">
              <p>{error}</p>
              <button className="retry-btn" onClick={loadData}>Retry</button>
            </div>
          )}

          {loading && (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading testimonies...</p>
            </div>
          )}

          {!loading && !error && testimonies.length === 0 && (
            <div className="empty-state">
              <p className="empty-title">Stories are coming soon.</p>
              <p className="empty-subtitle">We're looking forward to sharing stories of God's faithfulness from our TCF community.</p>
            </div>
          )}

          {!loading && !error && testimonies.length > 0 && (
            <div className="testimonies-grid">
              {testimonies.map(testimony => {
                const publicName = getPublicDisplayName(testimony);
                const branchName = getBranchName(testimony.branchId);
                const preview = contentPreview(testimony.content);

                return (
                  <article key={testimony.id} className="testimony-card">
                    <div className="card-header">
                      <h3 className="card-title">{testimony.title}</h3>
                    </div>

                    <div className="card-meta">
                      <p className="author">— {publicName}</p>
                      {branchName && <p className="branch">📍 {branchName}</p>}
                    </div>

                    <div className="card-content">
                      <p className="content-preview">{preview}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .testimonies-page { width: 100%; }

        .page-header {
          background-color: #0B1F3A;
          color: white;
          padding: 4rem 1.5rem;
          text-align: center;
        }

        @media (max-width: 767px) {
          .page-header { padding: 2rem 1rem; }
        }

        .page-header-container { max-width: 800px; margin: 0 auto; }

        .page-eyebrow {
          font-size: 0.875rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #C9A227;
          margin: 0 0 1rem 0;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        @media (max-width: 767px) {
          .page-header h1 { font-size: 2rem; }
        }

        .page-subtitle {
          font-size: 1.125rem;
          color: #E5E7EB;
          margin: 0;
          line-height: 1.6;
        }

        .page-content {
          padding: 4rem 1.5rem;
          background-color: #ffffff;
        }

        @media (max-width: 767px) {
          .page-content { padding: 2rem 1rem; }
        }

        .page-container { max-width: 1280px; margin: 0 auto; }

        .loading-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #6B7280;
        }

        .spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #C9A227;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .error-state {
          text-align: center;
          padding: 2rem;
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          border-radius: 8px;
          margin-bottom: 2rem;
        }

        .error-state p { margin: 0 0 1rem 0; }

        .retry-btn {
          background-color: #dc2626;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        .retry-btn:hover { background-color: #b91c1c; }

        .empty-state {
          text-align: center;
          padding: 4rem 1rem;
          color: #6B7280;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0 0 0.5rem 0;
        }

        .empty-subtitle {
          font-size: 1rem;
          color: #6B7280;
          margin: 0;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .testimonies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .testimonies-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 768px) {
          .testimonies-grid { grid-template-columns: 1fr; }
        }

        .testimony-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .testimony-card:hover {
          border-color: #C9A227;
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15);
          transform: translateY(-2px);
        }

        .card-header { padding: 0; margin: 0; }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0;
          line-height: 1.4;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
        }

        .author {
          font-size: 0.95rem;
          font-weight: 600;
          color: #374151;
          margin: 0;
        }

        .branch {
          font-size: 0.875rem;
          color: #6B7280;
          margin: 0;
        }

        .card-content { flex: 1; }

        .content-preview {
          font-size: 0.95rem;
          color: #374151;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}
