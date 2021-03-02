import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddEntry from './AddEntry'
import History from './History'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'

const Tab = createBottomTabNavigator()

function Nav() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let icon
                    if (route.name === 'Add Entry') {
                        icon = (
                            <FontAwesome name="plus-square" size={size} color={color} />
                        )
                    } else if (route.name === 'History') {
                        icon = (
                            <Ionicons name="ios-bookmarks" size={size} color={color} />
                        )
                    }
                    return icon
                },
            })}
            tabBarOptions={{
                activeTintColor: Platform.OS === 'ios' ? purple : white,
                style: {
                    backgroundColor: Platform.OS === 'ios' ? white : purple,
                },
                indicatorStyle: {
                    // Android tab indicator (line at the bottom of the tab)
                    backgroundColor: 'yellow',
                },
            }}
        >
            <Tab.Screen name='History' component={History} />
            <Tab.Screen name='Add Entry' component={AddEntry} />
        </Tab.Navigator>
    )
}

export default Nav