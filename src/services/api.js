const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/employees';


/**
 * Service to communicate with Express EMS Backend.
 * Uses standard Fetch API to perform CRUD operations.
 */
export const employeeApi = {
  // Fetch all employees (supports search, filter, sort and page parameters)
  async getAll(search = '', department = '', sortBy = 'firstName', order = 'asc', page = 1, limit = 5) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (department && department !== 'All') params.append('department', department);
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);
    if (page) params.append('page', page);
    if (limit) params.append('limit', limit);

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return await response.json();
  },


  // Fetch a single employee by ID
  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Employee not found');
      }
      throw new Error('Failed to fetch employee details');
    }
    return await response.json();
  },

  // Create a new employee record
  async create(employeeData) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create employee');
    }
    return data;
  },

  // Update an existing employee record
  async update(id, employeeData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update employee');
    }
    return data;
  },

  // Delete an employee record
  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete employee');
    }
    return data;
  },

  // Fetch summary statistics for the dashboard
  async getStats() {
    const response = await fetch(`${API_BASE_URL}/stats/summary`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee statistics');
    }
    return await response.json();
  }
};
