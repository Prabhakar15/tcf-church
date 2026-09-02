interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <div className="admin-header-content">
        <div className="admin-branding">
          <h1>TCF Admin</h1>
        </div>
        <div className="admin-actions">
          <a href="/" className="admin-btn admin-btn-secondary" title="View Website">
            👁️ View Website
          </a>
          <button onClick={onLogout} className="admin-btn admin-btn-danger">
            Logout
          </button>
        </div>
      </div>

      <style>{`
        .admin-header {
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a52 100%);
          border-bottom: 3px solid #C9A227;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .admin-header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .admin-branding h1 {
          color: #C9A227;
          margin: 0;
          font-size: 1.5rem;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .admin-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .admin-btn {
          padding: 0.65rem 1.25rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .admin-btn-secondary {
          background-color: #f3f4f6;
          color: #0B1F3A;
        }

        .admin-btn-secondary:hover {
          background-color: #e5e7eb;
          transform: translateY(-2px);
        }

        .admin-btn-danger {
          background-color: #dc2626;
          color: white;
        }

        .admin-btn-danger:hover {
          background-color: #b91c1c;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .admin-header-content {
            padding: 0.75rem 1rem;
          }

          .admin-branding h1 {
            font-size: 1.25rem;
          }

          .admin-btn {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </header>
  );
}
