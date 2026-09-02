import { useEffect, useState } from 'react';
import type { Branch } from '../types';
import { getPublishedBranchesByRegion } from '../lib/queries/branches';
import { REGION_LABELS } from '../lib/constants/services';

type Region = 'SINGAPORE' | 'INDIA';

export default function BranchesPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeRegion, setActiveRegion] = useState<Region>('SINGAPORE');
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    loadBranches('SINGAPORE');
  }, []);

  const loadBranches = async (region: Region) => {
    setLoading(true);
    setError('');
    try {
      const data = await getPublishedBranchesByRegion(region);
      setBranches(data);
    } catch (err) {
      setError('Unable to load branches at this time.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegionChange = (region: Region) => {
    setActiveRegion(region);
    loadBranches(region);
  };

  const regions: { id: Region; label: string }[] = [
    { id: 'SINGAPORE', label: 'Singapore' },
    { id: 'INDIA', label: 'India' },
  ];

  const renderBranchCard = (branch: Branch) => (
    <div key={branch.id} className="branch-card">
      <div className="branch-header">
        <h3 className="branch-name">{branch.branchName}</h3>
        <span className="branch-region">{REGION_LABELS[branch.region]}</span>
      </div>

      {branch.location && (
        <div className="branch-info">
          <span className="info-label">Location:</span>
          <p className="info-value">{branch.location}</p>
        </div>
      )}

      {branch.address && (
        <div className="branch-info">
          <span className="info-label">Address:</span>
          <p className="info-value">{branch.address}</p>
        </div>
      )}

      {!branch.location && !branch.address && (
        <div className="branch-info">
          <p className="info-placeholder">More information coming soon</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="branches-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>TCF Branches</h1>
          <p>One fellowship, growing across communities.</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {loading ? (
            <div className="loading">
              <div className="loading-spinner" />
              <p>Loading branches...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>{error}</p>
              <button 
                className="retry-button"
                onClick={() => handleRegionChange(activeRegion)}
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Region Tabs */}
              <div className="region-tabs">
                {regions.map(region => (
                  <button
                    key={region.id}
                    className={`tab-button ${activeRegion === region.id ? 'active' : ''}`}
                    onClick={() => handleRegionChange(region.id)}
                    aria-selected={activeRegion === region.id}
                    role="tab"
                  >
                    {region.label}
                  </button>
                ))}
              </div>

              {/* Branches Grid */}
              {branches.length > 0 ? (
                <div className="branches-grid">
                  {branches.map(renderBranchCard)}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No branches available for {REGION_LABELS[activeRegion]} at this time.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style>{`
        .branches-page { width: 100%; }
        
        .page-header { 
          background-color: #0B1F3A; 
          color: white; 
          padding: 5rem 1.5rem; 
        }
        @media (max-width: 767px) { .page-header { padding: 3rem 1rem; } }
        
        .page-header-container { 
          max-width: 1280px; 
          margin: 0 auto;
          text-align: center;
        }
        
        .page-header h1 { 
          font-size: 3rem; 
          font-weight: 800; 
          margin: 0; 
          letter-spacing: -0.02em;
        }
        @media (max-width: 767px) { 
          .page-header h1 { 
            font-size: 2rem;
          } 
        }
        
        .page-header p { 
          font-size: 1.125rem; 
          color: #E5E7EB; 
          margin: 0.75rem 0 0 0;
          line-height: 1.6;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 1000px; margin: 0 auto; }
        
        .loading { 
          text-align: center; 
          padding: 4rem 2rem; 
          color: #6B7280;
        }
        
        .loading-spinner {
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
          background-color: #fee2e2; 
          border: 1px solid #fecaca; 
          color: #dc2626; 
          padding: 2rem; 
          border-radius: 12px; 
          text-align: center;
        }
        .error-state p { margin: 0 0 1rem 0; }
        
        .retry-button {
          padding: 0.75rem 1.5rem;
          background-color: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .retry-button:hover {
          background-color: #b91c1c;
          transform: translateY(-2px);
        }
        
        /* Region Tabs */
        .region-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          justify-content: center;
        }
        @media (max-width: 767px) {
          .region-tabs {
            gap: 0.5rem;
          }
        }
        
        .tab-button {
          background: white;
          border: 2px solid #e5e7eb;
          color: #6B7280;
          font-size: 1rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .tab-button:hover {
          border-color: #C9A227;
          color: #0B1F3A;
        }
        
        .tab-button.active {
          background-color: #C9A227;
          border-color: #C9A227;
          color: #0B1F3A;
        }
        
        /* Branches Grid */
        .branches-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          animation: fadeIn 0.3s ease;
        }
        @media (max-width: 767px) {
          .branches-grid {
            grid-template-columns: 1fr;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Branch Card */
        .branch-card {
          padding: 1.5rem;
          border: 1px solid #e5e7eb;
          border-left: 4px solid #C9A227;
          border-radius: 12px;
          background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(11, 31, 58, 0.08);
        }
        
        .branch-card:hover {
          border-color: #C9A227;
          border-left: 4px solid #C9A227;
          box-shadow: 0 8px 20px rgba(201, 162, 39, 0.15);
          transform: translateY(-2px);
        }
        
        .branch-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
          gap: 1rem;
        }
        
        .branch-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0B1F3A;
          margin: 0;
        }
        
        .branch-region {
          display: inline-block;
          background-color: #E0B644;
          color: #0B1F3A;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          white-space: nowrap;
        }
        
        .branch-info {
          margin-bottom: 1rem;
        }
        
        .branch-info:last-child {
          margin-bottom: 0;
        }
        
        .info-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 700;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }
        
        .info-value {
          font-size: 1rem;
          color: #0B1F3A;
          margin: 0;
          line-height: 1.5;
        }
        
        .info-placeholder {
          font-size: 0.95rem;
          color: #9CA3AF;
          font-style: italic;
          margin: 0;
        }
        
        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          background-color: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }
        
        .empty-state p {
          font-size: 1rem;
          color: #6B7280;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
