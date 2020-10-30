import Button from 'components/Button';
import { stubArray } from 'lodash';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Dimensions, StyleSheet, View, Text, Animated, LayoutChangeEvent, Easing } from 'react-native';
import { Value } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const space = 50;

interface TextTickerProps {
  datas: string[],
  addMoreText: () => void;
}

const velocity = 0.05;

const TextTicker : React.FC<TextTickerProps> = () => { 
  const textRef1 = useRef<AnimTextRef>(null);
  const textRef2 = useRef<AnimTextRef>(null);
  const [textWidth1, setTextWidth1] = useState<number>(0);
  const [textWidth2, setTextWidth2] = useState<number>(0);
  const delayTime = (200 / (textWidth1 + width / velocity)) + (textWidth1 / velocity);

  const stopAnimation = () => {
    if (textRef1 && textRef1.current) textRef1.current.stopAnimation();
    
  }

  const startAnimation = () => {
    console.log('O day delayTime', delayTime);
    if (textRef1 && textRef1.current) textRef1.current.playAnimation();
    setTimeout(() => {
      if (textRef2 && textRef2.current) textRef2.current.playAnimation();
    }, delayTime)
  }

  return <View style={{flex: 1}} >
    <View style={styles.container} >
      <AnimText 
        data='adasbdasdgsadgsadgjhqwgejgqwegqwjhegqwhjgejqwgejgqwjehgqwjhge' ref={textRef1} 
        getWidth={(width: number) => setTextWidth1(width)} 
        />
      <AnimText 
        data='sadlasjdlkasjdlsajdla' ref={textRef2} 
        getWidth={(width: number) => setTextWidth2(width)}
      />
    </View>
    <Button title='Stop animation' onPress={stopAnimation} />
    <Button title='Play animation' onPress={startAnimation} />
  </View>
}

const styles = StyleSheet.create({
  container: {
    width: 3 * width,
    height: 32,
    flexDirection: 'row'
  }
})

interface AnimTextProps {
  data: string;
  getWidth: (width: number) => void;
}

interface AnimTextRef {
  playAnimation: () => void;
  stopAnimation: () => void;
}

const AnimText = forwardRef<AnimTextRef, AnimTextProps>((props, ref) => {
  const slidingAnim = useRef(new Animated.Value(1)).current;
  const [widthOfText, setWidthOfText] = useState<number | undefined>(undefined)

  const playAnimation = () => {
    if (widthOfText) {
      const duration = (widthOfText + width / velocity);
      console.log(duration);
      Animated.timing(slidingAnim, {
        toValue: 0,
        duration,
        easing: Easing.linear
      }).start(() => slidingAnim.setValue(1))
    }
  }

  const stopAnimation = () => {
    slidingAnim.stopAnimation();
  }

  useImperativeHandle(ref, () => ({
    playAnimation: () => playAnimation(),
    stopAnimation: () => stopAnimation()
  }))

  const onLayout = (event: LayoutChangeEvent) => {
    setWidthOfText(event.nativeEvent.layout.width);
    props.getWidth(event.nativeEvent.layout.width);
  }

  return <Animated.Text
    style={{
      transform: [
        {
          translateX: slidingAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [widthOfText ? -widthOfText : -width, width]
          })
        }
      ]
    }}
    onLayout={onLayout}
  >{props.data}</Animated.Text>
})

export default TextTicker;