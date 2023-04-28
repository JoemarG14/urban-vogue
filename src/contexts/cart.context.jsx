import { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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

export const CartProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        // For cart item total inside cart icon
        const totalCartItem = cartItems.reduce((total, item) => total + item.quantity, 0)
        setCartCount(totalCartItem);

        // For checkout total of all items
        const totalPrice = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0)
        setTotal(totalPrice);
    }, [cartItems])

    const addItemToCart = (productToAdd, method = '') => {
        setCartItems(addItem(cartItems, productToAdd));
        if(method !== 'INC')
            toastAddedToCart(productToAdd.name);
    }

    const decreaseQuantityFromCart = (productId) => {
        setCartItems(decreaseQuantity(cartItems, productId));
    }

    const removeItemFromCart = (productId) => {
        setCartItems(removeItem(cartItems, productId));
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