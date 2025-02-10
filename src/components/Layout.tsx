import React from 'react';
import DarkModeToggle from './DarkModeToggle';
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
          {/* Officeworks Logo */}
          <div className="relative w-16 h-16">
            <Image 
              src="/assets/officeworks_logo.png" 
              alt="Officeworks Logo" 
              layout="fill" 
              objectFit="contain" 
            />
          </div>
          {/* Geeks2U Logo */}
          <div className="relative w-16 h-16">
            <Image 
              src="/assets/geeks2u-logo.png" 
              alt="Geeks2U Logo" 
              layout="fill" 
              objectFit="contain" 
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Job Pricing Calculator
          </h1>
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
