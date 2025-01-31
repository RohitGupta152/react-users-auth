import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to ROHIT</h1>
        <p className="hero-subtitle">Secure Authentication System</p>
        
        <div className="hero-actions">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hero-btn primary">
                <i className="fas fa-sign-in-alt"></i> Get Started
              </Link>
              <Link to="/register" className="hero-btn secondary">
                <i className="fas fa-user-plus"></i> Create Account
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="hero-btn primary dashboard-btn">
              <i className="fas fa-th-large"></i> Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Authentication</h3>
            <p>Advanced security measures to protect your account</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-envelope"></i>
            <h3>Email Verification</h3>
            <p>Two-step verification process for added security</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-user-shield"></i>
            <h3>Password Recovery</h3>
            <p>Easy and secure password reset process</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Responsive Design</h3>
            <p>Seamless experience across all devices</p>
          </div>
        </div>
      </div>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>ROHIT</h3>
            <p>Secure Authentication System</p>
          </div>
          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              {isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
            </div>
            <div className="footer-section">
              <h4>Help</h4>
              <Link to="/forgot-password">Reset Password</Link>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ROHIT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home; 