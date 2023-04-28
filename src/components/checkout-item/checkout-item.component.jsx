import './checkout-item.styles.scss'

import { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({item}) => {
    const {id, name, price, imageUrl, quantity} = item;
    const { decreaseQuantityFromCart, removeItemFromCart, addItemToCart } = useContext(CartContext);
    
    const increaseQuantityHandler = () => addItemToCart(item, 'INC');
    const decreaseQuantityHandler = () => decreaseQuantityFromCart(id);
    const removeItemHandler = () => removeItemFromCart(id);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <div className='quantity'>
                <span className='arrow' onClick={decreaseQuantityHandler}>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span className='arrow' onClick={increaseQuantityHandler}>&#10095;</span>
            </div>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={removeItemHandler}>&#x2715;</span>
        </div>
    )
}

export default CheckoutItem;