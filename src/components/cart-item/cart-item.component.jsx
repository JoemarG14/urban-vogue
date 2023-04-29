import {CartItemContainer, CartItemDetails} from './cart-item.styles'

const CartItem = ({item}) => {
    const {name, imageUrl, price, quantity} = item;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <CartItemDetails>
                <span> {name} </span>
                <span> {quantity} x ${price} </span>
            </CartItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;