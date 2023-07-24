import React from "react";
import { Link } from "react-router-dom";

const OrderedItem = ({
  img,
  address,
  itemname,
  price,
  discountprice,
  id,
  mainid,
}) => {
  return (
    <>
      <div
        className="dcont container col-8 col-lg-5 col-md-5 ms-2 me-2 mb-2 mt-2 ms-2 me-2 "
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
            <h3 className="text-center">Orig.Price: ₹{price} </h3>
            <h3 className="text-center">Disct.Price: ₹{discountprice} </h3>
          </div>

          <div className="col-12 mx-auto text-center usercont ">
            <strong>To be delivered at: </strong>
            {address}
          </div>

          <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3 mx-auto">
            <Link to={{ pathname: `/updateorder/${mainid}` }} className="Link">
              Update Details
            </Link>
          </button>
          <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3 mx-auto">
            <Link to={{ pathname: `/cancelorder/${mainid}` }} className="Link">
              Cancel Order
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderedItem;
