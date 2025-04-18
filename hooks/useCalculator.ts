import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useHistory } from './useHistory';

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [memory, setMemory] = useState(0);
  
  const { addToHistory } = useHistory();

  // Trigger haptic feedback for button press
  const triggerHaptic = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  // Handle number input
  const handleNumber = (num: string) => {
    triggerHaptic();
    
    if (displayValue === '0' || shouldResetDisplay) {
      setDisplayValue(num);
      setShouldResetDisplay(false);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  // Handle decimal point
  const handleDecimal = () => {
    triggerHaptic();
    
    if (shouldResetDisplay) {
      setDisplayValue('0.');
      setShouldResetDisplay(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // Handle arithmetic operations
  const handleOperation = (nextOperation: string) => {
    triggerHaptic();
    
    const value = parseFloat(displayValue);
    
    if (previousValue === null) {
      setPreviousValue(displayValue);
      setShouldResetDisplay(true);
      setOperation(nextOperation);
    } else if (operation) {
      const result = performOperation();
      setPreviousValue(result.toString());
      setDisplayValue(result.toString());
      setOperation(nextOperation);
      setShouldResetDisplay(true);
    }
  };

  // Perform arithmetic operation
  const performOperation = () => {
    const current = parseFloat(displayValue);
    const previous = parseFloat(previousValue || '0');
    
    let result = 0;
    switch (operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '×':
        result = previous * current;
        break;
      case '÷':
        result = previous / current;
        break;
      default:
        return current;
    }
    
    return Math.round(result * 1000000) / 1000000; // Handle floating point precision
  };

  // Handle equals button
  const handleEqual = () => {
    triggerHaptic();
    
    if (!operation || previousValue === null) return;
    
    const result = performOperation();
    const calculationString = `${previousValue} ${operation} ${displayValue}`;
    
    setDisplayValue(result.toString());
    addToHistory({
      calculation: calculationString,
      result: `= ${result}`,
      date: new Date().toLocaleTimeString()
    });
    
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(true);
  };

  // Handle clear button
  const handleClear = () => {
    triggerHaptic();
    
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  };

  // Handle sign toggle (+/-)
  const handleToggleSign = () => {
    triggerHaptic();
    
    setDisplayValue((parseFloat(displayValue) * -1).toString());
  };

  // Handle percentage
  const handlePercentage = () => {
    triggerHaptic();
    
    const value = parseFloat(displayValue);
    setDisplayValue((value / 100).toString());
  };

  // Handle memory operations (M+, M-, MR, MC)
  const handleMemoryOperation = (memOperation: string) => {
    triggerHaptic();
    
    const value = parseFloat(displayValue);
    
    switch (memOperation) {
      case 'M+':
        setMemory(memory + value);
        setShouldResetDisplay(true);
        break;
      case 'M-':
        setMemory(memory - value);
        setShouldResetDisplay(true);
        break;
      case 'MR':
        setDisplayValue(memory.toString());
        break;
      case 'MC':
        setMemory(0);
        break;
    }
  };

  return {
    displayValue,
    previousValue,
    operation,
    handleNumber,
    handleOperation,
    handleEqual,
    handleClear,
    handleToggleSign,
    handlePercentage,
    handleDecimal,
    memory,
    handleMemoryOperation
  };
};