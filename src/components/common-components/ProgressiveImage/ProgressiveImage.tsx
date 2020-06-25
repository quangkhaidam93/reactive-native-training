import React from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';

const ProgressiveImage = ({thumbnailSource, source, style, ...props}: any) => {
    const thumbnailAnimated = new Animated.Value(0);
    const imageAnimated = new Animated.Value(0);

    const handleThumbnailLoad = () => {
        Animated.timing(thumbnailAnimated, {
            toValue: 1,
        }).start();
    }
    const onImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
        }).start();
    }

    return (
        <View style={styles.container}>
            <Animated.Image
                {...props}
                source={thumbnailSource}
                style={style}
                blurRadius={2}
                onLoad={handleThumbnailLoad}
            />
            <Animated.Image
                {...props}
                source={source}
                style={[styles.imageOverlay, style]}
                onLoad={onImageLoad}
            />
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e1e4e8',
        borderRadius: 15
    },
    imageOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
    }
})

export default ProgressiveImage;