import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import Stepper from './Stepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { purple, white } from '../utils/colors'


function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
        >
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}

function AddEntry({navigation}) {
    const [run, setRun] = useState(0)
    const [bike, setBike] = useState(0)
    const [swim, setSwim] = useState(0)
    const [sleep, setSleep] = useState(0)
    const [eat, setEat] = useState(0)
    const dispatch = useDispatch()
    const entries = useSelector(state => state)

    function mapState(metric) {
        switch (metric) {
            case ('run'):
                return run
            case ('bike'):
                return bike
            case ('swim'):
                return swim
            case ('sleep'):
                return sleep
            case ('eat'):
                return eat
        }
    }

    function increment(metric) {
        const { max, step } = getMetricMetaInfo(metric)
        const count = mapState(metric) + step
        const value = count > max ? max : count
        switch (metric) {
            case ('run'):
                return setRun(value)
            case ('bike'):
                return setBike(value)
            case ('swim'):
                return setSwim(value)
        }
    }

    function decrement(metric) {
        const count = mapState(metric) - getMetricMetaInfo(metric).step
        const value = count < 0 ? 0 : count

        switch (metric) {
            case ('run'):
                return setRun(value)
            case ('bike'):
                return setBike(value)
            case ('swim'):
                return setSwim(value)
        }
    }

    function slide(metric, value) {
        switch (mapState(metric)) {
            case (eat):
                return setEat(value)
            case (sleep):
                return setSleep(value)
        }
    }

    function submit() {
        const key = timeToString()
        const entry = [{ run, bike, swim, sleep, eat }]

        dispatch(addEntry({
            [key]: entry
        }))

        setBike(0)
        setRun(0)
        setSwim(0)
        setSleep(0)
        setEat(0)

        submitEntry(key, entry)
        navigation.goBack()
        // Clear local notification
    }

    function reset() {
        const key = timeToString()
        dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))
        removeEntry(key)
        navigation.goBack()
    }

    const metaInfo = getMetricMetaInfo()
    const todaysKey = timeToString()
    const alreadyLogged = entries[todaysKey][0] && typeof entries[todaysKey][0].today === 'undefined'

    if (alreadyLogged) {
        return (
            <View style={styles.center}>
                <Ionicons name={Platform.OS === 'ios' ? 'ios-happy' : 'md-happy'} size={100} />
                <Text>You Already Logged Information Today.</Text>
                <TextButton onPress={reset} >Reset</TextButton>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <DateHeader date={(new Date()).toLocaleDateString()} />
            {Object.keys(metaInfo).map(key => {
                const { getIcon, type, ...rest } = metaInfo[key]
                value = mapState(key)
                return (
                    <View key={key} style={styles.row}>
                        {getIcon()}
                        {
                            type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={value => slide(key, value)}
                                    {...rest}
                                />
                                : <Stepper
                                    value={value}
                                    onIncrement={() => increment(key)}
                                    onDecrement={() => decrement(key)}
                                    {...rest}
                                />
                        }
                    </View>
                )
            })}
            <SubmitBtn onPress={submit}>SUBMIT</SubmitBtn>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    }
})

export default AddEntry