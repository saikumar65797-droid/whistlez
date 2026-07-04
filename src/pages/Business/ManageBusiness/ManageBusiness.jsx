import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { useSidebar } from '../../../context/SidebarContext';
import heroImage from '../../../assets/kims.jpg';
import './ManageBusiness.css';

const defaultBusiness = {
  name: 'Sri Krishna Hospital',
  industry: 'Healthcare',
  location: 'Hyderabad, India',
  address: '123 Health Ave, Outer Ring Road, Bangalore, 560103',
  phone: '+91 80 4567 8900',
  email: 'admin@whistlez.com',
  website: 'www.skhospital.com',
};

const stats = [
  { label: 'Avg. Daily Volume', value: '2,450' },
  { label: 'Active Tokens', value: '432' },
  { label: 'Completed Tokens', value: '234' },
  { label: 'Missed Tokens', value: '70' },
];

const queueSettings = [
  { label: 'Max Capacity', value: '500 Patients/Day', icon: 'people' },
  { label: 'Wait Interval', value: '~12 Minutes', icon: 'clock' },
  { label: 'Auto-Assign Logic', value: 'Priority First', icon: 'briefcase' },
];

const analyticsData = [
  { label: 'Mon', value: 35 },
  { label: 'Tue', value: 42 },
  { label: 'Wed', value: 46 },
  { label: 'Thu', value: 38 },
  { label: 'Fri', value: 49 },
  { label: 'Sat', value: 33 },
  { label: 'Sun', value: 45 },
];

const operatingHours = [
  { label: 'Monday - Friday', value: '08:00 AM - 10:00 PM' },
  { label: 'Saturday', value: '09:00 AM - 08:00 PM' },
  { label: 'Sunday', value: '24 Hours Emergency' },
];

const services = ['Emergency Care', 'OPD', 'Diagnostics', 'Pharmacy', 'Physiotherapy', 'Vaccination'];

/* ---- inline icons (no external icon package required) ---- */

const IconBack = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const IconPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 6.6 11.1 7.2 11.6a1.2 1.2 0 0 0 1.6 0C13.4 21.1 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 10.8A2.8 2.8 0 1 1 12 6.4a2.8 2.8 0 0 1 0 5.6z" />
  </svg>
);

const IconBadgeDot = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.5 12.2l1.8 1.8 3.7-4" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconContact = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
    <path d="M14 2v6h6" />
  </svg>
);

const IconQueue = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconAnalytics = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="20" x2="4" y2="12" />
    <line x1="10" y1="20" x2="10" y2="6" />
    <line x1="16" y1="20" x2="16" y2="14" />
    <line x1="22" y1="20" x2="22" y2="9" />
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

const IconServices = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.6 12.6L12.9 20.3a2 2 0 0 1-2.8 0l-7-7a2 2 0 0 1 0-2.8L10.8 2.8A2 2 0 0 1 12.2 2.2H19a2 2 0 0 1 2 2v6.8a2 2 0 0 1-.4 1.6z" />
    <circle cx="15.5" cy="7.5" r="1.5" />
  </svg>
);

const IconPeople = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBriefcase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const IconDeactivate = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="5.5" y1="18.5" x2="18.5" y2="5.5" />
  </svg>
);

const queueIcons = {
  people: IconPeople,
  clock: IconClock,
  briefcase: IconBriefcase,
};

function ManageBusiness() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isCollapsed } = useSidebar();
  const business = location.state?.business ?? defaultBusiness;

  const handleDeactivate = () => {
    window.alert('Business has been deactivated.');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    window.alert('Changes have been saved.');
  };

  const maxAnalyticsValue = Math.max(...analyticsData.map((item) => item.value));

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="manage-business-page">
            <button type="button" className="manage-business-breadcrumb" onClick={handleCancel}>
              <IconBack />
              <span>{business.name}</span>
            </button>

            <div className="manage-business-hero">
              <img
                className="manage-business-hero-image"
                src={heroImage}
                alt="Business hero"
              />
              <div className="manage-business-hero-content">
                <h1>
                  {business.name}
                  <span className="hero-title-badge">
                    <IconBadgeDot />
                  </span>
                </h1>
                <div className="hero-meta-row">
                  <span className="hero-meta-item">
                    <IconContact />
                    {business.industry}
                  </span>
                  <span className="hero-meta-item">
                    <IconPin />
                    {business.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="business-statistics">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <p>{stat.label}</p>
                  <h2>{stat.value}</h2>
                </div>
              ))}
            </div>

            <div className="manage-business-panels">
              <div className="manage-business-panel">
                <h3>
                  <IconContact />
                  Contact Information
                </h3>
                <ul className="contact-list">
                  <li>
                    <span>Address</span>
                    <strong>{business.address}</strong>
                  </li>
                  <li>
                    <span>Phone</span>
                    <strong>{business.phone}</strong>
                  </li>
                  <li>
                    <span>Email</span>
                    <strong>{business.email}</strong>
                  </li>
                  <li>
                    <span>Website</span>
                    <strong>{business.website}</strong>
                  </li>
                </ul>
              </div>

              <div className="manage-business-panel">
                <h3>
                  <IconQueue />
                  Queue Settings
                </h3>
                <div className="queue-setting-list">
                  {queueSettings.map((item) => {
                    const ItemIcon = queueIcons[item.icon];
                    return (
                      <div key={item.label} className="queue-row">
                        <div className="queue-row-text">
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                        </div>
                        <span className="queue-row-icon">
                          <ItemIcon />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="manage-business-panel manage-business-panel--analytics">
                <div className="analytics-header">
                  <h3>
                    <IconAnalytics />
                    Token Analytics
                  </h3>
                </div>
                <div className="analytics-chart">
                  {analyticsData.map((item) => (
                    <div key={item.label} className="analytics-bar-wrapper">
                      <div
                        className={`analytics-bar ${item.value >= maxAnalyticsValue - 4 ? 'analytics-bar--active' : ''}`}
                        style={{ height: `${(item.value / maxAnalyticsValue) * 100}%` }}
                      />
                      <small>{item.label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="manage-business-panels manage-business-panels--split">
              <div className="manage-business-panel">
                <h3>
                  <IconClock />
                  Operating Hours
                </h3>
                <ul className="hours-list">
                  {operatingHours.map((item) => (
                    <li key={item.label}>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="manage-business-panel">
                <h3>
                  <IconServices />
                  Service Details
                </h3>
                <div className="service-tags">
                  {services.map((service) => (
                    <span key={service} className={`service-tag ${service === 'OPD' ? 'service-tag--active' : ''}`}>
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="manage-business-actions-row">
              <button type="button" className="button button--danger" onClick={handleDeactivate}>
                <IconDeactivate />
                Deactivate Business
              </button>
              <div className="button-group">
                <button type="button" className="button button--ghost" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="button" className="button button--primary" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ManageBusiness;