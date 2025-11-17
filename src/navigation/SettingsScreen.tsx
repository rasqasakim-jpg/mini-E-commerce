import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDark && styles.textDark]}>
          Tampilan
        </Text>
        
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>
            {isDark ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleTheme}
            value={isDark}
          />
        </View>
      </View>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDark && styles.textDark]}>
          Tentang Aplikasi
        </Text>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDark && styles.textDark]}>
            Versi
          </Text>
          <Text style={[styles.settingValue, isDark && styles.textSecondaryDark]}>
            1.0.0
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#2D3748',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#2D3748',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#4A5568',
  },
  settingValue: {
    fontSize: 16,
    color: '#718096',
  },
  textDark: { color: '#F7FAFC' },
  textSecondaryDark: { color: '#A0AEC0' },
});

export default SettingsScreen;