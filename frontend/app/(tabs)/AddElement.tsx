import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { ElementInfoType } from '@/types/elementInfo'
import { apiUrl } from '@/constants/apiUrl'
import { useElements } from '@/context/elementContext'

const AddElement = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [moonNames, setMoonNames] = useState('')
    const [image, setImage] = useState('')
    const { addElement, nextElementId } = useElements()

    const handleUpload = async () => {
        if (name === '' || description === '' || (moonNames.length === 0) || image === '') {
            alert('Please fill all fields')
            return
        }

        let moonsArray = moonNames.split(',').map((moon: string) => moon.trim())

        const data = {
            id: nextElementId,
            name,
            description,
            moons: moonsArray.length,
            moon_names: moonsArray,
            image,
        }

        addElement(data);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <TextInput placeholder='Name' value={name} onChangeText={setName} style={styles.input} />

            <Text style={styles.text}>Description</Text>
            <TextInput placeholder='Description' value={description} onChangeText={setDescription} style={styles.input} />

            <Text style={styles.text}>Moon names</Text>
            <TextInput
                value={moonNames}
                onChangeText={setMoonNames}
                style={styles.input}
                placeholder='Separated by comma'
            />

            <Text style={styles.text}>Image (URL)</Text>
            <TextInput placeholder='Image URL' value={image} onChangeText={setImage} style={styles.input} />

            <TouchableOpacity onPress={handleUpload} style={styles.button}>
                <Text style={styles.text}>
                    Add Planet
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: '100%',
        gap: 10,
    },
    input: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        width: '80%',
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 20,
        width: '35%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    }
})

export default AddElement