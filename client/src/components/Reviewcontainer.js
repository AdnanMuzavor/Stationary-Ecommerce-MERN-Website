import React from "react";

const ReviewComp = ({ review, name, userrating, useremail, user }) => {
  return (
    <>
      <div className="container nocr col-10 col-lg-3 col-md-3 mx-auto ms-2 me-2 spec-width d-flex ">
        <span className="name reviewbtn">
          <i class="fa fa-user-circle-o" aria-hidden="true"></i>
          <strong>By: {name}</strong>
      
        </span>
        <div className="rating">
          Rating:{" "}
          <span>
            <i
              className={
                userrating >= 1
                  ? "fa fa-star"
                  : userrating >= 0.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-0"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                userrating >= 2
                  ? "fa fa-star"
                  : userrating >= 1.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-0"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                userrating >= 3
                  ? "fa fa-star"
                  : userrating >= 2.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-0"
              }
            ></i>
          </span>
          <span>
            <i
              className={
                userrating >= 4
                  ? "fa fa-star"
                  : userrating >= 3.5
                  ? "fa fa-star-half-o"
                  : "fa fa-star-0"
              }
            ></i>
          </span>
          <span>
            <i className={userrating >= 4 ? "fa fa-star" : "fa fa-star-0"}></i>
          </span>
        </div>
        <div className="review">
          <span>
            <strong>Review: </strong>
            {review}
          </span>
        </div>
      </div>
    </>
  );
};

export default ReviewComp;
