import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userAPI } from '../services/api';
import '../styles/ToolDetails.css';

const ToolDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tool, setTool] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    content: '',
    rating: 5,
  });
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    fetchToolDetails();
    fetchReviews();
  }, [id]);

  const fetchToolDetails = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllTools();
      const foundTool = response.data.find(t => t.id === parseInt(id));
      if (foundTool) {
        setTool(foundTool);
      } else {
        setError('Tool not found');
      }
    } catch (err) {
      setError('Failed to load tool details');
      console.error('Error fetching tool:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await userAPI.getApprovedReviews(id);
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    if (!reviewData.content.trim()) {
      setSubmitError('Please write a review');
      return;
    }

    try {
      const response = await userAPI.addReview(id, reviewData);
      setSubmitSuccess(response.data.status);
      setReviewData({ content: '', rating: 5 });
      setShowReviewForm(false);
      // Reviews will appear after admin approval
    } catch (err) {
      setSubmitError('Failed to submit review. Please try again.');
      console.error('Error submitting review:', err);
    }
  };

  if (loading) return <div className="loading">Loading tool details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!tool) return <div className="error-message">Tool not found</div>;

  return (
    <div className="tool-details-container">
      <button onClick={() => navigate('/tools')} className="btn-back">
        ← Back to Tools
      </button>

      <div className="tool-details-header">
        <div className="tool-title-section">
          <h1>{tool.name}</h1>
          <div className="tool-rating-large"><i className="fas fa-star"></i>{tool.rating.toFixed(1)}</div>
        </div>

        <div className="tool-meta-info">
          <span className="meta-badge"><i className="fas fa-folder-open"></i>{tool.category}</span>
          <span className="meta-badge"><i className="fas fa-wallet"></i>{tool.pricingtype}</span>
        </div>
      </div>

      <div className="tool-details-content">
        <section className="tool-section">
          <h2>Description</h2>
          <p>{tool.description}</p>
        </section>

        <section className="tool-section">
          <h2>Use Cases</h2>
          <p>{tool.usecases}</p>
        </section>

        <section className="tool-section reviews-section">
          <div className="reviews-header">
            <h2>Reviews ({reviews.length})</h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-primary"
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {submitSuccess && (
            <div className="success-message">{submitSuccess}</div>
          )}

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label>Rating</label>
                <select
                  name="rating"
                  value={reviewData.rating}
                  onChange={handleReviewChange}
                  required
                >
                  <option value="5"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>(5)</option>
                  <option value="4"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>(4)</option>
                  <option value="3"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>(3)</option>
                  <option value="2"><i className="fas fa-star"></i><i className="fas fa-star"></i> (2)</option>
                  <option value="1"><i className="fas fa-star"></i> (1)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  name="content"
                  value={reviewData.content}
                  onChange={handleReviewChange}
                  placeholder="Share your experience with this tool..."
                  rows="5"
                  required
                />
              </div>

              {submitError && <div className="error-message">{submitError}</div>}

              <button type="submit" className="btn-primary">Submit Review</button>
            </form>
          )}

          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review this tool!</p>
            ) : (
              reviews.map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-rating"><i className="fas fa-star"></i>{review.rating.toFixed(1)}</div>
                  <p className="review-content">{review.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolDetails;

