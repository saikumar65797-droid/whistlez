import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import WhistlezLogo from '../../assets/whistlez-logo.png';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (login(email, password)) {
      navigate('/dashboard');
      return;
    }

    setError('Invalid email or password.');
  };

  return (
    <div className="login-page">
      <div className="login-layout">
        <div className="login-panel">
          <div className="login-branding">
            <h1>Whistlez Admin</h1>
            <p>Secure admin access to your dashboard with modern, elegant styling.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin123@gmail.com"
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin123@"
              required
            />

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit">Sign in</button>
          </form>

          
        </div>

        <div className="login-visual">
          <div className="login-visual-overlay" />
          <div className="login-visual-content">
            <img className="login-visual-logo" src={WhistlezLogo} alt="Whistlez logo" />
            <h2>Welcome back</h2>
            <p>Manage your businesses, users, ads, and reports from one beautifully crafted admin console.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
