import Button, { BUTTON_TYPE } from '../button/button.component'

import { ProductCardContainer, ProductCardFooter } from './product-card.styles'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart } from '../../store/cart/cart.action'
import { selectorCartItems } from '../../store/cart/cart.selector'
import { selectorUserInfo } from '../../store/user/user.selector'
import { useNavigate } from 'react-router'

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectorCartItems);
    const userInfo = useSelector(selectorUserInfo);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product, '', navigate, userInfo))

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={name}/>
            <ProductCardFooter>
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </ProductCardFooter>
            <Button buttonType={BUTTON_TYPE.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    )
}

export default ProductCard;