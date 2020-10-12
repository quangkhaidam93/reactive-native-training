import { iconsPNG } from '../../assets/Icons';
import React, { useEffect, useRef, useState  } from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, PinchGestureHandlerStateChangeEvent, State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { block, useCode, Value, cond, eq, set } from 'react-native-reanimated';
import { onGestureEvent, vec, pinchBegan, timing, translate, transformOrigin, spring } from 'react-native-redash/lib/module/v1';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');
const CANVAS = vec.create(width, height);
const CENTER = vec.divide(CANVAS, 2);

const datas : any[] = [
  {
    id: 1,
    imageUrl: 'test_image',
  },
  {
    id: 2,
    imageUrl: 'test_image2'
  },
  {
    id: 3,
    imageUrl: 'test_image3'
  }
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  image: {
    // ...StyleSheet.absoluteFillObject,
    width,
    height: 400,
    resizeMode: "contain",
  },
});

interface ImageItemProps {
  data: any;
}

const ImagetItem : React.FC<ImageItemProps> = ({data}) => {
  const [size, setSize] = useState({width: 0, height: 0});
  const state = new Value(State.UNDETERMINED);
  const scale = new Value(1);
  const focal = vec.createValue(0, 0);
  const origin = vec.createValue(0, 0);
  const pinch = vec.createValue(0, 0);
  const scaleOffset = new Value(1);
  const offset = vec.createValue(0, 0);
  const gestureScale = new Value(1);
  const pinchGestureHandler = onGestureEvent({
    state,
    scale,
    focalX: focal.x,
    focalY: focal.y
  });

  const adjustedFocal = vec.sub(focal, CENTER);

  const translation = vec.createValue(0, 0);

  useCode(() => {
    console.log('Hello');
    return block([
    // vec.set(translation, vec.add(pinch, origin, vec.multiply(-1, scale, origin))),
    cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
    cond(
      eq(state, State.ACTIVE),
      vec.set(pinch, vec.sub(adjustedFocal, origin)),
      // vec.set(
      //   translation,
      //   vec.add(pinch, origin, vec.multiply(-1, gestureScale, origin))
      // ),
    ),
    cond(eq(state, State.END), [
      // vec.set(offset, vec.add(offset, translation)),
      // set(scaleOffset, scale),
      // set(gestureScale, 1),
      // vec.set(translation, 0),
      // vec.set(focal, 0),
      // vec.set(pinch, 0),
      set(pinch.x, spring({from: pinch.x, to: 0})),
      set(pinch.y, spring({from: pinch.y, to: 0})),
      set(scale, spring({from: scale, to: 1}))
    ])
  ])}, [adjustedFocal, origin, pinch, scale, state])

  return <View style={styles.container}>
    <PinchGestureHandler
      {...pinchGestureHandler}
    >
      <Animated.View style={[
        StyleSheet.absoluteFill, {justifyContent: 'center', flex: 1}]} >
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [
                ...translate(pinch),
                ...transformOrigin(origin, { scale })
                // ...translate(vec.add(offset, translation)),
                // { scale }
              ]
            }
          ]}
          source={iconsPNG[data.item.imageUrl]}
        />
      </Animated.View>
    </PinchGestureHandler>
  </View>
}

const ImageDetail = () => {
  const [size, setSize] = useState({width: 0, height: 0});
  const state = new Value(State.UNDETERMINED);
  const scale = new Value(1);
  const focal = vec.createValue(0, 0);
  const origin = vec.createValue(0, 0);
  const pinch = vec.createValue(0, 0);
  const scaleOffset = new Value(1);
  const offset = vec.createValue(0, 0);
  const gestureScale = new Value(1);
  const pinchGestureHandler = onGestureEvent({
    state,
    scale,
    focalX: focal.x,
    focalY: focal.y
  });

  const adjustedFocal = vec.sub(focal, CENTER);

  const translation = vec.createValue(0, 0);

  useCode(() => {
    console.log('Hello');
    return block([
    // vec.set(translation, vec.add(pinch, origin, vec.multiply(-1, scale, origin))),
    cond(pinchBegan(state), vec.set(origin, adjustedFocal)),
    cond(
      eq(state, State.ACTIVE),
      vec.set(pinch, vec.sub(adjustedFocal, origin)),
      // vec.set(
      //   translation,
      //   vec.add(pinch, origin, vec.multiply(-1, gestureScale, origin))
      // ),
    ),
    cond(eq(state, State.END), [
      // vec.set(offset, vec.add(offset, translation)),
      // set(scaleOffset, scale),
      // set(gestureScale, 1),
      // vec.set(translation, 0),
      // vec.set(focal, 0),
      // vec.set(pinch, 0),
      set(pinch.x, spring({from: pinch.x, to: 0})),
      set(pinch.y, spring({from: pinch.y, to: 0})),
      set(scale, spring({from: scale, to: 1}))
    ])
  ])}, [adjustedFocal, origin, pinch, scale, state])


  // const myUri = 'https://i.imgur.com/jK9pFcx.png';

  // const onZoomStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
  //   console.log('onZoomStateChange triggered', event.nativeEvent.focalX);
  //   if (event.nativeEvent.oldState === State.ACTIVE && event.nativeEvent.scale <= 1) {
  //     Animated.parallel([
  //       Animated.spring(scale, {
  //         toValue: 1,
  //         useNativeDriver: true
  //       }),
  //     ]).start()
  //   }
  // }

  // const onZoomEvent = (event: PinchGestureHandlerGestureEvent) => {
  //   console.log('onZoom Event', event.nativeEvent.focalX, event.nativeEvent.focalY);
  //   return 
  // }

  // const getSizeImage = () => {
  //   console.log('Trc khi lay');
  //   Image.getSize(myUri, (width, height) => {
  //     setSize({width, height})
  //   }, (err) => console.log(err));
  //   console.log('Sau khi lay');
  // }

  // useEffect(() => {
  //   getSizeImage();
  // }, []);

  const renderItem = (data: any) => {
    console.log('O day', data);
    // return <ImagetItem data={data} />

    return <View style={styles.container}>
    <PinchGestureHandler
      {...pinchGestureHandler}
    >
      <Animated.View style={[
        StyleSheet.absoluteFill, {justifyContent: 'center', flex: 1}]} >
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [
                ...translate(pinch),
                ...transformOrigin(origin, { scale })
                // ...translate(vec.add(offset, translation)),
                // { scale }
              ]
            }
          ]}
          source={iconsPNG[data.item.imageUrl]}
        />
      </Animated.View>
    </PinchGestureHandler>
  </View>
  }

  return <View style={{flex: 1}}>
    <Carousel 
      data={datas}
      sliderWidth={width}
      itemWidth={width}
      renderItem={renderItem}
      loop={true}
      lockScrollWhileSnapping={true}
    />
  </View>
}

export default ImageDetail;