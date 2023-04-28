import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss'
import { CartContext } from '../../contexts/cart.context';

const CartDropDown = () => {
    const { cartItems, closeCartPopUp } = useContext(CartContext);
    const navigate = useNavigate();

    const checkoutClickHandler = () => {
        navigate('/checkout');
        closeCartPopUp();
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {
                cartItems.length !== 0 ?
                cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} item={cartItem}/>
                )) : (
                    <div className='empty-cart'>
                        Your Cart is Currently Empty!
                    </div>
                )
            }
            </div>
            <Button onClick={checkoutClickHandler}>
                CHECKOUT
            </Button>
        </div>
    )
}

export default CartDropDown;