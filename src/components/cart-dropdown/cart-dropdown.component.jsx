import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

import { CartDropDownContainer, CartDropDownItemsContainer, CartDropDownEmptyMessage } from './cart-dropdown.styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectorCartItems } from '../../store/cart/cart.selector';
import { setIsOpen } from '../../store/cart/cart.action';

const CartDropDown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectorCartItems);
    const navigate = useNavigate();

    const checkoutClickHandler = () => {
        navigate('/checkout');
        dispatch(setIsOpen(false))
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