import { IProductDetailState, ProductDetailActions, ProductDetailActionType } from './types';
import { ProductModel } from 'models/Product';

const productDetailState: IProductDetailState = {
    product: undefined,
    loading: false,
}

const productDetailReducer = (state = productDetailState, action: ProductDetailActions): IProductDetailState => {
    switch(action.type) {
        case ProductDetailActionType.GET_PRODUCT_DETAIL_REQUEST: {
            return {
                ...state,
                loading: true
            }
        }
        case ProductDetailActionType.GET_PRODUCT_DETAIL_SUCCESS: {
            const productDetail: ProductModel = action.payload;
            return {
                ...state,
                product: productDetail,
                loading: false
            }
        }
        case ProductDetailActionType.GET_PRODUCT_DETAIL_FAILURE: {
            return {
                ...state
            }
        }
        default: 
            return {
                ...state
            }
    }
}

export default productDetailReducer;