import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { usercontext } from "../App";
import Loadingcomp from "./Loadingcomp";
import { useDispatch, useSelector } from "react-redux";
import siginin from "../Images/signin.jpg";
import { Signin } from "../actions/UserActions";
import Shipping from "./Shipping";
const SigninR = (props) => {
  //Destructuring conetxt imported

  //If this page is called by someother page thn getting page to which user should be redirected from here
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/register";

  //Getting userDetails to check if signin or not
  const UserDetails = useSelector((state) => state.UserDetails);
  const { loading, error, UserInfo } = UserDetails;

  //Defining variable history whose "push" variable will be used to direct us to home
  const history = useHistory();

  //Defining state for email and password separately so that change function can be defined on spot
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //getting dispatch functionality
  const dispatch = useDispatch();

  //Defining a function to send datab to route "/login"

  const Logindata = async (e) => {
    e.preventDefault();
    dispatch(Signin(email, password));
    


      
    if(error){
      alert("Invalid Cridentials!")
    }

  };
  useEffect(() => {
    if (UserInfo) {
      if (
        UserInfo.Message !== "invalid Cridentials" &&
        redirect !== "shipping"
      ) {
        if (UserInfo.email === email) {
          alert("User Sign In");
          history.push("/");
        }
      } else if (
        UserInfo.Message !== "invalid Cridentials" &&
        redirect === "shipping"
      ) {
        props.history.push(redirect === "shipping" ? "/shipping" : "/");
      } else {
        alert("Invalid Cridentials!");
      }
    }
  }, [UserInfo]);
  return (
    <>
      {loading ? (
        <Loadingcomp></Loadingcomp>
      ) : (
        <>
          <div className="container ">
            <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1  ">
              {/* for image            */}
              <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3 ">
                <div className="  row blog colcomp">
                  <img alt="Login" src={siginin} className="img-fluid inimg" />
                </div>
              </div>

              {/* For form filling */}

              <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
                <div className="header row text-center">
                  <h3>Sign in</h3>
                  <hr className="mx-auto w-50 sp" />
                  {error ? <h1>{error}</h1> : null}
                </div>

                <div className="formpart row d-flex justify-content-center">
                  <form className="row" method="POST">
                    <div className="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i
                          className="icon fa fa-envelope"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <input
                        className="inputs"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        class="form-control"
                        autoComplete="off"
                        placeholder="Your email"
                        aria-label="Your email"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span class="input-group-text" id="basic-addon1">
                        <i className="icon fa fa-key" aria-hidden="true"></i>
                      </span>
                      <input
                        className="inputs"
                        type="password"
                        name="password"
                        value={password}
                        autoComplete="off"
                        onChange={(e) => setpassword(e.target.value)}
                        class="form-control"
                        placeholder="password"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div className="input-group mb-3">
                      <input
                        className="inputs"
                        type="submit"
                        value="Sign in"
                        onClick={Logindata}
                        class="form-control"
                        placeholder="register"
                        aria-label="register"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="input-group mb-3 text-center mx-auto row">
                      <Link to="/signup" className="Link text-center">
                        Not registered? Click here
                      </Link>
                    </div>

                    <div class="input-group mb-1 text-center mx-auto row">
                      <Link to="/logout" className="Link text-center">
                        Want to logout? Click here
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SigninR;
