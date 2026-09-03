import { useEffect, useState } from 'react';
import type { Testimony } from '../../types';
import {
  getAllTestimonies,
  getTestimoniesByStatus,
  getTestimonyById,
  createTestimony,
  updateTestimony,
  deleteTestimony,
  publishTestimony,
  rejectTestimony
} from '../../lib/queries/testimonies';
import { getPublishedBranches } from '../../lib/queries/branches';
import type { Branch } from '../../types';
import AdminBackNav from '../../components/admin/AdminBackNav';
import { usePagination } from '../../hooks/usePagination';
import PaginationControls from '../../components/admin/PaginationControls';

const TESTIMONIES_PER_PAGE = 5;

export default function TestimoniesAdminPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'rejected'>('all');
  const [success, setSuccess] = useState('');
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Testimony>>({
    title: '',
    content: '',
    submittedName: '',
    displayPreference: 'FIRST_NAME_ONLY',
    status: 'draft',
    displayOrder: 0,
    branchId: undefined,
    publishedAt: undefined
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [testimoniesData, branchesData] = await Promise.all([
        getAllTestimonies(),
        getPublishedBranches()
      ]);
      setTestimonies(testimoniesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      setBranches(branchesData);
    } catch (err) {
      setError('Failed to load testimonies. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilter: typeof filter) => {
    setFilter(newFilter);
    setLoading(true);
    setError('');
    try {
      const data = newFilter === 'all' ? await getAllTestimonies() : await getTestimoniesByStatus(newFilter);
      setTestimonies(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      setError(`Failed to filter testimonies. Please try again.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (testimony: Testimony) => {
    const fetched = await getTestimonyById(testimony.id);
    if (fetched) {
      setSelectedTestimony(fetched);
      setFormData(fetched);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleCreate = () => {
    setSelectedTestimony(null);
    setFormData({
      title: '',
      content: '',
      submittedName: '',
      displayPreference: 'FIRST_NAME_ONLY',
      status: 'draft',
      displayOrder: 0,
      branchId: undefined
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title?.trim()) throw new Error('Title is required');
      if (!formData.content?.trim()) throw new Error('Content is required');
      if (!formData.submittedName?.trim()) throw new Error('Name is required');

      if (selectedTestimony && isEditing) {
        // Update existing
        const updates: Partial<Testimony> = {
          title: formData.title,
          content: formData.content,
          submittedName: formData.submittedName,
          displayPreference: formData.displayPreference,
          branchId: formData.branchId,
          status: formData.status,
          displayOrder: formData.displayOrder,
          publishedAt: formData.publishedAt
        };

        // Auto-set publishedAt when transitioning to published
        if (formData.status === 'published' && !selectedTestimony.publishedAt && !formData.publishedAt) {
          updates.publishedAt = new Date().toISOString();
        }

        await updateTestimony(selectedTestimony.id, updates);
      } else {
        // Create new
        const newTestimony: Omit<Testimony, 'id' | 'createdAt' | 'updatedAt'> = {
          title: formData.title as string,
          content: formData.content as string,
          submittedName: formData.submittedName as string,
          displayPreference: formData.displayPreference as 'FULL_NAME' | 'FIRST_NAME_ONLY' | 'ANONYMOUS',
          branchId: formData.branchId,
          status: formData.status as 'draft' | 'published' | 'rejected',
          displayOrder: formData.displayOrder || 0,
          publishedAt: formData.publishedAt
        };
        await createTestimony(newTestimony);
      }

      setSuccess(selectedTestimony ? 'Testimony updated successfully!' : 'Testimony created successfully!');
      await loadData();
      setShowModal(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Failed to save testimony. Please try again.'));
      console.error(err);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await publishTestimony(id);
      setSuccess('Testimony published successfully!');
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to publish testimony. Please try again.');
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectTestimony(id);
      setSuccess('Testimony rejected successfully!');
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to reject testimony. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this testimony?')) return;

    try {
      await deleteTestimony(id);
      setSuccess('Testimony deleted successfully!');
      await loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete testimony. Please try again.');
      console.error(err);
    }
  };

  const filteredTestimonies = testimonies;

  const {
    currentPage,
    pageCount,
    paginatedItems: paginatedTestimonies,
    showPagination,
    prevPage,
    nextPage,
  } = usePagination(filteredTestimonies, TESTIMONIES_PER_PAGE);

  const statusColors: Record<'draft' | 'published' | 'rejected', { bg: string; text: string }> = {
    draft: { bg: '#dbeafe', text: '#1e40af' },
    published: { bg: '#dcfce7', text: '#15803d' },
    rejected: { bg: '#fee2e2', text: '#dc2626' }
  };

  const displayPreferenceLabels = {
    FULL_NAME: 'Full Name',
    FIRST_NAME_ONLY: 'First Name Only',
    ANONYMOUS: 'Anonymous'
  };

  return (
    <div className="admin-page">
      <AdminBackNav pageTitle="Testimonies" />
      <style>{`
        .admin-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; gap: 1rem; }
        .page-header h1 { margin: 0; font-size: 2rem; color: #0B1F3A; }
        .page-header-actions { display: flex; gap: 0.5rem; }
        .filters { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .filter-btn { padding: 0.5rem 1rem; border: 2px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; font-size: 0.875rem; }
        .filter-btn.active { border-color: #C9A227; background-color: #C9A227; color: white; }
        .filter-btn:hover { border-color: #C9A227; }
        .btn { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; font-size: 0.875rem; transition: all 0.3s ease; }
        .btn-primary { background-color: #C9A227; color: white; }
        .btn-primary:hover { background-color: #B8921F; }
        .btn-secondary { background-color: #e5e7eb; color: #0B1F3A; }
        .btn-secondary:hover { background-color: #d1d5db; }
        .btn-danger { background-color: #dc2626; color: white; }
        .btn-danger:hover { background-color: #b91c1c; }
        .btn-sm { padding: 0.375rem 0.75rem; font-size: 0.8rem; }
        .alert { padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .alert-error { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; }
        .alert-success { background-color: #dcfce7; border: 1px solid #bbf7d0; color: #15803d; }
        .loading { text-align: center; padding: 2rem; color: #6B7280; }
        .spinner { display: inline-block; width: 32px; height: 32px; border: 4px solid #e5e7eb; border-top-color: #C9A227; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .empty-state { text-align: center; padding: 3rem; color: #6B7280; }
        .empty-state p { margin: 0; font-size: 1.1rem; }
        .cards-container { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.5rem; }
        .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-header { display: flex; justify-content: space-between; align-items: start; gap: 1rem; margin-bottom: 1rem; }
        .card-title { margin: 0; font-size: 1.125rem; font-weight: 700; color: #0B1F3A; }
        .status-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
        .card-meta { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; color: #6B7280; margin-bottom: 1rem; }
        .card-content { margin-bottom: 1rem; }
        .content-preview { color: #374151; line-height: 1.5; max-height: 100px; overflow: hidden; word-break: break-word; }
        .card-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; }
        .modal-overlay.show { display: flex; align-items: center; justify-content: center; }
        .modal { background: white; border-radius: 8px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
        .modal-header { padding: 1.5rem; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
        .modal-title { margin: 0; font-size: 1.25rem; font-weight: 700; color: #0B1F3A; }
        .modal-close { background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #6B7280; }
        .modal-body { padding: 1.5rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #0B1F3A; font-size: 0.95rem; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; font-size: 0.95rem; }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: #C9A227; ring: 2px solid rgba(201,162,39,0.1); }
        .form-group textarea { resize: vertical; min-height: 120px; }
        .form-group-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .modal-footer { padding: 1.5rem; border-top: 1px solid #e5e7eb; display: flex; gap: 0.75rem; justify-content: flex-end; }
        .modal-footer .btn { margin: 0; }
        @media (max-width: 768px) {
          .page-header { flex-direction: column; align-items: flex-start; }
          .page-header-actions { width: 100%; }
          .page-header-actions .btn { flex: 1; }
          .form-group-row { grid-template-columns: 1fr; }
          .cards-container { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="page-header">
        <div>
          <h1>Testimonies</h1>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#6B7280' }}>Review and manage testimony submissions</p>
        </div>
        <div className="page-header-actions">
          <button className="btn btn-primary" onClick={handleCreate}>
            + Create Testimony
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <p style={{ margin: 0 }}>{success}</p>
        </div>
      )}

      <div className="filters">
        {(['all', 'draft', 'published', 'rejected'] as const).map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => handleFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading testimonies...</p>
        </div>
      ) : filteredTestimonies.length === 0 ? (
        <div className="empty-state">
          <p>
            {filter === 'all' && 'No testimonies yet.'}
            {filter === 'draft' && 'No draft testimonies.'}
            {filter === 'published' && 'No published testimonies.'}
            {filter === 'rejected' && 'No rejected testimonies.'}
          </p>
        </div>
      ) : (
        <>
          <div className="cards-container">
            {paginatedTestimonies.map(testimony => (
            <div key={testimony.id} className="card">
              <div className="card-header">
                <h3 className="card-title">{testimony.title}</h3>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: statusColors[testimony.status].bg,
                    color: statusColors[testimony.status].text
                  }}
                >
                  {testimony.status.charAt(0).toUpperCase() + testimony.status.slice(1)}
                </span>
              </div>

              <div className="card-meta">
                <div><strong>Submitted:</strong> {testimony.submittedName}</div>
                <div><strong>Display:</strong> {displayPreferenceLabels[testimony.displayPreference]}</div>
                <div><strong>Created:</strong> {new Date(testimony.createdAt).toLocaleDateString()}</div>
                {testimony.publishedAt && (
                  <div><strong>Published:</strong> {new Date(testimony.publishedAt).toLocaleDateString()}</div>
                )}
                {testimony.branchId && (
                  <div><strong>Branch:</strong> {branches.find(b => b.id === testimony.branchId)?.branchName || 'Unknown'}</div>
                )}
              </div>

              <div className="card-content">
                <div className="content-preview">{testimony.content}</div>
              </div>

              <div className="card-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(testimony)}>
                  Edit
                </button>
                {testimony.status === 'draft' && (
                  <>
                    <button className="btn btn-primary btn-sm" onClick={() => handlePublish(testimony.id)}>
                      Publish
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleReject(testimony.id)}>
                      Reject
                    </button>
                  </>
                )}
                {testimony.status === 'published' && (
                  <button className="btn btn-danger btn-sm" onClick={() => handleReject(testimony.id)}>
                    Reject
                  </button>
                )}
                {testimony.status === 'rejected' && (
                  <button className="btn btn-primary btn-sm" onClick={() => handlePublish(testimony.id)}>
                    Restore
                  </button>
                )}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(testimony.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          </div>
          <PaginationControls
            currentPage={currentPage}
            pageCount={pageCount}
            onPreviousClick={prevPage}
            onNextClick={nextPage}
            show={showPagination}
          />
        </>
      )}

      {/* Modal */}
      <div className={`modal-overlay ${showModal ? 'show' : ''}`} onClick={() => setShowModal(false)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">
              {selectedTestimony ? 'Edit Testimony' : 'Create Testimony'}
            </h2>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                placeholder="Testimony title"
              />
            </div>

            <div className="form-group">
              <label>Testimony *</label>
              <textarea
                value={formData.content || ''}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                placeholder="Full testimony..."
              />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Submitted Name *</label>
                <input
                  type="text"
                  value={formData.submittedName || ''}
                  onChange={e => setFormData({ ...formData, submittedName: e.target.value })}
                  placeholder="Full name of person submitting"
                />
              </div>
              <div className="form-group">
                <label>Display Preference *</label>
                <select
                  value={formData.displayPreference || 'FIRST_NAME_ONLY'}
                  onChange={e => setFormData({ ...formData, displayPreference: e.target.value as 'FULL_NAME' | 'FIRST_NAME_ONLY' | 'ANONYMOUS' })}
                >
                  <option value="FULL_NAME">Full Name</option>
                  <option value="FIRST_NAME_ONLY">First Name Only</option>
                  <option value="ANONYMOUS">Anonymous</option>
                </select>
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.status || 'draft'}
                  onChange={e => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'rejected' })}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label>Branch (Optional)</label>
                <select
                  value={formData.branchId || ''}
                  onChange={e => setFormData({ ...formData, branchId: e.target.value || undefined })}
                >
                  <option value="">No Branch</option>
                  <optgroup label="Singapore">
                    {branches.filter(b => b.region === 'SINGAPORE').map(b => (
                      <option key={b.id} value={b.id}>{b.branchName}</option>
                    ))}
                  </optgroup>
                  <optgroup label="India">
                    {branches.filter(b => b.region === 'INDIA').map(b => (
                      <option key={b.id} value={b.id}>{b.branchName}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Display Order</label>
              <input
                type="number"
                value={formData.displayOrder || 0}
                onChange={e => setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
