import { IProductDetailState, ProductDetailActions, ProductDetailActionType } from './types';
import { ProductModel } from 'models/Product';
import AsyncStorage from '@react-native-community/async-storage';
import { PersistConfig, persistReducer } from 'redux-persist';

const productDetailState: IProductDetailState = {
    product: undefined,
    loading: false,
}

export const productDetailReducer = (state = productDetailState, action: ProductDetailActions): IProductDetailState => {
    switch(action.type) {
        case ProductDetailActionType.GET_PRODUCT_DETAIL_REQUEST: {
            console.log('Enter');
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

const persistConfig: PersistConfig<any> = {
    key: 'ProductDetail',
    whitelist: ['product'],
    storage: AsyncStorage,
    version: 1,
    timeout: 0
};

export default persistReducer(persistConfig, productDetailReducer) as any;