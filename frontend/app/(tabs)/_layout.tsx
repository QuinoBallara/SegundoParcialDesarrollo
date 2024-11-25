import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const RootLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: 'Destinations', headerShown: false, tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="airplane" size={size} color={color} />
                )
            }} />
            <Tabs.Screen name="AddElement" options={{
                title: 'Add Destination', headerShown: false, tabBarIcon: ({ color, size }) => (
                    <AntDesign name="plus" color={color} size={size} />
                )
            }} />
        </Tabs>
    )
}

export default RootLayout