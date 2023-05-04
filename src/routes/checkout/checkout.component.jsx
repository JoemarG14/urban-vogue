import { 
    CheckoutContainer, 
    CheckoutHeader, 
    CheckoutHeaderBlock, 
    CheckoutTotal, 
    CheckoutEmptyMessage 
} from './checkout.styles'

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useSelector } from 'react-redux';
import { selectorCartItems, selectorCartTotalPrice } from '../../store/cart/cart.selector';

const Checkout = () => {
    const cartItems = useSelector(selectorCartItems);
    const total = useSelector(selectorCartTotalPrice);

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