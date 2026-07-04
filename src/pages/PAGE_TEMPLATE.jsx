import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import './YourPageName.css';

function YourPageName() {
  return (
    <div className="page-main-container">
      <Sidebar />
      <div className="page-inner-container">
        <Navbar />
        <div className="page-content">
          {/* Your page content goes here */}
          <section className="your-page-section">
            {/* Add your content */}
          </section>
        </div>
      </div>
    </div>
  );
}

export default YourPageName;
