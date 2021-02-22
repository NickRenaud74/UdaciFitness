import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import { color } from 'react-native-reanimated'
import {purple} from '../utils/colors'

function TextButton({onPress, children}) {
    return (
        <TouchableOpacity 
            onPress={onPress}>
            <Text style={styles.reset}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
        color: purple
    }
})

export default TextButton