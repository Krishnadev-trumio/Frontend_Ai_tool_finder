import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    // const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      // setToken(storedToken);
      setUser({ username: storedUsername });
    }
    setLoading(false);
  }, []);

  const login = (username) => {
    // localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    // setToken(token);
    setUser({ username });
  };

  const logout = () => {
    // localStorage.removeItem('token');
    localStorage.removeItem('username');
    // setToken(null);
    setUser(null);
  };

  const isAuthenticated = () => {
    // return !!token;
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

