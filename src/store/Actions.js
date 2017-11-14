import {ADD_TO_CART, DELETE_FROM_CART} from './constants';

export function addToCart(item) {
    return {type: 'ADD_TO_CART', item};
}

export function deleteFromCart(item) {
    return {type: 'DELETE_FROM_CART', item};
}