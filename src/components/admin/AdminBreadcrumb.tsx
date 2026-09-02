import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface AdminBreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function AdminBreadcrumb({ items }: AdminBreadcrumbProps) {
  return (
    <nav className="admin-breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {item.path ? (
              <>
                <Link to={item.path} className="breadcrumb-link">
                  {item.label}
                </Link>
                {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
              </>
            ) : (
              <>
                <span className="breadcrumb-current">{item.label}</span>
              </>
            )}
          </li>
        ))}
      </ol>

      <style>{`
        .admin-breadcrumb {
          padding: 0.75rem 0;
          margin-bottom: 1.5rem;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          gap: 0;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0;
        }

        .breadcrumb-link {
          color: #0B1F3A;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .breadcrumb-link:hover {
          color: #C9A227;
          background-color: #f9fafb;
        }

        .breadcrumb-current {
          color: #6B7280;
          font-weight: 600;
          padding: 0.25rem 0.5rem;
        }

        .breadcrumb-separator {
          color: #d1d5db;
          margin: 0 0.5rem;
        }
      `}</style>
    </nav>
  );
}
