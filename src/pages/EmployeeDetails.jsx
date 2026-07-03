import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeeApi } from '../services/api';
import { ArrowLeft, Pencil, Trash2, Mail, Phone, Calendar, Briefcase, IndianRupee, ShieldCheck, AlertCircle } from 'lucide-react';

function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      setLoading(true);
      const data = await employeeApi.getById(id);
      setEmployee(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to fetch employee details. Server offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete employee "${employee.firstName} ${employee.lastName}"?`)) {
      try {
        await employeeApi.delete(id);
        navigate('/employees');
      } catch (err) {
        console.error(err);
        alert('Error deleting employee');
      }
    }
  };

  if (loading) {
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Loading employee profile...</p>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="glass-card animate-fade-in" style={{ borderColor: 'var(--danger)', padding: '2rem', textAlign: 'center' }}>
        <AlertCircle size={48} color="var(--danger)" style={{ marginBottom: '1rem' }} />
        <h3 style={{ marginBottom: '0.5rem' }}>Error loading profile</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{error || 'Employee not found.'}</p>
        <Link to="/employees" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </Link>
      </div>
    );
  }

  // Get initials for profile avatar
  const initials = `${employee.firstName.charAt(0)}${employee.lastName.charAt(0)}`.toUpperCase();

  // Format currency
  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const user = JSON.parse(localStorage.getItem('ems_user') || '{}');
  const isEmployer = user?.role === 'Employer';

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <Link to="/employees" className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </Link>
        {isEmployer && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to={`/employees/edit/${id}`} className="btn btn-secondary">
              <Pencil size={16} />
              <span>Edit Profile</span>
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              <Trash2 size={16} />
              <span>Delete Employee</span>
            </button>
          </div>
        )}
      </div>


      <div className="profile-layout">
        {/* Left Side: Avatar Card */}
        <div className="glass-card profile-avatar-card">
          <div className="avatar-large">{initials}</div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'white' }}>
            {employee.firstName} {employee.lastName}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1rem' }}>
            {employee.position}
          </p>
          <span className={`badge ${employee.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
            {employee.status}
          </span>
        </div>

        {/* Right Side: Information Details Grid */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem', color: 'white' }}>
              Employee Details
            </h3>
            
            <div className="profile-details-grid">
              <div className="detail-item">
                <span className="detail-label">
                  <Mail size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Email Address
                </span>
                <span className="detail-value">{employee.email}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <Phone size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Phone Number
                </span>
                <span className="detail-value">{employee.phone}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <Briefcase size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Department
                </span>
                <span className="detail-value">{employee.department}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <ShieldCheck size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Job Position
                </span>
                <span className="detail-value">{employee.position}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <IndianRupee size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Annual Salary
                </span>
                <span className="detail-value">{formatSalary(employee.salary)}</span>
              </div>

              <div className="detail-item">
                <span className="detail-label">
                  <Calendar size={12} style={{ marginRight: '0.4rem', verticalAlign: 'middle' }} />
                  Joining Date
                </span>
                <span className="detail-value">{employee.joiningDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetails;
