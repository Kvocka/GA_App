import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import { useBarcode } from './api';
import Scanner from './src/components/Scanner';
import React from 'react';
import Home from './src/components/Home';

export default function App() {
  
  return (
    <View tw="flex-1 items-center justify-center bg-purple-900">
      <Home/>
      <StatusBar style="inverted" />
    </View>
  );
}
