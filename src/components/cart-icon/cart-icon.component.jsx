import { CartIconContainer, CartIconBag, CartIconItemCount } from './cart-icon.styles'
import { useDispatch, useSelector } from 'react-redux';
import { selectorCartCount, selectorIsOpen } from '../../store/cart/cart.selector';
import { setIsOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    const dispatch = useDispatch();
    const cartCount = useSelector(selectorCartCount);
    const isOpen = useSelector(selectorIsOpen);


    const toggleIsCartOpen = () => dispatch(setIsOpen(!isOpen))
    
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <CartIconBag className='shopping-icon'/>
            <CartIconItemCount className='item-count'>{cartCount}</CartIconItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;