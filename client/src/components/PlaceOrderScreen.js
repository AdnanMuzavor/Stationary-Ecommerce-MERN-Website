//Screen for displaying order before it's being placed

import React, { useEffect } from "react";
import OrderSteps from "./OrderStepsComp";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/OrderActions";
import { useHistory } from "react-router-dom";
import Loadingcomp from "./Loadingcomp";
import ErrMessg from "./ErrMessDisplay";
import { ORDER_CREATE_RESET } from "../constants/OrderConstants";
import Topivgive from "./TopicComp";

const PlaceOrderScreen = () => {
  const history = useHistory();
  const UserDetails = useSelector((state) => state.UserDetails);
  const { UserInfo } = UserDetails;
  //To get all details importing cart
  const cart = useSelector((state) => state.cart);

  //Creating function to fix digits in prices
  const toPrice = (num) => Number(num.toFixed(2)); //5 to 5.00

  //Setting various prices which we will be displaying here

  //This will get total cost with respect to all items and round it off upto 2
  cart.itemsprice = toPrice(
    cart.cartItems.reduce((a, itm) => {
      if (itm.name && itm.price) {
        return a + itm.qty * itm.price;
      } else {
        return a + 0;
      }
    }, 0)
  );

  //Setting shipping price
  cart.shippingprice =
    cart.shippingAddress.country === "India" ? 0 : toPrice(10);

  //Setting text price based on total price
  cart.taxprice = toPrice(0.15 * cart.itemsprice);

  //Setting total price based on above prices
  cart.totalprice = toPrice(
    cart.itemsprice + cart.shippingprice + cart.taxprice
  );

  //Defining Placeorder handler
  const dispatch = useDispatch();
  const placeorderhandler = () => {
    const orderthings = cart.cartItems.filter((ele) => ele.name);
    dispatch(createOrder({ ...cart, orderItems: orderthings }));
  };

  //After order being created getting this order details
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;

  //Using useeffect to direct user to order specific page showing order details
  useEffect(() => {
    if (success) {
      history.push(`/orderscreen/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
    if (!UserInfo) {
      history.push("/signin");
    }
  }, [success, UserInfo]);
  return (
    <>
      <Topivgive
        a1="fade-down"
        a2="fade-up"
        title="Confirm Order Details"
      ></Topivgive>
      <OrderSteps step1 step2 step3 step4 />
      <div className="container nocr ">
        <div className="row mt-4 ms-2">
          <div className="col-md-8 col-lg-8 col-12">
            <div className="container row nocr ">
              <div className="col-12 col-md-12 col-lg-10">
                <h6>Shipping Details</h6>
                <p>
                  <strong>Name:</strong>
                  {cart.shippingAddress.name}
                  <br />
                  <strong>Address:</strong> {cart.shippingAddress.address} ,
                  {cart.shippingAddress.city} ,{cart.shippingAddress.postalcode}{" "}
                  ,{cart.shippingAddress.country}.
                </p>
              </div>
            </div>
            <div className="container row nocr">
              <div className="col-12 col-md-12 col-lg-12">
                <h6>Payment Details</h6>
                <p>
                  <strong>Method:</strong> {cart.paymentMethod}
                  <br />
                </p>
              </div>
            </div>
            <div className="container row nocr">
              <div className="col-12 col-md-12 col-lg-12">
                <h6>Items Details</h6>
                <p>
                  <div className=" itmcontainer my-3 ">
                    {/* <Scrollbars> */}
                    <div className="row cartitems my-4 d-flex justify-content-center">
                      {cart.cartItems.map((ele) => {
                        if (ele.name) {
                          return (
                            <>
                              <>
                                <div className="col-10 col-md-12 col-lg-12 my-2 itmcont">
                                  <div className="row item d-flex flex-direction-column align-items-center">
                                    <div className="orimg text-center img mx-auto col-12 col-md-4 col-lg-4 itemsincart">
                                      <img
                                        src={ele.image}
                                        alt="item img"
                                        className="img-fluid "
                                      />
                                     
                                    </div>
                                    <div className=" text-center itemname mx-auto col-12 col-md-1 col-lg-1 itemsincart">
                                      <h6>
                                        <strong>quantity:</strong> {ele.qty}
                                      </h6>
                                     
                                    </div>
                                    <div className=" text-center price mx-auto col-12 col-md-2 col-lg-2 itemsincart">
                                      <h6>
                                        <strong>Name: </strong><strong>{ele.name}</strong>
                                      </h6>
                                    
                                        
                                     
                                    </div>
                                    <div className=" text-center price mx-auto col-12 col-md-2 col-lg-2 itemsincart ">
                                      <h6>
                                        <strong> DPrice: </strong> ₹{ele.discntprce}
                                      </h6>
                                      
                                    </div>
                                    <div className=" text-center  qty mx-auto col-6 col-md-3 col-lg-3 itemsincart">
                                      <h6>
                                        <strong>Total:</strong>{ele.qty}x{ele.price}=₹
                                        {ele.qty * ele.price}
                                      </h6>
                                      
                                       
                                     
                                    </div>
                                  </div>
                                </div>
                              </>
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-lg-3 col-12">
            <div className="container row nocr">
              <h4 className="text-center col-12 cl-md-12 col-lg-12">Bill</h4>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>Items Price:</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>₹{cart.itemsprice}</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>Tax :</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>₹ {cart.taxprice}</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>Shipping :</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>₹ {cart.shippingprice} </strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>
                  <h4>Total :</h4>
                </strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6">
                <strong>
                  <h6>₹{cart.totalprice}</h6>
                </strong>
              </div>
              <button
                className="col-10 col-md-10 col-lg-10 mx-auto mb-2 btn navlink"
                onClick={placeorderhandler}
              >
               <p className="po"> Place Order</p>
              </button>
              {loading ? <Loadingcomp></Loadingcomp> : null}
              {error ? <ErrMessg>{error}</ErrMessg> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
