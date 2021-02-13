import React from 'react'
import {View, Text} from 'react-native'

function DateHeader({ date }) {
    return (
        <View>
            <Text>{date}</Text>
        </View>
    )
}

export default DateHeader