import { useEffect, useState } from 'react';
import type { Event } from '../../types';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../../lib/queries/events';
import AdminBackNav from '../../components/admin/AdminBackNav';
import { usePagination } from '../../hooks/usePagination';
import PaginationControls from '../../components/admin/PaginationControls';

const EVENTS_PER_PAGE = 5;

type EventStatus = 'draft' | 'published' | 'cancelled';

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    location: '',
    address: '',
    imageUrl: '',
    status: 'draft' as EventStatus
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (err) {
      setError('Failed to load events. Please try again.');
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
    if (!formData.eventDate) {
      setFormError('Event date is required');
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
      const payload: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        description: formData.description || undefined,
        eventDate: formData.eventDate,
        startTime: formData.startTime || undefined,
        endTime: formData.endTime || undefined,
        location: formData.location || undefined,
        address: formData.address || undefined,
        imageUrl: formData.imageUrl || undefined,
        status: formData.status
      };

      if (editing) {
        await updateEvent(editing.id, payload);
        setSuccess('Event updated successfully!');
      } else {
        await createEvent(payload);
        setSuccess('Event created successfully!');
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        description: '',
        eventDate: new Date().toISOString().split('T')[0],
        startTime: '',
        endTime: '',
        location: '',
        address: '',
        imageUrl: '',
        status: 'draft'
      });

      resetPage();
      await loadEvents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setFormError('Failed to save event. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditing(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      eventDate: event.eventDate,
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      location: event.location || '',
      address: event.address || '',
      imageUrl: event.imageUrl || '',
      status: event.status as EventStatus
    });
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await deleteEvent(id);
      setSuccess('Event deleted successfully!');
      resetPage();
      await loadEvents();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete event. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      title: '',
      description: '',
      eventDate: new Date().toISOString().split('T')[0],
      startTime: '',
      endTime: '',
      location: '',
      address: '',
      imageUrl: '',
      status: 'draft'
    });
    setFormError('');
  };

  const {
    currentPage,
    pageCount,
    paginatedItems: paginatedEvents,
    showPagination,
    prevPage,
    nextPage,
    resetPage,
  } = usePagination(events, EVENTS_PER_PAGE);

  return (
    <div className="admin-page">
      <AdminBackNav pageTitle="Events" />
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
        
        .empty-state { text-align: center; padding: 3rem 1rem; color: #6B7280; }
        .empty-state p { margin: 1rem 0; }
      `}</style>

      <div className="page-header">
        <h1>Events</h1>
        <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); }} disabled={submitting}>
          {showForm ? 'Cancel' : '+ New Event'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-container">
          <h2>{editing ? 'Edit Event' : 'Create Event'}</h2>
          
          {formError && <div className="alert alert-error">{formError}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                disabled={submitting}
                placeholder="Event title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={submitting}
                placeholder="Event description..."
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Event Date *</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={submitting}
                  placeholder="e.g., Bartley Christian Church"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={submitting}
                placeholder="Full address"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  disabled={submitting}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label>Status *</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as EventStatus })}
                  disabled={submitting}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

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
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading events...</div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <p>No events created yet.</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Create First Event
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
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                    <td>{event.title}</td>
                    <td>{event.location || '—'}</td>
                    <td>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.875rem', backgroundColor: event.status === 'published' ? '#dcfce7' : event.status === 'cancelled' ? '#fee2e2' : '#fef3c7', color: event.status === 'published' ? '#15803d' : event.status === 'cancelled' ? '#dc2626' : '#92400e' }}>
                        {event.status}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-secondary" onClick={() => handleEdit(event)} disabled={submitting}>
                          Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(event.id)} disabled={submitting}>
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
