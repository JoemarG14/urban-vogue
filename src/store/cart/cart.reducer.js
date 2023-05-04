import { CART_ACTIONS } from "./cart.types";

const INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
}

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTIONS.SET_IS_CART_OPEN:
            return {
                ...state,
                isOpen: payload
            }
        case CART_ACTIONS.ADD_TO_CART:
            return {
                ...state,
                cartItems: payload
            }
        default:
            return state;
    }
}