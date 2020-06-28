import {
    ProductDetailActionType,
    IGetProductDetailRequest,
    IGetProductDetailSuccess,
    IGetProductDetailFailure
} from './types';
import { ProductModel } from 'models/Product';

export function GetProductDetailRequest(payload: ProductModel): IGetProductDetailRequest {
    return {
        type: ProductDetailActionType.GET_PRODUCT_DETAIL_REQUEST,
        payload
    }
}

export function GetProductDetailSuccess(payload: ProductModel): IGetProductDetailSuccess {
    return {
        type: ProductDetailActionType.GET_PRODUCT_DETAIL_SUCCESS,
        payload
    }
}

export function GetProductDetailFailure(): IGetProductDetailFailure {
    return {
        type: ProductDetailActionType.GET_PRODUCT_DETAIL_FAILURE
    }
}
