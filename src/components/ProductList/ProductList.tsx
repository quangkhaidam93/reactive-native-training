import React, { useEffect, createRef, useRef, RefObject } from 'react';
import { 
    FlatList, 
    StyleSheet, 
    ActivityIndicator, 
    View, 
    RefreshControl,
    Text,
    Image
} from 'react-native';
import Product from './Product';
import { useSelector, useDispatch } from 'react-redux';
import { ProductModel } from 'models/Product';
import { Dispatch } from 'redux';
import { IStoreState } from 'sagas/rootReducer';
import allActions from 'sagas/allActions';
import Header from 'components/Header';
import Button from 'components/Button';
import InputValidation from 'components/InputValidation';
import { iconsPNG } from 'assets/Icons/index';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationServices } from 'services/NavigationService';
// import ProductListPlaceholder from './ProductListPlaceholder';

interface IProductListProps {}

const ProductList: React.FC<IProductListProps> = ({}) => {
    const data: ProductModel[] = useSelector((state: IStoreState) => state.productsState.products);
    const loading: boolean = useSelector((state: IStoreState) => state.productsState.loading);
    const offset: number = useSelector((state: IStoreState) => state.productsState.offset);
    const isLoadMore: boolean = useSelector((state: IStoreState) => state.productsState.isLoadMore);
    const isRefresh: boolean = useSelector((state: IStoreState) => state.productsState.isRefresh);
    const dispatch: Dispatch = useDispatch();

    const myRef = useRef(null);

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

    let test : typeof Product | null = null;
    test = Product;

    const navigateProductDetail = () => {
        NavigationServices.navigate('ProductDetail');
    }

    // const Title = (color: string) => <View style={{backgroundColor: color, flex: 1}}><Text style={{textAlign: 'center'}} >Alo</Text></View>
    console.log('ProductList rendering...');

    return (
        <View style={styles.container}>
            <Button type='solid' buttonColor='red' iconName='gold_award' onPress={navigateProductDetail} />
            {/* <Header
                centerComponent={<Button 
                    iconName="addphoto" 
                    // iconStyle={{width: 24, height: 24}} 
                    raised 
                    type="outline" 
                    // buttonStyle={{padding: 5}}
                    title='My button'
                    />}
                rightComponent={<Button raised type='outline' title='KHAI' />}
            />
            <InputValidation required delayTime={300} minLength={8} hasFocusEffect hasClearIcon leftIcon={"add"} placeholder="Typing..." />
            <Text>----------------------------------------------------------------</Text>
            <InputValidation validationType="mail" positiveNumber type="clear" leftIcon={<Text style={{width: 50}}>Alo</Text>} placeholder='Something ...' /> */}
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
            {/* { <Button 
                title="Press me"
                onPress={handlePressed}
            />} */}
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