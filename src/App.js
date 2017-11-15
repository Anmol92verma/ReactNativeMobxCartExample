import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Introduction} from '../src/components/Introduction';
import Dashboard from '../src/components/Dashboard';
import {ProfileScreen} from '../src/components/ProfileScreen';

const App = StackNavigator({
    Home: {
        screen: Introduction
    },
    Intro: {
        screen: Dashboard
    },
    Profile: {
        screen: ProfileScreen
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Intro'
});

export default App;