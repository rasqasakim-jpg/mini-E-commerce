import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface HistoryEntry {
  route: string;
  timestamp: string;
  userId: string;
  screenName: string;
}

const ScreenHistory: React.FC = () => {
  const { theme } = useTheme();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    // Simulasi data analytics
    const sampleHistory: HistoryEntry[] = [
      { 
        route: 'MainApp/HomeTabs/Populer', 
        timestamp: new Date().toISOString(), 
        userId: 'U123',
        screenName: 'Tab Populer' 
      },
      { 
        route: 'ProductDetail', 
        timestamp: new Date(Date.now() - 300000).toISOString(), 
        userId: 'U123',
        screenName: 'Detail Produk iPhone' 
      },
      { 
        route: 'MainApp/HomeTabs/Terbaru', 
        timestamp: new Date(Date.now() - 600000).toISOString(), 
        userId: 'U123',
        screenName: 'Tab Terbaru' 
      },
      { 
        route: 'MainApp/HomeTabs/Diskon', 
        timestamp: new Date(Date.now() - 900000).toISOString(), 
        userId: 'U123',
        screenName: 'Tab Diskon' 
      },
      { 
        route: 'Settings', 
        timestamp: new Date(Date.now() - 1200000).toISOString(), 
        userId: 'U123',
        screenName: 'Pengaturan' 
      },
    ];
    setHistory(sampleHistory);
  };

  const clearHistory = () => {
    Alert.alert(
      'Hapus History',
      'Apakah Anda yakin ingin menghapus semua riwayat?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Hapus', 
          style: 'destructive',
          onPress: () => setHistory([])
        }
      ]
    );
  };

  const exportAnalytics = () => {
    Alert.alert(
      'Export Data',
      `Total ${history.length} screen visits recorded\n\nUser ID: U123`,
      [{ text: 'OK' }]
    );
  };

  const formatTime = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeAgo = (timestamp: string): string => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / 60000);
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return `${Math.floor(diffInMinutes / 1440)} hari lalu`;
  };

  const renderHistoryItem = ({ item, index }: { item: HistoryEntry; index: number }) => (
    <View style={[styles.historyItem, theme === 'dark' && styles.historyItemDark]}>
      <View style={styles.itemHeader}>
        <Text style={[styles.screenName, theme === 'dark' && styles.textDark]}>
          {item.screenName}
        </Text>
        <Text style={[styles.timeAgo, theme === 'dark' && styles.textSecondaryDark]}>
          {getTimeAgo(item.timestamp)}
        </Text>
      </View>
      
      <Text style={[styles.routeText, theme === 'dark' && styles.textSecondaryDark]}>
        🛣️ {item.route}
      </Text>
      
      <View style={styles.itemFooter}>
        <Text style={[styles.timestamp, theme === 'dark' && styles.textSecondaryDark]}>
          🕒 {formatTime(item.timestamp)}
        </Text>
        <Text style={[styles.userId, theme === 'dark' && styles.textSecondaryDark]}>
          👤 {item.userId}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
          📊 Analytics & Screen History
        </Text>
        <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
          Global Navigation Listener Active
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statCard, theme === 'dark' && styles.statCardDark]}>
          <Text style={[styles.statNumber, theme === 'dark' && styles.textDark]}>
            {history.length}
          </Text>
          <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Total Kunjungan
          </Text>
        </View>
        
        <View style={[styles.statCard, theme === 'dark' && styles.statCardDark]}>
          <Text style={[styles.statNumber, theme === 'dark' && styles.textDark]}>
            {new Set(history.map(h => h.route)).size}
          </Text>
          <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>
            Unique Screens
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, theme === 'dark' && styles.actionButtonDark]}
          onPress={exportAnalytics}
        >
          <Text style={styles.actionButtonText}>📤 Export Data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.clearButton, theme === 'dark' && styles.clearButtonDark]}
          onPress={clearHistory}
        >
          <Text style={styles.clearButtonText}>🗑️ Hapus History</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={[styles.emptyText, theme === 'dark' && styles.textSecondaryDark]}>
            Tidak ada data history...
          </Text>
        }
      />

      <Text style={[styles.note, theme === 'dark' && styles.textSecondaryDark]}>
        🔍 Analytics tracking aktif di NavigationContainer root
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  actionButtonDark: {
    backgroundColor: '#3182CE',
  },
  clearButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  clearButtonDark: {
    backgroundColor: '#4A5568',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  historyItemDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  screenName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
  },
  timeAgo: {
    fontSize: 12,
    color: '#718096',
    fontStyle: 'italic',
  },
  routeText: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#718096',
  },
  userId: {
    fontSize: 12,
    color: '#718096',
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#718096',
    marginTop: 50,
  },
  note: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
    color: '#718096',
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default ScreenHistory;