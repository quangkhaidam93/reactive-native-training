import React, { useRef } from 'react';
import { Text, View, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerStateChangeEvent, PinchGestureHandler, PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { iconsPNG } from '../../assets/Icons';

const { width, height } = Dimensions.get('window');

const PanGesture = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const panRef = useRef(null);
  const pinchRef = useRef(null);

  // const handleGesture = (event: PanGestureHandlerGestureEvent) => {
  //   const { nativeEvent } = event;
  //   Animated.event([{
  //     nativeEvent: {
  //       translationX: translateX,
  //       translationY: translateY
  //     }
  //   }], { useNativeDriver: true })
  //   console.log(nativeEvent);
  // }

  const handlePanGestureChange = (event: PanGestureHandlerStateChangeEvent) => {
    translateY.extractOffset();
    translateX.extractOffset();
  } 

  const handlePinchGestureChange = (event: PinchGestureHandlerGestureEvent) => {
    
  }

  return <View style={styles.container} >
    <PanGestureHandler
      ref={panRef}
      simultaneousHandlers={pinchRef}
      onGestureEvent={Animated.event([{
        nativeEvent: {
          translationX: translateX,
          translationY: translateY
        }
      }], { useNativeDriver: true })}
      onHandlerStateChange={handlePanGestureChange}
    >
      <Animated.View 
        style={[{
          transform: [
            {
              translateY
            },
            {
              translateX
            },
          ]
        }]}
      >
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={panRef}
          onGestureEvent={Animated.event([{
            nativeEvent: {
              scale
            },
          }], { useNativeDriver: true })}
          onHandlerStateChange={handlePinchGestureChange}
        >
          {/* <Animated.View style={[styles.circle, {
            transform: [
              {
                perspective: 200
              },
              {
                scale
              }
            ]
          }]} /> */}
          <Animated.Image 
            source={iconsPNG['test_image']}
            style={{
              width,
              height: 300,
              transform: [
                {
                  perspective: 200
                },
                {
                  scale
                }
              ]
            }}
          />
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: "#c00000",
    borderRadius: 100
  },
})

export default PanGesture;