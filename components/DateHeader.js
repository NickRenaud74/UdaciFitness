import React from 'react'
import {View, Text} from 'react-native'
import { purple } from '../utils/colors'

function DateHeader({ date }) {
    return (
        <View>
            <Text  style={{color: purple, fontSize: 25}} >{date}</Text>
        </View>
    )
}

export default DateHeader