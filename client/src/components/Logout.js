import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { usercontext } from "../App";

const Logout = () => {
  //Destructuring conetxt imported
  const { state, dispatch } = useContext(usercontext);

  const hsitory = useHistory();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      cridentials: "include",
    })
      .then((res) => {
        dispatch({ type: "User", payload: false });
        alert("User logged out, if want to access about or write page,Please log in.")
        hsitory.push("/login");

        if (res.status !== 200) {
          throw new Error("Logout not done");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <>
      <h1>Logout page here</h1>
    </>
  );
};
export default Logout;
