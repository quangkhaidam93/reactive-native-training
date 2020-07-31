import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ProductModel } from 'models/Product';

interface IProductDetailProps {
    product: ProductModel | undefined,
    // loading: boolean
}

const ProductDetail: React.FC<IProductDetailProps> = ({product}) => {
    
    console.log('Product Detail rendering...');

    return <View style={styles.container} >
        {
            product && <View style={styles.productContainer} > 
                <Image
                    style={styles.image}
                    source={{uri: product.thumbImage}}
                />
                <Text style={styles.name} >{product.productName}</Text>
            </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    productContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        textAlign: 'center',
        fontSize: 30
    },
    image: {
        width: 200,
        height: 294,
        borderRadius: 15
    }
})

export default memo(ProductDetail, (prevProps, nextProps) => {
    return prevProps.product?.id === nextProps.product?.id 
        // && prevProps.product?.productName === nextProps.product?.productName
        // && prevProps.product?.thumbImage === nextProps.product?.thumbImage
        // && prevProps.product?.thumbHeight === nextProps.product?.thumbHeight
        // && prevProps.loading === nextProps.loading
});

// export default ProductDetail;