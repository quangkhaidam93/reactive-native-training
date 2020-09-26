import { ProductDetailActionType } from './types';
import { takeLatest, put } from 'redux-saga/effects';

export function* getProductDetail(action: any) {
    try {
        yield put({type: ProductDetailActionType.GET_PRODUCT_DETAIL_SUCCESS, payload: action.payload});
    }
    catch {
        yield put({type: ProductDetailActionType.GET_PRODUCT_DETAIL_FAILURE});
    }
}

export function* productDetailWatcher() {
    yield takeLatest(ProductDetailActionType.GET_PRODUCT_DETAIL_REQUEST, getProductDetail);
}