import React, { useEffect, useState } from "react";
import { AddProduct } from "../actions/productActions";
import { PRODUCT_ADDED_DATA } from "../constants/Productconstants";
import { useSelector, useDispatch } from "react-redux";
import Loadingcomp from "./Loadingcomp";
import ErrMessg from "./ErrMessDisplay";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
const AddItem = () => {
  //getting hostory
  const history = useHistory();

  //Getting updated status from store.js
  const AddProducts = useSelector((state) => state.AddProduct);
  const {
    added,
    loading: productaddloading,
    error: productadderror,
  } = AddProducts;

  //getting dispatch
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);

  //Setting state of things in product details

  const [itemname, setitemname] = useState("");
  const [price, setprice] = useState("");
  const [discountprice, setdiscountprice] = useState("");
  const [description, setdescription] = useState("");
  const [stock, setstock] = useState("");
  const [img, setimg] = useState("");

  //To get user details on signing in to show user name on navbar
  const UserDetails = useSelector((state) => state.UserDetails);
  const { UserInfo } = UserDetails;

  const AddItemHandler = (e) => {
    e.preventDefault();
    if (
      !itemname ||
      !price ||
      !discountprice ||
      !description ||
      !stock ||
      !img
    ) {
      alert("Please fill all the details");
    }
    dispatch(
      AddProduct(itemname, price, discountprice, description, stock, img)
    );
    if (productaddloading === false && !productadderror) {
      if (added) {
        alert("Product added,Thank you!");
        history.push(`/`);
        dispatch({ type: PRODUCT_ADDED_DATA });
      }
    }
  };

  useEffect(() => {
    if (!UserInfo) {
      history.push("/signin");
    } else {
      if (UserInfo.isadmin===true) {
       
        dispatch({ type: PRODUCT_ADDED_DATA });
      } else {
        history.push("/error");
      }
    }
  }, [dispatch, UserInfo]);

  //  return productaddloading ? (
  //    <Loadingcomp></Loadingcomp>
  //  ) : productadderror ? (
  //    <ErrMessg>{productadderror}</ErrMessg>
  //  ) :
  return (
    <>
      <div className="container ">
        <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1 ">
          {/* For form filling */}

          <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
            <div className="header row text-center ">
              <h3 className="signup">Add item details here!</h3>
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
                    placeholder="itemname"
                    aria-label="itemname"
                    aria-describedby="basic-addon1"
                    name="itemname"
                    autoComplete="off"
                    onChange={(e) => setitemname(e.target.value)}
                    value={itemname}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fas fa-home"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control inputs"
                    placeholder="price"
                    aria-label="price"
                    aria-describedby="basic-addon1"
                    name="price"
                    autoComplete="off"
                    onChange={(e) => setprice(e.target.value)}
                    value={price}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="fas fa-city"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control inputs"
                    placeholder="discountprice"
                    aria-label="discountprice"
                    aria-describedby="basic-addon1"
                    name="discountprice"
                    autoComplete="off"
                    onChange={(e) => setdiscountprice(e.target.value)}
                    value={discountprice}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="fas fa-code-branch"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="description"
                    aria-label="description"
                    aria-describedby="basic-addon1"
                    name="description"
                    autoComplete="off"
                    onChange={(e) => setdescription(e.target.value)}
                    value={description}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="fas fa-flag"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control inputs"
                    placeholder="img"
                    aria-label="img"
                    aria-describedby="basic-addon1"
                    name="img"
                    autoComplete="off"
                    onChange={(e) => setimg(e.target.value)}
                    value={img}
                  />
                </div>
                <div className="signup input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i class="fas fa-flag"></i>
                  </span>
                  <input
                    type="number"
                    className="form-control inputs"
                    placeholder="stock"
                    aria-label="stock"
                    aria-describedby="basic-addon1"
                    name="stock"
                    autoComplete="off"
                    onChange={(e) => setstock(e.target.value)}
                    value={stock}
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
                    onClick={AddItemHandler}
                    value="continue"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* for image            */}
          <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3">
            <h3>Preview</h3>
            <div className="row mx-auto ">
              <div className="col-md-8 col-lg-8 col-12 ">
                {/* Blog  number - 1 */}

                <div className="container row blog ms-1" data-aos="fade-up">
                  <div
                    className=" imgcontsp row blog colcomp"
                    data-aos="fade-down"
                  >
                    <img
                      src={img}
                      alt="selected blog"
                      className="img-fluid  col-12 col-md-12 col-lg-12 "
                    />
                  </div>
                  <h2 className="text-center">{itemname}</h2>
                  <h4 className="text-center">₹{price}</h4>
                  <h4 className="text-center">₹{discountprice}</h4>
                  <p>
                    <strong>Description: </strong>
                    {description}
                  </p>
                  <span className="d-flex justify-content-around">
                    <div className="writer">
                      <strong>Stock:</strong>
                      <h4>
                        <strong>{stock}</strong>
                      </h4>
                    </div>
                    <div className="qty">
                      Status:{" "}
                      {stock > 0 ? (
                        <span className="avail">In stock</span>
                      ) : (
                        <span className="notavail">Unavailable</span>
                      )}
                    </div>
                    <div>
                      <span className="ms-2 me-2"> qty:</span>

                      <select
                        value={qty}
                        onChange={(e) => setqty(e.target.value)}
                      >
                        {[...Array(stock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </span>
                  <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3">
                    <Link to="/" className="Link">
                      Home
                    </Link>
                  </button>
                  <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3">
                    <Link
                      // to={{ pathname: `/placeorder/${id}` }}
                      className="Link"
                    >
                      Place Order
                    </Link>
                  </button>
                  <button
                    className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3"
                    // onClick={() => AddtoCart(productid, qty)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            {/* <div className=" imgcontsp row blog colcomp">
             <img src={shipping} className="img-fluid img" alt="Signup" />
           </div>

           <div className="input-group mb-3 text-center mx-auto row mt-3">
             <Link to="/login" className="Link text-center">
               Already registered? Click here to login
             </Link>
           </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddItem;
