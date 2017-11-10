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
import myCart from '../store/MyCart'

var {height, width} = Dimensions.get('window');
import {observer} from 'mobx-react/native';

var rowWidth = width;
var rowHeight = height / 2;

observer
export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            refreshing: true
        };
    }

    componentDidMount() {
        this.getPhotos();
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

    onAddToCart(item) {
        myCart.addItemToCart(item)
    }

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

                <Button onPress={() => this.onAddToCart(item)} title={this.getButtonText(item)}></Button>
            </View>
        );

    }

    getButtonText = (item) => {
        if (myCart.contains(item.id)) {
            return "Item Already inCart";
        } else {
            return "Add To Cart";
        }
    }

    onActionSelected({position}) {
        console.warn("Cart items " + myCart.itemCount())
    }

    render() {
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
                        data={this.state.dataSource}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={this.renderSeparator}
                        refreshing={this.state.refreshing}
                        onRefresh={this.getPhotos}
                        renderItem={this._renderItem}></FlatList>
                </View>

            );
        }

    }
}

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
