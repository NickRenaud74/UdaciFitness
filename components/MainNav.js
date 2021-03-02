import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNav from './TabNav'
import EntryDetail from './EntryDetail'
import { purple, white } from '../utils/colors'

const Stack = createStackNavigator();

function MainNav() {
    return (
        <Stack.Navigator headerMode="screen">
            <Stack.Screen
                name="Home"
                component={TabNav}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Entry Detail"
                component={EntryDetail}
                options={{
                    headerTintColor: white, headerStyle: {
                        backgroundColor: purple,
                    },
                    title: 'EntryDetail'
                }} />
        </Stack.Navigator>
    )
}

export default MainNav