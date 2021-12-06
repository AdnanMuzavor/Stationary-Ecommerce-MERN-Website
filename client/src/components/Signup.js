import React, { useEffect, user, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import register from "../Images/register.jpg";
import Loadingcomp from "./Loadingcomp";

const Signup = () => {
  const [loading, setloading] = useState(true);
  const [ErrorMessg, setErrMessg] = useState(false);
  //Creating state to get user data typed in the form
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cpassword: "",
  });

  //As we are using history.push function,we should import hoistory
  const history = useHistory();

  //Additional thing to modufy the name to displaywith register button
  let val = "";
  let onlyname = user.name.split(" ");
  val =
    user.name === ""
      ? "Hey user,get registered."
      : `Hey ${onlyname[0]},get regsitered`;

  //Chnage detecting function to set the state
  const Changedetected = (e) => {
    const { name, value } = e.target;
    setuser((prevuser) => {
      return { ...prevuser, [name]: value };
    });
  };

  //Function tgo send data to path register which deal swith post function

  const Postdata = async (e) => {
    e.preventDefault();
    const { name, email, phone, address, password, cpassword } = user;
    try {
      //Sending this destructred data to path register by converting to json
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          password,
          cpassword,
        }),
      });
      const data = await response.json();

      //Register path returns a particulat status so using it to alert incase ant issue/error
      if (response.status === 422 || !data) {
        window.alert("Invalid registration");

        // console.log("Invalid registration");
      } else {
        window.alert(" Registration done");
        // console.log(" Registration done");

        //If registration done opening login/signin page directly
        history.push("/signin");
      }
    } catch (e) {
   
      setErrMessg(e);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Loadingcomp></Loadingcomp>
      ) : (
        <>
          <div className="container ">
            <div className="row mx-auto mb-4 alligncenter mt-4 me-1 ms-1 ">
              {/* For form filling */}

              <div className="inner-cont col-12 col-md-6 col-lg-6 col ">
                <div className="header row text-center ">
                  <h3 className="signup"> Sign up</h3>
                  <hr className="mx-auto w-50" />
                </div>

                <div className="formpart row d-flex justify-content-center">
                  <form method="POST" className="row">
                    <div className="signup input-group mb-3 ">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="icon fa fa-user" aria-hidden="true"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control inputs"
                        placeholder="Your name"
                        aria-label="Your name"
                        aria-describedby="basic-addon1"
                        name="name"
                        autoComplete="off"
                        onChange={Changedetected}
                        value={user.name}
                      />
                    </div>
                    <div className="signup input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i
                          className="icon fa fa-envelope"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <input
                        type="email"
                        className="form-control inputs"
                        placeholder="Your email"
                        aria-label="Your email"
                        aria-describedby="basic-addon1"
                        name="email"
                        autoComplete="off"
                        onChange={Changedetected}
                        value={user.email}
                      />
                    </div>
                    <div className="signup input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="icon fa fa-phone" aria-hidden="true"></i>
                      </span>
                      <input
                        type="number"
                        className="form-control inputs"
                        placeholder="Mobile Number"
                        aria-label="Mobile Number"
                        aria-describedby="basic-addon1"
                        name="phone"
                        autoComplete="off"
                        onChange={Changedetected}
                        value={user.phone}
                      />
                    </div>
                    <div className="signup input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i
                          className="icon fa fa-briefcase"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <input
                        type="text"
                        className="form-control inputs"
                        placeholder="Your address"
                        aria-label="Your work"
                        aria-describedby="basic-addon1"
                        name="address"
                        autoComplete="off"
                        onChange={Changedetected}
                        value={user.address}
                      />
                    </div>
                    <div className="signup input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="icon fa fa-key" aria-hidden="true"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control inputs"
                        placeholder="password"
                        aria-label="password"
                        aria-describedby="basic-addon1"
                        name="password"
                        autoComplete="off"
                        onChange={Changedetected}
                        value={user.password}
                      />
                    </div>
                    <div className="signup input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="icon fa fa-lock" aria-hidden="true"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control inputs"
                        placeholder="confirm password"
                        aria-label="confirm password"
                        aria-describedby="basic-addon1"
                        name="cpassword"
                        autoComplete="off"
                        onChange={Changedetected}
                        value={user.cpassword}
                      />
                    </div>
                    <div className="signup input-group mb-3">
                      <input
                        type="submit"
                        className="form-control inputs"
                        placeholder="register"
                        aria-label="register"
                        aria-describedby="basic-addon1"
                        name="name"
                        autoComplete="off"
                        onClick={Postdata}
                        value={val}
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* for image            */}
              <div className="inner-cont  col-10 col-md-6 col-lg-6 col mt-3 mb-3">
                <div className="signupi row blog colcomp">
                  <img src={register} className="img-fluid img" alt="Signup" />
                </div>

                <div className="input-group mb-3 text-center mx-auto row mt-3">
                  <Link to="/login" className="Link text-center">
                    Already registered? Click here to login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Signup;
