import React from "react";

// import ss from "../uploads/"

// import ss from "uploads/"
import { Link } from "react-router-dom";
const OrderItemDisplay = ({
  itemname,
  price,
  discountprice,
  description,
  img,
  stock,
  id,
}) => {
  return (
    <>
      <div
        className="dcont container col-10 col-lg-10 col-md-10 ms-2 me-2 mb-2 mt-2 ms-2 me-2 "
        data-aos="fade-up"
      >
        <div className="row">
          <div className="col-12 ">
            <h2 className="text-center">
              <Link to={{ pathname: `/gettheitem/${id}` }} className="Link">
                {itemname}
              </Link>
            </h2>
          </div>
          <div className=" d-flex justify-content-center">
            <div
              className=" imgcontsp row blog colcomp me-2 ms-2"
              data-aos="fade-down"
            >
              <img src={img} alt="food img" className="img-fluid userimg" />
            </div>
          </div>
          <div className="col-12 mx-auto">
            <h3 className="text-center"> ₹{price} </h3>
            <h3 className="text-center"> ₹{discountprice} </h3>
          </div>

          <div className="col-12 mx-auto text-center usercont ">
            <strong>DESCRIPTION:</strong>
            {description}
          </div>
          <div className="col-12 mx-auto mt-2 blogby">
            <h3>Stock:{stock} </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItemDisplay;
