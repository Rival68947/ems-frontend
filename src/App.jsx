import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeForm from './pages/EmployeeForm';

/**
 * Main App Router configuration.
 * Defines route maps nested within the Layout component shell.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard view */}
          <Route index element={<Dashboard />} />
          
          {/* Employee Directory list */}
          <Route path="employees" element={<EmployeeList />} />
          
          {/* Add Employee Form */}
          <Route path="employees/add" element={<EmployeeForm />} />
          
          {/* View Employee details profile */}
          <Route path="employees/:id" element={<EmployeeDetails />} />
          
          {/* Edit Employee Form */}
          <Route path="employees/edit/:id" element={<EmployeeForm />} />
          
          {/* Fallback redirect */}
          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
