import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Building2, Key, User, ShieldAlert, Check } from 'lucide-react';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee'); // Default role is Employee
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all details.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Retrieve accounts
    const accounts = JSON.parse(localStorage.getItem('ems_accounts') || '[]');
    
    // Check if account already exists
    const exists = accounts.some(
      (acc) => acc.username.toLowerCase() === username.trim().toLowerCase()
    );

    if (exists) {
      setError('Username is already taken.');
      return;
    }

    // Create new account
    const newAccount = {
      username: username.trim(),
      password,
      role
    };

    accounts.push(newAccount);
    localStorage.setItem('ems_accounts', JSON.stringify(accounts));
    setSuccess(true);
    
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
            Register workforce credentials
          </p>
        </div>

        {error && (
          <div className="glass-card" style={{ borderColor: 'var(--danger)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <ShieldAlert color="var(--danger)" size={18} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{error}</span>
          </div>
        )}

        {success && (
          <div className="glass-card" style={{ borderColor: 'var(--success)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', background: 'var(--success-glow)' }}>
            <Check color="var(--success)" size={18} />
            <span style={{ color: 'white', fontSize: '0.85rem' }}>Account registered! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="username">Create Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                id="username"
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose username"
                disabled={success}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="password">Create Password</label>
            <div style={{ position: 'relative' }}>
              <Key size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="password"
                id="password"
                className="form-control"
                style={{ paddingLeft: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose password (min 6 chars)"
                disabled={success}
              />
            </div>
          </div>

          {/* Role selector (Segmented custom radio layout) */}
          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <label>Select Portal Role</label>
            <div className="role-selector-container">
              <div className="role-option">
                <input
                  type="radio"
                  id="role-employee"
                  name="role"
                  value="Employee"
                  checked={role === 'Employee'}
                  onChange={() => setRole('Employee')}
                  disabled={success}
                />
                <label htmlFor="role-employee" className="role-label">Employee</label>
              </div>
              <div className="role-option">
                <input
                  type="radio"
                  id="role-employer"
                  name="role"
                  value="Employer"
                  checked={role === 'Employer'}
                  onChange={() => setRole('Employer')}
                  disabled={success}
                />
                <label htmlFor="role-employer" className="role-label">Employer</label>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }} disabled={success}>
            Register Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
