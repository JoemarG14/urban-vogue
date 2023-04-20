
import './categoryContainer.styles.scss'

import CategoryItem from '../category-item/categoryItem.component';

const CategoryContainer = ({categories}) => (
    <div className='categories-container'>
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>
        ))}
    </div>
)


export default CategoryContainer;