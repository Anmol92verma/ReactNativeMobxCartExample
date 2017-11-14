import React, {Component} from 'react';

import {Provider} from "react-redux/native";
import {Dashboard} from './Dashboard';
import configureStore from '../store/configureStore'
const store = configureStore()

export class RootDashboard extends React.Component {

    render() {
        return (
            <Provider store={store}>
                {() => <Dashboard/>}
            </Provider>
        )
    }

}
