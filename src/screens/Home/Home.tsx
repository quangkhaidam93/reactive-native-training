import React from 'react';
import { StyleSheet } from 'react-native';
import ProductList from 'components/ProductList';
import SafeAreaView from 'react-native-safe-area-view';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type ParamList = {
    Home: undefined
}

interface HomeProps extends BottomTabScreenProps<ParamList, 'Home'> {}

const Home : React.FC<HomeProps> = ({}) => {
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
