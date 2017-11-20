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
import IconBadge from 'react-native-icon-badge';

import {addToCart, deleteFromCart} from '../store/Actions';
import {connect} from 'react-redux';
import PropTypes from "prop-types";

var {height, width} = Dimensions.get('window');

var rowWidth = width;
var rowHeight = height / 2;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            refreshing: true,
            cartItems: []
        };
    }

    componentDidMount() {
        this.getPhotos();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({cartItems: nextProps.items})
    }

    getPhotos = () => {
        this.setState({refreshing: true})
        axios
            .get('https://jsonplaceholder.typicode.com/photos', {})
            .then((response) => {
                this.setState({dataSource: response.data, refreshing: false})
            })
            .catch((error) => {
                this.setState({refreshing: false})
            });
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
            .dispatch(addToCart(item))
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
        if (this.contains(item)) {
            return "Item in Cart";
        } else {
            return "Add To Cart";
        }
    }

    onActionSelected = ({position}) => {
        const {navigate} = this.props.navigation;
        navigate('CartScreen', {name: 'Jane'})
    }

    getBadgeElement = () => {
        return (
            <Text style={{
                color: '#FFFFFF'
            }}>
                {this.state.cartItems.length
}
            </Text>
        );
    }

    getMainElement = () => {
        return (< View style = {{backgroundColor:'#489EFE', width:50, height:50, margin:6 }}/>);
    }

    getMainBadge = () => {
        return (<IconBadge
            MainElement={this.getMainElement()}
            BadgeElement={this.getBadgeElement()}
            IconBadgeStyle={{
                width: 30,
                height: 30,
                backgroundColor: '#FF00EE'
            }}
            Hidden={this.state.cartItems.length == 0}></IconBadge >);
    }

    getToolbar = () => {
        return (
            <View
                style={{
                backgroundColor: '#000000',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                {this.getTitle()}
                {this.getMainBadge()}
            </View>
        );
    }

    getTitle = () => {
        return (
            <Text
                style={{
                color: '#FFFFFF',
                alignSelf: 'center'
            }}>
                Flipkart
            </Text>
        );
    }

    getRenderMain = () => {
        if (this.state.refreshing) {
            return (<ActivityIndicator
                animating={this.state.animating}
                style={[
                styles.centering, {
                    height: 80
                }
            ]}
                size="large"/>);
        } else {
            return (
                <View>
                    {this.getToolbar()}
                    <FlatList
                        style={styles.page}
                        data={this.state.dataSource}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        refreshing={this.state.refreshing}
                        onRefresh={this.getPhotos}
                        extraData={this.state}
                        renderItem={this._renderItem}></FlatList>
                </View>
            );

        }
    }

    render() {
        return this.getRenderMain();
    }
}

Dashboard.propTypes = {
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

export default connect(mapStateToProps)(Dashboard);