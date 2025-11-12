import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useTheme } from '../../contexts/ThemeContext';

type Onboarding2NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding2'>;

interface Props {
  navigation: Onboarding2NavigationProp;
}

const Onboarding2: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  const handleGetStarted = () => {
    navigation.navigate('MainApp', { 
      userId: 'U123' // ✅ Juga kirim userId untuk konsistensi
    });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const features = [
    {
      icon: '🛍️',
      title: 'Belanja Mudah',
      description: 'Akses ribuan produk dengan kategori lengkap'
    },
    {
      icon: '🚚',
      title: 'Pengiriman Cepat',
      description: 'Gratis ongkir untuk pembelian di atas Rp 100.000'
    },
    {
      icon: '💰',
      title: 'Harga Terbaik',
      description: 'Dapatkan penawaran spesial dan diskon setiap hari'
    },
    {
      icon: '🔒',
      title: 'Transaksi Aman',
      description: 'Pembayaran terenkripsi dan data terlindungi'
    }
  ];

  return (
    <ScrollView style={[styles.container, theme === 'dark' && styles.containerDark]}>
      <View style={styles.content}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={[styles.title, theme === 'dark' && styles.textDark]}>
            Fitur Unggulan
          </Text>
          <Text style={[styles.subtitle, theme === 'dark' && styles.textSecondaryDark]}>
            Nikmati pengalaman belanja terbaik dengan berbagai fitur eksklusif
          </Text>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Text style={styles.illustration}>🛒</Text>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View 
              key={index} 
              style={[styles.featureCard, theme === 'dark' && styles.featureCardDark]}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, theme === 'dark' && styles.textDark]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, theme === 'dark' && styles.textSecondaryDark]}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Stats Section */}
        <View style={[styles.statsCard, theme === 'dark' && styles.statsCardDark]}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, theme === 'dark' && styles.textDark]}>10K+</Text>
            <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>Produk</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, theme === 'dark' && styles.textDark]}>50K+</Text>
            <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>Pengguna</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, theme === 'dark' && styles.textDark]}>4.8</Text>
            <Text style={[styles.statLabel, theme === 'dark' && styles.textSecondaryDark]}>Rating</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.backButton, theme === 'dark' && styles.backButtonDark]}
            onPress={handleBack}
          >
            <Text style={[styles.backButtonText, theme === 'dark' && styles.backButtonTextDark]}>
              Kembali
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.primaryButton, theme === 'dark' && styles.primaryButtonDark]}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryButtonText}>
              Mulai Belanja 🎉
            </Text>
          </TouchableOpacity>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotInactive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotInactive]} />
        </View>

        <Text style={[styles.footerNote, theme === 'dark' && styles.textSecondaryDark]}>
          Bergabung dengan komunitas pembeli happy di Mini E-Commerce!
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  containerDark: {
    backgroundColor: '#1A202C',
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 22,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  illustration: {
    fontSize: 120,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  featureCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 18,
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statsCardDark: {
    backgroundColor: '#2D3748',
    borderColor: '#4A5568',
    borderWidth: 1,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#718096',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  backButton: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
    backgroundColor: '#EDF2F7',
  },
  backButtonDark: {
    backgroundColor: '#4A5568',
  },
  backButtonText: {
    color: '#4A5568',
    fontWeight: '600',
    fontSize: 16,
  },
  backButtonTextDark: {
    color: '#E2E8F0',
  },
  primaryButton: {
    flex: 2,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
    backgroundColor: '#007AFF',
  },
  primaryButtonDark: {
    backgroundColor: '#3182CE',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#007AFF',
    width: 20,
  },
  progressDotInactive: {
    backgroundColor: '#E2E8F0',
  },
  footerNote: {
    fontSize: 14,
    textAlign: 'center',
    color: '#718096',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  textDark: {
    color: '#F7FAFC',
  },
  textSecondaryDark: {
    color: '#A0AEC0',
  },
});

export default Onboarding2;