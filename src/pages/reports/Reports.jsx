import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import { useSidebar } from '../../context/SidebarContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Reports.css';

const UsersReportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 21V19C16 16.7923 14.2077 15 12 15H6C3.79234 15 2 16.7923 2 19V21M16 3.12799C17.7642 3.58536 18.9962 5.17746 18.9962 6.99999C18.9962 8.82252 17.7642 10.4146 16 10.872M22 21V19C21.9986 17.1771 20.765 15.5857 19 15.13" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 7C5 8.42906 5.7624 9.74957 7 10.4641C8.2376 11.1786 9.7624 11.1786 11 10.4641C12.2376 9.74957 13 8.42906 13 7C13 4.79234 11.2077 3 9 3C6.79234 3 5 4.79234 5 7H5" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BusinessReportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12H12.01M16 6V4C16 3.46957 15.7893 2.96086 15.4142 2.58579C15.0391 2.21071 14.5304 2 14 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V6M22 13C19.0328 14.959 15.5555 16.0033 12 16.0033C8.44445 16.0033 4.96721 14.959 2 13" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20 6H4C2.89543 6 2 6.89543 2 8V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V8C22 6.89543 21.1046 6 20 6Z" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AdsReportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 6.00001C14.0414 6.07835 17.0139 5.08751 19.4 3.20001C19.703 2.97274 20.1084 2.93619 20.4472 3.10558C20.786 3.27497 21 3.62123 21 4.00001V16C21 16.3788 20.786 16.725 20.4472 16.8944C20.1084 17.0638 19.703 17.0273 19.4 16.8C17.0139 14.9125 14.0414 13.9217 11 14H5C3.89617 14 3 13.1038 3 12V8.00001C3 6.89618 3.89617 6.00001 5 6.00001H11" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 14C6 16.5964 6.84213 19.1228 8.4 21.2C9.0623 22.0831 10.3169 22.2623 11.2 21.6C12.0831 20.9377 12.2623 19.6831 11.6 18.8C10.5614 17.4152 10 15.731 10 14M8 6V14" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V15M12 15L7 10M12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 17V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const reportCards = [
  {
    id: 'users-report',
    title: 'Users Reports',
    subtitle: 'Registrations, Activity, Status',
    icon: <UsersReportIcon />,
    columns: ['Name', 'Email', 'Registered On', 'Activity', 'Status'],
    rows: [
      ['Venky K.', 'venky@buzzsounds.com', 'Oct 24, 2023', 'Active', 'Active'],
      ['Alice Smith', 'alice@soundart.io', 'Oct 22, 2023', 'Active', 'Active'],
      ['Bob Johnson', 'bjohnson@design.co', 'Oct 19, 2023', 'Idle', 'Disabled'],
    ],
  },
  {
    id: 'business-report',
    title: 'Business Report',
    subtitle: 'No Of Registrations',
    icon: <BusinessReportIcon />,
    columns: ['Business Name', 'Owner', 'Domain', 'Registered On'],
    rows: [
      ['Sri Krishna Hospital', 'Dr. Rahul Sharma', 'Healthcare', 'Oct 12, 2023'],
      ['Nexus Logistics', 'Sarah Jenkins', 'Supply Chain', 'Jan 04, 2024'],
      ['Evergreen Finance', 'Mark Thompson', 'Fintech', 'Nov 30, 2022'],
    ],
  },
  {
    id: 'ads-report',
    title: "Ad's Report",
    subtitle: 'Views, Clicks, CTR Percentage',
    icon: <AdsReportIcon />,
    columns: ['Campaign', 'Views', 'Clicks', 'CTR %'],
    rows: [
      ['Summer Sale Promo', '12,480', '860', '6.9'],
      ['New User Referral', '9,320', '540', '5.8'],
      ['Business Signup Push', '7,110', '410', '5.8'],
    ],
  },
];

function downloadReportAsExcel(report) {
  const header = report.columns.join(',');
  const body = report.rows.map((row) => row.join(',')).join('\n');
  const csvContent = `${header}\n${body}`;
  const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${report.id}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function downloadReportAsPDF(report) {
  // Create a jsPDF document and use autoTable to render the report table
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginLeft = 40;
  const startY = 60;

  doc.setFontSize(14);
  doc.text(report.title, marginLeft, 40);
  if (report.subtitle) {
    doc.setFontSize(10);
    doc.text(report.subtitle, marginLeft, 56);
  }

  // Prepare body rows as arrays
  const body = report.rows.map((row) => row.map((cell) => String(cell)));

  autoTable(doc, {
    startY,
    head: [report.columns],
    body,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [246, 244, 251], textColor: 0 },
    margin: { left: marginLeft, right: marginLeft },
  });

  const filename = `${report.id}_${new Date().toISOString().replace(/[:.]/g, '-')}.pdf`;
  doc.save(filename);
}

function Reports() {
  const { isCollapsed } = useSidebar();

  return (
    <div className="page-main-container">
      <Sidebar />
      <div className={`page-inner-container ${isCollapsed ? 'collapsed' : 'expanded'}`}>
        <Navbar />
        <div className="page-content">
          <section className="reports-section">
            <h1>Reports</h1>

            <div className="reports-grid">
              {reportCards.map((report) => (
                <div key={report.id} className="report-card">
                  <div className="report-card-icon">{report.icon}</div>
                  <h2>{report.title}</h2>
                  <p>{report.subtitle}</p>
                  <button
                    type="button"
                    className="download-excel-button"
                    onClick={() => downloadReportAsPDF(report)}
                  >
                    <DownloadIcon />
                    Download PDF
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Reports;