import { View, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Display from '@/components/calculator/Display';
import Keypad from '@/components/calculator/Keypad';
import { useCalculator } from '@/hooks/useCalculator';
import { useTheme } from '@/context/ThemeContext';

export default function CalculatorScreen() {
  const { 
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
  } = useCalculator();
  
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="auto" />
      <Display 
        value={displayValue} 
        previousValue={previousValue} 
        operation={operation}
        memoryValue={memory !== 0 ? 'M' : ''}
      />
      <Keypad
        onPressNumber={handleNumber}
        onPressOperation={handleOperation}
        onPressEqual={handleEqual}
        onPressClear={handleClear}
        onPressToggleSign={handleToggleSign}
        onPressPercentage={handlePercentage}
        onPressDecimal={handleDecimal}
        onPressMemory={handleMemoryOperation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});