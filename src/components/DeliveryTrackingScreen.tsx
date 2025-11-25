// Buat screen baru DeliveryTrackingScreen.tsx
import DeliveryTracker from '../components/DeliveryTracker';
import { View } from 'react-native';

const DeliveryTrackingScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <DeliveryTracker />
    </View>
  );
};