import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectorCategories, selectorCategoriesLoading } from '../../store/categories/categories.selector';

const CategoriesPreview = () => {
    const categories = useSelector(selectorCategories);
    const isLoading = useSelector(selectorCategoriesLoading)

    return(
        <Fragment>
            {
                isLoading ? (
                    <ReactLoading type='bars' className='loading-bar' color="#636767" />
                ) : (
                    Object.keys(categories).map((title) => {
                        const products = categories[title].items;
                        return <CategoryPreview key={title} title={title} products={products}/>
                    })
                )
            }
        </Fragment>
    )
}

export default CategoriesPreview;