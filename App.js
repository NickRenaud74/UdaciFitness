import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import reducer from './reducers'
import MainNav from './components/MainNav'
import Constants from 'expo-constants'
import { purple } from './utils/colors'
import AsyncStorage from '@react-native-community/async-storage';

function UdaciStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
    )
}

export default function App() {
    AsyncStorage.clear()
    return (
        <Provider store={createStore(reducer)}>
            <View style={{ flex: 1 }}>
                <NavigationContainer>
                    <UdaciStatusBar backgroundColor={purple} style='light' />
                    <MainNav />
                </NavigationContainer>
            </View>
        </Provider>
    )
}