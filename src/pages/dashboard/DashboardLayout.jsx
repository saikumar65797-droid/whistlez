import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import { useSidebar } from '../../context/SidebarContext';
import './DashboardLayout.css';

function DashboardLayout() {
  const { isCollapsed } = useSidebar();

  return (
    <div className={`dashboard-layout ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <Sidebar />
      <div className="dashboard-content">
        <Navbar />
        <main className="dashboard-outlet">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
