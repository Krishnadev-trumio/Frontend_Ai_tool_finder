import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount (cookie-based auth)
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setUser({ username: storedUsername });
    }
    setLoading(false);
  }, []);

  const login = (username) => {
    // With cookie-based auth, only store username for display
    localStorage.setItem('username', username);
    setUser({ username });
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

