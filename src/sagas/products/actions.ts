import { 
    IGetProductsRequestAction, 
    ProductsActionTypes, 
    IGetProductsSuccessAction, 
    IGetProductFailureAction, 
    ICreateProductRequestAction, 
    ICreateProductSuccessstAction, 
    ICreateProductFailureAction, 
    IEditProductRequestAction, 
    IEditProductSuccessAction, 
    IEditProductFailureAction, 
    IDeleteProductRequestAction, 
    IDeleteProductSuccessAction, 
    IDeleteProductFailuretAction, 
    ILoadmoreProductRequestAction, 
    ILoadmoreProductSuccessAction, 
    ILoadmoreProductFailureAction, 
    IRefreshProductsRequestAction, 
    IRefreshProductsSuccessAction, 
    IRefreshProductFailureAction 
} from './types';
import { ProductModel } from 'models/Product';

export function GetProductsRequest(): IGetProductsRequestAction {
    return {
        type: ProductsActionTypes.GET_PRODUCT_REQUEST,
    }
}

export function GetProductsSuccess(payload: ProductModel[]): IGetProductsSuccessAction {
    return {
        type: ProductsActionTypes.GET_PRODUCTS_SUCCESS,
        payload
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

export function LoadmoreProductRequest(payload: number): ILoadmoreProductRequestAction {
    return {
        type: ProductsActionTypes.LOADMORE_PRODUCT_REQUEST,
        payload
    }
}

export function LoadmoreProductSuccess(payload: ProductModel[]): ILoadmoreProductSuccessAction {
    return {
        type: ProductsActionTypes.LOADMORE_PRODUCT_SUCCESS,
        payload
    }
}

export function LoadmoreProductFailure(): ILoadmoreProductFailureAction {
    return {
        type: ProductsActionTypes.LOADMORE_PRODUCT_FAILURE
    }
}

export function RefreshProductsRequest(): IRefreshProductsRequestAction {
    return {
        type: ProductsActionTypes.REFRESH_PRODUCT_REQUEST,
    }
}

export function RefreshProductsSuccess(payload: ProductModel[]): IRefreshProductsSuccessAction {
    return {
        type: ProductsActionTypes.REFRESH_PRODUCT_SUCCESS,
        payload
    }
}

export function RefreshProductFailure(): IRefreshProductFailureAction {
    return {
        type: ProductsActionTypes.REFRESH_PRODUCT_FAILURE
    }
}