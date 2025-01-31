import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Available';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Not Available';
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }).format(date);
    } catch (error) {
      return 'Not Available';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="dashboard-content">
            <div className="profile-header">
              <div className="profile-avatar">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <h3>{user?.name}</h3>
              <p className="email">{user?.email}</p>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <label>Account Status</label>
                <span className="status-badge verified span">
                  Verified
                </span>
              </div>
              <div className="detail-item">
                <label>Member Since</label>
                <span className="date-info">
                  <i className="fas fa-calendar-alt"></i>
                  {formatDate(user?.createdAt)}
                </span>
              </div>
              <div className="detail-item">
                <label>Last Login</label>
                <span className="date-info">
                  <i className="fas fa-clock"></i>
                  {formatDate(user?.lastLoginAttempt)}
                </span>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="dashboard-content">
            <h3>Account Settings</h3>
            <div className="settings-section">
              <h4>Email Preferences</h4>
              <div className="setting-item">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <span>Receive email notifications</span>
              </div>
              <div className="setting-item">
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
                <span>Two-factor authentication</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="sidebar">
          <button
            className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </button>
          <button
            className="sidebar-btn logout-btn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>

        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 