import React from "react";
import { View, StyleSheet, Dimensions } from 'react-native';
import ProgressiveImage from 'components/common-components/ProgressiveImage';

interface ProductProps {
    imageUrl: string,
    thumbHeight: number
}

const Product: React.FC<ProductProps> = ({imageUrl, thumbHeight}) => {
    const w = Dimensions.get('window');
    const thumbnailWidth = (w.width * 4).toString;
    const thumbnailUrl = imageUrl + '?' + thumbnailWidth;

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

    return (
        <View
            style={styles.container}
        >
            <ProgressiveImage
                style={styles.image}
                thumbnailSource={{
                    uri: thumbnailUrl
                }}
                source={{
                    uri: imageUrl
                }}
            />
        </View>
    )
}



export default Product;