import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { useBarcode } from './api';
import Scanner from './src/components/Scanner';

export default function App() {
  const data = useBarcode('3017620425035');
  
  return (
    <View tw="flex-1 items-center justify-center bg-purple-900">
      <Text tw="text-lg text-purple-100">{data?.data.product?.nutriments?.['energy-kcal_100g']} kCal/100g</Text>
      <Scanner />
      <StatusBar style="inverted" />
    </View>
  );
}
