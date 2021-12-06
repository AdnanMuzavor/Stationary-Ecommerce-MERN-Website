import {
    GET_PRODUCT_REVIEWS_FAIL,
    GET_PRODUCT_REVIEWS_REQUEST,
  GET_PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_REVIEWS_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_UPDATED_DATA,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/Productconstants";
import { PRODUCT_LIST_SUCCESS } from "../constants/Productconstants";

//Function for fetching data from backend and accordingly calling dispatch methods
export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const res = await fetch("/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(`data-${data}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: e.message });
  }
};

//Function for fetching individual item details from backend and accordingly calling dispatch methods
export const DetailsProduct = (productid) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productid,
  });
  try {
    const res = await fetch(`/getonlyitem/${productid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(`data-${data},${data.itemname}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    localStorage.setItem("ProdDetails",JSON.stringify(data));
  } catch (e) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: e.message });
  }
};

//Action function to add review/comment
export const reviewByUser = (reviewdata) => async (dispatch) => {
  dispatch({ type: PRODUCT_REVIEWS_REQUEST, payload: reviewdata });
  try {
    const { userreview, username, useremail, userrating, productid } =
      reviewdata;
    console.log(
      `${userreview},${username},${useremail},${userrating},${productid}`
    );
    //To post review
    const res = await fetch(`/postreview/${productid}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userreview,
        username,
        useremail,
        userrating,
        productid,
      }),
    });
    const data = await res.json();
    //To get updated list of reviews
    if (res.status === 404 || res.status !== 200) {
      dispatch({ type: PRODUCT_REVIEWS_FAIL, payload: res.message });
      return;
    }
    const res2 = await fetch(`/getreviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reviews = await res2.json();
    console.log(reviews);
    dispatch({ type: PRODUCT_REVIEWS_SUCCESS, payload: reviews });
  } catch (e) {
    dispatch({ type: PRODUCT_REVIEWS_FAIL, payload: e.message });
  
  }
};

//Action to get all the reviews
export const ReviewsProduct = () => async (dispatch) => {
    dispatch({
      type: GET_PRODUCT_REVIEWS_REQUEST,
  
    });
    try {
      const res = await fetch(`/getreviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await res.json();
      console.log(`data-${data}`);
      dispatch({ type: GET_PRODUCT_REVIEWS_SUCCESS, payload: data });
    } catch (e) {
      dispatch({ type: GET_PRODUCT_REVIEWS_FAIL, payload: e.message });
    }
  };

  //Product based Admin Action

  //Delete Product by admin
  export const DeleteProduct = (id) => async (dispatch) => {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,payload:id
  
    });
    
      try {
        const res = await fetch(`/deleteitem/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ props }),
        });
        const data = await res.json();
        if(res.status===200){
          console.log(data);
          alert("Deletion done");
        }
      dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data})
    } catch (e) {
    
      dispatch({type:PRODUCT_DELETE_FAIL,payload:e})
    }
  }

  //Update product by admin
  export const UpdateProduct = (id,itemname,price,discountprice,description,stock,img) => async (dispatch) => {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,payload:{id,itemname,price,discountprice,description,stock,img}
  
    });
    
      try {
        const res = await fetch(`/updateitemdata/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            id,itemname,price,discountprice,description,stock,img
          }),
        });
        const data = await res.json();
        if (!data) {
          // console.log("Message not sent");
          dispatch({type:PRODUCT_UPDATE_FAIL,payload:"Unable to edit data."})
        }
      dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:data})
    } catch (e) {
    
      dispatch({type:PRODUCT_UPDATE_FAIL,payload:e})
    }
  }

    //Add product by admin
    export const AddProduct = (itemname,price,discountprice,description,stock,img) => async (dispatch) => {
      dispatch({
        type: PRODUCT_ADD_REQUEST,payload:{itemname,price,discountprice,description,stock,img}
    
      });
      
        try {
          const res = await fetch(`/additem`, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify({
              itemname,price,discountprice,description,stock,img
            }),
          });
          const data = await res.json();
          if (!data) {
            // console.log("Message not sent");
            dispatch({type:PRODUCT_ADD_FAIL,payload:"Unable to add data."})
          }
        dispatch({type:PRODUCT_ADD_SUCCESS,payload:data})
      } catch (e) {
      
        dispatch({type:PRODUCT_ADD_FAIL,payload:e})
      }
    }
