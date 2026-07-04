import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useSidebar } from '../../context/SidebarContext';
import './Users.css';

const users = [
  { id: '01', avatar: 'VK', name: 'Venky K.', email: 'venky@buzzsounds.com', phone: '+91 84569 65478', joined: 'Oct 24, 2023', style: 'photo', photoSrc: 'https://i.pravatar.cc/80?img=13' },
  { id: '02', avatar: 'A', name: 'Alice Smith', email: 'alice@soundart.io', phone: '+91 94569 65478', joined: 'Oct 22, 2023', style: 'green' },
  { id: '03', avatar: 'B', name: 'Bob Johnson', email: 'bjohnson@design.co', phone: '+91 77789 45896', joined: 'Oct 19, 2023', style: 'pink' },
  { id: '04', avatar: 'VK', name: 'Venky K.', email: 'venky@buzzsounds.com', phone: '+91 84569 65478', joined: 'Oct 24, 2023', style: 'photo', photoSrc: 'https://i.pravatar.cc/80?img=14' },
  { id: '05', avatar: 'A', name: 'Alice Smith', email: 'alice@soundart.io', phone: '+91 94569 65478', joined: 'Oct 22, 2023', style: 'salmon' },
  { id: '06', avatar: 'A', name: 'Alice Smith', email: 'alice@soundart.io', phone: '+91 94569 65478', joined: 'Oct 22, 2023', style: 'photo', photoSrc: 'https://i.pravatar.cc/80?img=47' },
  { id: '07', avatar: 'B', name: 'Bob Johnson', email: 'bjohnson@design.co', phone: '+91 77789 45896', joined: 'Oct 19, 2023', style: 'photo', photoSrc: 'https://i.pravatar.cc/80?img=68' },
  { id: '08', avatar: 'V', name: 'Venky K.', email: 'venky@buzzsounds.com', phone: '+91 84569 65478', joined: 'Oct 24, 2023', style: 'purple' },
  { id: '09', avatar: 'G', name: 'Gukesh Kumar', email: 'gukeshkumar@gamil.com', phone: '+91 77789 45896', joined: 'Oct 19, 2023', style: 'teal' },
  { id: '10', avatar: 'C', name: 'Clara Oswald', email: 'clara@spacetime.org', phone: '+91 68296 68873', joined: 'Oct 15, 2023', style: 'photo', photoSrc: 'https://i.pravatar.cc/80?img=51' },
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

function Users() {
  const { isCollapsed } = useSidebar();
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="users-page">
            <div className="users-page-header">
              <div>
                <h1>Users</h1>
              </div>
            </div>

            <div className="users-toolbar">
              <div className="users-search">
                <span className="search-icon"><SearchIcon /></span>
                <input type="text" placeholder="Search name, email..." />
              </div>
              <div className="users-filter">
                <span>Filter by</span>
                <button type="button" className="filter-dropdown">
                  Joined Date
                  <ChevronDownIcon />
                </button>
              </div>
            </div>

            <div className="users-table-card dashboard-table-panel">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th className="col-id">S.NO</th>
                    <th className="col-profile">PROFILE</th>
                    <th className="col-name">NAME</th>
                    <th className="col-email">EMAIL</th>
                    <th className="col-phone">PHONE NUMBER</th>
                    <th className="col-joined">JOINED</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="users-row">
                      <td className="col-id">{user.id}</td>
                      <td className="col-profile">
                        {user.style === 'photo' ? (
                          <img className="user-avatar avatar-photo" src={user.photoSrc} alt={user.name} />
                        ) : (
                          <span className={`user-avatar avatar-${user.style}`}>
                            {user.avatar}
                          </span>
                        )}
                      </td>
                      <td className="col-name">{user.name}</td>
                      <td className="col-email">{user.email}</td>
                      <td className="col-phone">{user.phone}</td>
                      <td className="col-joined">{user.joined}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="users-pagination">
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
          </section>
        </div>
      </div>
    </div>
  );
}

export default Users;