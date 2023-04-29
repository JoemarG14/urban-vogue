import { Fragment, useContext, useEffect, useState } from 'react';
import { CategoryContainer, CategoryTitle } from './category.styles'
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const { category } = useParams();
    const { categories } = useContext(CategoriesContext);
    const [products, setProducts] = useState(categories[category]);

    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);

    return (
        <Fragment>
            <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products && products.items.map((product) => {
                        return <ProductCard key={product.id} product={product}/>
                    })
                }
            </CategoryContainer>
        </Fragment>
    )
}

export default Category;