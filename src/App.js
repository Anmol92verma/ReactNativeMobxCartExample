import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {Introduction} from '../src/components/Introduction';
import {RootDashboard} from '../src/components/RootDashboard';
import {ProfileScreen} from '../src/components/ProfileScreen';

const App = StackNavigator({
    Home: {
        screen: Introduction
    },
    Intro: {
        screen: RootDashboard
    },
    Profile: {
        screen: ProfileScreen
    }
}, {
    headerMode: 'none',
    initialRouteName: 'Intro'
});

export default App;