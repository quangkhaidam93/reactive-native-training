import React, { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Button } from 'react-native';
import { ProductModel } from 'models/Product';
import Product from './Product';
import { connect } from 'react-redux';
// import { IStoreState } from 'sagas/reducers';
import { ProductsActionTypes, IProductsState } from 'sagas/products/types';
import { GetProductsRequest, CreateProductRequest } from 'sagas/products/actions';
import { Dispatch } from 'redux';

interface IProductListProps {
    data?: ProductModel[],
    getProducts?: typeof GetProductsRequest,
    createProduct?: typeof CreateProductRequest
}

interface IDispatchInjectedProps {
    getProducts?: typeof GetProductsRequest,
    createProduct?: typeof CreateProductRequest
}

interface IStateInjectedProps {
    data?: ProductModel[]
}

const ProductList: React.FC<IProductListProps> = ({data, getProducts, createProduct}) => {
    useEffect(() => {
        console.log('Component did mount ...');
        console.log(data);
        getProducts?.();
    }, []);

    const handlePressed = () => {
        const newProduct: ProductModel = {
            id: 12,
            name: 'Product 12'
        }

        createProduct?.(newProduct);
    }

    console.log('rendering...');
    console.log(data);
    return (
        <SafeAreaView style={styles.container}>
            {data && 
                <FlatList
                    data={data}
                    numColumns={2}
                    renderItem={({item}) => <Product name={item.name} />}
                    keyExtractor={item => item.id.toString()}
                />
                
            }
            <Button 
                title="Press me"
                onPress={handlePressed}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

const mapStateToProps = (productsState : IProductsState): IStateInjectedProps => {
    return {
        data: productsState.products,
    }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchInjectedProps => {
    return {
        getProducts: () => dispatch({type: ProductsActionTypes.GET_PRODUCT_REQUEST}),
        createProduct: (newProduct) => dispatch({type: ProductsActionTypes.CREATE_PRODUCT_REQUEST, payload: newProduct})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);