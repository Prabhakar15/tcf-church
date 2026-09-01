import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <style>{`
        .admin-dashboard { 
          min-height: 100vh; 
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3354 100%);
          padding: 2rem;
        }
        .dashboard-container { max-width: 1200px; margin: 0 auto; }
        .dashboard-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 3rem;
          color: white;
        }
        .dashboard-header h1 { margin: 0; font-size: 2.5rem; }
        .logout-btn { 
          padding: 0.75rem 1.5rem; 
          background-color: #C9A227; 
          color: white; 
          border: none; 
          border-radius: 8px; 
          cursor: pointer; 
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .logout-btn:hover { background-color: #B8921F; transform: translateY(-2px); }
        
        .stats-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
          gap: 1.5rem; 
          margin-bottom: 3rem;
        }
        .stat-card { 
          background: white; 
          padding: 2rem; 
          border-radius: 8px; 
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          border-left: 4px solid #C9A227;
        }
        .stat-card h3 { margin: 0 0 1rem 0; color: #0B1F3A; font-size: 0.875rem; text-transform: uppercase; }
        .stat-card .number { font-size: 2.5rem; font-weight: bold; color: #C9A227; }
        
        .nav-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
          gap: 1.5rem;
        }
        .nav-card { 
          background: white; 
          padding: 1.5rem; 
          border-radius: 8px; 
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .nav-card:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 8px 12px rgba(0,0,0,0.15);
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
        }
        .nav-card h3 { margin: 0; color: #0B1F3A; font-size: 1.25rem; }
        .nav-card p { margin: 0.5rem 0 0 0; color: #6B7280; font-size: 0.875rem; }
        
        @media (max-width: 768px) {
          .admin-dashboard { padding: 1rem; }
          .dashboard-header { flex-direction: column; gap: 1rem; text-align: center; }
          .dashboard-header h1 { font-size: 1.75rem; }
          .stats-grid { grid-template-columns: 1fr; gap: 1rem; }
          .nav-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Daily Words</h3>
            <div className="number">—</div>
          </div>
          <div className="stat-card">
            <h3>Events</h3>
            <div className="number">—</div>
          </div>
          <div className="stat-card">
            <h3>Services</h3>
            <div className="number">—</div>
          </div>
          <div className="stat-card">
            <h3>Sermons</h3>
            <div className="number">—</div>
          </div>
          <div className="stat-card">
            <h3>Prayer Requests</h3>
            <div className="number">—</div>
          </div>
        </div>

        <h2 style={{ color: 'white', marginTop: '3rem', marginBottom: '1rem' }}>Management</h2>

        <div className="nav-grid">
          <div className="nav-card" onClick={() => navigate('/admin/daily-words')}>
            <h3>Daily Words</h3>
            <p>Create and manage daily words</p>
          </div>
          <div className="nav-card" onClick={() => navigate('/admin/events')}>
            <h3>Events</h3>
            <p>Create and manage events</p>
          </div>
          <div className="nav-card" onClick={() => navigate('/admin/services')}>
            <h3>Services</h3>
            <p>Create and manage recurring services</p>
          </div>
          <div className="nav-card" onClick={() => navigate('/admin/sermons')}>
            <h3>Sermons</h3>
            <p>Create and manage sermons</p>
          </div>
          <div className="nav-card" onClick={() => navigate('/admin/prayer-requests')}>
            <h3>Prayer Requests</h3>
            <p>View and manage prayer requests</p>
          </div>
        </div>
      </div>
    </div>
  );
}
