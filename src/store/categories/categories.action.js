import { CATEGORIES_TYPES } from "./categories.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategories = (categoryMap) => createAction(CATEGORIES_TYPES.SET_CATEGORIES_MAP, categoryMap)