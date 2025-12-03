import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
      const [user, setUser] = useState(null);
      const [token, setToken] = useState(localStorage.getItem('token'));
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            if (token) {
                  // Fetch user if token exists
                  fetch('http://localhost:5000/api/auth/user', {
                        headers: { 'Authorization': `Bearer ${token}` }
                  })
                        .then(res => {
                              if (res.ok) return res.json();
                              throw new Error('Failed to fetch user');
                        })
                        .then(data => setUser(data))
                        .catch(() => {
                              logout();
                        })
                        .finally(() => setLoading(false));
            } else {
                  setLoading(false);
            }
      }, [token]);

      const login = async (email, password) => {
            try {
                  const res = await fetch('http://localhost:5000/api/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);

                  localStorage.setItem('token', data.token);
                  setToken(data.token);
                  setUser(data.user);
                  return { success: true };
            } catch (error) {
                  return { success: false, error: error.message };
            }
      };

      const register = async (name, email, password) => {
            try {
                  const res = await fetch('http://localhost:5000/api/auth/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, password }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message);

                  localStorage.setItem('token', data.token);
                  setToken(data.token);
                  setUser(data.user);
                  return { success: true };
            } catch (error) {
                  return { success: false, error: error.message };
            }
      };

      const logout = () => {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
      };

      const updateProfile = async (data) => {
            try {
                  const res = await fetch('http://localhost:5000/api/auth/update', {
                        method: 'PUT',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data),
                  });
                  const result = await res.json();
                  if (!res.ok) throw new Error(result.message);

                  setUser(result.user);
                  return { success: true, message: result.message };
            } catch (error) {
                  return { success: false, error: error.message };
            }
      };

      const deleteAccount = async (password) => {
            try {
                  const res = await fetch('http://localhost:5000/api/auth/delete', {
                        method: 'DELETE',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ password }),
                  });
                  const result = await res.json();
                  if (!res.ok) throw new Error(result.message);

                  logout();
                  return { success: true, message: result.message };
            } catch (error) {
                  return { success: false, error: error.message };
            }
      };

      return (
            <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateProfile, deleteAccount }}>
                  {children}
            </AuthContext.Provider>
      );
}

export function useAuth() {
      return useContext(AuthContext);
}
