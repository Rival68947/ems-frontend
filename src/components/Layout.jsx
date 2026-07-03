import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

/**
 * Main Layout wrapper
 * Manages responsive sidebar toggle state and coordinates layout structure.
 */
function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('ems_user') || '{}');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('ems_user');
    window.location.href = '/login'; // Hard reload to clear all states
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar} 
        user={user} 
        onLogout={handleLogout} 
      />
      
      {/* Content wrapper */}
      <div className="main-content">
        {/* Mobile Navbar */}
        <Navbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Page Render Body */}
        <main className="content-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default Layout;
