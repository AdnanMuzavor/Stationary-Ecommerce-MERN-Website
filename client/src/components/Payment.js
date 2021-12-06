import React, { useEffect, useState } from "react";
import OrderSteps from "./OrderStepsComp";
import payment from "../Images/payment.jpg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/Cartactions";
const Payment = () => {
  const history = useHistory();
  //To check if shipping address was filled if not user will be redirected to shipping apge
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  //To set Payment Method
  const [Paymentmethod, setPaymentmethod] = useState("");

  const PaymentHandler = (e) => {
    e.preventDefault();
   
    if(Paymentmethod===""){
      alert('Plz select a payment method');
      return;
    }
    dispatch(savePaymentMethod(Paymentmethod));
    
    history.push("/placeorder");
  };
  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
  }, []);
  return (
    <>
      <OrderSteps step1 step2 step3 />

      <div className="container ">
        <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1 ">
          {/* For form filling */}

          <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
            <div className="header row text-center ">
              <h3 className="signup">Select Payment Method</h3>
              <hr className="mx-auto w-50" />
            </div>

            <div className="formpart row d-flex justify-content-center">
              <form method="POST" className="row">
                <div className="radio input-group mb-3 ">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fab fa-cc-paypal fa-2x"></i>
                  </span>
                  <input
                    type="radio"
                    id="paypal"
                    value="PayPal"
                    name="paymentMethod"
                    onChange={(e) => setPaymentmethod(e.target.value)}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
                <div className="radio input-group mb-3 ">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fab fa-cc-stripe fa-2x"></i>
                  </span>
                  <input
                    type="radio"
                    id="Stripe"
                    value="Stripe"
                    name="paymentMethod"
                    onChange={(e) => setPaymentmethod(e.target.value)}
                  />
                  <label htmlFor="stripe">Stripe</label>
                </div>
                <div className="signup input-group mb-3">
                  <input
                    type="submit"
                    className="form-control inputs"
                    placeholder="register"
                    aria-label="register"
                    aria-describedby="basic-addon1"
                    name="name"
                    autoComplete="off"
                    onClick={PaymentHandler}
                    value="continue"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3">
            <div className=" signupi row blog colcomp">
              <img src={payment} className="img-fluid img" alt="Signup" />
            </div>

            <div className="input-group mb-3 text-center mx-auto row mt-3">
              <Link to="/login" className="Link text-center">
                Already registered? Click here to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
