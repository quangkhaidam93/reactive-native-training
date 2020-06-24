import { IGetProductsRequestAction, ProductsActionTypes, IGetProductsSuccessAction, IGetProductFailureAction, ICreateProductRequestAction, ICreateProductSuccessstAction, ICreateProductFailureAction, IEditProductRequestAction, IEditProductSuccessAction, IEditProductFailureAction, IDeleteProductRequestAction, IDeleteProductSuccessAction, IDeleteProductFailuretAction } from './types';
import { ProductModel } from 'models/Product';

export function GetProductsRequest(): IGetProductsRequestAction {
    return {
        type: ProductsActionTypes.GET_PRODUCT_REQUEST,
    }
}

export function GetProductsSuccess(): IGetProductsSuccessAction {
    return {
        type: ProductsActionTypes.GET_PRODUCTS_SUCCESS
    }
}

export function GetProductFailure(): IGetProductFailureAction {
    return {
        type: ProductsActionTypes.GET_PRODUCTS_FAILURE
    }
}

export function CreateProductRequest(payload: ProductModel): ICreateProductRequestAction {
    return {
        type: ProductsActionTypes.CREATE_PRODUCT_REQUEST,
        payload
    }
}

export function CreateProductSuccess(payload: ProductModel): ICreateProductSuccessstAction {
    return {
        type: ProductsActionTypes.CREATE_PRODUCT_SUCCESS,
        payload
    }
}

export function CreateProductFailure(): ICreateProductFailureAction {
    return {
        type: ProductsActionTypes.CREATE_PRODUCT_FAILURE
    }
}

export function EditProductRequest(payload: ProductModel): IEditProductRequestAction {
    return {
        type: ProductsActionTypes.EDIT_PRODUCT_REQUEST,
        payload
    }
}

export function EditProductSuccess(): IEditProductSuccessAction {
    return {
        type: ProductsActionTypes.EDIT_PRODUCT_SUCCESS
    }
}

export function EditProductFailure(): IEditProductFailureAction {
    return {
        type: ProductsActionTypes.EDIT_PRODUCT_FAILURE
    }
}

export function DeleteProductRequest(payload: ProductModel): IDeleteProductRequestAction {
    return {
        type: ProductsActionTypes.DELETE_PRODUCT_REQUEST,
        payload
    }
}

export function DeleteProductSuccess(): IDeleteProductSuccessAction {
    return {
        type: ProductsActionTypes.DELETE_PRODUCT_SUCCESS
    }
}

export function DeleteProductFailure(): IDeleteProductFailuretAction {
    return {
        type: ProductsActionTypes.DELETE_PRODUCT_FAILURE
    }
}