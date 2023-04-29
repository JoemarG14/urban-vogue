import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { CartIconContainer, CartIconBag, CartIconItemCount } from './cart-icon.styles'

const CartIcon = () => {
    const {toggleCartState, cartCount} = useContext(CartContext);
    
    return (
        <CartIconContainer onClick={toggleCartState}>
            <CartIconBag className='shopping-icon'/>
            <CartIconItemCount className='item-count'>{cartCount}</CartIconItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;