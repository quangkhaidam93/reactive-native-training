import { all } from 'redux-saga/effects';
import { productsWatcher } from './products/saga';
import { productDetailWatcher } from './productdetail/saga';

export const rootSaga = function* root() {
    yield all([
        productsWatcher(),
        productDetailWatcher()
    ]);
}