import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { Calendar, Agenda } from 'react-native-calendars'

function History() {
    const entries = useSelector(state => state)
    const dispatch = useDispatch()

    async function fetchData() {
        const getEntries = await fetchCalendarResults()
        await dispatch(receiveEntries(getEntries))
        if (!getEntries[timeToString()]) {
            dispatch(addEntry({
                [timeToString()]: getDailyReminderValue()
            }))
        }
    }

    useEffect(() => { fetchData() }, [])

    function renderItem({ today, ...metrics }, formattedDate, key) {
        return (
            <View>
                { today
                    ? <Text>{JSON.stringify(today)}</Text>
                    : <Text>{JSON.stringify(metrics)}</Text>}
            </View>
        )
    }

    function renderEmptyDate(formattedDate) {
        return (
            <View>
                <Text>No Data for this day</Text>
            </View>
        )
    }

    console.log(entries)

    return (
        <Agenda
            items={entries}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
        />
    )
}

export default History