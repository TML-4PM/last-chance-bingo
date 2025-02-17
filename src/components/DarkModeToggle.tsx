// src/components/DarkModeToggle.tsx
import React from 'react';
import { useTheme } from 'next-themes';

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
