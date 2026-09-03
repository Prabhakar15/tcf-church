import { useEffect, useState } from 'react';
import type { Branch } from '../../types';
import { getAllBranches, createBranch, updateBranch, deleteBranch } from '../../lib/queries/branches';
import { REGIONS } from '../../lib/constants/services';
import AdminBackNav from '../../components/admin/AdminBackNav';
import { usePagination } from '../../hooks/usePagination';
import PaginationControls from '../../components/admin/PaginationControls';

const BRANCHES_PER_PAGE = 5;

type BranchFormStatus = 'draft' | 'published';

const REGION_OPTIONS = Object.entries(REGIONS).map(([key, value]) => ({
  label: key === 'SINGAPORE' ? 'Singapore' : 'India',
  value
}));

export default function BranchesAdminPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Branch | null>(null);
  const [formData, setFormData] = useState<{
    region: typeof REGIONS[keyof typeof REGIONS];
    branchName: string;
    location: string;
    address: string;
    mapUrl: string;
    displayOrder: number;
    status: BranchFormStatus;
  }>({
    region: 'SINGAPORE',
    branchName: '',
    location: '',
    address: '',
    mapUrl: '',
    displayOrder: 0,
    status: 'published'
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllBranches();
      setBranches(data);
    } catch (err) {
      setError('Failed to load branches. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    setFormError('');
    
    if (!formData.branchName.trim()) {
      setFormError('Branch name is required');
      return false;
    }
    if (!formData.region) {
      setFormError('Region is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    setSuccess('');
    setFormError('');

    try {
      const payload: Omit<Branch, 'id' | 'createdAt' | 'updatedAt'> = {
        region: formData.region,
        branchName: formData.branchName,
        location: formData.location?.trim() || undefined,
        address: formData.address?.trim() || undefined,
        mapUrl: formData.mapUrl?.trim() || undefined,
        displayOrder: formData.displayOrder,
        status: formData.status
      };

      if (editing) {
        await updateBranch(editing.id, payload);
        setSuccess('Branch updated successfully!');
      } else {
        await createBranch(payload);
        setSuccess('Branch created successfully!');
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        region: 'SINGAPORE',
        branchName: '',
        location: '',
        address: '',
        mapUrl: '',
        displayOrder: 0,
        status: 'published'
      });

      resetPage();
      await loadBranches();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setFormError('Failed to save branch. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditing(branch);
    setFormData({
      region: branch.region,
      branchName: branch.branchName,
      location: branch.location || '',
      address: branch.address || '',
      mapUrl: branch.mapUrl || '',
      displayOrder: branch.displayOrder,
      status: branch.status as BranchFormStatus
    });
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this branch?')) return;

    try {
      await deleteBranch(id);
      setSuccess('Branch deleted successfully!');
      resetPage();
      await loadBranches();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete branch. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      region: 'SINGAPORE',
      branchName: '',
      location: '',
      address: '',
      mapUrl: '',
      displayOrder: 0,
      status: 'published'
    });
    setFormError('');
  };

  const {
    currentPage,
    pageCount,
    paginatedItems: paginatedBranches,
    showPagination,
    prevPage,
    nextPage,
    resetPage,
  } = usePagination(branches, BRANCHES_PER_PAGE);

  return (
    <div className="admin-page">
      <AdminBackNav pageTitle="Branches" />
      <div className="page-header">
        <div>
          <h1>Branches</h1>
          <p className="page-description">Manage TCF branches and locations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Branch
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-container">
          <h2>{editing ? 'Edit Branch' : 'Add New Branch'}</h2>
          <form onSubmit={handleSubmit}>
            {formError && <div className="alert alert-error">{formError}</div>}
            
            <div className="form-grid">
              <div className="form-group">
                <label>Region * <span className="required-indicator">required</span></label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value as any as typeof REGIONS[keyof typeof REGIONS] })}
                >
                  {REGION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Branch Name * <span className="required-indicator">required</span></label>
                <input
                  type="text"
                  value={formData.branchName}
                  onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
                  placeholder="e.g., Bartley, PPH, Hyderabad"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Bartley Christian Church"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., 123 Main Street, Singapore"
              />
            </div>

            <div className="form-group">
              <label>Map URL</label>
              <input
                type="url"
                value={formData.mapUrl}
                onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>Status * <span className="required-indicator">required</span></label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as BranchFormStatus })}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : editing ? 'Update Branch' : 'Create Branch'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={submitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>Loading branches...</div>
      ) : branches.length > 0 ? (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Branch Name</th>
                  <th>Region</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBranches.map((branch) => (
                <tr key={branch.id}>
                  <td><strong>{branch.branchName}</strong></td>
                  <td>{branch.region === 'SINGAPORE' ? 'Singapore' : 'India'}</td>
                  <td>{branch.location || '—'}</td>
                  <td>
                    <span className={`status-badge status-${branch.status}`}>
                      {branch.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(branch)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(branch.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <PaginationControls
            currentPage={currentPage}
            pageCount={pageCount}
            onPreviousClick={prevPage}
            onNextClick={nextPage}
            show={showPagination}
          />
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
          No branches yet. Create one to get started.
        </div>
      )}

      <style>{`
        .admin-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
        
        .page-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          margin-bottom: 2rem; 
          gap: 2rem;
        }
        .page-header h1 { margin: 0; font-size: 2rem; color: #0B1F3A; }
        .page-description { margin: 0.5rem 0 0 0; color: #6B7280; font-size: 0.95rem; }
        
        .btn { padding: 0.75rem 1.5rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
        .btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
        .btn-primary { background-color: #C9A227; color: white; }
        .btn-primary:hover { background-color: #B8921F; transform: translateY(-2px); }
        .btn-secondary { background-color: #e5e7eb; color: #0B1F3A; }
        .btn-secondary:hover { background-color: #d1d5db; }
        .btn-danger { background-color: #dc2626; color: white; }
        .btn-danger:hover { background-color: #b91c1c; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .alert { padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .alert-error { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; }
        .alert-success { background-color: #dcfce7; border: 1px solid #bbf7d0; color: #15803d; }
        
        .table-container { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #0B1F3A; border-bottom: 2px solid #e5e7eb; }
        td { padding: 1rem; border-bottom: 1px solid #e5e7eb; }
        tr:hover { background-color: #f9fafb; }
        .actions { display: flex; gap: 0.5rem; }
        
        .status-badge { padding: 0.25rem 0.75rem; border-radius: 4px; font-weight: 600; font-size: 0.875rem; }
        .status-published { background-color: #dcfce7; color: #15803d; }
        .status-draft { background-color: #fef3c7; color: #92400e; }
        
        .form-container { background: white; border-radius: 8px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .form-container h2 { margin-top: 0; color: #0B1F3A; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #0B1F3A; }
        .required-indicator { font-size: 0.8rem; color: #dc2626; }
        .form-group input, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
        
        .form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .form-actions button { flex: 1; }
      `}</style>
    </div>
  );
}
