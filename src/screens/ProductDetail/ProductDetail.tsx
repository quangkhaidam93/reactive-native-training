import React, { memo, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Button, DeviceEventEmitter, FlatList, ListRenderItemInfo, EmitterSubscription } from "react-native";
import { ProductModel } from "models/Product";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, Dispatch } from "redux";
import { productDetailReducer } from "./redux/reducer";
import { connect, Provider, useDispatch, useSelector } from "react-redux";
import { IProductDetailState } from "sagas/productdetail/types";
import { GetProductDetailRequest } from "./redux/actions";
import { productDetailWatcher } from "./redux/saga";
import { IStoreState } from "sagas/rootReducer";
import { generateRandomText } from "helpers/randomtext";
import { changeText, clearText, ManagerEvents } from "services/manager";
import ItemView from "./components/ItemView";
import { closeSocket, initialSocket, joinRoom, receiver, receiverSchema, sendDataToServer, sendMessageToServer } from "services/socket";
import ItemChat from "./components/ItemChat";
import { TextInput } from "react-native-gesture-handler";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  productDetailReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(productDetailWatcher);

interface IProductDetailProps extends StateInjectedProps {}

interface IProductProps extends StateInjectedProps {}

const Product = () => {
  const product = useSelector((state: IProductDetailState) => state.product);
  // const products = useSelector((state: IStoreState) => state.productsState.products);

  const dispatch: Dispatch = useDispatch();
  const [viewState, setViewState] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [messages, setMessages] = useState<string[]>(['123', '456']);
  const [text, setText] = useState<string>('100');
  const [text2, setText2] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  
  // const receiveTime = (data: any) => setTime(data)

  const receiveMessage = (message: string) => {

    // het test
    console.log('currentMessages ', messages,message, text);
    const currentMessages = messages.map(m => m);
    currentMessages.unshift(message);
    console.log('newMessages ', currentMessages,message);
    setMessages(currentMessages);
  }

  useEffect(() => {
    console.log('updated message', message);
    if (message) {
      console.log('Vao day');
      receiveMessage(message);
    }
  }, [message]);

	const handlePress = () => {
		const product = {
			id: 1,
			thumbImage: 'https://aladin-today-bucket.s3.ap-southeast-1.amazonaws.com/sm/4bd144c7-896c-55db-b70d-7b5a0b2d4638.jpeg',
			thumbHeight: 192,
			productName: 'Váy xường xám mặc Trung Thu,Tết'
		};
		dispatch(GetProductDetailRequest(product));
  }

  const changeViewState = () => setViewState(!viewState);
  
  const onGenerateRandomText = () => {
    const text = generateRandomText(10);
    // clearText();
    changeText(text);
  }

  const sendDataToBackend = () => sendDataToServer();

  const joinARoom = () => joinRoom(text2);

  const sendMessage = (message: string) => sendMessageToServer(message, text2);

  const onChangeText = (text: string) => setText(text);

  const onChangeText2 = (text: string) => setText2(text);

  useEffect(() => {
    console.log('didMount');
    const subscription : EmitterSubscription = DeviceEventEmitter.addListener(ManagerEvents.RECEIVE_MESSAGE, (message: string) => {
      console.log(message);
      setMessage(message);
    });
    initialSocket();
    return () => {
      closeSocket();
      subscription.remove();
    }
  }, []);

  const renderItem = (data: ListRenderItemInfo<string>) => {
    const {item, index} = data;
    return <ItemChat message={item} key={index} />
  }
	
  return (
    <View style={styles.container}>
			<Button onPress={handlePress} title='Get Product Detail' />
      {product && (
        <View style={styles.productContainer}>
          <Image style={styles.image} source={{ uri: product.thumbImage }} />
          <Text style={styles.name}>{product.productName}</Text>
        </View>
      )}
      <Button onPress={onGenerateRandomText} title='Generate Random Text' color='green' />
      <Button onPress={changeViewState} title='Change View Status' color='blue' />
      {viewState && <ItemView />}
      <Text>{time}</Text>
      <Button onPress={sendDataToBackend} title='Send Data ' color='orange' />
      <View style={{flexDirection: 'row'}} >
        <TextInput onChangeText={onChangeText2} placeholder='Write your message' style={{color: 'black'}} />
        <Button onPress={joinARoom} title='Join Room' color='brown' />
      </View>
      <View style={{flexDirection: 'row'}} >
        <TextInput onChangeText={onChangeText} placeholder='Write your message' style={{color: 'black'}} />
        <Button onPress={() => sendMessage(text)} title='Send Message' color='pink' />
      </View>
      <FlatList 
        data={messages}
        renderItem={renderItem}
      />
    </View>
  );
};

interface StateInjectedProps {
  products: ProductModel[];
  loading: boolean;
}

const mapStateToProps = ({ productsState }: IStoreState): StateInjectedProps => ({
  products: productsState.products,
  loading: productsState.loading
});

// const ProductWrapper = connect(mapStateToProps)(Product);

const ProductDetail: React.FC<IProductDetailProps> = (props) => {
  return <Provider store={store}>
		<Product />
	</Provider>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 294,
    borderRadius: 15,
  },
});

export default connect(mapStateToProps)(ProductDetail);

// export default ProductDetail;
