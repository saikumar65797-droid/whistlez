import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';
import {
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { MdOutlineMenu } from 'react-icons/md';
import WhistlezLogo from '../../assets/whistlez-logo.png';
import { DashboardIcon, ReportsIcon, SettingsIcon, LogoutIcon, UsersIcon, BusinessIcon, RingtoneIcon, AdsIcon } from './SidebarIcons';

// Nav items configuration
const getNavItems = () => {
  return [
    {
      label: 'Dashboard',
      path: ['/', '/dashboard'],
      icon: DashboardIcon,
      navigate: '/dashboard',
    },
    {
      label: 'Users',
      path: ['/users'],
      icon: UsersIcon,
      navigate: '/users',
    },
    {
      label: 'Business',
      path: ['/business'],
      icon: BusinessIcon,
      navigate: '/business',
    },
    {
      label: 'Ringtone',
      path: ['/whistlez-ringtone'],
      icon: RingtoneIcon,
      navigate: '/whistlez-ringtone',
    },
    {
      label: 'Ads',
      path: ['/ads'],
      icon: AdsIcon,
      navigate: '/ads',
    },
    {
      label: 'Reports',
      path: ['/dashboard/reports'],
      icon: ReportsIcon,
      navigate: '/dashboard/reports',
    },
    {
      label: 'Settings',
      path: ['/dashboard/settings'],
      icon: SettingsIcon,
      navigate: '/dashboard/settings',
    },
  ];
};

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed, setIsCollapsed } = useSidebar();
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1150);

  const navItems = getNavItems();

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1150;
      setIsLargeScreen(isLarge);
      if (isLarge) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleToggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleNavigate = useCallback(
    (path) => {
      navigate(path);
      if (window.innerWidth < 1150) {
        setIsSidebarOpen(false);
      }
    },
    [navigate]
  );

  const isActive = useCallback(
    (itemPaths) => {
      const currentPath = location.pathname;
      
      // Check for exact match
      if (itemPaths.includes(currentPath)) {
        return true;
      }
      
      // For sub-paths, only match if this is the most specific path
      const matchingPaths = itemPaths.filter(p => 
        currentPath.startsWith(p + '/')
      );
      
      if (matchingPaths.length === 0) return false;
      
      // Get the longest matching path from this item
      const longestItemPath = matchingPaths.reduce((a, b) => 
        a.length > b.length ? a : b
      );
      
      // Check if any other nav item has an even more specific match
      const hasMoreSpecificMatch = navItems.some(item => {
        if (item.path[0] === itemPaths[0]) return false; // Skip self
        
        return item.path.some(otherPath => 
          otherPath.length > longestItemPath.length &&
          (currentPath === otherPath || currentPath.startsWith(otherPath + '/'))
        );
      });
      
      return !hasMoreSpecificMatch;
    },
    [location.pathname, navItems]
  );

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate('/login');
  }

  return (
    <>
      {!isLargeScreen && (
        <button 
          className={`sidebar-toggle-btn ${isSidebarOpen ? 'sidebar-toggle-btn--hidden' : ''}`}
          onClick={handleToggleSidebar} 
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <MdOutlineMenu size={20} />
        </button>
      )}

      <div
        className={`sidebar ${isSidebarOpen ? 'open' : 'closed'} ${isCollapsed ? 'collapsed' : 'expanded'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Collapse button */}
        {isLargeScreen && (
          <button
            className="sidebar-collapse-btn"
            onClick={handleToggleCollapse}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={12} />}
          </button>
        )}

        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {!isCollapsed ? (
              <div className="logo-expanded">
                <img loading="lazy" src={WhistlezLogo} alt="Whistlez Logo" className="logo-image" />
              </div>
            ) : (
              <div className="logo-collapsed">
                <img loading="lazy" src={WhistlezLogo} alt="Whistlez Logo" className="logo-image-small" />
              </div>
            )}
            {!isLargeScreen && (
              <button className="sidebar-close-btn" onClick={handleToggleSidebar} aria-label="Close menu">
                <IoClose size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Section label - Hidden */}
        {/* {!isCollapsed && <p className="sidebar-section-label">MAIN MENU</p>} */}

        {/* Nav */}
        <div className="sidebar-nav-container">
          <ul className="sidebar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li
                  key={item.label}
                  className={active ? 'active' : ''}
                  onClick={() => handleNavigate(item.navigate)}
                  title={isCollapsed ? item.label : ''}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="nav-icon-wrap">
                    <Icon isActive={active} />
                  </span>
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          {/* Footer label - Hidden */}
          {/* {!isCollapsed && <p className="sidebar-section-label footer-label">ACCOUNT</p>} */}
          <div className="sidebar-divider" />
          <ul className="sidebar-bottom-nav">
            <li className="logout-item" onClick={handleLogout} title={isCollapsed ? 'Logout' : ''}>
              <span className="nav-icon-wrap">
                <LogoutIcon />
              </span>
              {!isCollapsed && <span className="nav-label">Logout</span>}
            </li>
          </ul>
        </div>
      </div>

      {!isLargeScreen && isSidebarOpen && (
        <div className="sidebar-overlay" onClick={handleToggleSidebar} aria-hidden="true" />
      )}
    </>
  );
}

export default Sidebar;
