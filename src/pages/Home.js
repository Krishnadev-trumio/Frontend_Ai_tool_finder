import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover the Best AI Tools</h1>
          <p className="hero-subtitle">
            Explore, review, and learn about cutting-edge AI tools for your projects
          </p>
          <div className="hero-buttons">
            <Link to="/tools" className="btn btn-primary"><i className="fas fa-search"></i>Browse Tools</Link>
            <Link to="/admin/login" className="btn btn-secondary">Admin Portal</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose AI Tools Hub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Discover</h3>
            <p>Browse through a curated collection of AI tools across various categories</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Review</h3>
            <p>Share your experience and read reviews from other users</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Filter</h3>
            <p>Find the perfect tool by filtering by category, price, and ratings</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Compare</h3>
            <p>Make informed decisions with detailed tool information and ratings</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Explore our collection of AI tools today</p>
        <Link to="/tools" className="btn btn-primary">Get Started</Link>
      </section>
    </div>
  );
};

export default Home;

