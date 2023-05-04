import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => state.categories;

const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectorCategories = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items, imageUrl } = category;
        acc[title.toLocaleLowerCase()] = {items, imageUrl};
        return acc;
    }, {})
)

