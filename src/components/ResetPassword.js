import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Password validation criteria
  const passwordCriteria = {
    minLength: formData.password.length >= 6,
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    matches: formData.password === formData.confirmPassword
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear specific error when user starts typing
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

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordCriteria.minLength || !passwordCriteria.hasUpper || 
               !passwordCriteria.hasLower || !passwordCriteria.hasNumber) {
      newErrors.password = 'Please ensure your password meets all requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!passwordCriteria.matches) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = searchParams.get('token');
    
    if (!token) {
      showToast('error', 'Invalid reset link');
      return;
    }

    if (!validateForm()) {
      showToast('error', 'Please fix the errors in the form');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        showToast('success', 'Password reset successful! Redirecting to login...');
        localStorage.removeItem('tempResetToken');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        showToast('error', data.message || 'Failed to reset password');
      }
    } catch (error) {
      showToast('error', 'Failed to reset password. Please try again.');
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
        <h2>Create New Password</h2>
        <p className="auth-subtitle">Please create a strong password for your account</p>
      </div>

      <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
          <label>New Password</label>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-text">{errors.password}</div>}
          </div>
          <div className="password-criteria">
            <div className={`criteria ${passwordCriteria.minLength ? 'met' : ''}`}>
              At least 6 characters
            </div>
            <div className={`criteria ${passwordCriteria.hasUpper ? 'met' : ''}`}>
              One uppercase letter
            </div>
            <div className={`criteria ${passwordCriteria.hasLower ? 'met' : ''}`}>
              One lowercase letter
            </div>
            <div className={`criteria ${passwordCriteria.hasNumber ? 'met' : ''}`}>
              One number
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <div className="error-text">{errors.confirmPassword}</div>
            )}
          </div>
        </div>

        <button 
          type="submit" 
          className={`submit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword; 