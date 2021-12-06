import React from "react";
import { NavLink } from "react-router-dom";
import error from "../Images/error.jpg";

const Error = () => {
  return (
    <>
      <div className="container flex">
        <img src={error} alt="Error" className="img-fluid errimg" />

        <NavLink to="/" className="textin">
 
          <div className="errbtn mt-2 ">Get back to Home Page </div>
        </NavLink>
      </div>
    </>
  );
};

export default Error;
