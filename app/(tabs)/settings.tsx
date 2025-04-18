import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Info, Mail, Github } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SettingsScreen() {
  const { theme, setTheme, colors } = useTheme();

  const SettingsItem = ({ icon, title, description, action, actionElement }) => (
    <Animated.View 
      entering={FadeInDown.springify()}
      style={[styles.settingItem, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.settingContent}>
        <View style={[styles.iconContainer, { backgroundColor: colors.iconBackground }]}>
          {icon}
        </View>
        <View style={styles.settingTextContainer}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {description && (
            <Text style={[styles.settingDescription, { color: colors.secondaryText }]}>
              {description}
            </Text>
          )}
        </View>
      </View>
      {actionElement}
    </Animated.View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
      
      <SettingsItem
        icon={theme === 'dark' ? <Moon size={20} color={colors.iconColor} /> : <Sun size={20} color={colors.iconColor} />}
        title="Dark Mode"
        description="Switch between light and dark theme"
        actionElement={
          <Switch
            value={theme === 'dark'}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
            trackColor={{ false: colors.switchTrackOff, true: colors.primary }}
            thumbColor={colors.switchThumb}
          />
        }
      />
      
      <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
      
      <SettingsItem
        icon={<Info size={20} color={colors.iconColor} />}
        title="App Version"
        description="Version 1.0.0"
      />
      
      <SettingsItem
        icon={<Mail size={20} color={colors.iconColor} />}
        title="Contact Us"
        description="Reach out for support or suggestions"
      />
      
      <SettingsItem
        icon={<Github size={20} color={colors.iconColor} />}
        title="Source Code"
        description="View this project on GitHub"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'SFProDisplay-Bold',
    marginVertical: 16,
    marginLeft: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Medium',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'SFProDisplay-Regular',
  },
});