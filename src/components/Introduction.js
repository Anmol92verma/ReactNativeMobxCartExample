import React, {Component} from 'react';
import {Button} from 'react-native';

export class Introduction extends React.Component {
    render() {
        return (<Button
            title="Go to Jane's profile"
            onPress={() => this.props.navigation.navigate('Profile', {name: 'Jane'})}/>);
    }
}