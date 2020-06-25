import { IProductsState, ProductsActions, ProductsActionTypes } from './types';

const stepOffset: number = 24;

const productsState: IProductsState = {
    products: [],
    loading: false,
    isLoadMore: false,
    isRefresh: false,
    offset: 0
}

const productsReducer = (state = productsState, action: ProductsActions): IProductsState => {
    switch (action.type) {
        case ProductsActionTypes.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ProductsActionTypes.GET_PRODUCTS_SUCCESS: {
            const newProducts = state.products?.concat(action.payload);
            const newOffset = state.offset + stepOffset;
            return {
                ...state,
                loading: false,
                products: newProducts,
                offset: newOffset
            };
        }
        case ProductsActionTypes.LOADMORE_PRODUCT_REQUEST: 
            return {
                ...state,
                isLoadMore: true
            }
        case ProductsActionTypes.LOADMORE_PRODUCT_SUCCESS: {
            const newProducts = state.products?.concat(action.payload);
            const newOffset = state.offset + stepOffset;
            return {
                ...state,
                isLoadMore: false,
                products: newProducts,
                offset: newOffset
            }
        }
        case ProductsActionTypes.LOADMORE_PRODUCT_FAILURE:
            return {
                ...state
            }
        case ProductsActionTypes.GET_PRODUCTS_FAILURE:
            return {...state};
        case ProductsActionTypes.CREATE_PRODUCT_REQUEST:
            return {
                ...state
            }
        case ProductsActionTypes.CREATE_PRODUCT_SUCCESS: {
            console.log(action.payload);
            
            return {
                ...state
            }
        }
        case ProductsActionTypes.REFRESH_PRODUCT_REQUEST: {
            return {
                ...state,
                isRefresh: true,
                offset: 0,
                products: []
            }
        }
        case ProductsActionTypes.REFRESH_PRODUCT_SUCCESS: {
            const newProducts = state.products?.concat(action.payload);
            const newOffset = state.offset + stepOffset;
            console.log('Here');
            return {
                ...state,
                isRefresh: false,
                products: newProducts,
                offset: newOffset
            }
        }
        default:
            return {...state};
    };
}

export default productsReducer;