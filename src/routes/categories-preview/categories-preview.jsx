import { Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { useSelector } from 'react-redux';
import { selectorCategories } from '../../store/categories/categories.selector';

const CategoriesPreview = () => {
    const categories = useSelector(selectorCategories);

    return(
        <Fragment>
            {
                Object.keys(categories).map((title) => {
                    const products = categories[title].items;
                    return <CategoryPreview key={title} title={title} products={products}/>
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;