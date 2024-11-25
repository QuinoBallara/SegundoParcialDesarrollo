import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ElementInfoType } from '@/types/elementInfo'
import { apiUrl } from '@/constants/apiUrl'
import { useElements } from '@/context/elementContext'
import { StyleSheet } from 'react-native'
import Star from '@/components/Star/Star'
import Tag from '@/components/Tag/Tag'

const ElementDetails = () => {
    const { id } = useLocalSearchParams()
    const [isLoading, setIsLoading] = useState(true)
    const [elementInfo, setelementInfo] = useState<ElementInfoType | null>(null)
    const { elements, deleteElement, toggleFavourite } = useElements()
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
    if (elementInfo)
        return (
            <View style={styles.contentContainer}>
                <View style={styles.star}>
                    <TouchableOpacity key={id[0]} onPress={() => { toggleFavourite(id); }}>
                        <Star favourite={elementInfo.favourite} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <View style={styles.headerCard}>
                        <Text style={styles.elementName}>{elementInfo?.name}</Text>
                        <View style={styles.detsCard}>
                            <Tag difficulty={elementInfo.difficulty} />
                        </View>
                    </View>
                    <Text style={styles.elementDescription}>{elementInfo?.description}</Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => router.push(`/element/edit/${id}`)} style={styles.button}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete()} style={[styles.button, styles.deleteButton]}>
                        <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
}

const styles = StyleSheet.create({
    headerCard: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    detsCard: {

        flexDirection: 'column'
    },
    star: {
        position: 'absolute',
        right: 70,
        top: 20,
        zIndex: 1
    },
    contentContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: 'flex-start',
        flexDirection: 'column'
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
        borderColor: 'black',
        borderWidth: 1,
        minWidth: '75%',
        maxWidth: '75%',
    },
    elementName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 6,
        color: "#333",
    },
    elementDescription: {
        fontSize: 16,
        marginBottom: 10,
        color: "#333",
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 10
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        width: '35%',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
    },
    deleteButtonText: {
        color: '#fff',
    }
});


export default ElementDetails;