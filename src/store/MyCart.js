import {ADD_TO_CART, DELETE_FROM_CART} from './Constants';

const initialState = {
    items: []
}

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                items: [
                    ...state.items,
                    action.item
                ]
            };
        case DELETE_FROM_CART:
            return {
                items: state
                    .items
                    .filter(cart => cart.id !== action.item.id)
            };
        default:
            return state;
    }
};

export default peopleReducer