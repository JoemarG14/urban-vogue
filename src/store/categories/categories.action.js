import { CATEGORIES_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoryMap) => 
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categoryMap)

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAILED, error)
