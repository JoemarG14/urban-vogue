import { CATEGORIES_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoryMap) => 
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categoryMap)

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error)

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoryMap = await getCollectionAndDocuments();
        dispatch(fetchCategoriesSuccess(categoryMap))
    } catch (error) {
        dispatch(fetchCategoriesFailed(error))
    }
}