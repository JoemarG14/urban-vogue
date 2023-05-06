import { all, call, takeLatest, put } from 'redux-saga/effects';

import { CATEGORIES_TYPES } from './categories.types';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.action';
import { getCollectionAndDocuments } from '../../utils/firebase/firebase.utils';

//function to call when process is success
export function* fetchCategoriesAsync() {
    try {
        const categoryMap = yield call(getCollectionAndDocuments);
        yield put(fetchCategoriesSuccess(categoryMap))
    } catch (error) {
        yield put(fetchCategoriesFailed(error))
    }
}

// This function will make a listener 
// when the first param is called/run, it will execute the second param
export function* onFetchCategories() {
    yield takeLatest(CATEGORIES_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

// This will run the listener
export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}