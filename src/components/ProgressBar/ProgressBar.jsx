import './ProgressBar.css';

function ProgressBar({ stepCount = 5, activeIndex = 0 }) {
  return (
    <div className="progress-indicators" aria-label="Onboarding progress">
      {Array.from({ length: stepCount }).map((_, index) => (
        <span
          key={index}
          className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
          aria-current={index === activeIndex ? 'step' : undefined}
        />
      ))}
    </div>
  );
}

export default ProgressBar;
