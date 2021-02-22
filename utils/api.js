import AsyncStorage from '@react-native-community/async-storage'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

export function submitEntry({key, entry}) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export async function fetchCalendarResults() {
    const cal = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    return formatCalendarResults(cal)
}

export async function removeEntry(key) {
    const results = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    const data = JSON.stringify(results)
    delete data[key]
    return AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
}