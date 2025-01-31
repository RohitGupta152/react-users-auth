import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const VerifyLogin = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [status, setStatus] = useState({
    type: 'loading',
    message: 'Verifying your login...',
    details: null
  });
  const [countdown, setCountdown] = useState(null);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    let timer;
    const verifyLoginToken = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setStatus({
          type: 'error',
          message: '✕ Invalid Login Verification Link',
          details: 'Please use the verification link sent to your email.'
        });
        
        setCountdown(5);
        timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return;
      }

      try {
        const response = await fetch(`https://new-auth-with-admin.vercel.app/api/auth/verify-login/${token}`);
        const data = await response.json();

        if (response.ok) {
          // Store the JWT token and user data using the auth context
          login(data.token, data.user);
          
          setStatus({
            type: 'success',
            message: '✓ Login Verified Successfully!',
            details: 'Your login has been verified. You will be redirected to your dashboard.'
          });
          
          setCountdown(5);
          timer = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/dashboard');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setStatus({
            type: 'error',
            message: '✕ Verification Failed',
            details: data.message || 'This verification link is invalid or has expired.'
          });
          
          setCountdown(5);
          timer = setInterval(() => {
            setCountdown(prev => {
              if (prev <= 1) {
                clearInterval(timer);
                navigate('/login');
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        }
      } catch (error) {
        console.error('Login verification error:', error);
        setStatus({
          type: 'error',
          message: '✕ Verification Error',
          details: 'Unable to verify your login. Please try again.'
        });
        
        setCountdown(5);
        timer = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/login');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    verifyLoginToken();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [searchParams, navigate, login]);

  return (
    <div className="auth-container login-container">
      <div className="auth-header">
        <h2>Login Verification</h2>
        <p className="auth-subtitle">
          {status.type === 'loading' ? 'Please wait while we verify your login' : 
           status.type === 'success' ? 'Verification Complete' : 
           'Verification Failed'}
        </p>
      </div>

      <div className="verification-status">
        {status.type === 'loading' && (
          <div className="status-content">
            <div className="status-icon loading">
              <div className="loading-spinner"></div>
            </div>
            <div className="status-message">{status.message}</div>
          </div>
        )}

        {status.type === 'success' && (
          <div className="status-content">
            <div className="status-icon success pulse">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="status-message success">{status.message}</div>
            <div className="status-details">{status.details}</div>
            {countdown > 0 && (
              <div className="redirect-message">
                <span>Redirecting to dashboard in {countdown} seconds...</span>
                <div className="countdown-progress">
                  <div 
                    className="progress-bar success-bar" 
                    style={{ 
                      width: `${(countdown / 5) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {status.type === 'error' && (
          <div className="status-content">
            <div className="status-icon error shake">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div className="status-message error">{status.message}</div>
            <div className="status-details">{status.details}</div>
            {countdown > 0 && (
              <div className="redirect-message">
                <span>Redirecting to login page in {countdown} seconds...</span>
                <div className="countdown-progress">
                  <div 
                    className="progress-bar error-bar" 
                    style={{ 
                      width: `${(countdown / 5) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
            <div className="verification-actions">
              <Link to="/login" className="auth-button primary">
                Back to Login
              </Link>
              <Link to="/register" className="auth-button secondary">
                Register New Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyLogin; 
