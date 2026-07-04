import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Navbar from '../../../components/Navbar/Navbar';
import { useSidebar } from '../../../context/SidebarContext';
import './Business.css';

const businesses = [
  {
    id: 'sri-krishna-hospital',
    name: 'Sri Krishna Hospital',
    owner: 'Dr. Rahul Sharma',
    domain: 'Healthcare',
    location: 'Hyderabad, TS',
    registered: 'Oct 12, 2023',
    avatarSrc: 'https://i.pravatar.cc/80?img=32',
  },
  {
    id: 'nexus-logistics',
    name: 'Nexus Logistics',
    owner: 'Sarah Jenkins',
    domain: 'Supply Chain',
    location: 'Hyderabad, TS',
    registered: 'Jan 04, 2024',
    avatarSrc: 'https://i.pravatar.cc/80?img=25',
  },
  {
    id: 'evergreen-finance',
    name: 'Evergreen Finance',
    owner: 'Mark Thompson',
    domain: 'Fintech',
    location: 'Hyderabad, TS',
    registered: 'Nov 30, 2022',
    avatarSrc: 'https://i.pravatar.cc/80?img=60',
  },
  {
    id: 'aura-tech-solutions',
    name: 'Aura Tech Solutions',
    owner: 'Chen Wei',
    domain: 'Software',
    location: 'Hyderabad, TS',
    registered: 'Feb 22, 2024',
    avatarSrc: 'https://i.pravatar.cc/80?img=68',
  },
];

const totalPages = [1, 2, 3, 4];

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function Business() {
  const navigate = useNavigate();
  const { isCollapsed } = useSidebar();
  const [activePage, setActivePage] = useState(1);

  const handleViewProfile = (business) => {
    navigate('/business/view', { state: { business } });
  };

  const handleManageBusiness = (business) => {
    navigate('/business/manage', { state: { business } });
  };

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="business-page">
            <div className="business-page-header">
              <h1>Business Users</h1>
            </div>

            <div className="business-card-outer">
              <div className="business-toolbar">
                <div className="business-search">
                  <span className="search-icon"><SearchIcon /></span>
                  <input type="text" placeholder="Search name, email..." />
                </div>
                <div className="business-filter">
                  <span>Filter by</span>
                  <button type="button" className="filter-dropdown">
                    Joined Date
                    <ChevronDownIcon />
                  </button>
                </div>
              </div>

              <div className="business-grid">
                {businesses.map((business) => (
                  <div key={business.id} className="business-card">
                    <div className="business-card-header">
                      <img className="business-avatar" src={business.avatarSrc} alt={business.name} />
                      <h2>{business.name}</h2>
                    </div>

                    <div className="business-card-details">
                      <div className="business-detail-row">
                        <span className="detail-label">Owner</span>
                        <span className="detail-value">{business.owner}</span>
                      </div>
                      <div className="business-detail-row">
                        <span className="detail-label">Domain</span>
                        <span className="detail-value">{business.domain}</span>
                      </div>
                      <div className="business-detail-row">
                        <span className="detail-label">Location</span>
                        <span className="detail-value">{business.location}</span>
                      </div>
                      <div className="business-detail-row">
                        <span className="detail-label">Registered</span>
                        <span className="detail-value">{business.registered}</span>
                      </div>
                    </div>

                    <div className="business-card-actions">
                      <button type="button" className="business-button business-button--outline" onClick={() => handleViewProfile(business)}>
                        View Profile
                      </button>
                      <button type="button" className="business-button business-button--solid" onClick={() => handleManageBusiness(business)}>
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="business-pagination">
                <button type="button" className="page-nav-button" aria-label="Previous page">
                  <ChevronLeftIcon />
                </button>
                {totalPages.map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`page-number-button ${activePage === page ? 'page-number-button--active' : ''}`}
                    onClick={() => setActivePage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button type="button" className="page-nav-button" aria-label="Next page">
                  <ChevronRightIcon />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Business;