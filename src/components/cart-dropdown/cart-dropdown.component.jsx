import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

import { CartDropDownContainer, CartDropDownItemsContainer, CartDropDownEmptyMessage } from './cart-dropdown.styles';
import { CartContext } from '../../contexts/cart.context';

const CartDropDown = () => {
    const { cartItems, closeCartPopUp } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutClickHandler = () => {
        navigate('/checkout');
        closeCartPopUp();
    };

    return (
        <CartDropDownContainer>
            <CartDropDownItemsContainer>
            {
                cartItems.length ?
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                )) : (
                    <CartDropDownEmptyMessage>
                        Your Cart is Currently Empty!
                    </CartDropDownEmptyMessage>
                )
            }
            </CartDropDownItemsContainer>
            <Button onClick={checkoutClickHandler}>
                CHECKOUT
            </Button>
        </CartDropDownContainer>
    )
}

export default CartDropDown;