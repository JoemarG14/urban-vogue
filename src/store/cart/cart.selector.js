import { createSelector } from "reselect";

const selectCartReducer = state => state.cart;

export const selectorCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
)

export const selectorIsOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.isOpen
)

export const selectorCartCount = createSelector(
    [selectorCartItems],
    (cartItem) => cartItem.reduce((total, item) => total + item.quantity, 0)
)

export const selectorCartTotalPrice = createSelector(
    [selectorCartItems],
    (cartItem) => cartItem.reduce((total, item) => total + (item.quantity * item.price), 0)
)
