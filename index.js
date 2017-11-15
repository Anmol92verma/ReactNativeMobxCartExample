import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
const store = configureStore()

AppRegistry.registerComponent('FlipKart', () => MyApp);

class MyApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        );
    }

}