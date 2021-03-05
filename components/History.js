import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import { white } from '../utils/colors'
import { Agenda } from 'react-native-calendars'
import MetricCard from './MetricCard'
import AppLoading from 'expo-app-loading'

function History({navigation}) {
    const [ready, setReady ] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0,10))
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
        setReady(true)
    }

    useEffect(() => { fetchData() }, [])

    function renderItem(dateKey, {today, ...metrics}, firstItemInDay) {
        return (
            <View style={styles.item}> 
                { today
                    ? <View>
                        <Text style={styles.noDataText}>{today}</Text>
                    </View>

                    : <TouchableOpacity 
                        onPress={() => navigation.navigate(
                            'Entry Detail', {entryId: dateKey}
                        )}
                    >
                        <MetricCard metrics={metrics}/>
                    </TouchableOpacity>
                    }
            </View>
        )
    }

    function renderEmptyDate() {
        return (
            <View style={styles.item}>
                <Text style={styles.noDataText}>You didn't log any data on this day</Text>
            </View>
        )
    }

    function onDayPress(day) {
        setSelectedDate(day.dateString)
    }

    if(ready === false) {
       return <AppLoading />
    }

    return (
        <Agenda
            items={entries}
            onDayPress={onDayPress}
            renderItem={(item, firstItemInDay) => renderItem(selectedDate, item, firstItemInDay)}
            renderEmptyDate={renderEmptyDate}
        />
    )
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: white,
      borderRadius: Platform.OS === 'ios' ? 16 : 2,
      padding: 20,
      marginLeft: 10,
      marginRight: 10,
      marginTop: 17,
      justifyContent: 'center',
      shadowRadius: 3,
      shadowOpacity: 0.8,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
    },
    noDataText: {
      fontSize: 20,
      paddingTop: 20,
      paddingBottom: 20
    }
  })

export default History