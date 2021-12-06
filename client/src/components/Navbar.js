import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { NavLink,useHistory } from "react-router-dom";
import { Signout } from "../actions/UserActions";

const Navbar = () => {
  const history=useHistory();
  //To get user details on signing in to show user name on navbar
  const UserDetails = useSelector((state) => state.UserDetails);
  const { UserInfo } = UserDetails;

  //To get cart details on signing in to show cart items number on navbar
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  //Importing dispatch
  const dispatch = useDispatch();
  const SignoutHandler = () => {
    dispatch(Signout());
    history.push("/signin")
  };
  const RenderMenu = () => {
    return (
      <>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to="/">
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/cart/:id?">
            Cart
            {cartItems.length !== 0 ? (
              cartItems[0].price && cartItems.length > 0 ? (
                <span className="badge">{cartItems.length}</span>
              ) : (
                <span className="badge">{cartItems.length - 1}</span>
              )
            ) : null}
          </NavLink>
        </li>
        {UserInfo ? null : (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                Signin
              </NavLink>
            </li>
          </>
        )}

        {UserInfo?UserInfo.name ? (
          <>
         
            <li className="nav-item">
              <NavLink className="nav-link" to="/userorders">
                Orders(U)
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                {UserInfo.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#" onClick={SignoutHandler}>
                Signout
              </NavLink>
            </li>
          </>
        ) : (
          <>
         
            <li className="nav-item">
              <NavLink className="nav-link" to="/signin">
                Signin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
          </>
        ):null}
        {UserInfo ? (
          UserInfo.isadmin === true ? (
            <>
              {" "}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/additem">
                      Add Item
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/updateitems">
                      Edit Items
                    </NavLink>
                  </li>
                </ul>
              </li>
            </>
          ) : null
        ) : null}
      </>
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <NavLink className="navbar-brand navtitle" to="#" id="navtitle">
            YourStationaryStop
          </NavLink>
          <i className="fa fa-shopping-bag fa-2x" aria-hidden="true"></i>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
