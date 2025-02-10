// src/components/Layout.tsx
import React from 'react';
import DarkModeToggle from './DarkModeToggle'; // This should now correctly find DarkModeToggle.tsx
import Head from 'next/head';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <Image src="/assets/officeworks-logo.png" alt="Officeworks Logo" width={60} height={60} />
          <Image src="/assets/geeks2u-logo.png" alt="Geeks2U Logo" width={60} height={60} />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Job Pricing Calculator</h1>
        </div>
        <div className="mt-2 sm:mt-0">
          <DarkModeToggle />
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="text-center p-4 bg-white dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">&copy; 2025 Officeworks &amp; Geeks2U</p>
      </footer>
    </div>
  );
};

export default Layout;
