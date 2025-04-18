import { View, StyleSheet } from 'react-native';
import Button from './Button';

interface KeypadProps {
  onPressNumber: (num: string) => void;
  onPressOperation: (op: string) => void;
  onPressEqual: () => void;
  onPressClear: () => void;
  onPressToggleSign: () => void;
  onPressPercentage: () => void;
  onPressDecimal: () => void;
  onPressMemory: (op: string) => void;
}

export default function Keypad({
  onPressNumber,
  onPressOperation,
  onPressEqual,
  onPressClear,
  onPressToggleSign,
  onPressPercentage,
  onPressDecimal,
  onPressMemory,
}: KeypadProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button text="MC" onPress={() => onPressMemory('MC')} type="memory" />
        <Button text="MR" onPress={() => onPressMemory('MR')} type="memory" />
        <Button text="M+" onPress={() => onPressMemory('M+')} type="memory" />
        <Button text="M-" onPress={() => onPressMemory('M-')} type="memory" />
      </View>
      
      <View style={styles.row}>
        <Button text="AC" onPress={onPressClear} type="function" />
        <Button text="+/-" onPress={onPressToggleSign} type="function" />
        <Button text="%" onPress={onPressPercentage} type="function" />
        <Button text="÷" onPress={() => onPressOperation('÷')} type="operation" />
      </View>

      <View style={styles.row}>
        <Button text="7" onPress={() => onPressNumber('7')} />
        <Button text="8" onPress={() => onPressNumber('8')} />
        <Button text="9" onPress={() => onPressNumber('9')} />
        <Button text="×" onPress={() => onPressOperation('×')} type="operation" />
      </View>

      <View style={styles.row}>
        <Button text="4" onPress={() => onPressNumber('4')} />
        <Button text="5" onPress={() => onPressNumber('5')} />
        <Button text="6" onPress={() => onPressNumber('6')} />
        <Button text="-" onPress={() => onPressOperation('-')} type="operation" />
      </View>

      <View style={styles.row}>
        <Button text="1" onPress={() => onPressNumber('1')} />
        <Button text="2" onPress={() => onPressNumber('2')} />
        <Button text="3" onPress={() => onPressNumber('3')} />
        <Button text="+" onPress={() => onPressOperation('+')} type="operation" />
      </View>

      <View style={styles.row}>
        <Button text="0" onPress={() => onPressNumber('0')} width={2} />
        <Button text="." onPress={onPressDecimal} />
        <Button text="=" onPress={onPressEqual} type="operation" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});