import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

import Directory from '../../components/directory/directory.component';
import { selectorCategories, selectorCategoriesLoading } from '../../store/categories/categories.selector';

const Home = () => {
    const categories = useSelector(selectorCategories)
    const isLoading = useSelector(selectorCategoriesLoading)

    return isLoading
        ? <ReactLoading type='bars' className='loading-bar' color="#636767" /> 
        : <Directory categories={categories}/>
}

export default Home;