import { CART_ACTIONS } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { toast } from "react-toastify";

const addItem = (cartItems, productToAdd) => {

    const isAlreadyInCart = cartItems.find((item) => 
        item.id === productToAdd.id
    );

    if (isAlreadyInCart) {
        return cartItems.map(
            item => item.id === productToAdd.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}]

}

const decreaseQuantity = (cartItems, productId) => {
    const productData = cartItems.find((item) => item.id === productId);

    if (productData.quantity === 1) {
        return cartItems.filter(
            item => item.id !== productId
        );
    }

    return cartItems.map(
        item => item.id === productId 
        ? {...item, quantity: item.quantity - 1}
        : item
    );
}

const removeItem = (cartItems, productId) => {
    return cartItems.filter(
        item => item.id !== productId
    );
}

const toastAddedToCart = (name) => {
    toast(`${name} successfully added to cart.`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        className: 'toast-message-success',
    });
};

// Actions

export const setIsOpen = (bool) => createAction(CART_ACTIONS.SET_IS_CART_OPEN, bool);

export const addItemToCart = (cartItems, productToAdd, method = '', navigate, userInfo) => {

    if (userInfo) {
        const newCartItems = addItem(cartItems, productToAdd);
        if(method !== 'INC') toastAddedToCart(productToAdd.name);
        return createAction(CART_ACTIONS.ADD_TO_CART, newCartItems);
    } else {
        toast('Sign in first to add items to your cart.', {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 3000
        });
        navigate('/auth');
        return createAction('', []);
    }
}

export const decreaseQuantityFromCart = (cartItems, productId) => {
    const newCartItems = decreaseQuantity(cartItems, productId);
    return createAction(CART_ACTIONS.ADD_TO_CART, newCartItems);
}

export const removeItemFromCart = (cartItems, productId) => {
    const newCartItems = removeItem(cartItems, productId);
    return createAction(CART_ACTIONS.ADD_TO_CART, newCartItems);
}


