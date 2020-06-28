// import { ProductModel } from 'models/Product';
import { IAction } from 'sagas/baseTypes';
import { ProductModel } from 'models/Product';

export interface IProductDetailState {
    product?: ProductModel,
    loading: boolean
}

export enum ProductDetailActionType {
    GET_PRODUCT_DETAIL_REQUEST = 'GET_PRODUCT_DETAIL_REQUEST',
    GET_PRODUCT_DETAIL_SUCCESS = 'GET_PRODUCT_DETAIL_SUCCESS',
    GET_PRODUCT_DETAIL_FAILURE = 'GET_PRODUCT_DETAIL_FAILURE'
}

export interface IGetProductDetailRequest extends IAction<ProductDetailActionType.GET_PRODUCT_DETAIL_REQUEST> {
    payload: ProductModel
}

export interface IGetProductDetailSuccess extends IAction<ProductDetailActionType.GET_PRODUCT_DETAIL_SUCCESS> {
    payload: ProductModel
}

export interface IGetProductDetailFailure extends IAction<ProductDetailActionType.GET_PRODUCT_DETAIL_FAILURE> {}

export type ProductDetailActions = IGetProductDetailRequest
| IGetProductDetailSuccess
| IGetProductDetailFailure
;