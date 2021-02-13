import React, {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import Stepper from './Stepper'
import UdaciSlider from './UdaciSlider'
import DateHeader from './DateHeader'


function SubmitBtn ({ onPress }) {
    return (
      <TouchableOpacity
        onPress={onPress}
        >
          <Text>SUBMIT</Text>
      </TouchableOpacity>
    )
  }
  

function AddEntry() {
    const [run, setRun] = useState(0)
    const [bike, setBike] = useState(0)
    const [swim, setSwim] = useState(0)
    const [sleep, setSleep] = useState(0)
    const [eat, setEat] = useState(0)

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
            default:
                return null
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

        // Update Redux

        setBike(0)
        setRun(0)
        setSwim(0)
        setSleep(0)
        setEat(0)

        // Navigate to home

        // Save to "DB"

        // Clear local notification

    }

    const metaInfo = getMetricMetaInfo()

    return (
        <View>
            <DateHeader date={(new Date()).toLocaleDateString()} />
            {Object.keys(metaInfo).map(key => {
                const {getIcon, type, ...rest } = metaInfo[key]
                value = mapState(key)
                console.log(key, value)
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
            <SubmitBtn onPress={submit} />
        </View>
    )
}

export default AddEntry