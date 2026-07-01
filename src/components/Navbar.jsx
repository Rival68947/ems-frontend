import React from 'react';
import { Menu, X, Building2 } from 'lucide-react';

/**
 * Mobile Top Navbar Component
 * Triggers mobile sidebar drawer on smaller viewports.
 */
function Navbar({ sidebarOpen, toggleSidebar }) {
  return (
    <nav className="mobile-nav">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Building2 size={24} color="#6366f1" />
        <span style={{ fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Outfit' }}>
          EMS Portal
        </span>
      </div>
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </nav>
  );
}

export default Navbar;
