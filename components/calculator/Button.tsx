import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps {
  text: string;
  onPress: () => void;
  type?: 'number' | 'function' | 'operation' | 'memory';
  width?: number;
  style?: StyleProp<ViewStyle>;
}

export default function Button({ text, onPress, type = 'number', width = 1, style }: ButtonProps) {
  const { colors, theme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    setIsPressed(true);
    scale.value = withSpring(0.95, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    setIsPressed(false);
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  // Define styles based on button type
  let buttonStyle: StyleProp<ViewStyle> = {};
  let textStyle: StyleProp<TextStyle> = {};

  switch (type) {
    case 'number':
      buttonStyle = {
        backgroundColor: colors.numberButton,
      };
      textStyle = { color: colors.buttonText };
      break;
    case 'function':
      buttonStyle = {
        backgroundColor: colors.functionButton,
      };
      textStyle = { color: colors.functionButtonText };
      break;
    case 'operation':
      buttonStyle = {
        backgroundColor: colors.operationButton,
      };
      textStyle = { color: colors.operationButtonText };
      break;
    case 'memory':
      buttonStyle = {
        backgroundColor: colors.secondary,
      };
      textStyle = { color: 'white' };
      break;
  }

  return (
    <Animated.View 
      style={[
        styles.buttonContainer, 
        { width: `${width * 25 - 8}%` },
        animatedStyle,
        style
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.button, buttonStyle]}
      >
        {theme === 'light' && type !== 'operation' && (
          <BlurView 
            intensity={80} 
            tint="light" 
            style={StyleSheet.absoluteFill} 
          />
        )}
        <Text style={[
          styles.buttonText, 
          textStyle,
          type === 'function' && styles.functionText,
          type === 'operation' && styles.operationText,
          type === 'memory' && styles.memoryText,
        ]}>
          {text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 4,
    height: 80,
  },
  button: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 28,
    fontFamily: 'SFProDisplay-Medium',
  },
  functionText: {
    fontSize: 22,
  },
  operationText: {
    fontSize: 30,
  },
  memoryText: {
    fontSize: 18,
  },
});