import {createStore,compose,applyMiddleware,combineReducers} from 'redux';
import thunk from "redux-thunk";
import {cartReducer} from './reducers/cartreducers';
import {orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer} from './reducers/orderreducers';
import {AddProductReducer, DeleteProductReducer, GetProductReviewsReducer, ProductListReducer, ProductReviewsReducer, UpdateProductReducer} from './reducers/productreducers';
import { ProductDetailsReducer } from './reducers/productreducers';
import {UserReducer} from './reducers/userreducers';

const initialState={
    UserDetails:{
        UserInfo:localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem('userInfo')):null,
    },
    cart:{
        cartItems:localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[],
        shippingAddress:localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem("shippingAddress")):[],
        paymentMethod:"PayPal",
    },
    
};
const reducer=combineReducers({
    productlist: ProductListReducer,
    productdetails:ProductDetailsReducer,
    cart:cartReducer,
    UserDetails:UserReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderMineList:orderMineListReducer,
    productReviews:ProductReviewsReducer,
    AllReviews:GetProductReviewsReducer,
    DeletedProduct:DeleteProductReducer,
    EditProduct:UpdateProductReducer,
    AddProduct:AddProductReducer,
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;