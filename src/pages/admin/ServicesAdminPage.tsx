import { useEffect, useState } from 'react';

import type { RecurringService } from '../../types';
import { getAllServices, createService, updateService, deleteService } from '../../lib/queries/services';
import AdminBreadcrumb from '../../components/admin/AdminBreadcrumb';

type ServiceStatus = 'draft' | 'published';
type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const DAYS_OF_WEEK: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const CATEGORIES = [
  'Sunday Service',
  'Saturday Service',
  'Dormitory Brothers',
  'Women\'s Fellowship',
  'Early Morning Prayer'
];
const TIMEZONES = ['Asia/Singapore', 'Asia/Kolkata'];

const TIMEZONE_LABELS: Record<string, string> = {
  'Asia/Singapore': 'Singapore Time (SGT)',
  'Asia/Kolkata': 'India Standard Time (IST)',
};

export default function ServicesAdminPage() {
  // Removed: const navigate = useNavigate(); (not used yet)
  const [services, setServices] = useState<RecurringService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<RecurringService | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Sunday Service',
    description: '',
    dayOfWeek: 'Sunday' as DayOfWeek,
    startTime: '09:00',
    endTime: '10:00',
    timezone: 'Asia/Singapore',
    location: '',
    displayOrder: 0,
    status: 'published' as ServiceStatus
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (err) {
      setError('Failed to load services. Please try again.');
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
    if (!formData.category) {
      setFormError('Category is required');
      return false;
    }
    if (!formData.startTime) {
      setFormError('Start time is required');
      return false;
    }
    if (formData.endTime && formData.endTime === formData.startTime) {
      setFormError('End time cannot be the same as start time');
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
      const payload: Omit<RecurringService, 'id' | 'createdAt' | 'updatedAt'> = {
        title: formData.title,
        category: formData.category,
        description: formData.description || undefined,
        dayOfWeek: formData.dayOfWeek,
        startTime: formData.startTime,
        endTime: formData.endTime || undefined,
        timezone: formData.timezone,
        location: formData.location || undefined,
        displayOrder: formData.displayOrder,
        status: formData.status
      };

      if (editing) {
        await updateService(editing.id, payload);
        setSuccess('Service updated successfully!');
      } else {
        await createService(payload);
        setSuccess('Service created successfully!');
      }

      setShowForm(false);
      setEditing(null);
      setFormData({
        title: '',
        category: 'Sunday Service',
        description: '',
        dayOfWeek: 'Sunday',
        startTime: '09:00',
        endTime: '10:00',
        timezone: 'Asia/Singapore',
        location: '',
        displayOrder: 0,
        status: 'published'
      });

      await loadServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setFormError('Failed to save service. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (service: RecurringService) => {
    setEditing(service);
    setFormData({
      title: service.title,
      category: service.category,
      description: service.description || '',
      dayOfWeek: service.dayOfWeek,
      startTime: service.startTime,
      endTime: service.endTime || '',
      timezone: service.timezone,
      location: service.location || '',
      displayOrder: service.displayOrder,
      status: service.status as ServiceStatus
    });
    setShowForm(true);
    setFormError('');
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    try {
      await deleteService(id);
      setSuccess('Service deleted successfully!');
      await loadServices();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete service. Please try again.');
      console.error(err);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
    setFormData({
      title: '',
      category: 'Sunday Service',
      description: '',
      dayOfWeek: 'Sunday',
      startTime: '09:00',
      endTime: '10:00',
      timezone: 'Asia/Singapore',
      location: '',
      displayOrder: 0,
      status: 'published'
    });
    setFormError('');
  };

  return (
    <div className="admin-page">
      <AdminBreadcrumb items={[
        { label: 'Admin', path: '/admin' },
        { label: 'Services & Fellowships' }
      ]} />

      <div className="page-header">
        <div>
          <h1>Services & Fellowships</h1>
          <p className="page-description">Manage recurring services and fellowships</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + Add Service
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {showForm && (
        <div className="form-container">
          <h2>{editing ? 'Edit Service' : 'Add New Service'}</h2>
          <form onSubmit={handleSubmit}>
            {formError && <div className="alert alert-error">{formError}</div>}
            
            <div className="form-grid">
              <div className="form-group">
                <label>Title * <span className="required-indicator">required</span></label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Sunday Service"
                />
              </div>
              <div className="form-group">
                <label>Category * <span className="required-indicator">required</span></label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Optional description"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Day of Week * <span className="required-indicator">required</span></label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value as DayOfWeek })}
                >
                  {DAYS_OF_WEEK.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Start Time * <span className="required-indicator">required</span></label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
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
                />
              </div>
              <div className="form-group">
                <label>Timezone * <span className="required-indicator">required</span></label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>{TIMEZONE_LABELS[tz]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Pasir Panjang Hill Brethren Church"
                />
              </div>
              <div className="form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Status * <span className="required-indicator">required</span></label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ServiceStatus })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Saving...' : editing ? 'Update Service' : 'Create Service'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel} disabled={submitting}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>Loading services...</div>
      ) : services.length > 0 ? (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Day</th>
                <th>Time</th>
                <th>Timezone</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td><strong>{service.title}</strong></td>
                  <td>{service.category}</td>
                  <td>{service.dayOfWeek}</td>
                  <td>{service.startTime}{service.endTime ? ` – ${service.endTime}` : ''}</td>
                  <td>{TIMEZONE_LABELS[service.timezone] || service.timezone}</td>
                  <td>{service.location || '—'}</td>
                  <td>
                    <span className={`status-badge status-${service.status}`}>
                      {service.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-secondary btn-sm" onClick={() => handleEdit(service)}>
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(service.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
          No services yet. Create one to get started.
        </div>
      )}

      <style>{`
        .admin-page { padding: 0; }
        
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
        .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 6px; font-family: inherit; }
        .form-group textarea { resize: vertical; min-height: 100px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
        
        .form-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .form-actions button { flex: 1; }
      `}</style>
    </div>
  );
}
