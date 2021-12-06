import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrMessg from "./ErrMessDisplay";
import Loadingcomp from "./Loadingcomp";
import reviewimg from "../Images/reviewimg.jpg";
import { useDispatch, useSelector } from "react-redux";
import ReviewComp from "./Reviewcontainer";
import {
  DetailsProduct,
  reviewByUser,
  ReviewsProduct,
} from "../actions/productActions";
const OnlyitemRedux = (props) => {
  const dispatch = useDispatch();
  const [qty, setqty] = useState(1);
  const productid = props.match.params.id;

  //To fetch this product details
  const productdetails = useSelector((state) => state.productdetails);
  const {
    product,
    loading: productloading,
    error: producterror,
  } = productdetails;

  //TO fetch all reviews
  const AllReviews = useSelector((state) => state.AllReviews);
  const { reviews, error: reviewerror, loading: reviewloading } = AllReviews;
  //to fetch user detaila to pre fill some in fo for review
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, error, UserInfo } = UserDetails;

  //states to set data
  const [username, setusername] = useState(UserInfo ? UserInfo.name : "");
  const [useremail, setuseremail] = useState(UserInfo ? UserInfo.email : "");
  const [userreview, setuserreview] = useState("");
  const [userrating, setuserrating] = useState("");
  const postReview = (e) => {
    e.preventDefault();
    dispatch(
      reviewByUser({ userreview, username, useremail, userrating, productid })
    );
    if (userreview === "" || userrating === "") {
      alert("Fill All The Data!");
      return;
    }

    alert("review posted");
    setuserrating("");
    setuserreview("");
    setTimeout(() => {
      dispatch(ReviewsProduct());
    }, 3000);
  };

  const AddtoCart = (productid, qty) => {
    props.history.push(`/cart/${productid}?qty=${qty}`);
  };

  const scroller = () => {
    window.scrollTo(500, 100);
  };

  useEffect(() => {
    dispatch(DetailsProduct(productid));
    dispatch(ReviewsProduct());
    scroller();
  }, []);
  return (
    <>
      {productloading ? (
        <Loadingcomp></Loadingcomp>
      ) : producterror ? (
        <ErrMessg>{error}</ErrMessg>
      ) : (
        <>
          <div className="container userg">
            <h3 className="text text-center userdis" data-aos="zoom-in">
              The item you wish to see!
            </h3>
          </div>
          <div className="container gallery mt-5 ">
            <hr className="w-50 mx-auto" />
            <div className="row  mx-auto d-flex justify-content-center mt-2 mb-2">
              <div className="col-md-8 col-lg-8 col-12 ">
                {/* Blog  number - 1 */}

                <div className="container row blog ms-1" data-aos="fade-up">
                  <div
                    className=" imgcontsp row blog colcomp"
                    data-aos="fade-down"
                  >
                    <img
                      src={product.img}
                      alt="selected blog"
                      className="img-fluid  col-12 col-md-12 col-lg-12 "
                    />
                  </div>
                  <h2 className="text-center">{product.itemname}</h2>
                  <h4 className="text-center">₹{product.price}</h4>
                  <h4 className="text-center">₹{product.discountprice}</h4>
                  <p>
                    <strong>Description: </strong>
                    {product.description}
                  </p>
                  <span className="d-flex justify-content-around">
                    <div className="writer">
                      <strong>Stock:</strong>
                      <h4>
                        <strong>{product.stock}</strong>
                      </h4>
                    </div>
                    <div className="qty">
                      Status:{" "}
                      {product.stock > 0 ? (
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
                        {[...Array(product.stock).keys()].map((x) => (
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

                  <button
                    className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3"
                    onClick={() => AddtoCart(productid, qty)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* for image            */}

          {/* For form filling */}
          {UserInfo ? (
            <>
              {" "}
              <div className="container ">
                <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1  ">
                  <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3 ">
                    <div className=" imgcontsp row blog colcomp">
                      <img
                        alt="Login"
                        src={reviewimg}
                        className="img-fluid inimg"
                      />
                    </div>
                  </div>
                  <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
                    <div className="header row text-center">
                      <h3>Review this product</h3>
                      <hr className="mx-auto w-50 sp" />
                      {error ? <h1>{error}</h1> : null}
                    </div>

                    <div className="formpart row d-flex justify-content-center">
                      <form className="row" method="POST">
                        <div className="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">
                            <i
                              className="icon fa fa-envelope"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            className="inputs"
                            type="text"
                            name="text"
                            value={userreview}
                            onChange={(e) => setuserreview(e.target.value)}
                            class="form-control"
                            autoComplete="off"
                            placeholder="Your review"
                            aria-label="Your review"
                            aria-describedby="basic-addon1"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <span class="input-group-text" id="basic-addon1">
                            <i
                              className="icon fa fa-key"
                              aria-hidden="true"
                            ></i>
                          </span>
                          <input
                            className="inputs"
                            type="number"
                            name="userrating"
                            value={userrating}
                            autoComplete="off"
                            onChange={(e) => setuserrating(e.target.value)}
                            class="form-control"
                            placeholder="user rating"
                            aria-label="password"
                            aria-describedby="basic-addon1"
                          />
                        </div>

                        <div className="input-group mb-3">
                          <input
                            className="inputs"
                            type="submit"
                            value="Post this review"
                            onClick={postReview}
                            class="form-control"
                            placeholder="register"
                            aria-label="register"
                            aria-describedby="basic-addon1"
                          />
                        </div>
                      </form>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="container nocr text-center">
                <h3>
                  <Link to={{ pathname: "/signin" }}>Sign-in</Link> To write the
                  review!
                </h3>
              </div>
            </>
          )}
          {UserInfo ? (
            <div className="container nocr">
              <h3 className="text-center">Customer Reviews</h3>
              <div className="row reviewpart mt-2">
                {reviewloading ? (
                  <Loadingcomp></Loadingcomp>
                ) : reviewerror ? (
                  <ErrMessg>{reviewerror}</ErrMessg>
                ) : (
                  reviews
                    .filter((ele) => {
                      return ele.productid === productid;
                    })
                    .map((ele) => {
                      return (
                        <>
                          <ReviewComp
                            name={ele.username}
                            review={ele.userreview}
                            userrating={ele.userrating}
                            useremail={ele.useremail}
                            user={UserInfo.email}
                          />
                        </>
                      );
                    })
                  // }).length===0?<h3 className="text-center">No Reviews,Be the first on e to write the review!</h3>:null
                )}
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
};

export default OnlyitemRedux;
