import React, { useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View, RefreshControl } from 'react-native';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import { ProductModel } from 'models/Product';
import { Dispatch } from 'redux';
import { IStoreState } from 'sagas/rootReducer';
import allActions from 'sagas/allActions';
// import ProductListPlaceholder from './ProductListPlaceholder';


interface IProductListProps {}

const ProductList: React.FC<IProductListProps> = ({}) => {
    const data: ProductModel[] = useSelector((state: IStoreState) => state.productsState.products);
    const loading: boolean = useSelector((state: IStoreState) => state.productsState.loading);
    const offset: number = useSelector((state: IStoreState) => state.productsState.offset);
    const isLoadMore: boolean = useSelector((state: IStoreState) => state.productsState.isLoadMore);
    const isRefresh: boolean = useSelector((state: IStoreState) => state.productsState.isRefresh);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        console.log('Component did mount ...');
        dispatch(allActions.GetProductsRequest());
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
        dispatch(allActions.LoadmoreProductRequest(offset))
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
        dispatch(allActions.RefreshProductsRequest())
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
                    renderItem={({item}) => <Product productDetail={item} />}
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