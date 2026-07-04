import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useSidebar } from '../../context/SidebarContext';
import { useNavigate } from 'react-router-dom';
import './DashboardHome.css';

const summaryCards = [
  {
    label: 'Total Business',
    value: '1,248',
    change: '+18% this week',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9998 13H13.0107M17.3332 6.49999V4.33332C17.3332 3.75869 17.1049 3.20759 16.6986 2.80126C16.2922 2.39493 15.7411 2.16666 15.1665 2.16666H10.8332C10.2585 2.16666 9.70743 2.39493 9.30111 2.80126C8.89478 3.20759 8.6665 3.75869 8.6665 4.33332V6.49999M23.8332 14.0833C20.6187 16.2056 16.8517 17.3369 12.9998 17.3369C9.14799 17.3369 5.38098 16.2056 2.1665 14.0833" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21.6665 6.5H4.33317C3.13655 6.5 2.1665 7.47005 2.1665 8.66667V19.5C2.1665 20.6966 3.13655 21.6667 4.33317 21.6667H21.6665C22.8631 21.6667 23.8332 20.6966 23.8332 19.5V8.66667C23.8332 7.47005 22.8631 6.5 21.6665 6.5Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Total Users',
    value: '12,480',
    change: '+18% this week',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21V19C16 16.7923 14.2077 15 12 15H6C3.79234 15 2 16.7923 2 19V21M16 3.12799C17.7642 3.58536 18.9962 5.17746 18.9962 6.99999C18.9962 8.82252 17.7642 10.4146 16 10.872M22 21V19C21.9986 17.1771 20.765 15.5857 19 15.13" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 7C5 8.42906 5.7624 9.74957 7 10.4641C8.2376 11.1786 9.7624 11.1786 11 10.4641C12.2376 9.74957 13 8.42906 13 7C13 4.79234 11.2077 3 9 3C6.79234 3 5 4.79234 5 7H5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'Active Ads',
    value: '8',
    change: 'Max limit reached',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 6.00001C14.0414 6.07835 17.0139 5.08751 19.4 3.20001C19.703 2.97274 20.1084 2.93619 20.4472 3.10558C20.786 3.27497 21 3.62123 21 4.00001V16C21 16.3788 20.786 16.725 20.4472 16.8944C20.1084 17.0638 19.703 17.0273 19.4 16.8C17.0139 14.9125 14.0414 13.9217 11 14H5C3.89617 14 3 13.1038 3 12V8.00001C3 6.89618 3.89617 6.00001 5 6.00001H11" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 14C6 16.5964 6.84213 19.1228 8.4 21.2C9.0623 22.0831 10.3169 22.2623 11.2 21.6C12.0831 20.9377 12.2623 19.6831 11.6 18.8C10.5614 17.4152 10 15.731 10 14M8 6V14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const TrendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3.5H11V6.5" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 3.5L6.75 7.75L4.25 5.25L1 8.5" stroke="#7C3AED" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const MegaphoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 6.00001C14.0414 6.07835 17.0139 5.08751 19.4 3.20001C19.703 2.97274 20.1084 2.93619 20.4472 3.10558C20.786 3.27497 21 3.62123 21 4.00001V16C21 16.3788 20.786 16.725 20.4472 16.8944C20.1084 17.0638 19.703 17.0273 19.4 16.8C17.0139 14.9125 14.0414 13.9217 11 14H5C3.89617 14 3 13.1038 3 12V8.00001C3 6.89618 3.89617 6.00001 5 6.00001H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14C6 16.5964 6.84213 19.1228 8.4 21.2C9.0623 22.0831 10.3169 22.2623 11.2 21.6C12.0831 20.9377 12.2623 19.6831 11.6 18.8C10.5614 17.4152 10 15.731 10 14M8 6V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 16.7923 14.2077 15 12 15H6C3.79234 15 2 16.7923 2 19V21M16 3.12799C17.7642 3.58536 18.9962 5.17746 18.9962 6.99999C18.9962 8.82252 17.7642 10.4146 16 10.872M22 21V19C21.9986 17.1771 20.765 15.5857 19 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7C5 8.42906 5.7624 9.74957 7 10.4641C8.2376 11.1786 9.7624 11.1786 11 10.4641C12.2376 9.74957 13 8.42906 13 7C13 4.79234 11.2077 3 9 3C6.79234 3 5 4.79234 5 7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const growthData = [
  { label: 'Mon', value: 10 },
  { label: 'Tue', value: 16 },
  { label: 'Wed', value: 17, active: true },
  { label: 'Thu', value: 15 },
  { label: 'Fri', value: 13 },
  { label: 'Sat', value: 8 },
  { label: 'Sun', value: 20, active: true },
];

const maxGrowthValue = Math.max(...growthData.map((bar) => bar.value));

const todayUsers = [
  {
    sno: '01',
    name: 'Venky K.',
    email: 'venky@buzzsounds.com',
    phone: '+91 84569 65478',
    joined: 'Oct 24, 2023',
    avatarType: 'photo',
    avatarSrc: 'https://i.pravatar.cc/80?img=13',
  },
  {
    sno: '02',
    name: 'Alice Smith',
    email: 'alice@soundart.io',
    phone: '+91 94569 65478',
    joined: 'Oct 22, 2023',
    avatarType: 'initial',
    initial: 'A',
  },
  {
    sno: '03',
    name: 'Clara Oswald',
    email: 'clara@spacetime.org',
    phone: '+91 68296 68873',
    joined: 'Oct 15, 2023',
    avatarType: 'photo',
    avatarSrc: 'https://i.pravatar.cc/80?img=51',
  },
];

const registeredBusinesses = [
  {
    sno: '01',
    name: 'Sri Krishna Hospital',
    email: 'krishnahospitals@gmail.com',
    phone: '+91 84569 65478',
    joined: 'Oct 24, 2023',
    avatarType: 'photo',
    avatarSrc: 'https://i.pravatar.cc/80?img=32',
  },
  {
    sno: '02',
    name: 'Urban Cafe',
    email: 'urbancafe@soundart.io',
    phone: '+91 94569 65478',
    joined: 'Oct 22, 2023',
    avatarType: 'initial',
    initial: 'UC',
  },
  {
    sno: '03',
    name: 'Global Logistics',
    email: 'globallogistics@spacetime.org',
    phone: '+91 68296 68873',
    joined: 'Oct 15, 2023',
    avatarType: 'initial',
    initial: 'GL',
  },
];

function DashboardHome() {
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="dashboard-home">
            <header className="dashboard-top-header">
              <h1>Dashboard</h1>
            </header>

            <div className="dashboard-summary-cards">
              {summaryCards.map((card) => (
                <div key={card.label} className="summary-card">
                  <div className="summary-card-body">
                    <div>
                      <p className="summary-label">{card.label}</p>
                      <h2>{card.value}</h2>
                      <div className="summary-change">
                        <TrendIcon />
                        <span>{card.change}</span>
                      </div>
                    </div>
                    <div className="summary-card-icon">{card.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="dashboard-content-row">
              <div className="dashboard-panel dashboard-panel--grow">
                <h2>Usage &amp; Growth</h2>

                <div className="growth-widget">
                  <div className="growth-widget-header">
                    <div>
                      <p>User Growth</p>
                    </div>
                    <button className="panel-filter">Week</button>
                  </div>

                  <div className="growth-chart">
                    {growthData.map((bar) => (
                      <div key={bar.label} className="chart-bar-item">
                        <span className="chart-bar-value">{bar.value}</span>
                        <span
                          className={`chart-bar ${bar.active ? 'chart-bar--active' : ''}`}
                          style={{ height: `${(bar.value / maxGrowthValue) * 100}%` }}
                        />
                        <small>{bar.label}</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="dashboard-panel dashboard-panel--actions">
                <div className="panel-header panel-header--compact">
                  <h2>Quick Actions</h2>
                </div>
                <button
                  type="button"
                  className="action-button action-button--primary"
                  onClick={() => navigate('/whistlez-ringtone')}
                >
                  <PlusCircleIcon />
                  Add Ringtone
                </button>
                <button
                  type="button"
                  className="action-button action-button--secondary"
                  onClick={() => navigate('/ads')}
                >
                  <MegaphoneIcon />
                  Create Ad
                </button>
                <button
                  type="button"
                  className="action-button action-button--ghost"
                  onClick={() => navigate('/users')}
                >
                  <UsersIcon />
                  View Users
                </button>
              </div>
            </div>

            <div className="dashboard-table-row">
              <div className="dashboard-panel dashboard-table-panel">
                <div className="panel-header">
                  <div>
                    <h2>Today User</h2>
                  </div>
                  <button className="view-all" onClick={() => navigate('/users')}>View All</button>
                </div>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>PROFILE</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE NUMBER</th>
                      <th>JOINED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayUsers.map((user) => (
                      <tr key={user.sno}>
                        <td>{user.sno}</td>
                        <td>
                          {user.avatarType === 'photo' ? (
                            <img className="avatar avatar--photo" src={user.avatarSrc} alt={user.name} />
                          ) : (
                            <span className="avatar avatar--initial">{user.initial}</span>
                          )}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="dashboard-panel dashboard-table-panel">
                <div className="panel-header">
                  <div>
                    <h2>Registered Business</h2>
                  </div>
                  <button className="view-all" onClick={() => navigate('/business')}>View All</button>
                </div>
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>S.NO</th>
                      <th>PROFILE</th>
                      <th>BUSINESS NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE NUMBER</th>
                      <th>JOINED</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredBusinesses.map((business) => (
                      <tr key={business.sno}>
                        <td>{business.sno}</td>
                        <td>
                          {business.avatarType === 'photo' ? (
                            <img className="avatar avatar--photo" src={business.avatarSrc} alt={business.name} />
                          ) : (
                            <span className="avatar avatar--initial">{business.initial}</span>
                          )}
                        </td>
                        <td>{business.name}</td>
                        <td>{business.email}</td>
                        <td>{business.phone}</td>
                        <td>{business.joined}</td>
                        <td>
                          <button
                            type="button"
                            className="table-action-link"
                            onClick={() => navigate('/business/view')}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;