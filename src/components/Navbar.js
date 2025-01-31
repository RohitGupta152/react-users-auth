import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
          <Link to="/" className="brand-logo">
            ROHIT
          </Link>
        </div>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </Link>
            <Link 
              to="/portfolio" 
              className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
            >
              <i className="fas fa-user-tie"></i>
              <span>Portfolio</span>
            </Link>
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </Link>
                <Link 
                  to="/register" 
                  className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Register</span>
                </Link>
              </>
            ) : (
              <div className="nav-user-section" ref={dropdownRef}>
                <div 
                  className="user-info"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <div className="user-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user?.name}</span>
                  <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`}></i>
                </div>
                
                {showDropdown && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      <Link 
                        to="/dashboard" 
                        className={`dropdown-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="fas fa-th-large"></i>
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/profile" 
                        className={`dropdown-item ${location.pathname === '/profile' ? 'active' : ''}`}
                        onClick={() => setShowDropdown(false)}
                      >
                        <i className="fas fa-user"></i>
                        <span>Profile</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 