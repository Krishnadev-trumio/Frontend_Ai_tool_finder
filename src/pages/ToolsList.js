import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../services/api';
import '../styles/ToolsList.css';

const ToolsList = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    category: '',
    price: '',
    rating: '',
  });

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tools]);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllTools();
      setTools(response.data);
      setFilteredTools(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load tools. Please try again later.');
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tools];

    if (filters.category) {
      filtered = filtered.filter(tool =>
        tool.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.price) {
      filtered = filtered.filter(tool =>
        tool.pricingtype.toLowerCase() === filters.price.toLowerCase()
      );
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter(tool => tool.rating >= minRating);
    }

    setFilteredTools(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({ category: '', price: '', rating: '' });
  };

  const categories = [...new Set(tools.map(tool => tool.category))];
  const pricingTypes = [...new Set(tools.map(tool => tool.pricingtype))];

  if (loading) return <div className="loading">Loading tools...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="tools-list-container">
      <h1 className="page-title">Browse AI Tools</h1>

      <div className="filters-section">
        <h3>Filter Tools</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Category</label>
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Pricing</label>
            <select name="price" value={filters.price} onChange={handleFilterChange}>
              <option value="">All Pricing</option>
              {pricingTypes.map(price => (
                <option key={price} value={price}>{price}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum Rating</label>
            <select name="rating" value={filters.rating} onChange={handleFilterChange}>
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>

          <div className="filter-group">
            <button onClick={resetFilters} className="btn-reset">Reset Filters</button>
          </div>
        </div>
      </div>

      <div className="tools-count">
        Showing {filteredTools.length} of {tools.length} tools
      </div>

      <div className="tools-grid">
        {filteredTools.length === 0 ? (
          <div className="no-tools">No tools found matching your filters.</div>
        ) : (
          filteredTools.map(tool => (
            <div key={tool.id} className="tool-card">
              <div className="tool-header">
                <h3 className="tool-name">{tool.name}</h3>
                <span className="tool-rating">⭐ {tool.rating.toFixed(1)}</span>
              </div>

              <p className="tool-description">{tool.description}</p>

              <div className="tool-meta">
                <span className="tool-category">📁 {tool.category}</span>
                <span className="tool-price">💰 {tool.pricingtype}</span>
              </div>

              <div className="tool-usecases">
                <strong>Use Cases:</strong> {tool.usecases}
              </div>

              <Link to={`/tools/${tool.id}`} className="btn-view-details">
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ToolsList;

