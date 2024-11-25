import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ElementInfoType } from '@/types/elementInfo'
import { apiUrl } from '@/constants/apiUrl'
import { useElements } from '@/context/elementContext'
import { StyleSheet } from 'react-native'

const ElementDetails = () => {
    const { id } = useLocalSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const [elementInfo, setelementInfo] = useState<ElementInfoType | null>(null)
    const { elements, deleteElement } = useElements()
    const navigate = useNavigation()

    useEffect(() => {
        navigate.setOptions({
            title: elementInfo?.name || id,
        });
    }, [elementInfo]);

    useEffect(() => {
        const fetchElement = async () => {
            const element: ElementInfoType = elements.find((element: ElementInfoType) => element.id === id[0])
            setelementInfo(element)
            setIsLoading(false)
        }
        fetchElement()
    }, [id, elements])

    const handleDelete = async () => {
        await deleteElement(id)
        router.navigate('/')
    }


    if (isLoading) {
        return (
            <View className='details-container'>
                <View className='details-loading'>
                    <Text>Loading...</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: elementInfo?.image }} style={styles.image} />
                <Text style={styles.name}>{elementInfo?.name}</Text>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}>{elementInfo?.description}</Text>
                {elementInfo?.moons === 0 ?
                    <View>
                        <Text style={styles.detailText}>This planet has no moons</Text>
                    </View>
                    : elementInfo?.moons === 1 ?
                        <View>
                            <Text style={styles.detailText}>This planet has 1 moon:</Text>
                            <Text style={styles.detailText}>{elementInfo?.moon_names.join('\n')}</Text>
                        </View>
                        :
                        <View>
                            <Text style={styles.detailText}>This planet has {elementInfo?.moons} moons:</Text>
                            <Text style={styles.detailText}>{elementInfo?.moon_names.join('\n')}</Text>
                        </View>
                }

            </View>
            <View style={styles.buttons}>
                <TouchableOpacity onPress={() => router.push(`/element/edit/${id}`)} style={styles.button}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDelete()} style={[styles.button, styles.deleteButton]}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
        width: '85%',
        alignSelf: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    details: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        marginBottom: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: '24%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
});


export default ElementDetails;