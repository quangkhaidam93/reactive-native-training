import { ItemModel } from 'models/ItemModel';
import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo, View, Text } from 'react-native';

const definedItems : ItemModel[] = [
  {
    id: 1,
    label: 'List item 1'
  },
{
    id: 2,
    label: 'List item 2'
  },
  {
    id: 3,
    label: 'List item 3'
  },
  {
    id: 4,
    label: 'List item 4'
  }
];

const renderItem = (data: ListRenderItemInfo<ItemModel>) => {
  const { item } = data;
  return <View style={{margin: 16}} >
    <Text>{item.id}</Text>
    <Text>{item.label}</Text>
  </View>
}

const ItemList = () => {
  const [items, setItems] = useState(definedItems);
  const [hasErrored, setHasErrored] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return <>
    {
      hasErrored ? <Text>There was an error</Text> :
      isLoading ? <Text>Loading...</Text> :
      <FlatList
        data={items}
        renderItem={renderItem}
      />
    }
  </>
}

export default ItemList;