import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem('whistlez_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const validEmail = 'admin123@gmail.com';
    const validPassword = 'Admin123@';

    if (email === validEmail && password === validPassword) {
      const userData = { email };
      window.localStorage.setItem('whistlez_user', JSON.stringify(userData));
      setUser(userData);
      return true;
    }

    return false;
  };

  const logout = () => {
    window.localStorage.removeItem('whistlez_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: Boolean(user), login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
