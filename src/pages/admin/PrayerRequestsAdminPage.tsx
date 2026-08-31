import { useEffect, useState } from 'react';
import type { PrayerRequest } from '../../types';
import { getPrayerRequests, updatePrayerRequestStatus, deletePrayerRequest } from '../../lib/queries/prayerRequests';

export default function PrayerRequestsAdminPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'prayed' | 'archived'>('all');
  const [success, setSuccess] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getPrayerRequests();
      setRequests(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      setError('Failed to load prayer requests. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: PrayerRequest['status']) => {
    try {
      await updatePrayerRequestStatus(id, newStatus);
      setSuccess('Status updated successfully!');
      await loadRequests();
      setShowModal(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update status. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this prayer request?')) return;

    try {
      await deletePrayerRequest(id);
      setSuccess('Prayer request deleted successfully!');
      await loadRequests();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete prayer request. Please try again.');
      console.error(err);
    }
  };

  const filteredRequests = requests.filter(r => filter === 'all' ? true : r.status === filter);

  const statusColors: Record<PrayerRequest['status'], { bg: string; text: string }> = {
    new: { bg: '#dbeafe', text: '#1e40af' },
    read: { bg: '#fef3c7', text: '#92400e' },
    prayed: { bg: '#dcfce7', text: '#15803d' },
    archived: { bg: '#f3f4f6', text: '#374151' }
  };

  return (
    <div className="admin-page">
      <style>{`
        .admin-page { padding: 2rem; max-width: 1200px; margin: 0 auto; }
        .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .page-header h1 { margin: 0; font-size: 2rem; color: #0B1F3A; }
        .filters { display: flex; gap: 0.5rem; margin-bottom: 2rem; flex-wrap: wrap; }
        .filter-btn { padding: 0.5rem 1rem; border: 2px solid #d1d5db; background: white; border-radius: 6px; cursor: pointer; font-weight: 500; transition: all 0.3s ease; }
        .filter-btn.active { border-color: #C9A227; background-color: #C9A227; color: white; }
        .filter-btn:hover { border-color: #C9A227; }
        .alert { padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; }
        .alert-error { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; }
        .alert-success { background-color: #dcfce7; border: 1px solid #bbf7d0; color: #15803d; }
        .table-container { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th { background-color: #f3f4f6; padding: 1rem; text-align: left; font-weight: 600; color: #0B1F3A; border-bottom: 2px solid #e5e7eb; }
        td { padding: 1rem; border-bottom: 1px solid #e5e7eb; }
        tr:hover { background-color: #f9fafb; }
        .btn { padding: 0.5rem 1rem; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; font-size: 0.875rem; transition: all 0.3s ease; }
        .btn-primary { background-color: #C9A227; color: white; }
        .btn-primary:hover { background-color: #B8921F; }
        .btn-danger { background-color: #dc2626; color: white; }
        .btn-danger:hover { background-color: #b91c1c; }
        .btn-secondary { background-color: #e5e7eb; color: #0B1F3A; }
        .btn-secondary:hover { background-color: #d1d5db; }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .actions { display: flex; gap: 0.5rem; }
        .status-badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.875rem; font-weight: 500; }
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; }
        .modal-overlay.show { display: flex; align-items: center; justify-content: center; }
        .modal { background: white; border-radius: 8px; padding: 2rem; max-width: 500px; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
        .modal-header h2 { margin: 0 0 1rem 0; color: #0B1F3A; }
        .modal-body { margin-bottom: 1.5rem; }
        .modal-body p { margin: 0.5rem 0; color: #6B7280; }
        .modal-body textarea { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; min-height: 100px; }
        .modal-actions { display: flex; gap: 1rem; }
        .modal-actions button { flex: 1; }
        .empty-state { text-align: center; padding: 3rem 1rem; color: #6B7280; }
        .empty-state p { margin: 1rem 0; }
        .request-content { max-width: 300px; word-break: break-word; }
      `}</style>

      <div className="page-header">
        <h1>Prayer Requests</h1>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {!loading && (
        <div className="filters">
          {(['all', 'new', 'read', 'prayed', 'archived'] as const).map(status => (
            <button
              key={status}
              className={`filter-btn ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && ` (${requests.filter(r => r.status === status).length})`}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading prayer requests...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="empty-state">
          <p>No prayer requests found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Submitted</th>
                <th>Name</th>
                <th>Request</th>
                <th>Contact Requested</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                  <td>{request.name}</td>
                  <td className="request-content">{request.prayerRequest}</td>
                  <td>{request.contactRequested ? 'Yes' : 'No'}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColors[request.status].bg, color: statusColors[request.status].text }}>
                      {request.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary" onClick={() => { setSelectedRequest(request); setNotes(request.notes || ''); setShowModal(true); }}>
                        Update
                      </button>
                      <button className="btn btn-danger" onClick={() => handleDelete(request.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={`modal-overlay ${showModal ? 'show' : ''}`}>
        {selectedRequest && (
          <div className="modal">
            <div className="modal-header">
              <h2>Update Prayer Request</h2>
            </div>
            <div className="modal-body">
              <p><strong>From:</strong> {selectedRequest.name}</p>
              <p><strong>Email:</strong> {selectedRequest.email}</p>
              <p><strong>Request:</strong> {selectedRequest.prayerRequest}</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#0B1F3A' }}>
                  Status
                </label>
                <select 
                  value={selectedRequest.status} 
                  onChange={(e) => setSelectedRequest({ ...selectedRequest, status: e.target.value as PrayerRequest['status'] })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="prayed">Prayed</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#0B1F3A' }}>
                  Private Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add private notes..."
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={() => handleStatusUpdate(selectedRequest.id, selectedRequest.status)}>
                Save Changes
              </button>
              <button className="btn btn-secondary" onClick={() => { setShowModal(false); setSelectedRequest(null); setNotes(''); }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
