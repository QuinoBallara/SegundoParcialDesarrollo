import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useElements } from '@/context/elementContext'
import { useLocalSearchParams } from 'expo-router'
import DropdownComponent from '@/components/Dropdown/Dropdown'

const EditElement = () => {
    const [elementId, setElementId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState('')
    const [isFavourite, setIsFavourite] = useState(false)
    const { editElement, elements } = useElements()
    const { id } = useLocalSearchParams()
    const [isLoading, setIsLoading] = useState(true)

    const difficulties = [{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]

    const handleEdit = async () => {
        if (name === '' || description === '') {
            alert('Please fill all fields')
            return
        }

        const data = {
            id: elementId,
            name,
            description,
            difficulty: selectedDifficulty,
            favourite: isFavourite
        }

        editElement(data);
    }

    useEffect(() => {
        const element = elements.find((element: any) => element.id === id[0])
        setElementId(element.id)
        setName(element.name)
        setDescription(element.description)
        setSelectedDifficulty(element.difficulty)
        setIsFavourite(element.favourite)
        setIsLoading(false)
    }, [])


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name</Text>
            <TextInput placeholder='Name' value={name} onChangeText={setName} style={styles.input} />

            <Text style={styles.text}>Description</Text>
            <TextInput placeholder='Description' value={description} onChangeText={setDescription} style={styles.input} />

            <Text style={styles.text}>Difficulty</Text>
            <DropdownComponent data={difficulties} handleSelection={setSelectedDifficulty} value={selectedDifficulty} />

            <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <Text style={styles.text}>
                    Edit Destination
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#555",
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        width: '100%',
        gap: 10,
        marginTop: '30%'
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
        width: '45%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    }
})

export default EditElement
