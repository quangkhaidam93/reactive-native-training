import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ProgressiveImage from 'components/common-components/ProgressiveImage';
import allActions from "sagas/allActions";
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { ProductModel } from "models/Product";

interface ProductProps {
    productDetail: ProductModel
}

const Product: React.FC<ProductProps> = ({productDetail}) => {
    const w = Dimensions.get('window');
    const thumbnailWidth = (w.width * 4).toString;
    const thumbnailUrl = productDetail.thumbImage + '?' + thumbnailWidth;
    const dispatch: Dispatch = useDispatch();

    const handleTouchProduct = () => {
        dispatch(allActions.GetProductDetailRequest(productDetail));
    }

    return (
        <View
            style={styles.container}
        >   
            <TouchableOpacity
                onPress={handleTouchProduct}
            >
                <ProgressiveImage
                    style={styles.image}
                    thumbnailSource={{
                        uri: thumbnailUrl
                    }}
                    source={{
                        uri: productDetail.thumbImage
                    }}
                />
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        borderWidth: 2,
        margin: 4,
        elevation: 0,
        borderColor: 'transparent',
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, 
        shadowRadius: 0
    },
    image: {
        flex: 1,
        height: 294,
        borderRadius: 15
    }
})



export default Product;