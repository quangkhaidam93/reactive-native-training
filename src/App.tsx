import "react-native-gesture-handler";
import React from "react";
import Home from "screens/Home/Home";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductScreen from 'screens/ProductScreen';
import LikeFanpage from './screens/LikeFanpage';
import Search from "screens/Search/Search";
import storeFactory from 'sagas/store';
import { PersistGate } from "redux-persist/integration/react";
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack";
import ProductDetail from "screens/ProductDetail/ProductDetail";
import ImageDetail from "screens/ImageDetail/ImageDetail";
import ImageDetail2 from "screens/ImageDetail/ImageDetail2";
import PanGesture from "screens/PanGesture/PanGesture";
import RnGestureHandler from "screens/ImageScaleAndScroll/ImageScaleAndScroll";
import CarouselText from 'screens/CarouselText/CarouselText';

const { store, persistor } = storeFactory();

interface AppProps {}

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

type RootStackParamList = {
  MyApp: undefined;
  ProductDetail: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'MyApp'>;

const MyApp = ({navigation} : Props) => <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'ios-home' 
      } else if (route.name === 'Product') {
        iconName = 'logo-buffer';
      } else {
        iconName = 'ios-home'
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
  })}
  tabBarOptions={{
    activeTintColor: '#34e5eb',
    inactiveTintColor: 'gray',
  }}
  initialRouteName='Search'
  >
  <Tab.Screen name="Home" component={Home} initialParams={navigation} />
  <Tab.Screen name="Product" component={ProductScreen} />
  <Tab.Screen name="FBLike" component={LikeFanpage} />
  <Tab.Screen name="Search" component={Search} />
</Tab.Navigator>

const App: React.FC<AppProps> = ({}) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="ImageDetail" screenOptions={{
              title: '7hE Spine'
            }} >
              <Stack.Screen 
                name="MyApp"
                component={MyApp}
              />
              <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{title: 'Product Detail'}}
              />
              <Stack.Screen
                name="ImageDetail"
                component={CarouselText}
              />
              {/* <Stack.Screen
                name="ItemList"
                component={}
              /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
