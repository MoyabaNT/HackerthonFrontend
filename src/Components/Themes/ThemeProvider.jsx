import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  // Initialize from localStorage immediately, default to 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') { // guard for SSR
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    }
    return 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
