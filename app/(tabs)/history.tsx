import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useHistory } from '@/hooks/useHistory';
import { Trash2 } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function HistoryScreen() {
  const { history, clearHistory } = useHistory();
  const { colors } = useTheme();

  const confirmClear = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to clear all calculation history?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          onPress: clearHistory,
          style: "destructive" 
        }
      ]
    );
  };

  const renderItem = ({ item, index }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()}
      style={[styles.historyItem, { backgroundColor: colors.cardBackground }]}
    >
      <View>
        <Text style={[styles.calculation, { color: colors.secondaryText }]}>{item.calculation}</Text>
        <Text style={[styles.result, { color: colors.text }]}>{item.result}</Text>
      </View>
      <Text style={[styles.date, { color: colors.tertiaryText }]}>{item.date}</Text>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Calculation History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={confirmClear} style={styles.clearButton}>
            <Trash2 size={20} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
      
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: colors.secondaryText }]}>
            No calculations yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => `history-${index}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: 'SFProDisplay-Bold',
  },
  clearButton: {
    padding: 8,
  },
  list: {
    paddingBottom: 16,
  },
  historyItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  calculation: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'SFProDisplay-Regular',
  },
  result: {
    fontSize: 24,
    fontFamily: 'SFProDisplay-Medium',
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'SFProDisplay-Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Medium',
  }
});