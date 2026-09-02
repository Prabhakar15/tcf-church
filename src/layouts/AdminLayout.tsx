import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <AdminHeader onLogout={handleLogout} />
      <div className="admin-layout-content">
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>

      <style>{`
        .admin-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f9fafb;
        }

        .admin-layout-content {
          display: flex;
          flex: 1;
        }

        .admin-sidebar {
          width: 280px;
          overflow-y: auto;
        }

        .admin-main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .admin-main {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
