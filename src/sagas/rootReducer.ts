import { IProductsState } from './products/types';
import productsReducer from './products/reducer';
import { IProductDetailState } from './productdetail/types';
import productDetailReducer from './productdetail/reducer';
import { combineReducers } from 'redux';

export interface IStoreState {
    productsState: IProductsState;
    productDetailState: IProductDetailState;
}

export const rootReducer = combineReducers<IStoreState>({
    productsState: productsReducer,
    productDetailState: productDetailReducer
})