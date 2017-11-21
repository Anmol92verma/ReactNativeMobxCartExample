import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Introduction} from '../src/components/Introduction';
import Dashboard from '../src/components/Dashboard';
import {ProfileScreen} from '../src/components/ProfileScreen';
import CartComponent from '../src/components/CartComponent'

const App = StackNavigator({
    Intro: {
        screen: Dashboard
    },
    Home: {
        screen: Introduction
    },
    Profile: {
        screen: ProfileScreen
    },
    CartScreen: {
        screen: CartComponent
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Intro'
});

export default App;