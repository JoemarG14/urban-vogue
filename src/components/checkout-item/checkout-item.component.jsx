import { CheckoutItemContainer, CheckoutItemImageContainer, CheckoutItemRemoveButton } from './checkout-item.styles'

import { useDispatch, useSelector } from 'react-redux';
import { selectorUserInfo } from '../../store/user/user.selector';
import { useNavigate } from 'react-router';
import { addItemToCart, decreaseQuantityFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectorCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({item}) => {
    const {id, name, price, imageUrl, quantity} = item;
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector(selectorUserInfo);
    const cartItems = useSelector(selectorCartItems);
    
    const increaseQuantityHandler = () => dispatch(addItemToCart(cartItems, item, 'INC', navigate, userInfo));
    const decreaseQuantityHandler = () => dispatch(decreaseQuantityFromCart(cartItems, id));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, id));

    return (
        <CheckoutItemContainer>
            <CheckoutItemImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </CheckoutItemImageContainer>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <span className='arrow' onClick={decreaseQuantityHandler}>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={increaseQuantityHandler}>&#10095;</span>
            </div>
            <span className='price'>{price}</span>
            <CheckoutItemRemoveButton onClick={removeItemHandler}>&#x2715;</CheckoutItemRemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem;