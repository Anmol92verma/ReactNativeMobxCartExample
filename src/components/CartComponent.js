import React, {Component} from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    FlatList,
    Image,
    Text,
    ActivityIndicator,
    Button,
    TouchableOpacity,
    ToolbarAndroid
} from 'react-native';
import axios from 'axios';

import {addToCart, deleteFromCart} from '../store/Actions';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

var {height, width} = Dimensions.get('window');

var rowWidth = width;
var rowHeight = height / 2;

class CartComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems: props.items
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({cartItems: nextProps.items})
    }

    renderSeparator = () => {
        return (<View
            style={{
            height: 1,
            width: "86%",
            backgroundColor: "#CED0CE"
        }}/>);
    };

    _renderItem = ({item}) => {

        return (
            <View style={styles.itemStyle}>
                <Text style={styles.itemTitle}>{item.title}</Text>

                <Image
                    style={{
                    width: rowWidth,
                    height: rowHeight
                }}
                    source={{
                    uri: item.thumbnailUrl
                }}/>

                <Button
                    onPress={() => this.onClickAddToCart(item)}
                    title={this.getButtonText(item)}></Button>
            </View>
        );

    }

    onClickAddToCart = (item) => {
        this
            .props
            .dispatch(deleteFromCart(item))
    }

    contains(item) {
        var found = false;
        for (var i = 0; i < this.state.cartItems.length; i++) {
            if (this.state.cartItems[i].id == item.id) {
                found = true;
                break;
            }
        }
        return found;
    }

    getButtonText = (item) => {
        return "Remove from Cart";
    }

    onActionSelected = ({position}) => {
        this
            .props
            .navigator
            .goBack(null);
    }

    getRenderMain = () => {
        return (
            <View>
                <ToolbarAndroid
                    titleColor="white"
                    style={styles.toolbar}
                    title="Flipkart"
                    actions={[{
                        title: 'Cart',
                        icon: require('../icons/icon.png'),
                        show: 'always'
                    }
                ]}
                    onActionSelected={this.onActionSelected}></ToolbarAndroid>
                <FlatList
                    style={styles.page}
                    data={this.state.cartItems}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                    onRefresh={this.getPhotos}
                    extraData={this.state}
                    renderItem={this._renderItem}></FlatList>
            </View>
        );
    }

    render() {
        return this.getRenderMain();
    }
}

CartComponent.propTypes = {
    dispatch: PropTypes.func
};

var styles = StyleSheet.create({
    page: {
        margin: 5
    },
    itemStyle: {
        flexDirection: 'column'
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    toolbar: {
        backgroundColor: 'blue',
        height: 56
    }
});

const mapStateToProps = (state) => {
    console.log("map state to props");
    console.log(state);
    return {items: state.peopleReducer.items};
};

export default connect(mapStateToProps)(CartComponent);