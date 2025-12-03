import React from 'react';
import { Navbar } from './Navbar';

export function Layout({ children }) {
      return (
            <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
                  <Navbar />
                  <main className="container mx-auto px-4 py-8">
                        {children}
                  </main>
            </div>
      );
}
