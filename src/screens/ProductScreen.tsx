import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { IStoreState } from 'sagas/rootReducer';
import ProductDetail from 'components/ProductDetail';
import { ProductModel } from 'models/Product';

const ProductScreen = ({}) => {
    const product: ProductModel | undefined = useSelector((state: IStoreState) => state.productDetailState.product);
    const loading: boolean = useSelector((state: IStoreState) => state.productDetailState.loading);

    console.log('Product Screen rendering...');
    return (
        <View style={styles.container}>
            <ProductDetail 
                product={product}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    content: {
        fontSize: 20,
        textAlign: 'center'
    } 
}) 

export default ProductScreen;