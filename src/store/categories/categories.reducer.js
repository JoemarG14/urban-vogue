import { CATEGORIES_TYPES } from "./categories.types";

const INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case CATEGORIES_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    }
}