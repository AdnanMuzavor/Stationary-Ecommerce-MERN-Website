import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="bg-dark text-secondary px-4 py-5 text-center">
        <div className="py-5">
          <h1 className="display-6 fw-bold text-white">
            EveryStudent's Stop
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="fs-5 mb-4">
              Sationary is need for complete student so here is an efficient ecommerce website for only students to purchase their daily needs at high discounts
              <br></br>
              Website designed by: Adnan Shah Muzavor.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="calbtn btn-md px-4 me-sm-3 fw-bold"
              >
                <Link className="Link" to="/">
                  Home
                </Link>
              </button>
              <button
                type="button"
                className="calbtn btn-md px-4"
                onClick={() => ToTop()}
              >
                Take me to the top!
              </button>
            </div>
          </div>
        </div>
        <div className="simple d-flex justify-content-center align-items-center">
          <p>
            <font>
              <font>© 2019--2021 Company, Inc. </font>
              <font>· </font>
            </font>
            <a href="https://www.websitepolicies.com/blog/terms-conditions-vs-privacy-policy">
              <font>
                <font>Privacy</font>
              </font>
            </a>
            <font>
              <font> · </font>
            </font>
            <a href="https://www.websitepolicies.com/blog/terms-conditions-vs-privacy-policy">
              <font>
                <font>Terms</font>
              </font>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
