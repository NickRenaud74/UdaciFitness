import React, {useState} from 'react'
import {View, Text} from 'react-native'
import {getMetricMetaInfo, timeToString, getDailyReminderValue} from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import Stepper from './Stepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { useDispatch, useSelector } from 'react-redux'


function AddEntry() {
    const [run, setRun] = useState(0)
    const [bike, setBike] = useState(0)
    const [swim, setSwim] = useState(0)
    const [sleep, setSleep] = useState(0)
    const [eat, setEat] = useState(0)
    const dispatch = useDispatch()
    const entries = useSelector(state => state)

    console.log(entries)
    function mapState(metric) {
        switch(metric) {
            case('run'):
                return run
            case('bike'):
                return bike
            case('swim'):
                return swim
            case('sleep'):
                return sleep
            case('eat'):
                return eat
        }
    }

    function increment(metric) {
        const {max, step} = getMetricMetaInfo(metric)
        const count = mapState(metric) + step
        const value = count > max ? max : count
        switch(metric) {
            case('run'): 
                return setRun(value)
            case('bike'):
                return setBike(value)
            case('swim'):
                return setSwim(value)
        }
    }

    function decrement(metric) {
        const count = mapState(metric) - getMetricMetaInfo(metric).step
        const value = count < 0 ? 0 : count

        switch(metric) {
            case('run'): 
                return setRun(value)
            case('bike'):
                return setBike(value)
            case('swim'):
                return setSwim(value)
        }
    }

    function slide(metric, value) {
        switch(mapState(metric)) {
            case(eat):
                return setEat(value)
            case(sleep):
                return setSleep(value)
        }
    }

    function submit() {
        const key = timeToString()
        const entry = {run, bike, swim, sleep, eat}

        dispatch(addEntry({
            [key]: entry
        }))

        setBike(0)
        setRun(0)
        setSwim(0)
        setSleep(0)
        setEat(0)

        // Navigate to home
        submitEntry(key, entry)

        // Clear local notification

    }

    function reset() {
        const key = timeToString()

        dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        removeEntry(key)
        //Route to home
    }

    const metaInfo = getMetricMetaInfo()
    const todaysKey = timeToString()
    const alreadyLogged = entries[todaysKey] && typeof entries[todaysKey].today === 'undefined'

    if (alreadyLogged) {
        return (
            <View>
                <Ionicons name='md-happy' size={100} />
                <Text>You Already Logged Information Today.</Text>
                <TextButton onPress={reset} >Reset</TextButton>
            </View>
        )
    }

    return (
        <View>
            <DateHeader date={(new Date()).toLocaleDateString()} />
            {Object.keys(metaInfo).map(key => {
                const {getIcon, type, ...rest } = metaInfo[key]
                value = mapState(key)
                return (
                    <View key={key}> 
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
            <TextButton onPress={submit}>SUBMIT</TextButton>
        </View>
    )
}

export default AddEntry