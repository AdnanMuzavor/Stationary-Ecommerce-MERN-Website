
import {CART_UNSAVE_SHIPPING_ADDRESS} from "../constants/Cartconstants";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../constants/SigninConstants";


//Function for Receiving and sending login details to backend for checking

export const Signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  console.log("Inside sign in function");
  try {
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(`output ${data}`);
    if (res.status === 400 || !data) {
      alert("Invalid Cridentials");
      dispatch({ type: USER_SIGNIN_FAIL, payload: "Invalid Cridentials" });
   
    } else {
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    }
  } catch (e) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: e.message });
    console.log(`error ${e}`);
  }
};

export const Signout = () => async (dispatch) => {
  fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    cridentials: "include",
  })
    .then((res) => {
      dispatch({ type: USER_SIGNOUT });

      if (res.status !== 200) {
        throw new Error("Logout not done");
      } else {
        alert(
          "User logged out"
        );
        localStorage.removeItem("cartItems");
        dispatch({type:CART_UNSAVE_SHIPPING_ADDRESS})
        localStorage.removeItem("shippingAddress");
        localStorage.removeItem("userInfo");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
