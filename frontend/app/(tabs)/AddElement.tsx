import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { ElementInfoType } from '@/types/elementInfo'
import { apiUrl } from '@/constants/apiUrl'
import { useElements } from '@/context/elementContext'
import { Dropdown } from 'react-native-element-dropdown'
import DropdownComponent from '@/components/Dropdown/Dropdown'
import { useWindowDimensions } from 'react-native'

const AddElement = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [selectedDifficulty, setSelectedDifficulty] = useState('')
    const { addElement, nextElementId } = useElements()
    const { width } = useWindowDimensions();

    const difficulties = [{ value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'hard', label: 'Hard' }]

    const handleUpload = async () => {
        if (name === '' || description === '') {
            alert('Please fill all fields')
            return
        }

        const data = {
            id: nextElementId,
            name,
            description,
            difficulty: selectedDifficulty,
            favourite: false
        }

        addElement(data);
    }

    return (
        <View style={[styles.container, { width: width }]}>
            <Text style={styles.text}>Name</Text>
            <TextInput placeholder='Name' value={name} onChangeText={setName} style={styles.input} />

            <Text style={styles.text}>Description</Text>
            <TextInput placeholder='Description' value={description} onChangeText={setDescription} style={styles.input} />

            <Text style={styles.text}>Difficulty</Text>
            <DropdownComponent data={difficulties} handleSelection={setSelectedDifficulty} />

            <TouchableOpacity onPress={handleUpload} style={styles.button}>
                <Text style={styles.text}>
                    Add Destination
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
        gap: 10,
        marginTop: '40%'
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

export default AddElement