import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type HistoryItem = {
  calculation: string;
  result: string;
  date: string;
};

export const useHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from AsyncStorage
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem('calculatorHistory');
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.error('Failed to load history from storage:', error);
      }
    };

    loadHistory();
  }, []);

  // Save history to AsyncStorage whenever it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('calculatorHistory', JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save history to storage:', error);
      }
    };

    saveHistory();
  }, [history]);

  const addToHistory = (item: HistoryItem) => {
    // Add to beginning of array (most recent first)
    setHistory(prevHistory => [item, ...prevHistory]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    addToHistory,
    clearHistory
  };
};