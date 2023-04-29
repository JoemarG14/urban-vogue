import Directory from '../../components/directory/directory.component';
import { useContext } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';

const Home = () => {
    const { categories } = useContext(CategoriesContext);

    return <Directory categories={categories}/>
}

export default Home;