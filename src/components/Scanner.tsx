import { Camera, FlashMode } from "expo-camera";
import {
  BarCodeEvent,
  BarCodeScannedCallback,
  BarCodeScanner,
  PermissionStatus,
} from "expo-barcode-scanner";
import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { getByBarcode, useBarcode } from "../../api";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLightbulb, faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";
import { useItemList } from "../store";
import Button from "./Button";

const { BarCodeType } = BarCodeScanner.Constants;

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { add } = useItemList();
  
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = async ({
    type,
    data,
  }: BarCodeEvent) => {
    setScanning(false);
    try {
      const resp = await getByBarcode({barcode: data});

      
      if (resp.data.product) {
        const {nutriments = {}} = resp.data.product;
        add({
          name: resp.data.product.product_name || 'Unknown product',
          kcal: nutriments["energy-kcal_serving"] || nutriments["energy-kcal"] || 0,
        });
      }
    } catch (e) {
      setError('No product found');
    }
  }

  return (
    <View tw="w-screen h-96">
      {error && (
        <View tw="flex flex-col items-center justify-center h-full">
          <Text tw="text-2xl text-red-500">{error}</Text>
        </View>
      )}
      {
        scanning ? (
          <>
            <Camera
              style={StyleSheet.absoluteFillObject}
              flashMode={torchOn ? FlashMode.torch : FlashMode.off}
              onBarCodeScanned={handleBarCodeScanned}
              barCodeScannerSettings={{
                barCodeTypes: [
                  BarCodeType.ean8,
                  BarCodeType.ean13,
                  BarCodeType.upc_a,
                  BarCodeType.upc_e,
                  BarCodeType.upc_ean,
                ],
              }}
            />

            <Pressable
              tw="absolute top-0 right-0 p-4"
              onPress={() => setTorchOn(!torchOn)}
            >
              <Text><FontAwesomeIcon color={torchOn ? 'orange' : 'white'} size={32} icon={faLightbulb} /></Text>
            </Pressable>
          </>
        ) :
          (
            <>
              <Button
                tw="absolute top-0 right-0"
                onPress={() => {
                  setScanning(true);
                  setError(null);
                }}
              >
                Scan new product
              </Button>
            </>
          )
      }

    </View>
  );
}
