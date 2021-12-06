//Screen for displaying order after it's being placed
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import {Link, NavLink} from "react-router-dom";
import OrderSteps from "./OrderStepsComp";
import { useSelector, useDispatch } from "react-redux";
import { detailsOrder, payOrder, payOrderNP } from "../actions/OrderActions";
import { PayPalButton } from "react-paypal-button-v2";
import Loadingcomp from "./Loadingcomp";
import ErrMessg from "./ErrMessDisplay";
import {CART_EMPTY} from "../constants/OrderConstants";
import Topivgive from "./TopicComp";

const OrderScreen = (props) => {
  const history = useHistory();
//Getting user info to set email
const UserDetails = useSelector((state) => state.UserDetails);
  const { UserInfo } = UserDetails;


  //State to tell paypal payment screen ready or not
  const [sdkReady, setsdkReady] = useState(false);
  //getting dispatch
  const dispatch = useDispatch();

  //Creating function to fix digits in prices
  const toPrice = (num) => Number(num.toFixed(2)); //5 to 5.00

  //After order being created getting this order details
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  //Getting order id from url
  const orderId = props.match.params.id;

  //Getting orderpay details here
  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = orderPay;

  const {
    error: errorPayNP,
    success: successPayNP,
    loading: loadingPayNP,
  } = orderPay;
  //DEfining function to handle/some of the order details after paymment is being made
  const successPaymentHandler = (paymentResult) => {
    console.log(`sending ${order}`);
    dispatch(payOrder(order, paymentResult));
  };
  const [amount,setamount]=useState(order?order.totalprice:0);
  //Defining state to deal with direct payment facility
  const [paymentdata,setpaymentdata]=useState({
    email:UserInfo?UserInfo.email:history.push("/signin"),
    amount:amount,
    cardno:"",
    transdate:Date.now(),
    code:"",
    carddate:"",

  })

  
  //setting above state
  const changedetector=(e)=>{
    e.preventDefault();
    const {name,value}=e.target;
    setpaymentdata((prevdata)=>{
      return {...prevdata,[name]:value}
    })
  }
  //to handle payment without paypal
  const NonPaypalPayment = () => {
   
    dispatch(payOrderNP(order, paymentdata));
  };
  //to show payment section for non paypal transaction
  const paymentHandler = () => {
   
    const swapping = document.querySelector(".swapping");
    swapping.classList.remove("hide");
  };
  //Using useeffect to direct user to order specific page showing order details
  useEffect(() => {
    dispatch(detailsOrder(orderId));
    const ToTop = () => {
      window.scrollTo({
        top: 200,
        behavior: "smooth",
      });
    };
    if(successPay || successPayNP){
    ToTop();
    }
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/paypal");
    
      //Adding a script element/tag
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      
      script.async = true;
      script.onload = () => {
        
        setsdkReady(true);
      };
      document.body.appendChild(script);
    };
    //Dealing with when to call this function

    if (!orderId || !order || successPay || (order && order._id !== orderId)) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setsdkReady(true);
      }
    }
   
    if(successPayNP){
      alert("payment Done")
      dispatch({type:CART_EMPTY})
    }

    if(!UserInfo || !UserInfo.email){
      history.push("/signin")
    }
  }, [orderId, dispatch, sdkReady,successPay,UserInfo]);
  return loading ? (
    <Loadingcomp></Loadingcomp>
  ) : error ? (
    <ErrMessg>{error}</ErrMessg>
  ) : (
    <>
    <Topivgive a1="zoom-out" a2="zoom-in" title={`Order id: ${order._id}`}>
    </Topivgive>
     
      <div className="container nocr ">
        <div className="row mt-4 ms-2">
          <div className="col-md-8 col-lg-8 col-12">
            <div className="container row nocr ">
              <div className="col-12 col-md-12 col-lg-10">
                
                <p>
                  <strong>Name:</strong>
                  {order.shippingAddress.name}
                  <br />
                  <strong>Address:</strong> {order.shippingAddress.address} ,
                  {order.shippingAddress.city} ,
                  {order.shippingAddress.postalcode} ,
                  {order.shippingAddress.country}.
                </p>
                {order.isDelivered ? (
                  <ErrMessg>Delivered at {order.deliveredAt}</ErrMessg>
                ) : (
                  <ErrMessg>Not Delivered</ErrMessg>
                )}
              </div>
            </div>
            <div className="container row nocr">
              <div className="col-12 col-md-12 col-lg-12">
                <h3>Payment Details</h3>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                  <br />
                </p>
                {order.isPaid ? (
                  <ErrMessg>Paid at {order.paidAt}</ErrMessg>
                ) : (
                  <ErrMessg>Not Paid</ErrMessg>
                )}
              </div>
            </div>
            <div className="container row nocr">
              <div className="col-12 col-md-12 col-lg-12">
                <h3>Items Details</h3>
                <p>
                  <div className=" itmcontainer my-3">
                    {/* <Scrollbars> */}
                    <div className="row cartitems my-4 d-flex justify-content-center">
                      {order.orderItems.map((ele) => {
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
          <div className="col-md-4 col-lg-4 col-12">
            <div className="container row nocr">
              <h4 className="text-center col-12 cl-md-12 col-lg-12">Bill</h4>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>Items Price:</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>₹{order.itemsprice}</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>Tax :</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>₹ {order.taxprice}</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>Shipping :</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>₹ {order.shippingprice} </strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>
                  <h4>Total :</h4>
                </strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>
                  <h3>₹{order.totalprice}</h3>
                </strong>
              </div>
              <div className="col-10 col-md-8 col-lg-8 mx-auto">
                {
               order.isPaid===false?
                !sdkReady ? (
                  <Loadingcomp></Loadingcomp>
                ) : (
                 
                  <>
                    {errorPay ? <ErrMessg>{errorPay}</ErrMessg> : null}
                    {loadingPay ? <Loadingcomp></Loadingcomp> : null}
                    <PayPalButton
                      amount={order.totalprice}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                  </>
                  
                  
                ):   <>
                    <div className="container mx-auto"><h3 className="strong text-center">Payment Done</h3></div>
                   <NavLink to="/"><button className="container">Continue Shopping</button></NavLink>
                 
                 </>
                }
              </div>
              <div className="col-10 col-md-8 col-lg-8 mx-auto mb-3">
                {loading ? (
                  <Loadingcomp></Loadingcomp>
                ) : (order.isPaid===true?null:
                  
                  <button className="container" onClick={paymentHandler}>
                    Make Payment
                  </button>
                )}
                
              </div>
              <div className="col-12 nocr col-md-12 col-lg-12 container swapping hide">
              <div className="row nocr">
              <h4 className="text-center col-12 cl-md-12 col-lg-12">PAYMENT</h4>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>METHOD:</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>CARD</strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>
                  AMOUNT:
                </strong>
              </div>
              <div className="col-6 col-md-6 col-lg-6 text-center">
                <strong>
                  {order.totalprice}
                </strong>
              </div>
              <h4 className="text-center col-12 cl-md-12 col-lg-12">CARD DETAILS</h4>
              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
                <strong>
                 CARD NUMBER:
                </strong>
              </div>

              <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    className="inputs"
                    type="number"
                    name="cardno"
                    value={paymentdata.cardno}
                    onChange={changedetector}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Card Number"
                    aria-label="Card Number"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div className="col-12 col-md-12 col-lg-12 text-center">
                <strong>
                User EMAIL:
                </strong>
              </div>
              <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    className="inputs"
                    type="email"
                    name="email"
                    value={paymentdata.email}
                    onChange={changedetector}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Your email"
                    aria-label="Your email"
                    aria-describedby="basic-addon1"
                  />
                </div>

                <div className="col-12 col-md-12 col-lg-12 text-center">
                <strong>
                3 DIGIT CODE:
                </strong>
              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
              <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    className="inputs"
                    type="number"
                    name="code"
                    value={paymentdata.code}
                    onChange={changedetector}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Code"
                    aria-label="Code"
                    aria-describedby="basic-addon1"
                  />
                </div>

              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
                <strong>
                EXP DATE:
                </strong>
              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
              <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    className="inputs"
                    type="date"
                    name="carddate"
                    value={paymentdata.carddate}
                    onChange={changedetector}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Your email"
                    aria-label="Your email"
                    aria-describedby="basic-addon1"
                  />
                </div>

              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
                <strong>
                TRANS DATE:
                </strong>
              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
              <div className="input-group mb-3">
                  <span class="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    className="inputs"
                    type="date"
                    name="transdate"
                    value={paymentdata.transdate}
                    onChange={changedetector}
                    class="form-control"
                    autoComplete="off"
                    placeholder="Your email"
                    aria-label="Your email"
                    aria-describedby="basic-addon1"
                  />
                </div>

              </div>
              <div className="col-12 col-md-12 col-lg-12 text-center">
                {errorPayNP ? <ErrMessg>{errorPay}</ErrMessg> : null}
                    {loadingPayNP? <Loadingcomp></Loadingcomp> : 
                  <>
                  <button className="container mb-3" onClick={NonPaypalPayment}>
               PAY {order.totalprice}
                </button>
                  </>
                }
              
              </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default OrderScreen;
