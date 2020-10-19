import React, { useRef, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import { iconsPNG } from '../../assets/Icons';
import Carousel from 'react-native-snap-carousel';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('window');

interface ImageItemProps {
  data: any;
  active: number;
}

const ImageItem : React.FC<ImageItemProps> = ({data, active}) => {
  const imageRef = useRef<ImageZoom>(null);

  useEffect(() => {
    if (active !== data.index && imageRef) {
      imageRef.current.reset();
    }
  }, [active])

  return <ImageZoom 
    cropWidth={width}
    cropHeight={height}
    imageWidth={width}
    imageHeight={300}
    minScale={1}
    useNativeDriver={true}
    ref={imageRef}
  >
    <Image
      resizeMode='contain'
      style={{
        width, 
        height: 300
      }}
      source={iconsPNG[data.item.imageUrl]}
    />
  </ImageZoom>
}

const ImageDetail2 = () => {
  const renderItem = (data: any) => <ImageItem data={data} active={active} />

  const [active, setActive] = useState<number>(0);

  return <View style={{flex: 1}}>
  <Carousel 
    data={datas}
    sliderWidth={width}
    itemWidth={width}
    renderItem={renderItem}
    loop={true}
    lockScrollWhileSnapping={true}
    inactiveSlideScale={1}
    onSnapToItem={(activeSlide) => setActive(activeSlide)}
  />
</View>
}

export default ImageDetail2;

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