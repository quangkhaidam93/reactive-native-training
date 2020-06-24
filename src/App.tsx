import 'react-native-gesture-handler';
import React from 'react';
import ProductList from 'components/ProductList';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import productsReducer from 'sagas/products/reducer';
import createSagaMiddleware from 'redux-saga';
import { productsWatcher } from 'sagas/products/saga';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


interface AppProps {

}

const Stack = createStackNavigator();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  productsReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(productsWatcher);

const App: React.FC<AppProps> = ({}) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductList} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    
  );
}

export default App;
