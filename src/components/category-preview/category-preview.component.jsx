import { Link } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, CategoryPreviewTitle, PreviewContainer } from './category-preview.styles'

const CategoryPreview = ({title, products}) => (
    <CategoryPreviewContainer>
        <Link to={title}>
            <CategoryPreviewTitle>
                <div className='title'>{title.toLocaleUpperCase()}</div>
                <div className='arrows'>&#10095; &#10095;</div>
            </CategoryPreviewTitle>
        </Link>
        <PreviewContainer>
            {
                products
                .filter((_, index) => index < 4)
                .map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))
                
            }
        </PreviewContainer>
    </CategoryPreviewContainer>
)


export default CategoryPreview;