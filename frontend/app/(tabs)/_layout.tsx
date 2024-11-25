import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const RootLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: 'Planets', tabBarIcon: ({ color, size }) => (
                    <Ionicons name="planet" color={color} size={size} />
                )
            }} />
            <Tabs.Screen name="AddElement" options={{
                title: 'Add Planet', tabBarIcon: ({ color, size }) => (
                    <AntDesign name="plus" color={color} size={size} />
                )
            }} />
        </Tabs>
    )
}

export default RootLayout