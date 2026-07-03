import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Key, User, ShieldAlert } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Setup default accounts in localStorage on load if not present
  useEffect(() => {
    const existingAccounts = localStorage.getItem('ems_accounts');
    if (!existingAccounts) {
      const defaultAccounts = [
        { username: 'admin', password: 'admin123', role: 'Employer' },
        { username: 'employee', password: 'employee123', role: 'Employee' }
      ];
      localStorage.setItem('ems_accounts', JSON.stringify(defaultAccounts));
    }

    // If user is already logged in, redirect to dashboard
    const user = localStorage.getItem('ems_user');
    if (user) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please provide username and password.');
      return;
    }

    const accounts = JSON.parse(localStorage.getItem('ems_accounts') || '[]');
    const matchingAccount = accounts.find(
      (acc) => acc.username.toLowerCase() === username.trim().toLowerCase() && acc.password === password
    );

    if (matchingAccount) {
      // Log user session in local storage
      localStorage.setItem(
        'ems_user',
        JSON.stringify({
          username: matchingAccount.username,
          role: matchingAccount.role
        })
      );
      navigate('/');
    } else {
      setError('Invalid username or password. Check credentials.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Building2 size={32} color="#6366f1" />
            <span>EMS <span>Portal</span></span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Workforce Portal Access Gateway
          </p>
        </div>

        {error && (
          <div className="glass-card" style={{ borderColor: 'var(--danger)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <ShieldAlert color="var(--danger)" size={18} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="username">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                id="username"
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                id="password"
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
            Sign In to Portal
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup">Register now</Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
