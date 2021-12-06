import React, { useEffect } from "react";

import Topivgive from "./TopicComp";
import Loadingcomp from "./Loadingcomp";
import ErrMessg from "./ErrMessDisplay";

import Userdisplay from "./ItemsDisplay";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import {PRODUCT_DELETED_DATA} from "../constants/Productconstants";
import {useHistory} from "react-router";

const UpdateItems = () => {
const history=useHistory();

  const dispatch = useDispatch();
  //Getting products from redux
  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products } = productlist;

  //To get user details on signing in to show user name on navbar
  const UserDetails = useSelector((state) => state.UserDetails);
  const { UserInfo } = UserDetails;

//Getting Deleted Product if any
const DeletedProduct=useSelector((state)=>state.DeletedProduct);
const {loading:delprodloading,error:delproderror,deleted}=DeletedProduct;


  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ToTop();
   
    if(!UserInfo){
      history.push("/signin")
    }
    else{
      if(UserInfo.isadmin){
        dispatch(listProducts());
        dispatch({type:PRODUCT_DELETED_DATA})
      }
      else{
        history.push("/error")
      }
    }
  }, [UserInfo]);
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
              title="Hello admin, here are the items"
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
                    adminaccess={"Yes"}
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

export default UpdateItems;
