import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import '../styles/AddTool.css';

const AddTool = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    usecases: '',
    category: '',
    pricingtype: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const categories = [
    'Image Generation',
    'Text Generation',
    'Code Assistant',
    'Data Analysis',
    'Video Editing',
    'Audio Processing',
    'Chatbot',
    'Translation',
    'Design',
    'Other'
  ];

  const pricingTypes = ['Free', 'Freemium', 'Paid', 'Enterprise'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await adminAPI.addTool(formData);
      alert('Tool added successfully!');
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add tool. Please try again.');
      console.error('Error adding tool:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-tool-container">
      <div className="add-tool-card">
        <h1 className="page-title">Add New AI Tool</h1>
        <p className="page-subtitle">Fill in the details to add a new AI tool to the platform</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="add-tool-form">
          <div className="form-group">
            <label>Tool Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., ChatGPT, DALL-E, GitHub Copilot"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the AI tool..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Use Cases *</label>
            <textarea
              name="usecases"
              value={formData.usecases}
              onChange={handleChange}
              placeholder="Describe the use cases and applications of this tool..."
              rows="3"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Pricing Type *</label>
              <select
                name="pricingtype"
                value={formData.pricingtype}
                onChange={handleChange}
                required
              >
                <option value="">Select pricing type</option>
                {pricingTypes.map(price => (
                  <option key={price} value={price}>{price}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding Tool...' : 'Add Tool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTool;

