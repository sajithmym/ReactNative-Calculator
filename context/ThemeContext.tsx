import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define theme colors
const LIGHT_THEME = {
  background: '#F2F2F7',
  cardBackground: '#FFFFFF',
  text: '#1C1C1E',
  secondaryText: '#6C6C70',
  tertiaryText: '#8E8E93',
  primary: '#3271E5',
  secondary: '#5E5CE6',
  accent: '#FF9500',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  border: '#E5E5EA',
  buttonBackground: '#EFEFF4',
  operationButton: '#FF9500',
  functionButton: '#D1D1D6',
  numberButton: '#F2F2F7',
  buttonText: '#1C1C1E',
  operationButtonText: '#FFFFFF',
  functionButtonText: '#1C1C1E',
  iconBackground: '#E9F0FB',
  iconColor: '#3271E5',
  switchTrackOff: '#D1D1D6',
  switchThumb: '#FFFFFF',
};

const DARK_THEME = {
  background: '#1C1C1E',
  cardBackground: '#2C2C2E',
  text: '#FFFFFF',
  secondaryText: '#AEAEB2',
  tertiaryText: '#8E8E93',
  primary: '#3271E5',
  secondary: '#5E5CE6',
  accent: '#FF9500',
  success: '#34C759',
  danger: '#FF3B30',
  warning: '#FF9500',
  border: '#38383A',
  buttonBackground: '#3A3A3C',
  operationButton: '#FF9500',
  functionButton: '#4F4F52',
  numberButton: '#3A3A3C',
  buttonText: '#FFFFFF',
  operationButtonText: '#FFFFFF',
  functionButtonText: '#FFFFFF',
  iconBackground: '#3A3A3C',
  iconColor: '#FFFFFF',
  switchTrackOff: '#39393D',
  switchThumb: '#FFFFFF',
};

// Create context
const ThemeContext = createContext({
  theme: 'light',
  colors: LIGHT_THEME,
  setTheme: (theme: 'light' | 'dark') => {},
});

// Provider component
export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme || 'light');
  
  // Update theme if system preference changes
  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme]);
  
  const colors = theme === 'dark' ? DARK_THEME : LIGHT_THEME;
  
  return (
    <ThemeContext.Provider value={{ theme, colors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme
export const useTheme = () => useContext(ThemeContext);