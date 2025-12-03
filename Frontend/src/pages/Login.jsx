import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Login() {
      const { login } = useAuth();
      const navigate = useNavigate();
      const location = useLocation();
      const [form, setForm] = useState({ email: '', password: '' });
      const [error, setError] = useState('');
      const [success, setSuccess] = useState(location.state?.successMessage || '');

      const handleSubmit = async (e) => {
            e.preventDefault();
            const res = await login(form.email, form.password);
            if (res.success) {
                  navigate('/');
            } else {
                  setError(res.error);
            }
      };

      return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-dark-bg">
                  <Card className="w-full max-w-md">
                        <CardHeader>
                              <CardTitle className="text-center text-2xl">Login</CardTitle>
                        </CardHeader>
                        <CardContent>
                              {success && (
                                    <div className="mb-4 rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                                          {success}
                                    </div>
                              )}
                              <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && <div className="text-sm text-red-500">{error}</div>}
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium">Email</label>
                                          <Input
                                                type="email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                required
                                          />
                                    </div>
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium">Password</label>
                                          <Input
                                                type="password"
                                                value={form.password}
                                                onChange={e => setForm({ ...form, password: e.target.value })}
                                                required
                                          />
                                    </div>
                                    <Button type="submit" className="w-full">Login</Button>
                              </form>
                              <div className="mt-4 text-center text-sm">
                                    Don't have an account? <Link to="/register" className="text-primary-600 hover:underline">Register</Link>
                              </div>
                        </CardContent>
                  </Card>
            </div>
      );
}
