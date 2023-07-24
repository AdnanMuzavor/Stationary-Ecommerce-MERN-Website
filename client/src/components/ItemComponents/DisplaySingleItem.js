import React, { useState } from "react";
import styles from "../../components/ItemComponents/components.module.css";
import { useDispatch, useSelector } from "react-redux";
import coin from "../../Data/sticker/coin.png";
import CarouselComp from "../CommonComponents/Carousel";
import { useEffect } from "react";
import Loadingcomp from "../Loadingcomp";
import ErrMessg from "../ErrMessDisplay";
import { Link } from "react-router-dom/cjs/react-router-dom";
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DetailsProduct,
  reviewByUser,
  ReviewsProduct,
} from "../../actions/productActions";

// import the icons you need
import {
  faHeart,
  faShoppingCart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReviewComp from "../Reviewcontainer";

const DisplaySingleItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

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

  //Only current product reviews
  const [productreviews, setproductreviews] = useState([]);
  const [reviewsloading, setreviewsloading] = useState(false);

  //Specs to be displayed as highlights [COMMON]
  const [highlights, sethighlights] = useState([
    "Good quality | Easy to carry | harmless",
    "Suitable for all ages",
    "Preffered by students | loved by parents",
    "Can be used upto 3 years",
    "Recyclable | Green Product",
  ]);

  //Seller policies displayed [common]
  const [sellerpolicies, setsellerpolicies] = useState([
    "7 Days Replacement Policy",
    "GST invoice available",
  ]);

  //To handle wishlist sticker
  const [wished, setwished] = useState(false);

  //To display graphs
  const [ratings, setratings] = useState([]);
  const [ratingsload, setratingsload] = useState(false);

  //Generate and append ratings to a product randomly
  const RatingFinder = () => {
    setratings([]);
    for (var rating = 1; rating <= 10; rating += 2) {
      setratings((prev) => [
        ...prev,
        { rating: rating, percentage: Math.floor(Math.random() * 100 + 10) },
      ]);
    }

    setratingsload(false);
    console.log(ratings);
  };

  const [qty, setqty] = useState(1);
  const [productid, setproductid] = useState(props.match.params.id);

  const AddtoCart = (productid, qty) => {
    history.push(`/cart/${productid}?qty=${qty}`);
  };

  useEffect(() => {
    setratingsload(true);
    setproductid(props.match.params.id);
    dispatch(DetailsProduct(productid));
    dispatch(ReviewsProduct());
    setreviewsloading(true);
    setTimeout(() => {
      console.log("Executing: getting orduct reviws");
      setproductreviews(
        reviews.filter((e) => {
          return e.productid !== productid;
        })
      );

      setreviewsloading(false);
      console.log("Executing: getting orduct reviws Done");
      setTimeout(() => {
        console.log("printing");
        console.log(productreviews);
      }, 1500);


    }, 1000);
    setTimeout(() => {
      RatingFinder();
    }, 2000);
    //console.log(reviews)
  }, []);

  //Review Handling [User Input For Review]

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
    setproductreviews((prev) => [
      ...prev,
      {
        userreview: userreview,
        username: username,
        useremail: useremail,
        userrating: userrating,
        productid: productid,
      },
    ]);
    console.log("UPDATED"+productreviews)
    //alert("review posted");
    setuserrating("");
    setuserreview("");
    // setTimeout(() => {
    //   dispatch(ReviewsProduct());
    // }, 1000);
  };

  return (
    <>
      {productloading ? (
        <Loadingcomp></Loadingcomp>
      ) : producterror ? (
        <ErrMessg>{}</ErrMessg>
      ) : (
        <div className={`${styles.container} mt-3`}>
          <div className="row">
            {/*img accumulation part */}
            <div
              className={`col-md-4 col-lg-4 col-12 ${styles.imght} ${styles.shadowbox}`}
            >
              <span
                className={styles.wishlist}
                onClick={() => {
                  setwished(!wished);
                }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ fontSize: 20, color: wished ? "red" : "gray" }}
                />
              </span>
              <CarouselComp
                img1={product.img}
                img2={product.img}
                img3={product.img}
                img4={product.img}
                ht={800}
              />
              {/*Stock Summary Part*/}
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

                  <select value={qty} onChange={(e) => setqty(e.target.value)}>
                    {[...Array(product.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </span>
              {/*Add to card and related buttons */}
              <div className={`${styles.buttonsarea}`}>
                <div className={`row d-flex justify-content-center`}>
                  <button
                    className={`col-md-5 col-lg-5 col-4  ${styles.btnimg}`}
                    onClick={() => {
                      AddtoCart(productid, qty);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      style={{ fontSize: 20, color: "#fff" }}
                    />
                    ADD TO CART
                  </button>
                  <button
                    className={`col-md-5 col-lg-5 col-4 ${styles.btnimg}`}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
            {/*Content part*/}
            <div className={`col-md-7 col-lg-7 col-12`}>
              <p>{product.itemname}</p>
              <div>
                <span className={styles.ratinglabel}> 4</span>

                {reviewsloading == false ? (
                  productreviews.length ? (
                    <>
                      {" "}
                      <span className={styles.ratings}>
                        Ratings and Reviews
                      </span>
                    </>
                  ) : null
                ) : null}
              </div>
              <div>
                <span className={styles.rate}>₹{product.price}</span>
                <span className={styles.discountrate}>
                  ₹{product.price + Math.floor(product.price * 0.6)}
                </span>
                <span>6% off</span>
              </div>
              {/*Highlights mentioned by seller*/}
              <div className={`row ${styles.flexer}`}>
                <div className="col-md-1 col-lg-1 col-2">Highlights</div>
                <div className={`col-md-4 col-lg-4 col-9 ${styles.flexer}`}>
                  <ul>
                    {highlights.map((e) => {
                      return (
                        <>
                          <li
                            key={Math.random() * 100000}
                            className={styles.list}
                          >
                            {e}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/*Seller details*/}
              <div className={`row ${styles.flexer}`}>
                <div className="col-md-1 col-lg-1 col-2">Seller</div>
                <div className={`col-md-4 col-lg-4 col-9 ${styles.flexer}`}>
                  <ul>
                    <div className={styles.seller}>
                      TradePLFIPLecom{" "}
                      <span className={styles.sellerrating}>4.8</span>
                    </div>
                    {sellerpolicies.map((e) => {
                      return (
                        <>
                          <li
                            key={Math.random() * 100000}
                            className={styles.list}
                          >
                            {e}
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {/*Assurance sticker */}
              <div className={`${styles.sticker}`}>
                {/*img component */}

                <img
                  src={coin}
                  width={100}
                  height={50}
                  className={`img-fluid `}
                />
              </div>

              {/*Review part*/}
              <div className={`${styles.shadowbox} mt-2`}>
                <div className={`${styles.aligner}  `}>
                  <h2>Ratings {"&"} Reviews</h2>
                  <button
                    className={`${styles.filterstyle} ${styles.shadowbox} ${styles.ratebtn} text-center`}
                  >
                    Product Performance
                  </button>
                </div>
                <div className={` row ${styles.aligrating}`}>
                  {/*Review counter */}
                  <div className="col-md-3 col-lg-3 col-5">
                    <h3 className="text-center">
                      4.4{" "}
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{
                          fontSize: 20,
                          color: "black",
                          marginBottom: "3px",
                        }}
                      />
                    </h3>
                    <h6 className={`${styles.lightwt} text-center`}>
                      {reviewloading == false ? productreviews.length : 0}{" "}
                      Ratings
                    </h6>
                    <h6 className={`${styles.lightwt} text-center`}>{"&"}</h6>
                    <h6 className={`${styles.lightwt} text-center`}>reviews</h6>
                  </div>
                  {/*Review graph */}
                  <div className="col-md-3 col-lg-3 col-6">
                    {ratingsload == false &&
                      ratings.map((e) => {
                        return (
                          <div
                            key={Math.random() * 10000}
                            className={`${styles.graphalign}`}
                          >
                            <div className={`${styles.graphcontent}`}>
                              {e.rating}{" "}
                              <FontAwesomeIcon
                                icon={faStar}
                                style={{
                                  fontSize: 10,
                                  color: "black",
                                  marginBottom: "3px",
                                  marginLeft: "2px",
                                  margin: "3px",
                                }}
                              />{" "}
                            </div>
                            <div className={`${styles.graph}`}>
                              <div
                                style={{
                                  width: e.percentage + "%",
                                  backgroundColor:
                                    e.percentage >= 80
                                      ? "#26a541"
                                      : e.percentage >= 60
                                      ? "#26a541"
                                      : e.percentage >= 30
                                      ? "#ff9f00"
                                      : "#ff6161",
                                }}
                                className={`${styles.filler}`}
                              >
                                #
                              </div>
                            </div>
                            <div className="count"></div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* For form filling */}

          <div className="row d-flex justify-content-center">
            {UserInfo ? (
              <div
                className={`${styles.shadowbox} ${styles.comment_cont2} ${styles.review_container} col-md-7 col-lg-7 col-10`}
              >
                <h3 className="text-center">Customer Reviews</h3>
                <div className="row reviewpart mt-2">
                  {reviewloading ? (
                    <Loadingcomp></Loadingcomp>
                  ) : reviewerror ? (
                    <ErrMessg>{reviewerror}</ErrMessg>
                  ) : (
                    productreviews
                      .map((ele) => {
                        return (
                          <>
                            <ReviewComp
                              key={ele._id}
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
            <div
              className={`  ${styles.shadowbox} ${styles.comment_cont} col-md-4 col-lg-4 col-10`}
            >
              {UserInfo ? (
                <>
                  {" "}
                  <div
                    className={`${styles.shadowbox} row mx-auto mb-4 alligncenter mt-4 me-1 ms-1   ${styles.comment_cont} `}
                  >
                    <div className=" col-12 col-md-12 col-lg-12 col ">
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
                </>
              ) : (
                <>
                  <div className="container nocr text-center">
                    <h3>
                      <Link to={{ pathname: "/signin" }}>Sign-in</Link> To write
                      the review!
                    </h3>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};

export default DisplaySingleItem;
