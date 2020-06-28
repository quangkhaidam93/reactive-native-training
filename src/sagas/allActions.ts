import { GetProductDetailRequest } from 'sagas/productdetail/actions';
import { 
    GetProductsRequest, 
    RefreshProductsRequest, 
    LoadmoreProductRequest 
} from 'sagas/products/actions';

const allActions = {
    GetProductsRequest,
    RefreshProductsRequest,
    LoadmoreProductRequest,
    GetProductDetailRequest
}

export default allActions;