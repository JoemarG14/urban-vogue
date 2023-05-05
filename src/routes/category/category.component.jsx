import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import { CategoryContainer, CategoryTitle } from './category.styles'
import ProductCard from '../../components/product-card/product-card.component';
import { selectorCategories, selectorCategoriesLoading } from '../../store/categories/categories.selector';

const Category = () => {
    const { category } = useParams();
    const categories = useSelector(selectorCategories);
    const isLoading = useSelector(selectorCategoriesLoading);
    const [products, setProducts] = useState(categories[category]);

    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);

    return (
        <Fragment>
            <CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>
            {
                isLoading ? (
                    <ReactLoading type='bars' className='loading-bar' color="#636767" />
                ) : (
                    <CategoryContainer>
                        {
                            products && products.items.map((product) => {
                                return <ProductCard key={product.id} product={product}/>
                            })
                        }
                    </CategoryContainer>
                )
            }
        </Fragment>
    )
}

export default Category;