import React from 'react';
import { Placeholder, PlaceholderMedia, ShineOverlay } from 'rn-placeholder';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';

const w = Dimensions.get('window');

const ProductListPlaceholder = ({}) => {
    
    console.log('Placeholder rendering...');
    return (
        <ScrollView style={styles.container}>
            <Placeholder
                style={styles.imageContainer}
                Animation={ShineOverlay}
            >
                <PlaceholderMedia 
                    style={styles.image}
                />
                <PlaceholderMedia 
                    style={styles.image}
                />
            </Placeholder>

            <Placeholder
                Animation={ShineOverlay}
                Left={() => (
                    <PlaceholderMedia 
                        style={styles.image}
                    />
                )}
                Right={() => (
                    <PlaceholderMedia 
                        style={styles.image}
                    />
                )}
            />

            <Placeholder
                Animation={ShineOverlay}
                Left={() => (
                    <PlaceholderMedia 
                        style={styles.image}
                    />
                )}
                Right={() => (
                    <PlaceholderMedia 
                        style={styles.image}
                    />
                )}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4
    },
    image: {
        height: 294,
        margin: 4,
        borderRadius: 15,
        flex: 1
    },
    imageContainer: {
        // flexDirection: 'row',
    }
})

export default ProductListPlaceholder;