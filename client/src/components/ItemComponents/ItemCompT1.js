import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
const ItemCompT1 = ({ img, itemname, price, id }) => {
  return (
    <>
      <div className="newcontainer col-5 col-md-1 col-lg-1">
        <Link to={{ pathname: `/gettheitem/${id}` }} className="Link">
          <div className="newimgcontainer">
            <img src={img} alt="item-img" className="img-fluid" />
          </div>
          <div className="newtextcontainer text-center">
            {itemname}
            <br />
            <p>Rs. {price}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ItemCompT1;
