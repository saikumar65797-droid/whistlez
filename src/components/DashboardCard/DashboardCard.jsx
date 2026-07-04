import './DashboardCard.css';

function DashboardCard({ title, value, text, icon, color }) {
  return (
    <div className="dashboard-stat-card">
      <div className="stat-icon" style={{ background: `${color}1A`, color }}>
        {icon}
      </div>
      <p className="stat-label">{title}</p>
      <p className="stat-value">{value}</p>
      {text && <p className="stat-text">{text}</p>}
    </div>
  );
}

export default DashboardCard;
