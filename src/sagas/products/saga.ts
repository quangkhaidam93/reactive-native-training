import { ProductModel } from 'models/Product';
import { ProductsActionTypes } from './types';
import { takeLatest, put } from 'redux-saga/effects';

export function* fetchProducts() {
    try {
        yield put({type: ProductsActionTypes.GET_PRODUCTS_SUCCESS});
    }
    catch {
        yield put({type: ProductsActionTypes.GET_PRODUCTS_FAILURE});
    }
}

export function* createProduct(action: any) {
    try {
        console.log('create Product Saga');
        console.log(action);

        const newProduct = {
            id: 11,
            name: "Product 11"
        }

        yield put({type: ProductsActionTypes.CREATE_PRODUCT_SUCCESS, payload: newProduct})
    }
    catch {
        yield put({type: ProductsActionTypes.CREATE_PRODUCT_FAILURE})
    }
}

export function* productsWatcher() {
    yield takeLatest(ProductsActionTypes.GET_PRODUCT_REQUEST, fetchProducts);
    yield takeLatest(ProductsActionTypes.CREATE_PRODUCT_REQUEST, createProduct);
}