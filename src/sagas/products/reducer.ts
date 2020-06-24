import { IProductsState, ProductsActions, ProductsActionTypes } from './types';

const productsState: IProductsState = {
    products: []
}

const productsReducer = (state = productsState, action: ProductsActions): IProductsState => {
    switch (action.type) {
        case ProductsActionTypes.GET_PRODUCT_REQUEST:
            return {...state};
        case ProductsActionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products : [{
                    id: 1,
                    name: "Product1"
                },
                {
                    id: 2,
                    name: "Product2"
                },
                {
                    id: 3,
                    name: "Product3"
                },
                {
                    id: 4,
                    name: "Product4"
                },
                {
                    id: 5,
                    name: "Product5"
                },
                {
                    id: 6,
                    name: "Product6"
                },
                {
                    id: 7,
                    name: "Product7"
                },
                {
                    id: 8,
                    name: "Product8"
                },
                {
                    id: 9,
                    name: "Product9"
                },
                {
                    id: 10,
                    name: "Product10"
                }],
            };
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
        default:
            return {...state};
    };
}

export default productsReducer;