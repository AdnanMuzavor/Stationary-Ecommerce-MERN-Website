import {ORDERList_GET_FAIL, ORDERList_GET_REQUEST, ORDERList_GET_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_RESET, ORDER_CREATE_SUCCESS,ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST,  ORDER_DETAILS_SUCCESS, ORDER_NONPAYPAL_PAYMENT_FAIL, ORDER_NONPAYPAL_PAYMENT_REQUEST, ORDER_NONPAYPAL_PAYMENT_SUCCESS, ORDER_PAYPAL_PAYMENT_FAIL, ORDER_PAYPAL_PAYMENT_REQUEST, ORDER_PAYPAL_PAYMENT_SUCCESS} from "../constants/OrderConstants";

//Reducer to place order
export const orderCreateReducer=(state={},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading:true};
        case ORDER_CREATE_SUCCESS:
            return {loading:false,success:true,order:action.payload};
        case ORDER_CREATE_FAIL:
            return {loading:false,success:false,error:action.payload};
        case ORDER_CREATE_RESET:
            return {};
        default:
            return state;    
    }
}

//Reducer to get order details from data base
export const orderDetailsReducer=(state={loading:true},action)=>{
    switch(action.type){
        case ORDER_DETAILS_REQUEST:
            return {loading:true};
        case ORDER_DETAILS_SUCCESS:
            return {loading:false,success:true,order:action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading:false,success:false,error:action.payload};
        default:
            return state;    
    }
}

//Reducer to handle payment with paypal and without paypal
export const orderPayReducer=(state={success:false,data:{}},action)=>{
    switch(action.type){
        case ORDER_PAYPAL_PAYMENT_REQUEST:
            return {loading:true,data:action.payload}
        case ORDER_PAYPAL_PAYMENT_SUCCESS:
            return {loading:false,success:true};
        case ORDER_PAYPAL_PAYMENT_FAIL:
            return {loading:false,error:action.payload};
        case ORDER_NONPAYPAL_PAYMENT_REQUEST:
                return {loading:true,data:action.payload}
        case ORDER_NONPAYPAL_PAYMENT_SUCCESS:
                return {loading:false,success:true,data:action.payload};
        case ORDER_NONPAYPAL_PAYMENT_FAIL:
                return {loading:false,error:action.payload};    
        default:
            return state;    
    }
}

//Reducer to get all orders of signed in users
export const orderMineListReducer=(state={loading:true,orders:[]},action)=>{
    switch(action.type){
        case ORDERList_GET_REQUEST:
            return {loading:true};
        case ORDERList_GET_SUCCESS:
            return {loading:false,orders:action.payload};
        case ORDERList_GET_FAIL:
            return {loading:false,error:action.payload};
        default:
            return state;    
    }
}


