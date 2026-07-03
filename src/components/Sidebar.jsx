import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Building2, LogOut } from 'lucide-react';

/**
 * Sidebar Navigation Component
 * Provides desktop navigation links and integrates with Lucide React icons.
 */
function Sidebar({ isOpen, onClose, user, onLogout }) {
  const isEmployer = user?.role === 'Employer';
  const initial = user?.username ? user.username.charAt(0).toUpperCase() : '?';

  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        <Building2 size={24} color="#6366f1" />
        <span>EMS <span>Portal</span></span>
      </div>

      <div style={{ padding: '1rem 1rem 0 1rem' }}>
        {/* User Session Profile Badge */}
        <div className="user-profile-badge">
          <div className="badge-avatar">{initial}</div>
          <div className="badge-info">
            <span className="badge-name">{user?.username || 'User'}</span>
            <span className="badge-role">{user?.role || 'Guest'}</span>
          </div>
        </div>
      </div>
      
      <ul className="sidebar-menu">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/employees" 
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            end
            onClick={onClose}
          >
            <Users size={20} />
            <span>Employees</span>
          </NavLink>
        </li>
        {/* Only show 'Add Employee' to Employers/Admins */}
        {isEmployer && (
          <li>
            <NavLink 
              to="/employees/add" 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <UserPlus size={20} />
              <span>Add Employee</span>
            </NavLink>
          </li>
        )}

        {/* Sidebar Logout Action */}
        <li style={{ marginTop: 'auto' }}>
          <button onClick={onLogout} className="btn-logout-sidebar">
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </li>
      </ul>
      
      <div className="sidebar-footer">
        <span>© 2026 Admin Portal</span>
      </div>
    </aside>
  );
}

export default Sidebar;
