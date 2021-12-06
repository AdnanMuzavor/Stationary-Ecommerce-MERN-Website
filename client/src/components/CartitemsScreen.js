import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveItem } from "../actions/Cartactions";
import Topivgive from "./TopicComp";


const Cartscreen = (props) => {
  const productid = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const deleteitem = (id) => {
    dispatch(RemoveItem(id));
  };

  const checkouthandler = () => {
    if(cartItems.length === 1 && !cartItems[0].name) {
      alert("Cart is empty")
    }
    else{
    props.history.push("/signin?redirect=shipping");
  }};

  useEffect(() => {
    if (productid) {
      dispatch(AddToCart(productid, qty));
    }
  }, [dispatch, productid, qty]);
  return (
    <>
      <Topivgive a1="zoom-out" a2="fade-in" title="Cart Screen"></Topivgive>
      <div className="container nocr">
        <p>
          {(cartItems.length === 1 && !cartItems[0].name) ||
          cartItems.length === 0 ? (
            <Topivgive a1="zoom-in" a2="zoom-out" title="Your cart is Empty!" />
          ) : (
            <>
              <div className="itmcontainer my-3 ">
                {/* <Scrollbars> */}
                <div className="row cartitems my-4 ">
                  {cartItems.map((ele) => {
                    if (ele.name) {
                      return (
                        <>
                          <>
                            <div className="col-6 col-md-12 col-lg-12 my-2 itmcont">
                              <div className="row item d-flex flex-direction-column align-items-center">
                                <div className=" text-center imgcart mx-auto col-10 col-md-4 col-lg-4">
                                  <img
                                    src={ele.image}
                                    alt=""
                                    className="img-fluid "
                                  />
                                </div>
                                <div className=" text-center itemname mx-auto col-10 col-md-3 col-lg-2">
                                  {ele.name}
                                </div>
                                <div className=" text-center price mx-auto col-5 col-md-1 col-lg-1">
                                  Price: ₹{ele.price}
                                </div>
                                <div className=" text-center price mx-auto col-5 col-md-1 col-lg-1">
                                  DPrice: ₹{ele.discntprce}
                                </div>
                                <div className=" text-center  qty mx-auto col-6 col-md-3 col-lg-2">
                                  <div className="d-flex flex-direction-column mx-auto">
                                    <select
                                      value={ele.qty}
                                      onChange={(e) =>
                                        dispatch(
                                          AddToCart(
                                            ele.product,
                                            e.target.value
                                          ),
                                          Number(e.target.value)
                                        )
                                      }
                                    >
                                      {[...Array(ele.stock).keys()].map((x) => {
                                        return (
                                          <option value={x + 1} key={x + 1}>
                                            {x + 1}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>

                                <div className="row text-center my-2 mx-2 d-flex justify-content-center">
                                  <button
                                    className="btn col-10 col-lg-5 col-md-5 mx-2 "
                                    onClick={() => {
                                      deleteitem(ele.product);
                                    }}
                                  >
                                    {" "}
                                    <i
                                      class="fa fa-trash"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
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
            </>
          )}
        </p>
        <div className="container nocr text-center mx-auto">
          <h2>
            Sub-Total:
            {cartItems.reduce(function (accum, c) {
              if (c.qty && c.price) {
                return accum + Number(c.qty);
              } else {
                return accum + 0;
              }
            }, 0)}
          </h2>
          <h2>
            Total-Price: ₹
            {cartItems.reduce(function (accum, c) {
              if (c.qty && c.price) {
                return accum + Number(c.qty) * c.discntprce;
              } else {
                return accum + 0;
              }
            }, 0)}
          </h2>
          {
             !(cartItems.length === 1 && !cartItems[0].name)?  <button className="nav-link mb-2 mx-auto btn" onClick={checkouthandler}>
             Place Order
           </button>:null 
          }
        
        </div>
      </div>
    </>
  );
};

export default Cartscreen;
