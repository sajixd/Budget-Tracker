import React from 'react';
import { Moon, Sun, Wallet, LogOut, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';

export function Navbar() {
      const { theme, toggleTheme } = useTheme();
      const { user, logout } = useAuth();

      return (
            <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-dark-bg/80">
                  <div className="container mx-auto flex h-16 items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                                    <Wallet className="h-5 w-5" />
                              </div>
                              <span className="text-xl font-bold text-gray-900 dark:text-white">BudgetTracker</span>
                        </div>

                        <div className="flex items-center gap-4">
                              {user && (
                                    <div className="hidden items-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-200 sm:flex">
                                          <div className="flex items-center gap-2">
                                                <User className="h-4 w-4" />
                                                <span>{user.name}</span>
                                          </div>
                                          <a href="/settings" className="hover:text-primary-600 hover:underline">Settings</a>
                                    </div>
                              )}

                              <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                                          {theme === 'dark' ? (
                                                <Sun className="h-5 w-5 text-yellow-500" />
                                          ) : (
                                                <Moon className="h-5 w-5 text-gray-700" />
                                          )}
                                    </Button>

                                    {user && (
                                          <Button variant="ghost" size="icon" onClick={logout} className="rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                <LogOut className="h-5 w-5" />
                                          </Button>
                                    )}
                              </div>
                        </div>
                  </div>
            </nav>
      );
}
