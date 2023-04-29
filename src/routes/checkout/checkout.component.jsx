import { 
    CheckoutContainer, 
    CheckoutHeader, 
    CheckoutHeaderBlock, 
    CheckoutTotal, 
    CheckoutEmptyMessage 
} from './checkout.styles'

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, total } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <CheckoutHeaderBlock> Product </CheckoutHeaderBlock>
                <CheckoutHeaderBlock> Description </CheckoutHeaderBlock>
                <CheckoutHeaderBlock> Quantity </CheckoutHeaderBlock>
                <CheckoutHeaderBlock> Price </CheckoutHeaderBlock>
                <CheckoutHeaderBlock> Remove </CheckoutHeaderBlock>
            </CheckoutHeader>
            {
                cartItems.map((item) => (
                    <CheckoutItem key={item.id} item={item} />
                ))
            }
            {
                total !== 0 
                ? (
                    <CheckoutTotal>
                        {`Total: $${total}`}
                    </CheckoutTotal>
                ) : (
                    <CheckoutEmptyMessage>
                        Your Cart is Currently Empty!
                    </CheckoutEmptyMessage>
                )
            }
        </CheckoutContainer>
    )
}

export default Checkout;