import React from "react";
import { Text, View, Image, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { useItemList } from "../store";
import Button from "./Button";
import Scanner from "./Scanner";


const Home = () => {
    const itemList = useItemList();

    return (
        <View tw="flex-1">
            <SafeAreaView tw="bg-purple-600 flex-1 justify-center items-center gap-1">
                <Text tw="text-xl text-purple-50 font-semibold mb-2">
                    TODAY
                </Text>
                <Text tw="text-6xl text-purple-50">
                    {itemList.items.map(item => item.kcal).reduce((a, b) => a + b, 0)}
                </Text>
                <Text tw="text-xl text-purple-300 font-semibold">
                    KCAL
                </Text>
            </SafeAreaView>
            <ScrollView tw="bg-slate-100 flex-[2]">
                <Button tw="" onPress={itemList.clear}>Clear list</Button>
                {itemList.items.map((item, index) => (
                    <View key={index} tw="flex-row justify-between items-center p-3">
                        <Text>{item.name}</Text>
                        <Text>{item.kcal} kcal</Text>
                    </View>
                ))}
                <Scanner />
            </ScrollView>
        </View>
    )
}

export default Home;