import React, { useState, useEffect } from 'react';
import { employeeApi } from '../services/api';
import { Users, UserCheck, UserMinus, IndianRupee, BarChart3, AlertCircle } from 'lucide-react';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const data = await employeeApi.getStats();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not retrieve system dashboard statistics. Please ensure the backend is active.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Loading dashboard statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card animate-fade-in" style={{ borderColor: 'var(--danger)', padding: '2rem', textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--danger)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem' }}>Connection Failure</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error}</p>
        <button className="btn btn-primary" onClick={fetchDashboardStats}>Retry connection</button>
      </div>
    );
  }

  const { totalEmployees, activeEmployees, inactiveEmployees, averageSalary, departmentCounts } = stats;

  // Format currency
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Find max value in department counts to scale CSS bar graphs
  const deptEntries = Object.entries(departmentCounts || {});
  const maxDeptCount = deptEntries.length > 0 ? Math.max(...deptEntries.map(([_, count]) => count)) : 1;

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Real-time statistics of the organization's workforce</p>
        </div>
      </div>

      {/* Grid of Statistical summary cards */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Employees</span>
            <span className="stat-value">{totalEmployees}</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
            <Users size={24} />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Active Staff</span>
            <span className="stat-value">{activeEmployees}</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <UserCheck size={24} />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Inactive Staff</span>
            <span className="stat-value">{inactiveEmployees}</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <UserMinus size={24} />
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-info">
            <span className="stat-label">Average Salary</span>
            <span className="stat-value" style={{ fontSize: '1.5rem' }}>{formatSalary(averageSalary)}</span>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4' }}>
            <IndianRupee size={24} />
          </div>
        </div>
      </div>

      {/* CSS-based Charts section */}
      <div className="charts-grid">
        <div className="glass-card chart-card">
          <div className="chart-header">
            <BarChart3 size={20} color="#6366f1" />
            <h3>Department Breakdown</h3>
          </div>
          
          {deptEntries.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
              No employee records available to map department distributions.
            </p>
          ) : (
            <div className="bar-chart-container">
              {deptEntries.map(([dept, count]) => {
                const percentage = (count / maxDeptCount) * 100;
                return (
                  <div key={dept} className="chart-row">
                    <span className="chart-row-label" title={dept}>{dept}</span>
                    <div className="chart-bar-wrapper">
                      <div 
                        className="chart-bar-fill" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="chart-row-value">{count}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
