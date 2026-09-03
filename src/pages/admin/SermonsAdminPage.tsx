import { useEffect, useState } from 'react';
import type { Sermon } from '../../types';
import { getAllSermons, createSermon, updateSermon, deleteSermon } from '../../lib/queries/sermons';
import { extractYouTubeVideoId } from '../../lib/youtubeUtils';
import YouTubeEmbed from '../../components/youtube/YouTubeEmbed';
import AdminBackNav from '../../components/admin/AdminBackNav';
import { usePagination } from '../../hooks/usePagination';
import PaginationControls from '../../components/admin/PaginationControls';

const SERMONS_PER_PAGE = 5;

type FormStatus = 'draft' | 'published';

export default function SermonsAdminPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    sermonDate: new Date().toISOString().split('T')[0],
    youtubeUrl: '',
    status: 'draft' as FormStatus
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSermons();
  }, []);

  const loadSermons = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllSermons();
      setSermons(data);
    } catch (err) {
      setError('Failed to load sermons. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    setFormError('');
    
    if (!formData.title.trim()) {
      setFormError('Title is required');
      return false;
    }
    if (!formData.sermonDate) {
      setFormError('Sermon date is required');
      return false;
    }
    if (!formData.youtubeUrl.trim()) {
      setFormError('YouTube URL is required');
      return false;
    }

    const videoId = extractYouTubeVideoId(formData.youtubeUrl);
    if (!videoId) {
      setFormError('Invalid YouTube URL. Use: youtube.com/watch?v=ID or youtu.be/ID');
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
      const youtubeVideoId = extractYouTubeVideoId(formData.youtubeUrl);

      const payload: Omit<Sermon, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        description: formData.description || undefined,
        speaker: formData.speaker || undefined,
        sermonDate: formData.sermonDate,
        youtubeVideoId: youtubeVideoId || '',
        youtubeType: 'video',
        status: formData.status as 'draft' | 'published'
      };

      if (editing) {
        await updateSermon(editing.id, payload);
        setSuccess('Sermon updated successfully!');
      } else {
        await createSermon(payload);
        setSuccess('Sermon created successfully!');
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        description: '',
        speaker: '',
        sermonDate: new Date().toISOString().split('T')[0],
        youtubeUrl: '',
        status: 'draft'
      });

      resetPage();
      await loadSermons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setFormError('Failed to save sermon. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (sermon: Sermon) => {
    setEditing(sermon);
    setFormData({
      title: sermon.title,
      description: sermon.description || '',
      speaker: sermon.speaker || '',
      sermonDate: sermon.sermonDate,
      youtubeUrl: '',
      status: sermon.status
    });
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this sermon?')) return;

    try {
      await deleteSermon(id);
      setSuccess('Sermon deleted successfully!');
      resetPage();
      await loadSermons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete sermon. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      title: '',
      description: '',
      speaker: '',
      sermonDate: new Date().toISOString().split('T')[0],
      youtubeUrl: '',
      status: 'draft'
    });
    setFormError('');
  };

  const {
    currentPage,
    pageCount,
    paginatedItems: paginatedSermons,
    showPagination,
    prevPage,
    nextPage,
    resetPage,
  } = usePagination(sermons, SERMONS_PER_PAGE);

  return (
    <div className="admin-page">
      <AdminBackNav pageTitle="Sermons" />
      <style>{`
        .admin-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-header h1 { margin: 0; font-size: 2rem; color: #0B1F3A; }
        .btn { padding: 0.75rem 1.5rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: all 0.3s ease; }
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
        .actions button { padding: 0.5rem 1rem; font-size: 0.875rem; }
        
        .form-container { background: white; border-radius: 8px; padding: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 0.5rem; color: #0B1F3A; }
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
        
        .form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .form-actions button { flex: 1; }
        
        .youtube-preview { margin-top: 1.5rem; padding: 1.5rem; background-color: #f9fafb; border-radius: 8px; }
        .youtube-preview h4 { margin-top: 0; color: #0B1F3A; }
        
        .empty-state { text-align: center; padding: 3rem 1rem; color: #6B7280; }
        .empty-state p { margin: 1rem 0; }
      `}</style>

      <div className="page-header">
        <h1>Sermons</h1>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); }} disabled={submitting}>
          {showForm ? 'Cancel' : '+ New Sermon'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-container">
          <h2>{editing ? 'Edit Sermon' : 'Create Sermon'}</h2>
          
          {formError && <div className="alert alert-error">{formError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={submitting}
                placeholder="Sermon title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={submitting}
                placeholder="Sermon description..."
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Speaker</label>
                <input
                  type="text"
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  disabled={submitting}
                  placeholder="e.g., Pastor Daniel Modi"
                />
              </div>

              <div className="form-group">
                <label>Sermon Date *</label>
                <input
                  type="date"
                  value={formData.sermonDate}
                  onChange={(e) => setFormData({ ...formData, sermonDate: e.target.value })}
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="form-group">
              <label>YouTube URL *</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                disabled={submitting}
                placeholder="https://youtube.com/watch?v=VIDEO_ID"
              />
            </div>

            <div className="form-group">
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as FormStatus })}
                disabled={submitting}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            {formData.youtubeUrl && !formError && (
              <div className="youtube-preview">
                <h4>Preview:</h4>
                <YouTubeEmbed videoId={extractYouTubeVideoId(formData.youtubeUrl) || ''} type="video" />
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : editing ? 'Update' : 'Create'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={submitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading sermons...</div>
      ) : sermons.length === 0 ? (
        <div className="empty-state">
          <p>No sermons created yet.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Create First Sermon
          </button>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Speaker</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSermons.map((sermon) => (
                <tr key={sermon.id}>
                  <td>{new Date(sermon.sermonDate).toLocaleDateString()}</td>
                  <td>{sermon.title}</td>
                  <td>{sermon.speaker || '—'}</td>
                  <td>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', backgroundColor: sermon.status === 'published' ? '#dcfce7' : '#fef3c7', color: sermon.status === 'published' ? '#15803d' : '#92400e' }}>
                      {sermon.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={() => handleEdit(sermon)} disabled={submitting}>
                        Edit
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(sermon.id)} disabled={submitting}>
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
      )}
    </div>
  );
}
