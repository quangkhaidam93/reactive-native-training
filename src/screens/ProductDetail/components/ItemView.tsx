import React, { useEffect, useState } from 'react';
import { View, Text, DeviceEventEmitter } from 'react-native';
import { ManagerEvents } from 'services/manager';

const ItemView = () => {
  const [myText, setMyText] = useState<string>('khai');
  
  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener(ManagerEvents.CHANGE_TEXT, (text: string) => {
      console.log('Listening event');
      setMyText(text);
    })
    return () => subscription.remove()
  })

  return <View>
    <Text>{myText}</Text>
  </View>
}

export default ItemView;