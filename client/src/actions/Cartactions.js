//This action will fetch the specific product based on id and send it's required details via payload

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/Cartconstants";

//Action to add item to cart
export const AddToCart = (productid, qty) => async (dispatch, getState) => {
  try {
    const res = await fetch(`/getonlyitem/${productid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(`data-${data},${data.itemname}`);
    //Sending details we want each item in our cart to haveinform of object sended via payload
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.itemname,
        image: data.img,
        price: data.price,
        stock: data.stock,
        discntprce: data.discountprice,
        product: data._id,
        qty,
      },
    });
    //A line of code to store items added to cart in localstorage
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
  } catch (e) {
  console.log(e);
  }
};

//Action to remove item from cart
export const RemoveItem=(productid)=>async(dispatch,getState)=>{
  //This dispatch will induce action under which product with given id will get filtered from cartitems
  dispatch({type:CART_REMOVE_ITEM,payload:productid});
  //This will resave the newly returnrf list
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}

//Action to get user address and save in localstorage
export const saveShippingAddress=(data)=>(dispatch)=>{
  dispatch({type:CART_SAVE_SHIPPING_ADDRESS,payload:data});
  localStorage.setItem("shippingAddress",JSON.stringify(data));
}

export const savePaymentMethod=(method)=>(dispatch)=>{
  dispatch({type:CART_SAVE_PAYMENT_METHOD,payload:method});

}
