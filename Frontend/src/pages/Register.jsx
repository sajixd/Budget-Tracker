import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

export default function Register() {
      const { register } = useAuth();
      const navigate = useNavigate();
      const [form, setForm] = useState({ name: '', email: '', password: '' });
      const [error, setError] = useState('');

      const handleSubmit = async (e) => {
            e.preventDefault();
            const res = await register(form.name, form.email, form.password);
            if (res.success) {
                  navigate('/login', { state: { successMessage: 'Account created successfully. Please login.' } });
            } else {
                  setError(res.error);
            }
      };

      return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-dark-bg">
                  <Card className="w-full max-w-md">
                        <CardHeader>
                              <CardTitle className="text-center text-2xl">Register</CardTitle>
                        </CardHeader>
                        <CardContent>
                              <form onSubmit={handleSubmit} className="space-y-4">
                                    {error && <div className="text-sm text-red-500">{error}</div>}
                                    <div className="space-y-2">
                                          <label className="text-sm font-medium">Name</label>
                                          <Input
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                required
                                          />
                                    </div>
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
                                    <Button type="submit" className="w-full">Register</Button>
                              </form>
                              <div className="mt-4 text-center text-sm">
                                    Already have an account? <Link to="/login" className="text-primary-600 hover:underline">Login</Link>
                              </div>
                        </CardContent>
                  </Card>
            </div>
      );
}
