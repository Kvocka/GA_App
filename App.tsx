import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { useBarcode } from './api';

export default function App() {
  const data = useBarcode('0722252165244');
  
  return (
    <View className="flex-1 items-center justify-center bg-purple-900">
      <Text className="text-lg text-purple-100">{data?.data.product?.nutriments?.['energy-kcal_100g']} kCal/100g</Text>
      <StatusBar style="auto" />
    </View>
  );
}
