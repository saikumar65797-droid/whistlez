import { motion } from 'framer-motion';
import './Button.css';

function Button({ children, onClick, disabled, type = 'button', ariaLabel }) {
  return (
    <motion.button
      type={type}
      className="action-button"
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

export default Button;
