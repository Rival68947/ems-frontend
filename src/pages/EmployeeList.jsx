import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { employeeApi } from '../services/api';
import { Search, Eye, Pencil, Trash2, Plus, UserX, AlertCircle } from 'lucide-react';

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // List of departments for filtering
  const departments = ['All', 'IT', 'HR', 'Marketing', 'Finance'];

  useEffect(() => {
    fetchEmployees();
  }, [search, department]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeApi.getAll(search, department);
      setEmployees(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load employee directory. Make sure the server is online.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete employee "${name}"?`)) {
      try {
        await employeeApi.delete(id);
        // Refresh list
        fetchEmployees();
      } catch (err) {
        console.error(err);
        alert(err.message || 'Error deleting employee');
      }
    }
  };

  const user = JSON.parse(localStorage.getItem('ems_user') || '{}');
  const isEmployer = user?.role === 'Employer';

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Directory</h1>
          <p className="page-subtitle">Manage, view, and update corporate employee details</p>
        </div>
        {isEmployer && (
          <Link to="/employees/add" className="btn btn-primary">
            <Plus size={18} />
            <span>Add Employee</span>
          </Link>
        )}
      </div>


      {/* Filter and Search Bar */}
      <div className="glass-card filters-bar">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search by name or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="filter-select">
          <select
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error View */}
      {error && (
        <div className="glass-card" style={{ borderColor: 'var(--danger)', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <AlertCircle color="var(--danger)" size={24} />
          <span style={{ color: 'var(--text-secondary)' }}>{error}</span>
        </div>
      )}

      {/* Table Card */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loader-wrapper">
            <div className="spinner"></div>
            <p style={{ color: 'var(--text-secondary)' }}>Loading directory...</p>
          </div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <UserX size={48} className="empty-state-icon" />
            <h3>No Employees Found</h3>
            <p>Try refining your search terms or select another department filter.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Joining Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{emp.firstName} {emp.lastName}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{emp.email}</div>
                    </td>
                    <td>{emp.department}</td>
                    <td>{emp.position}</td>
                    <td>
                      <span className={`badge ${emp.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>
                        {emp.status}
                      </span>
                    </td>
                    <td>{emp.joiningDate}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="btn-icon"
                          title="View Profile"
                          onClick={() => navigate(`/employees/${emp.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        {isEmployer && (
                          <>
                            <button
                              className="btn-icon"
                              title="Edit Employee"
                              onClick={() => navigate(`/employees/edit/${emp.id}`)}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              className="btn-icon delete"
                              title="Delete Employee"
                              onClick={() => handleDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
