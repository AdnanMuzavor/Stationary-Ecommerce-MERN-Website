import React, { useEffect, useState } from "react";
import OrderSteps from "./OrderStepsComp";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import shipping from "../Images/shipping.jpg";
import { saveShippingAddress } from "../actions/Cartactions";
const Shipping = (props) => {
  const history = useHistory();
  //If user is logged in and had entered data thn it'llls saved and retrieved from memory
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //State to deal with shipping details
  const [ShippingDeetails, setShippingDetails] = useState({
    name: shippingAddress ? shippingAddress.name : "",
    address: shippingAddress ? shippingAddress.address : "",
    postalcode: shippingAddress ? shippingAddress.postalcode : "",
    city: shippingAddress ? shippingAddress.city : "",
    country: shippingAddress ? shippingAddress.country : "",
  });
  //getting udserinfo so that if user signs out,screen is chsnged to signin

  const UserDetails = useSelector((state) => state.UserDetails);
  const { UserInfo } = UserDetails;

  useEffect(() => {
    if (!UserInfo) {
      history.push("/signin");
    }
  }, [UserInfo]);
  //function to detect change and set value
  const Changedetected = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setShippingDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //getting dispatch
  const dispatch = useDispatch();

  //Function to handle sending of shipping address
  function ShippingHandler(e) {
    e.preventDefault();
    if(!ShippingDeetails.address || !ShippingDeetails.name || !ShippingDeetails.city || !ShippingDeetails.postalcode || !ShippingDeetails.country){
      alert(`${UserInfo.name}, Plz fill all the details`);
      return;
    }
    dispatch(saveShippingAddress(ShippingDeetails));
    history.push("/payment");
  }
  return (
    <>
      <OrderSteps step1 step2 />
      <div className="container ">
        <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1 ">
          {/* For form filling */}

          <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
            <div className="header row text-center ">
              <h3 className="signup">Land Your Shipping Address here!</h3>
              <hr className="mx-auto w-50" />
            </div>

            <div className="formpart row d-flex justify-content-center">
              <form method="POST" className="row">
                <div className="signup input-group mb-3 ">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="icon fa fa-user" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="Your name"
                    aria-label="Your name"
                    aria-describedby="basic-addon1"
                    name="name"
                    autoComplete="off"
                    onChange={Changedetected}
                    value={ShippingDeetails.name}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                  <i className="fas fa-home"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="address"
                    aria-label="address"
                    aria-describedby="basic-addon1"
                    name="address"
                    autoComplete="off"
                    onChange={Changedetected}
                    value={ShippingDeetails.address}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fas fa-city"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="city"
                    aria-label="city"
                    aria-describedby="basic-addon1"
                    name="city"
                    autoComplete="off"
                    onChange={Changedetected}
                    value={ShippingDeetails.city}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fas fa-code-branch"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="postalcode"
                    aria-label="postalcode"
                    aria-describedby="basic-addon1"
                    name="postalcode"
                    autoComplete="off"
                    onChange={Changedetected}
                    value={ShippingDeetails.postalcode}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                  <i class="fas fa-flag"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="country"
                    aria-label="country"
                    aria-describedby="basic-addon1"
                    name="country"
                    autoComplete="off"
                    onChange={Changedetected}
                    value={ShippingDeetails.country}
                  />
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
                    onClick={ShippingHandler}
                    value="continue"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* for image            */}
          <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3">
            <div className="signupi  row blog colcomp">
              <img src={shipping} className="img-fluid img" alt="Signup" />
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

export default Shipping;
