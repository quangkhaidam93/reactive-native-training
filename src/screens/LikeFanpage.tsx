import React from 'react';
import { View, Image, StyleSheet, Text, Linking } from 'react-native';
import { Images } from 'assets/images';
import { iconsPNG } from 'assets/Icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LikeFanPage = () => {
    const openFacebook = async () => {
        try {
            const hasFBApp = await Linking.canOpenURL('fb://page/105547547594720');
            if (hasFBApp) {
                Linking.openURL('fb://page/?id=105547547594720');
            }
            else {
                Linking.openURL('https://www.facebook.com/105547547594720');
                // Linking.openURL('https://www.facebook.com/aladin.today/');
            }
        }
        catch (err) {
            console.log(err);
        }
        
    }

    return (<SafeAreaView>
        <View style={styles.clearContainer} >
            <TouchableOpacity>
                <Image source={iconsPNG.clear} style={{justifyContent: 'flex-end'}} />
            </TouchableOpacity>
        </View>
        <Image source={Images.group} />
        <View style={styles.buttonContainer }>
            <TouchableOpacity style={styles.button} onPress={openFacebook} >
                <Text style={styles.text}>Like ngay nào!</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
    clearContainer: {
        flexDirection: 'row-reverse',
        marginHorizontal: 16
    },
    clearIcon: {
        width: 24,
        height: 24
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    button: {
        marginTop: 36, 
        width: 382,
        height: 40,
        backgroundColor: '#333333',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 14
    }
})

export default LikeFanPage;