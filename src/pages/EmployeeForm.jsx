import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeeApi } from '../services/api';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: 'IT',
    position: '',
    salary: '',
    joiningDate: '',
    status: 'Active',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingProfile, setFetchingProfile] = useState(false);
  const [apiError, setApiError] = useState(null);

  const departments = ['IT', 'HR', 'Marketing', 'Finance'];
  const positions = {
    IT: ['Junior Developer', 'Software Engineer', 'Senior Software Engineer', 'System Administrator', 'DevOps Engineer'],
    HR: ['HR Associate', 'HR Specialist', 'HR Manager'],
    Marketing: ['Marketing Analyst', 'Marketing Coordinator', 'Marketing Manager'],
    Finance: ['Accountant', 'Financial Analyst', 'Finance Manager'],
  };

  useEffect(() => {
    if (isEditMode) {
      fetchEmployee();
    }
  }, [id]);

  // If department changes, preset default position matching department if position is empty or not in new options
  useEffect(() => {
    const availablePositions = positions[formData.department] || [];
    if (!availablePositions.includes(formData.position) && availablePositions.length > 0) {
      setFormData(prev => ({ ...prev, position: availablePositions[0] }));
    }
  }, [formData.department]);

  const fetchEmployee = async () => {
    try {
      setFetchingProfile(true);
      const data = await employeeApi.getById(id);
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phone: data.phone || '',
        department: data.department || 'IT',
        position: data.position || '',
        salary: data.salary || '',
        joiningDate: data.joiningDate || '',
        status: data.status || 'Active',
      });
      setApiError(null);
    } catch (err) {
      console.error(err);
      setApiError('Failed to load employee details. Ensure backend connection is active.');
    } finally {
      setFetchingProfile(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field-level error upon typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone.replace(/[\s-()]/g, ''))) {
      newErrors.phone = 'Phone number must be a 10-digit number';
    }

    if (!formData.position.trim()) newErrors.position = 'Job position is required';
    
    if (!formData.salary) {
      newErrors.salary = 'Salary amount is required';
    } else if (Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    if (!formData.joiningDate) newErrors.joiningDate = 'Joining date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setApiError(null);
      if (isEditMode) {
        await employeeApi.update(id, formData);
        navigate(`/employees/${id}`);
      } else {
        await employeeApi.create(formData);
        navigate('/employees');
      }
    } catch (err) {
      console.error(err);
      setApiError(err.message || 'Something went wrong while saving the employee record.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProfile) {
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>Retrieving profile details...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">{isEditMode ? 'Edit Employee Profile' : 'Register New Employee'}</h1>
          <p className="page-subtitle">
            {isEditMode ? 'Modify corporate record variables' : 'Create a fresh employee directory listing'}
          </p>
        </div>
        <Link to={isEditMode ? `/employees/${id}` : '/employees'} className="btn btn-secondary">
          <ArrowLeft size={16} />
          <span>Cancel</span>
        </Link>
      </div>

      {/* Global API Error */}
      {apiError && (
        <div className="glass-card" style={{ borderColor: 'var(--danger)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <AlertCircle color="var(--danger)" size={24} />
          <span style={{ color: 'var(--text-secondary)' }}>{apiError}</span>
        </div>
      )}

      {/* Form Card */}
      <div className="glass-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            
            {/* First Name */}
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="John"
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>

            {/* Email Address */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
                disabled={isEditMode} // Usually, email isn't modifiable once set
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="9876543210"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                className="form-control"
                value={formData.department}
                onChange={handleInputChange}
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Job Position */}
            <div className="form-group">
              <label htmlFor="position">Job Position</label>
              <select
                id="position"
                name="position"
                className="form-control"
                value={formData.position}
                onChange={handleInputChange}
              >
                {(positions[formData.department] || []).map((pos) => (
                  <option key={pos} value={pos}>{pos}</option>
                ))}
              </select>
              {errors.position && <span className="error-text">{errors.position}</span>}
            </div>

            {/* Annual Salary */}
            <div className="form-group">
              <label htmlFor="salary">Annual Salary (INR)</label>
              <input
                type="number"
                id="salary"
                name="salary"
                className="form-control"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g. 500000"
              />
              {errors.salary && <span className="error-text">{errors.salary}</span>}
            </div>

            {/* Joining Date */}
            <div className="form-group">
              <label htmlFor="joiningDate">Joining Date</label>
              <input
                type="date"
                id="joiningDate"
                name="joiningDate"
                className="form-control"
                value={formData.joiningDate}
                onChange={handleInputChange}
              />
              {errors.joiningDate && <span className="error-text">{errors.joiningDate}</span>}
            </div>

            {/* Status (Only visible/editable in Edit Mode) */}
            {isEditMode && (
              <div className="form-group">
                <label htmlFor="status">Employment Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}
          </div>

          <div className="form-actions">
            <Link to={isEditMode ? `/employees/${id}` : '/employees'} className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save Employee'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
