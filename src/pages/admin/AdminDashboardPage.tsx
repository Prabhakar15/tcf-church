import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleViewWebsite = () => {
    window.open('/', '_blank');
  };

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard { 
          min-height: 100vh; 
          background: #f9fafb;
          padding: 2rem 1rem;
        }

        .dashboard-container { max-width: 1200px; margin: 0 auto; }

        .dashboard-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start; 
          margin-bottom: 2.5rem;
          gap: 1rem;
        }

        .dashboard-title-group h1 { 
          margin: 0; 
          font-size: 2rem; 
          font-weight: 800;
          color: #0B1F3A;
        }

        .dashboard-title-group p { 
          margin: 0.5rem 0 0 0; 
          font-size: 1rem; 
          color: #6B7280;
        }

        .dashboard-header-actions { 
          display: flex; 
          gap: 1rem; 
          align-items: center;
          flex-wrap: wrap;
        }

        .dashboard-btn { 
          padding: 0.75rem 1.5rem; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer; 
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
        }

        .view-website-btn { 
          background-color: transparent; 
          color: #0B1F3A; 
          border: 2px solid #C9A227;
        }

        .view-website-btn:hover { 
          background-color: #f9fafb;
          border-color: #E0B644;
        }

        .logout-btn { 
          background-color: #C9A227; 
          color: #0B1F3A; 
        }

        .logout-btn:hover { 
          background-color: #E0B644;
          transform: translateY(-2px);
        }

        .dashboard-btn:focus {
          outline: 2px solid #0B1F3A;
          outline-offset: 2px;
        }
        
        .section-header { 
          margin-bottom: 2rem;
        }

        .section-header h2 { 
          margin: 0; 
          font-size: 1.5rem; 
          font-weight: 700;
          color: #0B1F3A;
          border-bottom: 3px solid #C9A227;
          padding-bottom: 0.75rem;
        }
        
        .content-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .card { 
          background: white; 
          padding: 1.75rem; 
          border-radius: 12px; 
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }

        .card:hover { 
          transform: translateY(-4px);
          border-color: #C9A227;
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15);
        }

        .card:focus-within {
          outline: 2px solid #C9A227;
          outline-offset: 2px;
        }

        .card-icon { 
          width: 40px; 
          height: 40px; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          background: linear-gradient(135deg, #C9A227 0%, #E0B644 100%);
          border-radius: 8px;
          flex-shrink: 0;
        }

        .card-icon svg {
          width: 24px;
          height: 24px;
          stroke: #0B1F3A;
          stroke-width: 2;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .card-content { 
          flex: 1;
        }

        .card-title { 
          margin: 0; 
          font-size: 1.25rem; 
          font-weight: 700;
          color: #0B1F3A;
        }

        .card-description { 
          margin: 0.5rem 0 0 0; 
          font-size: 0.95rem; 
          color: #6B7280;
        }

        .card-action { 
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #C9A227;
          font-weight: 600;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        .card:hover .card-action {
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .admin-dashboard { padding: 1rem; }
          .dashboard-header { 
            flex-direction: column; 
            margin-bottom: 2rem;
          }
          .dashboard-title-group h1 { font-size: 1.75rem; }
          .dashboard-header-actions { width: 100%; }
          .content-grid { 
            grid-template-columns: 1fr; 
            gap: 1rem;
          }
          .card { padding: 1.5rem; }
        }

        @media (max-width: 480px) {
          .dashboard-title-group h1 { font-size: 1.5rem; }
          .section-header h2 { font-size: 1.25rem; }
          .dashboard-btn { width: 100%; }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="dashboard-title-group">
            <h1>Admin</h1>
            <p>Manage TCF website content and administration</p>
          </div>
          <div className="dashboard-header-actions">
            <button className="dashboard-btn view-website-btn" onClick={handleViewWebsite} type="button" title="Open website in new tab">
              View Website
            </button>
            <button className="dashboard-btn logout-btn" onClick={handleLogout} type="button">
              Logout
            </button>
          </div>
        </div>

        <section className="section-header">
          <h2>Content Management</h2>
        </section>

        <div className="content-grid">
          <button 
            className="card" 
            onClick={() => handleCardClick('/admin/daily-words')}
            type="button"
            aria-label="Go to Daily Words management"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Daily Words</h3>
              <p className="card-description">Manage devotional content and daily messages</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>

          <button 
            className="card" 
            onClick={() => handleCardClick('/admin/events')}
            type="button"
            aria-label="Go to Events management"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Events</h3>
              <p className="card-description">Create and manage church events</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>

          <button 
            className="card" 
            onClick={() => handleCardClick('/admin/services')}
            type="button"
            aria-label="Go to Services management"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Services</h3>
              <p className="card-description">Manage weekly services and fellowships</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>

          <button 
            className="card" 
            onClick={() => handleCardClick('/admin/sermons')}
            type="button"
            aria-label="Go to Sermons management"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Sermons</h3>
              <p className="card-description">Manage sermon videos and messages</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>

          <button 
            className="card" 
            onClick={() => handleCardClick('/admin/prayer-requests')}
            type="button"
            aria-label="Go to Prayer Requests"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Prayer Requests</h3>
              <p className="card-description">Review submitted prayer requests</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>

          <button 
            className="card" 
            onClick={() => handleCardClick('/admin/branches')}
            type="button"
            aria-label="Go to Branches management"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Branches</h3>
              <p className="card-description">Manage TCF branches and locations</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>
          <button 
            className="card" 
            onClick={() => handleCardClick("/admin/testimonies")}
            type="button"
            aria-label="Go to Testimonies management"
          >
            <div className="card-icon">
              <svg viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div className="card-content">
              <h3 className="card-title">Testimonies</h3>
              <p className="card-description">Review and manage testimony submissions</p>
            </div>
            <div className="card-action">Open <span>→</span></div>
          </button>
        </div>
      </div>
    </div>
  );
}
