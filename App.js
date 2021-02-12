import React, {useState} from 'react';
import { View } from 'react-native';
import AddEntry from './components/AddEntry'
import { getMetricMetaInfo } from './utils/helpers';

export default function App() {
    const [run, setRun] = useState(0)
    const [bike, setBike] = useState(0)
    const [swim, setSwim] = useState(0)
    const [sleep, setSleep] = useState(0)
    const [eat, setEat] = useState(0)

    function increment(metric) {
        const {max, step} = getMetricMetaInfo(metric)
        const count = [metric] + step
        const value = count > max ? max : count

        switch(metric) {
            case(run): 
                return setRun(value)
            case(bike):
                return setBike(value)
            case(swim):
                return setSwim(value)
        }
    }

    function decrement(metric) {
        const count = [metric] - getMetricMetaInfo(metric).step
        const value = count < 0 ? 0 : count

        switch(metric) {
            case(run): 
                return setRun(value)
            case(bike):
                return setBike(value)
            case(swim):
                return setSwim(value)
        }
    }

    function slide(metric, value) {
        switch(metric) {
            case(eat):
                return setEat(value)
            case(sleep):
                return setSleep(value)
        }
    }

    return ( 
    <View>
        <AddEntry />
    </View>
    );
}