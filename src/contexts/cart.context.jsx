import { createContext, useContext, useReducer} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "./user.context";
import { createAction } from '../utils/reducer/reducer.utils'
import { useSelector } from "react-redux";
import { selectorUserInfo } from "../store/user/user.selector";

export const CartContext = createContext({
    isOpen: false,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    toggleCartState: () => {},
    closeCartPopUp: () => {},
    decreaseQuantityFromCart: () => {},
    total: 0,
    removeItemFromCart: () => {}
});

export const INITIAL_STATE = {
    isOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0,
}

export const CART_ACTIONS = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    ADD_TO_CART: 'ADD_TO_CART',
}

const cartReducer = (state, action) => {
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
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in isCartOpenReducer.`);
    }
}

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

export const CartProvider = ({children}) => {
    const userInfo = useSelector(selectorUserInfo);
    const navigate = useNavigate();

    const [{isOpen, cartItems, cartCount, total}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const addToCartReducer = (newCartItems) => {
        const totalCartItem = newCartItems.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = newCartItems.reduce((total, item) => total + (item.quantity * item.price), 0);

        dispatch(createAction(CART_ACTIONS.ADD_TO_CART, {
            cartItems: newCartItems,
            cartCount: totalCartItem,
            total: totalPrice
        }));
    }

    const setIsOpen = (bool) => (dispatch(createAction(CART_ACTIONS.SET_IS_CART_OPEN, bool)))

    const addItemToCart = (productToAdd, method = '') => {
        if (userInfo) {
            const newCartItems = addItem(cartItems, productToAdd);
            addToCartReducer(newCartItems);
            if(method !== 'INC')
                toastAddedToCart(productToAdd.name);
        } else {
            toast('Sign in first to add items to your cart.', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 3000
            });
            navigate('/auth');
        }
    }

    const decreaseQuantityFromCart = (productId) => {
        const newCartItems = decreaseQuantity(cartItems, productId);
        addToCartReducer(newCartItems);
    }

    const removeItemFromCart = (productId) => {
        const newCartItems = removeItem(cartItems, productId);
        addToCartReducer(newCartItems);
    }

    const toggleCartState = () => setIsOpen(!isOpen);
    const closeCartPopUp = () => setIsOpen(false);

    const value = {
        isOpen, 
        cartItems, 
        addItemToCart, 
        cartCount, 
        toggleCartState,
        closeCartPopUp, 
        decreaseQuantityFromCart, 
        total,
        removeItemFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}