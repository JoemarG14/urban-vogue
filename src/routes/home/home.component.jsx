import Directory from '../../components/directory/directory.component';
import { useSelector } from 'react-redux';
import { selectorCategories } from '../../store/categories/categories.selector';

const Home = () => {
    const categories = useSelector(selectorCategories)

    return <Directory categories={categories}/>
}

export default Home;