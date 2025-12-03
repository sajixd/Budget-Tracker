import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';

export default function Settings() {
      const { user, updateProfile, deleteAccount } = useAuth();
      const navigate = useNavigate();
      const [name, setName] = useState(user?.name || '');
      const [passwords, setPasswords] = useState({ current: '', new: '' });
      const [message, setMessage] = useState({ type: '', text: '' });
      const [isDeleting, setIsDeleting] = useState(false);

      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [deletePassword, setDeletePassword] = useState('');

      const handleUpdateProfile = async (e) => {
            e.preventDefault();
            setMessage({ type: '', text: '' });

            if (!name.trim()) {
                  setMessage({ type: 'error', text: 'Name cannot be empty' });
                  return;
            }

            const res = await updateProfile({ name });
            if (res.success) {
                  setMessage({ type: 'success', text: 'Profile updated successfully!' });
                  setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                  setMessage({ type: 'error', text: res.error || 'Failed to update profile' });
            }
      };

      const handleChangePassword = async (e) => {
            e.preventDefault();
            setMessage({ type: '', text: '' });

            if (!passwords.current.trim() || !passwords.new.trim()) {
                  setMessage({ type: 'error', text: 'Please fill in all password fields' });
                  return;
            }

            if (passwords.current === passwords.new) {
                  setMessage({ type: 'error', text: 'New password must be different from current password' });
                  return;
            }

            if (passwords.new.length < 6) {
                  setMessage({ type: 'error', text: 'New password must be at least 6 characters' });
                  return;
            }

            const res = await updateProfile({
                  password: passwords.new,
                  currentPassword: passwords.current
            });

            if (res.success) {
                  setMessage({ type: 'success', text: 'Password updated successfully!' });
                  setPasswords({ current: '', new: '' });
                  setTimeout(() => setMessage({ type: '', text: '' }), 3000);
            } else {
                  setMessage({ type: 'error', text: res.error || 'Failed to update password' });
            }
      };

      const handleDeleteAccount = async () => {
            if (!deletePassword.trim()) {
                  setMessage({ type: 'error', text: 'Please enter your password to confirm deletion' });
                  return;
            }

            setIsDeleting(true);
            const res = await deleteAccount(deletePassword);
            setIsDeleting(false);

            if (res.success) {
                  setMessage({ type: 'success', text: 'Account deleted successfully. Redirecting...' });
                  setTimeout(() => {
                        navigate('/login');
                  }, 2000);
            } else {
                  setMessage({ type: 'error', text: res.error || 'Failed to delete account' });
                  setIsDeleteModalOpen(false);
                  setDeletePassword('');
            }
      };

      return (
            <Layout>
                  <div className="mx-auto max-w-2xl space-y-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

                        {message.text && (
                              <div className={`rounded-md p-4 text-sm ${message.type === 'success'
                                          ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                          : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                    }`}>
                                    {message.text}
                              </div>
                        )}

                        <Card>
                              <CardHeader>
                                    <CardTitle>Profile Information</CardTitle>
                              </CardHeader>
                              <CardContent>
                                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">Name</label>
                                                <Input
                                                      value={name}
                                                      onChange={(e) => setName(e.target.value)}
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">Email</label>
                                                <Input value={user?.email} disabled className="bg-gray-100 dark:bg-gray-800" />
                                                <p className="text-xs text-gray-500">Email cannot be changed</p>
                                          </div>
                                          <Button type="submit">Update Profile</Button>
                                    </form>
                              </CardContent>
                        </Card>

                        <Card>
                              <CardHeader>
                                    <CardTitle>Change Password</CardTitle>
                              </CardHeader>
                              <CardContent>
                                    <form onSubmit={handleChangePassword} className="space-y-4">
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">Current Password</label>
                                                <Input
                                                      type="password"
                                                      value={passwords.current}
                                                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                                      required
                                                />
                                          </div>
                                          <div className="space-y-2">
                                                <label className="text-sm font-medium">New Password</label>
                                                <Input
                                                      type="password"
                                                      value={passwords.new}
                                                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                      required
                                                />
                                          </div>
                                          <Button type="submit" variant="outline">Update Password</Button>
                                    </form>
                              </CardContent>
                        </Card>

                        <Card className="border-red-200 dark:border-red-900">
                              <CardHeader>
                                    <CardTitle className="text-red-600">Danger Zone</CardTitle>
                              </CardHeader>
                              <CardContent>
                                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                          Deleting your account is permanent. All your data will be wiped out immediately and you won't be able to get it back.
                                    </p>
                                    <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)}>
                                          Delete Account
                                    </Button>
                              </CardContent>
                        </Card>

                        <Modal isOpen={isDeleteModalOpen} onClose={() => {
                              setIsDeleteModalOpen(false);
                              setDeletePassword('');
                        }} title="Delete Account">
                              <div className="space-y-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                          <strong>Warning:</strong> This action cannot be undone. All your data including budgets and expenses will be permanently deleted.
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                          Please enter your password to confirm account deletion:
                                    </p>
                                    <Input
                                          type="password"
                                          placeholder="Enter your password"
                                          value={deletePassword}
                                          onChange={(e) => setDeletePassword(e.target.value)}
                                          onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !isDeleting) {
                                                      handleDeleteAccount();
                                                }
                                          }}
                                    />
                                    <div className="flex justify-end gap-2">
                                          <Button 
                                                variant="ghost" 
                                                onClick={() => {
                                                      setIsDeleteModalOpen(false);
                                                      setDeletePassword('');
                                                }}
                                                disabled={isDeleting}
                                          >
                                                Cancel
                                          </Button>
                                          <Button 
                                                variant="destructive" 
                                                onClick={handleDeleteAccount}
                                                disabled={isDeleting}
                                          >
                                                {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                                          </Button>
                                    </div>
                              </div>
                        </Modal>
                  </div>
            </Layout>
      );
}
