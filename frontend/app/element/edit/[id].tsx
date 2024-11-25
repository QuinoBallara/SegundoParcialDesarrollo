import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useElements } from '@/context/elementContext'
import { useLocalSearchParams } from 'expo-router'

const EditElement = () => {
    const [elementId, setElementId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [moonNames, setMoonNames] = useState('')
    const [image, setImage] = useState('')
    const { editElement, elements } = useElements()
    const { id } = useLocalSearchParams()

    const handleEdit = async () => {
        if (name === '' || description === '' || moonNames === '' || image === '') {
            alert('Please fill all fields')
            return
        }

        let moonNamesArray = moonNames.split(',').map((moon) => moon.trim())

        const data = {
            id: elementId,
            name,
            description,
            moons: moonNamesArray.length,
            moon_names: moonNamesArray,
            image,
        }

        editElement(data);
    }

    useEffect(() => {
        const element = elements.find((element: any) => element.id === id[0])
        setElementId(element.id)
        setName(element.name)
        setDescription(element.description)
        setMoonNames(element.moon_names.join(', '))
        setImage(element.image)

    }, [])


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

            <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <Text style={styles.text}>
                    Edit Planet
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
        borderRadius: 5,
        width: '30%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    }
})

export default EditElement
