import React from 'react';
import { StyleSheet } from 'react-native';
import ProductList from 'components/ProductList';
import SafeAreaView from 'react-native-safe-area-view';

const Home = ({}) => {
    return (
        <SafeAreaView forceInset={{ bottom: 'never' }} style={styles.container} >
            <ProductList />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Home;
