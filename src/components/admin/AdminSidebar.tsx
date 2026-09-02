import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: '📊' },
    { label: 'Daily Words', path: '/admin/daily-words', icon: '📖' },
    { label: 'Events', path: '/admin/events', icon: '📅' },
    { label: 'Services', path: '/admin/services', icon: '🙏' },
    { label: 'Sermons', path: '/admin/sermons', icon: '🎙️' },
    { label: 'Prayer Requests', path: '/admin/prayer-requests', icon: '💌' },
  ];

  const handleClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <aside className="admin-sidebar">
      <nav className="admin-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={handleClick}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span className="admin-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <style>{`
        .admin-sidebar {
          background-color: #ffffff;
          border-right: 1px solid #e5e7eb;
          height: 100%;
          min-height: calc(100vh - 70px);
        }

        .admin-nav {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem;
          color: #374151;
          text-decoration: none;
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
          font-weight: 500;
        }

        .admin-nav-item:hover {
          background-color: #f9fafb;
          color: #0B1F3A;
          border-left-color: #C9A227;
        }

        .admin-nav-item.active {
          background-color: #f3f4f6;
          color: #0B1F3A;
          border-left-color: #C9A227;
          font-weight: 700;
        }

        .admin-nav-icon {
          font-size: 1.25rem;
          flex-shrink: 0;
        }

        .admin-nav-label {
          flex: 1;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            display: none;
            position: fixed;
            left: 0;
            top: 70px;
            right: 0;
            z-index: 1000;
            min-height: auto;
            max-height: calc(100vh - 70px);
            overflow-y: auto;
          }

          .admin-sidebar.open {
            display: block;
          }

          .admin-nav {
            background-color: white;
          }

          .admin-nav-item {
            padding: 0.75rem 1rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </aside>
  );
}
