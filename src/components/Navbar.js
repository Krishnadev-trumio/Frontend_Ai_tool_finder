import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-robot"></i>AI Tools Hub
        </Link>

        <ul className="navbar-menu">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/tools" className="navbar-link">Browse Tools</Link>
          </li>

          {isAuthenticated() ? (
            <>
              <li className="navbar-item">
                <Link to="/admin/dashboard" className="navbar-link">Dashboard</Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin/add-tool" className="navbar-link">Add Tool</Link>
              </li>
              <li className="navbar-item">
                <span className="navbar-user"><i className="fas fa-user"></i>{user?.username}</span>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/admin/login" className="navbar-link">Admin Login</Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin/register" className="navbar-link">Admin Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

