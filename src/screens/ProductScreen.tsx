import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking, Text, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { IStoreState } from 'sagas/rootReducer';
import ProductDetail from 'components/ProductDetail';
import { ProductModel } from 'models/Product';
import PhoneInput from 'components/PhoneInput';
import { WebView } from 'react-native-webview';
import InAppBrowser from 'react-native-inappbrowser-reborn';

// const myHtmlFile = require('../assets/html/facebooklike.html');

const ProductScreen = ({}) => {
    const product: ProductModel | undefined = useSelector((state: IStoreState) => state.productDetailState.product);
    // const loading: boolean = useSelector((state: IStoreState) => state.productDetailState.loading);
    const openFacebook = async () => {
        const result = await Linking.canOpenURL('fb://page/105547547594720');
        // const result = await Linking.canOpenURL('https://chat-online-viewer.netlify.app/');
        if (result) {
            Linking.openURL('fb://page/105547547594720');
            // Linking.openURL('https://chat-online-viewer.netlify.app/');
        }
        else {
            Linking.openURL('fb://page/105547547594720');
        }
    }

    const openLink = async () => {
        const url = 'https://chat-online-viewer.netlify.app/';
        if (await InAppBrowser.isAvailable()) {
            await InAppBrowser.open(url, {
                dismissButtonStyle: 'cancel',
                preferredBarTintColor: '#453AA4',
                preferredControlTintColor: 'white',
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'overFullScreen',
                modalTransitionStyle: 'partialCurl',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: '#42f5f5',
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                    startEnter: 'slide_in_right',
                    startExit: 'slide_out_left',
                    endEnter: 'slide_in_left',
                    endExit: 'slide_out_right'
                },
                headers: {
                    'my-custom-header': 'my custom header value'
                }
            })
            // Alert.alert(JSON.stringify(result));
        }
        else Linking.openURL(url);
    }

    console.log('Product Screen rendering...');
    return (
        <View style={styles.container}>
            {/* <ProductDetail 
                product={product}
                // loading={loading}
            /> */}
            <PhoneInput />
            {/* <PhoneInput /> */}
            {/* <WebView
                originWhitelist={['*']}
                // source={{html: '<body><div id="fb-root"></div><script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v7.0&appId=695890714544244&autoLogAppEvents=1" nonce="szzLSHTJ"></script><div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-width="" data-layout="button_count" data-action="like" data-size="small" data-share="false"></div></body>'}}
                source={myHtmlFile}
                onMessage={event => alert(event.nativeEvent.data)}
            /> */}

        {/* <WebView
            source={{
                html:
                '<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2FGalarmApp%2F&width=200&layout=standard&action=like&size=large&share=false&height=35&appId=1010058565805776" width="100%" height="100%" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'
            }}
            scalesPageToFit={true}
            /> */}
        <TouchableOpacity onPress={openFacebook} ><Text>Click me</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    content: {
        fontSize: 20,
        textAlign: 'center'
    },
    htmlContainer: {
        fontSize: 20,
    } 
}) 

export default ProductScreen;