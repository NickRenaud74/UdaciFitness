import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'
import TextButton from './TextButton'
import { addEntry } from '../actions'
import { removeEntry } from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'


function EntryDetail({ route, navigation }) {
    const { entryId } = route.params
    const entry = useSelector(state => state[entryId])
    const dispatch = useDispatch()

    function setTitle(entryId) {
        if (!entryId) return;

        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)

        navigation.setOptions({
            title: `${month}/${day}/${year}`
        });
    };

    setTitle(entryId);

    function remove() {
        dispatch(addEntry({
            [entryId]: timeToString === entryId ? getDailyReminderValue() : new Array()
        }))
    }

    function goBack() {
        navigation.goBack()
    }

    function reset() {
        remove()
        goBack()
        removeEntry(entryId)
    }

    return (
        

        <View>
            {entry.length !== 0 && !entry[0].today ?
            <View styles={styles.container}>
                <Text>Entry Detail </Text>
                <MetricCard metrics={entry[0]} />
                <TextButton onPress={reset} style={{ margin: 20 }}>
                    RESET
                </TextButton>
            </View>
            : navigation.navigate('Home')
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    }
})

export default EntryDetail