import {ADD_TO_CART, DELETE_FROM_CART} from './Constants';

class MyCart {

    initialState = {
        items: []
    }

    peopleReducer(state = initialState, action) {
        switch (action.type) {
            case ADD_TO_CART:
                return {
                    cart: [
                        ...state.items,
                        action.cartItem
                    ]
                };
            case DELETE_FROM_CART:
                return {
                    cart: state
                        .items
                        .filter(cart => cart.id !== action.cartItem.id)
                };
            default:
                return state;
        }
    }

}

var myCart = new MyCart();
export default myCart;