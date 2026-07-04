import { motion } from 'framer-motion';
import './BusinessCard.css';

function BusinessCard({ icon: Icon, label, color, active, onClick }) {
  return (
    <motion.button
      type="button"
      className={`business-card ${active ? 'active' : ''}`}
      onClick={onClick}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      animate={{ scale: active ? 1.03 : 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      aria-pressed={active}
      aria-label={`Select ${label}`}
    >
      <div className="business-card-icon" style={{ color }}>
        <Icon aria-hidden="true" />
      </div>
      <span>{label}</span>
    </motion.button>
  );
}

export default BusinessCard;
