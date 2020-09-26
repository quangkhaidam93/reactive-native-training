import React, { memo } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { ProductModel } from "models/Product";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore, Dispatch } from "redux";
import { productDetailReducer } from "./redux/reducer";
import { connect, Provider, useDispatch, useSelector } from "react-redux";
import { IProductDetailState } from "sagas/productdetail/types";
import { GetProductDetailRequest } from "./redux/actions";
import { productDetailWatcher } from "./redux/saga";
import { IStoreState } from "sagas/rootReducer";

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

	const handlePress = () => {
		const product = {
			id: 1,
			thumbImage: 'https://aladin-today-bucket.s3.ap-southeast-1.amazonaws.com/sm/4bd144c7-896c-55db-b70d-7b5a0b2d4638.jpeg',
			thumbHeight: 192,
			productName: 'Váy xường xám mặc Trung Thu,Tết'
		};
		dispatch(GetProductDetailRequest(product));
	}
	
  console.log(`Product Detail 2 render with ${product}`);
  

  return (
    <View style={styles.container}>
			<Button onPress={handlePress} title='Get Product Detail' />
      {product && (
        <View style={styles.productContainer}>
          <Image style={styles.image} source={{ uri: product.thumbImage }} />
          <Text style={styles.name}>{product.productName}</Text>
        </View>
      )}
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
  console.log("Product Detail rendering...");
  console.log(`Products ${props.products}`);
  console.log(`Products loading ${props.loading}`);

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
