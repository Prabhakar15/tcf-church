import { useState } from 'react';
import { submitPrayerRequest } from '../lib/queries/prayerRequests';

export default function PrayerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayerRequest: '',
    contactRequested: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      await submitPrayerRequest({
        name: formData.name,
        email: formData.email,
        prayerRequest: formData.prayerRequest,
        contactRequested: formData.contactRequested
      });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        prayerRequest: '',
        contactRequested: false
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Unable to submit your prayer request. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prayer-page">
      <section className="page-header">
        <div className="page-header-container">
          <h1>Prayer Request</h1>
          <p>Share your prayer request with our community</p>
        </div>
      </section>

      <section className="page-content">
        <div className="page-container">
          {success && (
            <div className="success-message">
              <p>Thank you for your prayer request. Our prayer team will lift you up in prayer.</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="prayer-form">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="prayerRequest">Prayer Request *</label>
              <textarea 
                id="prayerRequest" 
                name="prayerRequest" 
                rows={6} 
                value={formData.prayerRequest}
                onChange={handleChange}
                disabled={loading}
                required 
              ></textarea>
            </div>

            <div className="form-group checkbox">
              <input 
                type="checkbox" 
                id="contactRequested" 
                name="contactRequested"
                checked={formData.contactRequested}
                onChange={handleChange}
                disabled={loading}
              />
              <label htmlFor="contactRequested">I&apos;d like someone from TCF to contact me</label>
            </div>

            <div className="privacy-note">
              <p>Your privacy is important to us. Prayer requests are treated confidentially and will only be seen by our prayer team.</p>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Prayer Request'}
            </button>
          </form>
        </div>
      </section>

      <style>{`
        .prayer-page { width: 100%; }
        .page-header { background-color: #0B1F3A; color: white; padding: 4rem 1.5rem; text-align: center; }
        @media (max-width: 767px) { .page-header { padding: 2rem 1rem; } }
        .page-header h1 { font-size: 3rem; font-weight: 800; margin: 0; }
        @media (max-width: 767px) { .page-header h1 { font-size: 2rem; } }
        .page-header p { font-size: 1.125rem; color: #E5E7EB; margin: 0.5rem 0 0 0; }
        .page-content { padding: 4rem 1.5rem; background-color: #ffffff; }
        @media (max-width: 767px) { .page-content { padding: 2rem 1rem; } }
        .page-container { max-width: 600px; margin: 0 auto; }
        
        .success-message { background-color: #dcfce7; border: 1px solid #bbf7d0; color: #15803d; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; }
        .success-message p { margin: 0; }
        
        .error-message { background-color: #fee2e2; border: 1px solid #fecaca; color: #dc2626; padding: 1rem; border-radius: 8px; margin-bottom: 2rem; }
        .error-message p { margin: 0; }
        
        .prayer-form { background-color: #f9fafb; padding: 2rem; border-radius: 12px; border: 1px solid #e5e7eb; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-weight: 600; color: #0B1F3A; margin-bottom: 0.5rem; }
        .form-group input, .form-group textarea { width: 100%; padding: 0.75rem; border: 1px solid #e5e7eb; border-radius: 8px; font-family: inherit; }
        .form-group input:disabled, .form-group textarea:disabled { background-color: #f3f4f6; cursor: not-allowed; }
        .form-group.checkbox { display: flex; align-items: center; }
        .form-group.checkbox input { width: auto; margin-right: 0.75rem; }
        .form-group.checkbox label { margin: 0; }
        .privacy-note { background-color: white; padding: 1rem; border-left: 3px solid #C9A227; margin: 1.5rem 0; border-radius: 4px; }
        .privacy-note p { font-size: 0.9rem; color: #6B7280; margin: 0; }
        .submit-btn { background-color: #C9A227; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; width: 100%; transition: all 0.3s ease; }
        .submit-btn:hover:not(:disabled) { background-color: #B8921F; transform: translateY(-2px); }
        .submit-btn:disabled { background-color: #d1cfc7; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
