import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeIn } from 'react-native-reanimated';

interface DisplayProps {
  value: string;
  previousValue: string | null;
  operation: string | null;
  memoryValue?: string;
}

export default function Display({ value, previousValue, operation, memoryValue }: DisplayProps) {
  const { colors } = useTheme();
  
  // Format display value with commas for thousands
  const formatValue = (val: string) => {
    if (val === 'Error') return val;
    
    const [intPart, decPart] = val.split('.');
    
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return decPart ? `${formattedInt}.${decPart}` : formattedInt;
  };

  const previousCalculation = previousValue && operation 
    ? `${formatValue(previousValue)} ${operation}` 
    : '';

  return (
    <View style={styles.container}>
      {memoryValue && (
        <Animated.Text 
          entering={FadeIn}
          style={[styles.memoryIndicator, { color: colors.secondary }]}
        >
          {memoryValue}
        </Animated.Text>
      )}
      
      {previousCalculation ? (
        <Text style={[styles.previousCalculation, { color: colors.secondaryText }]}>
          {previousCalculation}
        </Text>
      ) : null}
      
      <Text
        style={[
          styles.value, 
          { color: colors.text },
          value.length > 8 && styles.smallerText,
          value.length > 12 && styles.smallestText,
        ]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {formatValue(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    justifyContent: 'flex-end',
    padding: 16,
  },
  previousCalculation: {
    fontSize: 24,
    textAlign: 'right',
    marginBottom: 8,
    fontFamily: 'SFProDisplay-Regular',
  },
  value: {
    fontSize: 64,
    textAlign: 'right',
    fontFamily: 'SFProDisplay-Medium',
  },
  smallerText: {
    fontSize: 52,
  },
  smallestText: {
    fontSize: 40,
  },
  memoryIndicator: {
    position: 'absolute',
    top: 16,
    left: 16,
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
  },
  emptySpace: {
    height: 24,
  }
});