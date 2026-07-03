import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import EmployeeDetails from './pages/EmployeeDetails';
import EmployeeForm from './pages/EmployeeForm';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Route guard wrapper checking localStorage session
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('ems_user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * Main App Router configuration.
 * Defines route maps nested within the Layout component shell.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private Dashboard routes protected by guard */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

