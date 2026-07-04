import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [hasNotification, setHasNotification] = useState(true);

  const handleNotificationClick = () => {
    setHasNotification(false);
  };

  return (
    <header className="dashboard-navbar">
      <div className="navbar-spacer"></div>
      <div className="navbar-actions">
        <button 
          type="button" 
          className="icon-button notification-btn" 
          aria-label="Notifications"
          onClick={handleNotificationClick}
        >
          <FaBell />
          {hasNotification && <span className="notification-badge"></span>}
        </button>
        
        <div className="navbar-divider"></div>
        
        <div className="navbar-profile">
          <div className="profile-text">
            <p>Admin Profile</p>
            <span>admin@whistlez.com</span>
          </div>
          <div className="profile-avatar">A</div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
