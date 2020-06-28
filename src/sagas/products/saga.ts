import { ProductsActionTypes } from './types';
import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';

export function* fetchProducts() {
    try {
        const response = yield call(() => axios.get('https://api.uat.aladin.today/public/v0.3.3/product?offset=0&limit=24&fromKm=0&toKm=10&lat=10.7861343&lng=106.6922188&areaText=Qu%E1%BA%ADn%203,%20H%E1%BB%93%20Ch%C3%AD%20Minh'));
        const { data: {dataArray} } = response;
        const datas = dataArray.map((data: any) => {
            const { id, productName, thumbImage, thumbHeight } = data;
            return {
                id,
                productName,
                thumbImage,
                thumbHeight
            }
        });
        yield put({type: ProductsActionTypes.GET_PRODUCTS_SUCCESS, payload: datas});
    }
    catch {
        yield put({type: ProductsActionTypes.GET_PRODUCTS_FAILURE});
    }
}

export function* loadmoreProducts(action: any) {
    try {
        const response = yield call(() => axios.get('https://api.uat.aladin.today/public/v0.3.3/product?offset=' + action.payload.toString() + '&limit=24&fromKm=0&toKm=10&lat=10.7861343&lng=106.6922188&areaText=Qu%E1%BA%ADn%203,%20H%E1%BB%93%20Ch%C3%AD%20Minh'));
        const { data: {dataArray} } = response;
        const datas = dataArray.map((data: any) => {
            const { id, productName, thumbImage, thumbHeight } = data;
            return {
                id,
                productName,
                thumbImage,
                thumbHeight
            }
        });
        yield put({type: ProductsActionTypes.LOADMORE_PRODUCT_SUCCESS, payload: datas});
    }
    catch {
        yield put({type: ProductsActionTypes.LOADMORE_PRODUCT_FAILURE});
    }
}

export function* refreshProducts() {
    try {
        const response = yield call(() => axios.get('https://api.uat.aladin.today/public/v0.3.3/product?offset=0&limit=24&fromKm=0&toKm=10&lat=10.7861343&lng=106.6922188&areaText=Qu%E1%BA%ADn%203,%20H%E1%BB%93%20Ch%C3%AD%20Minh'));
        const { data: {dataArray} } = response;
        const datas = dataArray.map((data: any) => {
            const { id, productName, thumbImage, thumbHeight } = data;
            return {
                id,
                productName,
                thumbImage,
                thumbHeight
            }
        });
        yield put({type: ProductsActionTypes.REFRESH_PRODUCT_SUCCESS, payload: datas});
    }
    catch {
        yield put({type: ProductsActionTypes.REFRESH_PRODUCT_FAILURE});
    }
}

export function* createProduct(action: any) {
    try {
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
    yield takeLatest(ProductsActionTypes.LOADMORE_PRODUCT_REQUEST, loadmoreProducts);
    yield takeLatest(ProductsActionTypes.REFRESH_PRODUCT_REQUEST, refreshProducts);
}