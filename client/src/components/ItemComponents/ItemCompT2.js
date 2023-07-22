import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
const ItemCompT2 = ({ img, itemname, price, id }) => {
  return (
    <>
      <Link
        className="right_inner_cont col-12 col-md-5 col-lg-5 Link"
        to={{ pathname: `/gettheitem/${id}` }}
      >
     
        <div className="newimgcontainer">
          <img src={img} alt="item-img" className="img-fluid" />
        </div>
        <div className="newtextcontainer text-center">
          {itemname}
          <br />
          <p>Rs. {price}</p>
        </div>
  
      </Link>
    </>
  );
};

export default ItemCompT2;
