import React from 'react';
import { View, Text } from 'react-native';

interface ItemChatProps {
  message: string;
}

const ItemChat : React.FC<ItemChatProps> = ({message}) => {
  return <View>
    <Text>{message}</Text>
  </View>
}

export default ItemChat;