import { IAction } from './../baseTypes';
import { ProductModel } from 'models/Product';

export interface IProductsState {
    products: ProductModel[],
    loading: boolean,
    isLoadMore: boolean,
    isRefresh: boolean,
    offset: number
}

export enum ProductsActionTypes {
    GET_PRODUCT_REQUEST = 'GET_PRODUCT_REQUEST',
    GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
    GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE',
    CREATE_PRODUCT_REQUEST = 'CREATE_PRODUCT_REQUEST',
    CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS',
    CREATE_PRODUCT_FAILURE = 'CREATE_PRODUCT_FAILURE',
    EDIT_PRODUCT_REQUEST = 'EDIT_PRODUCT_REQUEST',
    EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
    EDIT_PRODUCT_FAILURE = 'EDIT_PRODUCT_FAILURE',
    DELETE_PRODUCT_REQUEST = 'DELETE_PRODUCT_REQUEST',
    DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS',
    DELETE_PRODUCT_FAILURE = 'DELETE_PRODUCT_FAILURE',
    LOADMORE_PRODUCT_REQUEST = 'LOADMORE_PRODUCT_REQUEST',
    LOADMORE_PRODUCT_SUCCESS = 'LOADMORE_PRODUCT_SUCCESS',
    LOADMORE_PRODUCT_FAILURE = 'LOADMORE_PRODUCT_FAILURE',
    REFRESH_PRODUCT_REQUEST = 'REFRESH_PRODUCT_REQUEST',
    REFRESH_PRODUCT_SUCCESS = 'REFRESH_PRODUCT_SUCCESS',
    REFRESH_PRODUCT_FAILURE = 'REFRESH_PRODUCT_FAILURE'
}

export interface IGetProductsRequestAction extends IAction<ProductsActionTypes.GET_PRODUCT_REQUEST> {}

export interface IGetProductsSuccessAction extends IAction<ProductsActionTypes.GET_PRODUCTS_SUCCESS> {
    payload: ProductModel[]
}

export interface IGetProductFailureAction extends IAction<ProductsActionTypes.GET_PRODUCTS_FAILURE> {}

export interface ICreateProductRequestAction extends IAction<ProductsActionTypes.CREATE_PRODUCT_REQUEST> {
    payload: ProductModel
}

export interface ICreateProductSuccessstAction extends IAction<ProductsActionTypes.CREATE_PRODUCT_SUCCESS> {
    payload: ProductModel
}

export interface ICreateProductFailureAction extends IAction<ProductsActionTypes.CREATE_PRODUCT_FAILURE> {}

export interface IEditProductRequestAction extends IAction<ProductsActionTypes.EDIT_PRODUCT_REQUEST> {
    payload: ProductModel
}

export interface IEditProductSuccessAction extends IAction<ProductsActionTypes.EDIT_PRODUCT_SUCCESS> {}

export interface IEditProductFailureAction extends IAction<ProductsActionTypes.EDIT_PRODUCT_FAILURE> {}

export interface IDeleteProductRequestAction extends IAction<ProductsActionTypes.DELETE_PRODUCT_REQUEST> {
    payload: ProductModel
}

export interface IDeleteProductSuccessAction extends IAction<ProductsActionTypes.DELETE_PRODUCT_SUCCESS> {}

export interface IDeleteProductFailuretAction extends IAction<ProductsActionTypes.DELETE_PRODUCT_FAILURE> {}

export interface ILoadmoreProductRequestAction extends IAction<ProductsActionTypes.LOADMORE_PRODUCT_REQUEST> {
    payload: number
}

export interface ILoadmoreProductSuccessAction extends IAction<ProductsActionTypes.LOADMORE_PRODUCT_SUCCESS> {
    payload: ProductModel[]
}

export interface ILoadmoreProductFailureAction extends IAction<ProductsActionTypes.LOADMORE_PRODUCT_FAILURE> {}

export interface IRefreshProductsRequestAction extends IAction<ProductsActionTypes.REFRESH_PRODUCT_REQUEST> {}

export interface IRefreshProductsSuccessAction extends IAction<ProductsActionTypes.REFRESH_PRODUCT_SUCCESS> {
    payload: ProductModel[]
}

export interface IRefreshProductFailureAction extends IAction<ProductsActionTypes.REFRESH_PRODUCT_FAILURE> {}

export type ProductsActions = IGetProductsRequestAction 
| IGetProductsSuccessAction
| IGetProductFailureAction
| ICreateProductRequestAction
| ICreateProductSuccessstAction
| ICreateProductFailureAction
| ILoadmoreProductRequestAction
| ILoadmoreProductSuccessAction
| ILoadmoreProductFailureAction
| IRefreshProductsRequestAction
| IRefreshProductsSuccessAction
| IRefreshProductFailureAction
;