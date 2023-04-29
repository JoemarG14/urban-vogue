import { createContext, useState, useEffect } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categories: {}
});

export const CategoriesProvider = ({children}) => {
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCollectionAndDocuments();
            setCategories(categoryMap)
        }

        getCategoriesMap();
    }, []);

    const value = {categories};

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}