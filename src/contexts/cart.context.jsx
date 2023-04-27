import { createContext, useState, useEffect } from "react";

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

export const CartContext = createContext({
    isOpen: false,
    setIsOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    
    useEffect(() => {
        const totalCartItem = cartItems.reduce((total, item) => 
            total + item.quantity
        , 0)
        setCartCount(totalCartItem);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setcartItems(addItem(cartItems, productToAdd));
    }

    const value = {isOpen, setIsOpen, cartItems, addItemToCart, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}