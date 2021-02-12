import React from 'react'
import {View} from 'react-native'
import {getMetricMetaInfo} from '../utils/helpers'

function AddEntry() {
    return (
        <View>
            {getMetricMetaInfo('bike').getIcon()}
        </View>
    )
}

export default AddEntry