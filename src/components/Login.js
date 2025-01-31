import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresVerification) {
          localStorage.setItem('tempVerificationToken', data.verificationToken);
          localStorage.setItem('tempEmail', data.email);
          setIsVerificationSent(true);
          showToast('success', 'Please check your email to complete login');
        } else {
          login(data.token, data.user);
          showToast('success', 'Login successful! Redirecting...');
          
          // Redirect to the originally requested URL or dashboard
          const from = location.state?.from?.pathname || '/dashboard';
          setTimeout(() => navigate(from), 2000);
        }
      } else {
        showToast('error', data.message || 'Login failed');
      }
    } catch (error) {
      showToast('error', 'Login failed. Please try again.');
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

      <div className="login-header">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue</p>
      </div>
      
      {!isVerificationSent ? (
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <div className={`input-group ${touched.email && errors.email ? 'error' : ''}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                className={errors.email && touched.email ? 'error' : ''}
              />
              {errors.email && touched.email && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.email}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className={`input-group ${touched.password && errors.password ? 'error' : ''}`}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                className={errors.password && touched.password ? 'error' : ''}
              />
              {errors.password && touched.password && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.password}
                </div>
              )}
            </div>
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-content">
                <i className="fas fa-spinner fa-spin"></i>
                <span>Signing in...</span>
              </span>
            ) : (
              'Sign In'
            )}
          </button>
          
          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      ) : (
        <div className="verification-sent">
          <div className="verification-icon success">✓</div>
          <h3>Check Your Email</h3>
          <p>We've sent a verification link to:</p>
          <p className="email-sent">{formData.email}</p>
          <div className="verification-instructions">
            <p>Please check your email and click the verification link to complete login.</p>
            <p>The link will expire in 10 minutes for security.</p>
          </div>
          <p className="auth-link">
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login; 