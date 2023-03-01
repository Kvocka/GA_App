import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, StyleSheet } from 'react-native';
import { useBarcode } from './api';
import Scanner from './src/components/Scanner';
import React from 'react';
import Home from './src/components/Home';
import 'react-native-gesture-handler';

export default function App() {
  
  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Home/>
      <StatusBar style="inverted" />
    </View>
  );
}
