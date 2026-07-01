import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Building2 } from 'lucide-react';

/**
 * Sidebar Navigation Component
 * Provides desktop navigation links and integrates with Lucide React icons.
 */
function Sidebar({ isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-logo">
        <Building2 size={24} color="#6366f1" />
        <span>EMS <span>Portal</span></span>
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
      </ul>
      
      <div className="sidebar-footer">
        <span>© 2026 Admin Portal</span>
      </div>
    </aside>
  );
}

export default Sidebar;
