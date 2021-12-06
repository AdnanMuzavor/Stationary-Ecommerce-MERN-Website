import React, { useEffect } from "react";

import Topivgive from "./TopicComp";
import Loadingcomp from "./Loadingcomp";
import ErrMessg from "./ErrMessDisplay";

import Userdisplay from "./ItemsDisplay";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const Home = () => {
  const dispatch = useDispatch();
  //Getting products from redux
  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products } = productlist;

  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ToTop();
    dispatch(listProducts());
  }, []);
  return (
    <>
      {loading ? (
        <Loadingcomp></Loadingcomp>
      ) : error ? (
        <ErrMessg type="notfound" size="minor">
          {error}
        </ErrMessg>
      ) : (
        <>
          <section>
            <Topivgive
              a1="fade-right"
              a2="fade-left"
              title="Top stationary items which every student needs!"
            />
          </section>

          {/* <div className="container nocr"> */}
            <div className="row d-flex justify-content-center">
              {products.map((ele) => {
                return (
                  <Userdisplay
                    itemname={ele.itemname}
                    price={ele.price}
                    discountprice={ele.discountprice}
                    description={ele.description}
                    img={ele.img}
                    stock={ele.stock}
                    key={ele._id}
                    id={ele._id}
                    home="yes"
                  />
                );
              })}
            </div>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default Home;
