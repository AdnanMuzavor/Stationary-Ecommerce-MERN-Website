import React from "react";
import comfood from "../Images/comfood.jpg";
// import ss from "../uploads/"
import cf from "../Images/cf2.jpg";
// import ss from "uploads/"

import comfood from "../Images/comfood.jpg";



   
//     <>
import { Link } from "react-router-dom";
const Userdisplay = ({ name, title, food, content, ind, id, img, type }) => {
  return (
    <>
      <div
        className="dcont container col-11 col-lg-5 col-md-5 ms-2 me-2 mb-2 mt-2 ms-2 me-2 "
        data-aos="fade-up"
      >
        <div className="row">
          <div className="col-12 ">
            <h2 className="text-center">
              <Link to={{ pathname: `/getblog/${id}` }} className="Link">
                {title}
              </Link>
            </h2>
          </div>
          <div className=" d-flex justify-content-center">
            <div
              className=" imgcontsp row blog colcomp me-2 ms-2"
              data-aos="fade-down"
            >
              <img
                src={ind % 2 === 0 ? cf : comfood}
                alt="food img"
                className="img-fluid userimg"
              />
            </div>
          </div>
          <div className="col-12 mx-auto">
            <h3 className="text-center"> {food}</h3>
          </div>

          <div className="col-12 mx-auto text-center usercont ">{content}</div>
          <div className="col-12 mx-auto mt-2 blogby">
            <h3>By:{name} </h3>
          </div>
          {type !== "displayall" ? (
            <>
              <button className="readmore calbtn mx-auto mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link to={{ pathname: `/updateblog/${id}` }} className="Link">
                  Edit
                </Link>
              </button>
              <button className="readmore calbtn mx-auto mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link to={{ pathname: `/deleteblog/${id}` }} className="Link">
                  Delete
                </Link>
              </button>
            </>
          ) : null}
        
        </div>
      </div>
    </>
  );
};

export default Userdisplay;
