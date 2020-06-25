import "react-native-gesture-handler";
import React from "react";
import Home from "screens/Home";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import productsReducer from "sagas/products/reducer";
import createSagaMiddleware from "redux-saga";
import { productsWatcher } from "sagas/products/saga";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductScreen from 'screens/ProductScreen';

interface AppProps {}

const Tab = createBottomTabNavigator();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(productsReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(productsWatcher);

const App: React.FC<AppProps> = ({}) => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({color, size }) => {
                  let iconName;
      
                  if (route.name === 'Home') {
                    iconName = 'ios-home' 
                  } else if (route.name === 'Product') {
                    iconName = 'logo-buffer';
                  }
      
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
              tabBarOptions={{
                activeTintColor: '#34e5eb',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Home" component={Home} />
              <Tab.Screen name="Product" component={ProductScreen} />
            </Tab.Navigator>
          </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
