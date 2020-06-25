import React, { useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, RefreshControl } from 'react-native';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
// import { IStoreState } from 'sagas/reducers';
import { ProductsActionTypes, IProductsState } from 'sagas/products/types';
import { ProductModel } from 'models/Product';
// import ProductListPlaceholder from './ProductListPlaceholder';


interface IProductListProps {}

const ProductList: React.FC<IProductListProps> = ({}) => {
    const data: ProductModel[] = useSelector((state: IProductsState) => state.products);
    const loading = useSelector((state: IProductsState) => state.loading);
    const offset = useSelector((state: IProductsState) => state.offset);
    const isLoadMore = useSelector((state: IProductsState) => state.isLoadMore);
    const isRefresh = useSelector((state: IProductsState) => state.isRefresh);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Component did mount ...');
        dispatch({type: ProductsActionTypes.GET_PRODUCT_REQUEST});
    }, []);

    // const handlePressed = () => {
    //     const newProduct: ProductModel = {
    //         id: 12,
    //         productName: 'Product 12',
    //         thumbImage: 'abc'
    //     }

    //     createProduct?.(newProduct);
    // }

    const handleLoadmore = () => {
        dispatch({type: ProductsActionTypes.LOADMORE_PRODUCT_REQUEST, payload: offset})
    }

    const renderFooterOnLoad = () => {
        if (!isLoadMore) return null;
        return (
        <ActivityIndicator
            size="large"
            color="#0000ff"
        />
        );
    }

    const onRefresh = () => {
        dispatch({type: ProductsActionTypes.REFRESH_PRODUCT_REQUEST})
    }

    console.log('rendering...');
    return (
        <View style={styles.container}>
            {loading ?
                <ActivityIndicator /> :
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefresh}
                            onRefresh={onRefresh}
                        />
                    }
                    data={data}
                    numColumns={2}
                    renderItem={({item}) => <Product imageUrl={item.thumbImage} thumbHeight={item.thumbHeight} />}
                    keyExtractor={item => item.id.toString()}
                    onEndReachedThreshold={0.4}
                    onEndReached={handleLoadmore}
                    ListFooterComponent={renderFooterOnLoad}
                />
                
            }
            {/* <Button 
                title="Press me"
                onPress={handlePressed}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#feffff',
        justifyContent: 'center'
    }
})

export default ProductList;