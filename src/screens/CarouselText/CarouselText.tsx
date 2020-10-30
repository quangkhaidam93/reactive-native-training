import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Dimensions, Easing, Text } from 'react-native';
// import TextTicker from 'react-native-text-ticker'
import axios from 'axios';
import Markdown from 'react-native-markdown-renderer';
import Button from 'components/Button';
import TextTicker from './components/TextTicker';

const { width } = Dimensions.get('window');

const datas : string[] = [
    "khai 12321321jkjskadjlkasdjlksajdlksajdsadgffgfghfhgfhgfghfhgfghfghfhg 👶👁",
    "caps is the best mid",
    "deft is the best adc"
  ]

const datas2 : string[] = [
  "12321321321",
  "3123213213123",
  "3124124214214214214214214"
]


const CarouselText = () => {
  const [myListText, setMyListText] = useState<string[] | undefined>(datas);
  const textTickerRef = useRef(null);
  const [isOne, setIsOne] = useState<boolean>(false);
  const [datas1, setData1] = useState<string[]>(datas);

  const onMarqueeComplete = () => {
    // if (isOne) setMyListText(datas)
    // else setMyListText(datas2)
    // setIsOne(!isOne);
    fecthNewData();
  }

  const fecthNewData = async () => {
    try {
      const response = await axios.get('https://dev.aladin.today/public/broadcast/getBroadcastMessages');
      // console.log(response.data.dataArray);
      setMyListText(response.data.dataArray);
    }
    catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   if (textTickerRef) 
  //     textTickerRef.stopAnimation();
  // }, [])

  const duration = () => {
    if (myListText) return 50 * myListText.join('                                             ').length;
    else return 1000;
  }

  // const onClickButtonStop = () => {
  //   if (textTickerRef && textTickerRef.current)
  //     textTickerRef.current.stopAnimation();
  // }

  // const onClickButtonPlay = () => {
  //   if (textTickerRef && textTickerRef.current)
  //     textTickerRef.current.startAnimation();
  // }

  const renderItem = useMemo(() => {
    if (myListText) { 
      return myListText.map((text: string) => {
        const list : JSX.Element[] = [];
        let normalString = '';
        let boldString = '';
        let intoBold = false;
        for (let i = 0; i < text.length; i++) {
          if (i === text.length - 1) {
            list.push(<Text>{normalString}</Text>);
            break;
          }
          if (text[i] === '*' && text[i+1] === '*') {
            if (intoBold) {
              list.push(<Text style={{fontWeight: 'bold'}} >{boldString.trim()}</Text>);
              boldString = '';
              intoBold = false;
            }
            else {
              list.push(<Text>{normalString}</Text>);
              normalString = '';
              intoBold = true;
            }
            i++;
          }
          else {
            if (intoBold) boldString += text[i];
            else normalString += text[i];
          }
        }
        return <>
          {list}
          <Text>{`                                             `}</Text>
        </>
      })
    }
    else return null;
  }, [myListText])

  // return <>
  //   {/* <TextTicker

  //     // ref={textTickerRef}
  //     duration={duration()}
  //     // scrollSpeed={150}
  //     loop={false}
  //     repeatSpacer={200}
  //     marqueeDelay={0}
  //     bounce={false}
  //     onMarqueeComplete={onMarqueeComplete}
  //     easing={Easing.linear}
  //   >
  //     {/* {myListText && 
  //       myListText.join('                                             ')
  //     } */}
  //     {renderItem && renderItem.map(e => e)}
  //     {/* <Text>123</Text>
  //     <Text>{`                                       `}</Text>
  //     <Text>345</Text> */}
  //   </TextTicker>
  //   {/* <Button title='Stop' onPress={onClickButtonStop} />
  //   <Button title='Play' onPress={onClickButtonPlay} /> */}
  // </> */}

  const addMoreText = () => {
    if (isOne) setData1(datas)
    else setData1(datas2)
    setIsOne(!isOne);
  }

  return <TextTicker datas={datas1} addMoreText={addMoreText} />
}

export default CarouselText;