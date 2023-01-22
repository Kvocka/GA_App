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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLightbulb, faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faBuromobelexperte } from "@fortawesome/free-brands-svg-icons";

const { BarCodeType } = BarCodeScanner.Constants;

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [torchOn, setTorchOn] = useState(false);
  const [scannedText, setScannedText] = useState<string | null>(null);

  const thing = useBarcode(scannedText || ""); useEffect(() => {
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
  }

  const validProd = thing?.data.status != 0;

  return (
    <View tw="w-screen h-96">
      <Text tw="text-lg text-purple-100">
        {thing?.data.product?.nutriments?.["energy-kcal_100g"]} kCal/100g
      </Text>
      {
        !thing || thing?.data.status == 0 ? (
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
            {!validProd && scannedText !== null && (
              <Text tw="text-lg text-purple-200"> Invalid product</Text>
            )}

            <Pressable
              tw="absolute top-0 right-0 p-4"
              onPress={() => setTorchOn(!torchOn)}
            >
              <Text>{<FontAwesomeIcon color={torchOn ? 'orange' : 'white'} size={32} icon={faLightbulb} />}</Text>
            </Pressable>
          </>
        ) :
          (
            <>
              <Text tw="bg-white opacity-50 text-lg">
                Produkt: {thing?.data.product?.product_name}
              </Text>
              <Pressable
                tw="absolute top-0 right-0 p-4"
                onPress={() => setScannedText(null)}
              >
                <Text>New product</Text>
              </Pressable>
            </>
          )
      }

    </View>
  );
}
