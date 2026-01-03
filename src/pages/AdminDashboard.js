import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [tools, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllTools();
      setTools(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load tools');
      console.error('Error fetching tools:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingReviews = async (toolId) => {
    try {
      const response = await adminAPI.getPendingReviews(toolId);
      setPendingReviews(response.data);
      setSelectedTool(toolId);
      setSuccessMessage('');
    } catch (err) {
      setError('Failed to load pending reviews');
      console.error('Error fetching reviews:', err);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      const response = await adminAPI.approveReview(reviewId);
      setSuccessMessage(response.data.status);
      // Refresh pending reviews
      fetchPendingReviews(selectedTool);
      // Refresh tools to update ratings
      fetchTools();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to approve review');
      console.error('Error approving review:', err);
    }
  };

  const handleRecalculateRating = async (toolId) => {
    try {
      const response = await adminAPI.recalculateRating(toolId);
      setSuccessMessage(response.data.status);
      fetchTools();
    } catch (err) {
      setError('Failed to recalculate rating');
      console.error('Error recalculating rating:', err);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user?.username}!</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-info">
            <h3>{tools.length}</h3>
            <p>Total Tools</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>{pendingReviews.length}</h3>
            <p>Pending Reviews</p>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/admin/add-tool" className="btn-primary">
          ➕ Add New Tool
        </Link>
      </div>

      <div className="dashboard-content">
        <section className="tools-section">
          <h2>Your AI Tools</h2>
          {tools.length === 0 ? (
            <p className="no-data">No tools yet. <Link to="/admin/add-tool">Add your first tool</Link></p>
          ) : (
            <div className="tools-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Pricing</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map(tool => (
                    <tr key={tool.id}>
                      <td>{tool.name}</td>
                      <td>{tool.category}</td>
                      <td>{tool.pricingtype}</td>
                      <td>⭐ {tool.rating.toFixed(1)}</td>
                      <td className="action-buttons">
                        <button
                          onClick={() => fetchPendingReviews(tool.id)}
                          className="btn-small"
                        >
                          View Reviews
                        </button>
                        <button
                          onClick={() => handleRecalculateRating(tool.id)}
                          className="btn-small"
                        >
                          Recalculate Rating
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {selectedTool && (
          <section className="reviews-section">
            <h2>Pending Reviews for Tool #{selectedTool}</h2>
            {pendingReviews.length === 0 ? (
              <p className="no-data">No pending reviews for this tool.</p>
            ) : (
              <div className="reviews-grid">
                {pendingReviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <span className="review-rating">⭐ {review.rating.toFixed(1)}</span>
                      <span className="review-status">{review.status}</span>
                    </div>
                    <p className="review-content">{review.content}</p>
                    <button
                      onClick={() => handleApproveReview(review.id)}
                      className="btn-approve"
                    >
                      ✓ Approve Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

