import React from "react";
import {useDispatch} from "react-redux";
// import ss from "../uploads/"

// import ss from "uploads/"
import { Link } from "react-router-dom";
import {DeleteProduct} from "../actions/productActions";
import { useHistory } from "react-router";
const Userdisplay = ({
  itemname,
  price,
  discountprice,
  description,
  img,
  stock,
  id,
  adminaccess,
  home,
  type
}) => {
  const history=useHistory();
  const dispatch=useDispatch();
  const DeleteItemHandler=()=>{
   
    dispatch(DeleteProduct(id));
    alert("item deleted!")
    history.push("/")
  }
  return (
    <>
      {/* <div
        className="dcont container col-10 col-lg-3 col-md-3 ms-1 me-1 mb-2 mt-2 ms-4 me-4 "
        data-aos="fade-up"
      >
        <div className="row">
          <div className="col-12 ">
            <h5 className="text-center">
              <Link to={{ pathname: `/gettheitem/${id}` }} className="Link">
                {itemname}
              </Link>
            </h5>
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
            <h5 className="text-center">Original Price : ₹{price} </h5>
            <h5 className="text-center">Discount Price : ₹{discountprice} </h5>
          </div>

          <div className="col-12 mx-auto text-center usercont ">
            <strong>DESCRIPTION: </strong>
            {home==="yes"?description.substring(1,50)+"....":description}
          </div>
          <div className="col-12 mx-auto mt-2 blogby">
            <h6>Stock:{stock} </h6>
          </div>

          {adminaccess === "Yes" ? (
            <>
              <button className="readmore calbtn mx-auto mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link to={{ pathname: `/edititemdetails/${id}` }} className="Link">
                  Edit Details
                </Link>
              </button>
              <button className="readmore calbtn mx-auto mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link onClick={DeleteItemHandler} className="Link">
                  Delete Item
                </Link>
              </button>
            </>
          ) : null}
        </div>
      </div> */}
    </>
  );
};

export default Userdisplay;
