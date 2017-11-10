import React, {Component} from 'react';
import {Button} from 'react-native';

export class ProfileScreen extends React.Component {
    render() {
        return (<Button
            title="Go to Dashboard"
            onPress={() => this.props.navigation.navigate('Intro', {name: 'Jane'})}/>);
    }
}