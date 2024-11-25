import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { Platform } from 'react-native';

type StarProps = {
    favourite: boolean
}

const Star = (props: StarProps) => {

    if (Platform.OS === 'android') {
        return (
            <View>
                {props.favourite ? <AntDesign name="star" size={26} color="yellow" /> : <AntDesign name="staro" size={26} color="yellow" />}
            </View>
        )
    } else {
        return (
            <View>
                {props.favourite ? <AntDesign name="star" size={26} color="pink" /> : <AntDesign name="staro" size={26} color="pink" />}
            </View>
        )
    }
}

export default Star

const styles = StyleSheet.create({

})