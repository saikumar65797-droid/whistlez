import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useSidebar } from '../../context/SidebarContext';
import './Settings.css';

function Settings() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="settings-section">
            <h1>Settings</h1>
            <p>Configure and manage your application settings</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Settings;
