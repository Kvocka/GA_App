import { Camera, FlashMode } from "expo-camera";
import {
  BarCodeEvent,
  BarCodeScannedCallback,
  BarCodeScanner,
  PermissionStatus,
} from "expo-barcode-scanner";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { useBarcode } from "../../api";
import React from "react";

const { BarCodeType } = BarCodeScanner.Constants;

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);
  const thing = useBarcode(scannedText || "");
  const data = useBarcode("3017620425035");
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
  }: BarCodeEvent) => {
    setScannedText(data);
    if (data) {
      setHasScanned(true);
    }
    console.log(data);
  };

  return (
    <View tw="w-screen h-96">
      <Text tw="text-lg text-purple-100">
        {data?.data.product?.nutriments?.["energy-kcal_100g"]} kCal/100g
      </Text>
      {!hasScanned ? (
        <>
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
          <Pressable
            tw="absolute top-0 right-0 p-4"
            onPress={() => setTorchOn(!torchOn)}
          >
            <Text>🔦</Text>
          </Pressable>
        </>
      ) : (
        <View tw="flex flex-col">
          <Pressable
            tw="absolute top-0 right-0 p-4"
            onPress={() => setHasScanned(false)}
          >
            <Text>New product</Text>
          </Pressable>
          <Text tw="bg-white opacity-50 text-lg">
            Produkt: {thing?.data.product?.product_name}
          </Text>
        </View>
      )}
    </View>
  );
}
