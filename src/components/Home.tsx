import React from "react";
import { Text, View, Image } from 'react-native';
import Scanner from "./Scanner";


const Home = () => {
    return (
        <View>
            <Scanner/>
            <Text >Produkt</Text>
        </View>
    )
}

export default Home;