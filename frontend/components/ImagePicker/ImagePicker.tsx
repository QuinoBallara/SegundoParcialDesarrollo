import { Text, View, Image, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import React from "react";

type ImageSelectionProps = {
    handleUpload: (image: string) => void;
}

const ImageSelection = (props: ImageSelectionProps) => {

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            props.handleUpload(result.assets[0].uri);
        } else {
            Alert.alert("Permission required", "You need to allow camera permissions to take a photo");
        }
    }
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.text}>Choose photo</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    }
})

export default ImageSelection