import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MacWindowControls from './components/MacWindowControls';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ToolsList from './pages/ToolsList';
import ToolDetails from './pages/ToolDetails';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import AddTool from './pages/AddTool';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <MacWindowControls />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolsList />} />
            <Route path="/tools/:id" element={<ToolDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-tool"
              element={
                <ProtectedRoute>
                  <AddTool />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
