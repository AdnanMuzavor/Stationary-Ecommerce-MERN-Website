import Axios from "axios";
import {
  CART_EMPTY,
  ORDERList_GET_FAIL,
  ORDERList_GET_REQUEST,
  ORDERList_GET_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_NONPAYPAL_PAYMENT_FAIL,
  ORDER_NONPAYPAL_PAYMENT_REQUEST,
  ORDER_NONPAYPAL_PAYMENT_SUCCESS,
  ORDER_PAYPAL_PAYMENT_FAIL,
  ORDER_PAYPAL_PAYMENT_REQUEST,
  ORDER_PAYPAL_PAYMENT_SUCCESS,
} from "../constants/OrderConstants";

export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
  console.log(`placing ${JSON.stringify(order)}`);
  try {
    const res = await fetch("/placemulorder", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await res.json();
    console.log(data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
    
    localStorage.removeItem("cartItems");
  } catch (e) {
    console.log(e);
    dispatch({ type: ORDER_CREATE_FAIL, payload: e.message });
  }
};

//Action function to fetch user details from backend

export const detailsOrder = (orderId) =>async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  try {
    const res = await fetch(`/getorderplaced/${orderId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      cridentials: "include",
    });
    const data = await res.json();
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
   
  } catch (e) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: e.message });
  }
};

//This action is only for payment via paypal
export const payOrder=(order,paymentResult)=>async(dispatch,getState)=>{
dispatch({type:ORDER_PAYPAL_PAYMENT_REQUEST,payload:{order,paymentResult}});

try {
  const {data}=Axios.put(`/${order._id}/paypal`,paymentResult);
  console.log(data);
  dispatch({type:ORDER_PAYPAL_PAYMENT_SUCCESS,payload:data});
} catch (e) {
  console.log(e);
  dispatch({type:ORDER_PAYPAL_PAYMENT_FAIL,payload:e.message});
}
}

//This action is only for payment without paypal
export const payOrderNP=(order,paymentdata)=>async(dispatch,getState)=>{
  dispatch({type:ORDER_NONPAYPAL_PAYMENT_REQUEST,payload:{order,paymentdata}});
  // console.log(order._id);
  // console.log(`sending ${paymentdata}`)
  try {
    const paidAt=Date.now();
    const { isPaid} = order;
    const {transdate,amount,cardno,email}=paymentdata;
    // console.log(`${isPaid},${paidAt},${transdate},${amount},${cardno},${email}`)
    
    // console.log(`${isPaid},${paidAt},${transdate},${amount},${cardno},${email}`)
    const res = await fetch(`/payment/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
       paidAt,
       transdate,
       cardno,
       email,
      }),
    });
   const data=await res.json();
    dispatch({type:ORDER_NONPAYPAL_PAYMENT_SUCCESS,payload:data});
  } catch (e) {
    console.log(e);
    dispatch({type:ORDER_NONPAYPAL_PAYMENT_FAIL,payload:e.message});
  }
  }

  //Action function to get order list
  export const mineOrderList=()=>async(dispatch)=>{
    dispatch({type:ORDERList_GET_REQUEST});
    
    try {
      const res = await fetch(`/orderlist`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        cridentials: "include",
      });
      const data = await res.json();
      console.log(data);
      dispatch({ type: ORDERList_GET_SUCCESS, payload: data });
      
  
    } catch (e) {
      console.log(e);
      dispatch({type:ORDERList_GET_FAIL,payload:e.message});
    }
    }