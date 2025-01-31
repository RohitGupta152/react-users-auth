import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [isEmailSent, setIsEmailSent] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://new-auth-with-admin.vercel.app/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setIsEmailSent(true);
        showToast('success', 'Reset link sent successfully!');
      } else {
        showToast('error', data.message || 'Failed to send reset link');
      }
    } catch (error) {
      showToast('error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container login-container">
      {toast.show && (
        <div className={`toast-message ${toast.type}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <span className="toast-text">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="auth-header">
        <h2>Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your email to reset your password
        </p>
      </div>

      {!isEmailSent ? (
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({});
                  }
                }}
                className={errors.email ? 'error' : ''}
                placeholder="Enter your email"
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <p className="auth-link">
            Remember your password? <Link to="/login">Login</Link>
          </p>
        </form>
      ) : (
        <div className="verification-sent">
          <div className="verification-icon success">✓</div>
          <h3>Check Your Email</h3>
          <p>We've sent a password reset link to:</p>
          <p className="email-sent">{email}</p>
          <div className="verification-instructions">
            <p>Click the link in the email to reset your password.</p>
            <p>The link will expire in 1 hour for security.</p>
          </div>
          <p className="auth-link">
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword; 
