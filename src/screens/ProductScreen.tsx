import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductScreen = ({}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.content}>Nothing</Text>
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