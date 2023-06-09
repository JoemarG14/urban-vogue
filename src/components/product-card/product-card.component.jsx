import { useContext } from 'react'
import Button, { BUTTON_TYPE } from '../button/button.component'

import { ProductCardContainer, ProductCardFooter } from './product-card.styles'
import { CartContext } from '../../contexts/cart.context'

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product
    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(product)

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