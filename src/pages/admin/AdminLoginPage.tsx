import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../../lib/auth';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { admin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  if (admin) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    const { user, error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    if (user) {
      // Redirect to admin or to the page they tried to access
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0B1F3A 0%, #1a3a5f 100%);
          padding: 1.5rem;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 12px;
          padding: 3rem 2rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-header h1 {
          font-size: 1.875rem;
          font-weight: 800;
          color: #0B1F3A;
          margin: 0 0 0.5rem 0;
        }

        .login-header p {
          font-size: 0.95rem;
          color: #6B7280;
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-weight: 600;
          color: #0B1F3A;
          font-size: 0.95rem;
        }

        .form-group input {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          outline: none;
          border-color: #C9A227;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.1);
        }

        .error-message {
          background-color: #fee2e2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 0.75rem;
          border-radius: 8px;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .submit-btn {
          padding: 0.875rem;
          background-color: #C9A227;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background-color: #B8921F;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(201, 162, 39, 0.25);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.875rem;
          color: #6B7280;
        }
      `}</style>

      <div className="login-container">
        <div className="login-header">
          <h1>TCF Admin</h1>
          <p>Church Management</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="admin@tcf.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Tabernacle Christ Fellowship • Admin Portal</p>
        </div>
      </div>
    </div>
  );
}
