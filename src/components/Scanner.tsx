import { Camera, FlashMode } from 'expo-camera'; 
import { BarCodeEvent, BarCodeScannedCallback, BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useBarcode } from '../../api';

const { BarCodeType } = BarCodeScanner.Constants;

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);
  const thing = useBarcode(scannedText || '');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }: BarCodeEvent) => {
    setScannedText(data);
    console.log(data);
  };

  return (
    <View tw="w-screen h-96">
      <Camera
        style={StyleSheet.absoluteFillObject}
        // useCamera2Api={true}
        flashMode={torchOn ? FlashMode.torch : FlashMode.off}
        onBarCodeScanned={handleBarCodeScanned}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeType.ean8,
            BarCodeType.ean13,
            // BarCodeType.upc_a,
            // BarCodeType.upc_e,
            // BarCodeType.upc_ean,
          ],
        }}
      />
      <Text tw="bg-white opacity-50 text-lg h-12">Produkt: {thing?.data.product?.product_name}</Text>
      <Pressable tw="absolute top-0 right-0 p-4" onPress={() => setTorchOn(!torchOn)}>
        <Text>🔦</Text>
      </Pressable>
    </View>
  )
}
