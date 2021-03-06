import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { calculateDirection } from '../utils/helpers'

export default function Live() {
    const [coords, setCoords] = useState(1000)
    const [status, setStatus] = useState(null)
    const [direction, setDirection] = useState('')

    async function getPermissions() {
        const getLocationPermission = 
            await Permissions.getAsync(Permissions.LOCATION)
                .catch((err) => {
                    console.warn('Error getting location permission')
                    setStatus('undetermined')
                })
        const locationStatus = getLocationPermission.status
        if(locationStatus === 'granted') {
            return setLocation()
        }
        setStatus(locationStatus)
    }

    useEffect(() => { getPermissions() }, [])

    async function askPermission() {
        const askLocationPermission = 
            await Permissions.askAsync(Permissions.LOCATION)
                .catch(error => console.warn('error asking location permissions: ', error))
        const locationStatus = askLocationPermission.status
        if (locationStatus === 'granted') {
            return setLocation()
        }
        setStatus(locationStatus)
    }

    function setLocation() {
        Location.watchPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 100,
            distanceInterval: 1
        }, ({ coords }) => {
            const newDirection = calculateDirection(coords.heading)
            setCoords(coords)
            setStatus('granted')
            setDirection(newDirection)
        })
    }

    if (status === null) {
        return <ActivityIndicator style={{ marginTop: 30 }} />
    }

    if (status === 'denied') {
        return (
            <View style={styles.center}>
                <Foundation name='alert' size={50} />
                <Text>
                    You denied your location. You can fix this by visiting your settings and enabling location services for this app.
                </Text>
            </View>
        )
    }

    if (status === 'undetermined') {
        return (
            <View style={styles.center}>
                <Foundation name={alert} size={50} />
                <Text>You need to enable location services for this app.</Text>
                <TouchableOpacity style={styles.button} onPress={askPermission}>
                    <Text style={styles.buttonText}>Enable</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.directionContainer}>
                <Text style={styles.header}>You're heading</Text>
                <Text style={styles.direction}>{direction}</Text>
            </View>
            <View style={styles.metricContainer}>
                <View style={styles.metric}>
                    <Text style={[styles.header, { color: white }]}>
                        Altitude
                    </Text>
                    <Text style={[styles.subHeader, { color: white }]}>
                        {Math.round(coords.altitude)} meters
                    </Text>
                </View>
                <View style={styles.metric}>
                    <Text style={[styles.header, { color: white }]}>
                        Speed
                    </Text>
                    <Text style={[styles.subHeader, { color: white }]}>
                        {Math.round(coords.speed) } KPH
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: white,
        fontSize: 20,
    },
    directionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    direction: {
        color: purple,
        fontSize: 120,
        textAlign: 'center',
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
    }
})
