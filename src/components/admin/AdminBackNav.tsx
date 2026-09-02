import { useNavigate } from 'react-router-dom';

interface AdminBackNavProps {
  pageTitle?: string;
}

export default function AdminBackNav({ pageTitle }: AdminBackNavProps) {
  const navigate = useNavigate();

  return (
    <div className="admin-back-nav">
      <button 
        className="back-button"
        onClick={() => navigate('/admin')}
        type="button"
        aria-label="Back to Admin dashboard"
      >
        <span className="back-arrow">←</span>
        Back to Admin
      </button>
      {pageTitle && <h1 className="page-title">{pageTitle}</h1>}

      <style>{`
        .admin-back-nav {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          color: #0B1F3A;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .back-button:hover {
          color: #C9A227;
        }

        .back-button:focus {
          outline: 2px solid #C9A227;
          outline-offset: 2px;
          border-radius: 4px;
          padding: 0.5rem;
        }

        .back-arrow {
          font-size: 1.1rem;
          transition: transform 0.3s ease;
        }

        .back-button:hover .back-arrow {
          transform: translateX(-3px);
        }

        .page-title {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: #0B1F3A;
        }

        @media (max-width: 768px) {
          .admin-back-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .page-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
