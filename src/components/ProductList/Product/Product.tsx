import React from "react";
import { View, Text, StyleSheet } from 'react-native';

interface ProductProps {
    name: string
}

const Product: React.FC<ProductProps> = ({name}) => {
    return (
        <View
            style={styles.container}
        >
            <Text style={styles.content}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "beige",
        borderWidth: 2,
        margin: 10
    },
    content: {
        textAlign: "center"
    }
})

export default Product;