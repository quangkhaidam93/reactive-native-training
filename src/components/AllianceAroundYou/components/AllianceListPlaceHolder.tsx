import React from 'react';
import {
    Placeholder, ShineOverlay, PlaceholderLine, PlaceholderMedia
} from 'rn-placeholder';
import { View, Dimensions, StyleSheet } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ALLIANCE_ITEM_WIDTH = SCREEN_WIDTH - 2 * 16;

const AllianceListPlaceHolder = () => {
    return <View>
        <Placeholder
            Animation={ShineOverlay}
        >   
            <View style={styles.container} >
                <View style={styles.placeHolderItemsContainer}>
                    <PlaceholderMedia style={styles.avatarPlaceHolder} isRound={true} />
                    <View style={styles.centerItemsContainer} >
                        <View style={{height: 16, marginTop: 16, marginBottom: 4}} >
                            <PlaceholderLine style={styles.allianceNamePlaceHolder} />
                        </View>
                        <View style={styles.badgeItemsContainer} >
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                        </View>
                    </View>
                    <PlaceholderMedia style={styles.buttonPlaceHolder} />
                </View>
            </View>
            <View style={styles.container} >
                <View style={styles.placeHolderItemsContainer}>
                    <PlaceholderMedia style={styles.avatarPlaceHolder} isRound={true} />
                    <View style={styles.centerItemsContainer} >
                        <View style={{height: 16, marginTop: 16, marginBottom: 4}} >
                            <PlaceholderLine style={styles.allianceNamePlaceHolder} />
                        </View>
                        <View style={styles.badgeItemsContainer} >
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                        </View>
                    </View>
                    <PlaceholderMedia style={styles.buttonPlaceHolder} />
                </View>
            </View>
            <View style={styles.container} >
                <View style={styles.placeHolderItemsContainer}>
                    <PlaceholderMedia style={styles.avatarPlaceHolder} isRound={true} />
                    <View style={styles.centerItemsContainer} >
                        <View style={{height: 16, marginTop: 16, marginBottom: 4}} >
                            <PlaceholderLine style={styles.allianceNamePlaceHolder} />
                        </View>
                        <View style={styles.badgeItemsContainer} >
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                            <PlaceholderLine style={styles.badgePlaceHolder} />
                        </View>
                    </View>
                    <PlaceholderMedia style={styles.buttonPlaceHolder} />
                </View>
            </View>
        </Placeholder>
    </View>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    placeHolder: {
        
    },
    avatarPlaceHolder: {
        height: 56,
        width: 56,
        borderRadius: 56 / 2
    },
    placeHolderItemsContainer: {
        width: ALLIANCE_ITEM_WIDTH,
        height: 72,
        borderRadius: 16,
        backgroundColor: 'white',
        flexDirection: 'row',
        paddingHorizontal: 9,
        paddingVertical: 8,
        alignItems: 'center'
    },
    centerItemsContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    badgeItemsContainer: {
        flexDirection: 'row',
        height: 16,
        marginBottom: 16,
        marginTop: 4,
    },
    allianceNamePlaceHolder: {
        height: 16,
        borderRadius: 16,
    },
    buttonPlaceHolder: {
        width: 80,
        height: 32,
        borderRadius: 16
    },
    badgePlaceHolder: {
        width: 48,
        height: 16,
        borderRadius: 16,
        marginRight: 8
    }
})

export default AllianceListPlaceHolder;