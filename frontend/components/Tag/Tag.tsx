import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

type TagProps = {
    difficulty: string
}

const Tag = (props: TagProps) => {
    return (
        <View style={[styles.tag, props.difficulty.toLowerCase() === 'hard' ? styles.tag_hard : props.difficulty.toLowerCase() === 'medium' ? styles.tag_medium : styles.tag_easy]}>
            <Text style={[styles.text, props.difficulty.toLowerCase() === 'hard' ? styles.text_hard : props.difficulty.toLowerCase() === 'medium' ? styles.text_medium : styles.text_easy]}>
                {props.difficulty.charAt(0).toUpperCase() + props.difficulty.slice(1)}
            </Text>
        </View >
    )
}

export default Tag

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        textAlign: 'center'
    },

    text_hard: {
        color: 'white'
    },
    text_easy: {
        color: 'white'
    },
    text_medium: {
        color: 'black'
    },
    tag: {
        padding: 3,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tag_hard: {
        backgroundColor: 'purple',
        width: '16%'
    },
    tag_medium: {
        backgroundColor: 'yellow',
        width: '22%'
    },
    tag_easy: {
        backgroundColor: 'green',
        width: '15%'
    }
})