import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import OrderedItem from "./CartItemdisplay";
import Topivgive from "./TopicComp";
import Loadingcomp from "./Loadingcomp";

const Userorders = () => {
  const [loading, setloading] = useState(true);
  const [ErrorMessg, setErrMessg] = useState(false);
  //Creating a state variable to get the user data
  const [useremail, setuseremail] = useState("");
  const [orderitems, setorderitems] = useState([]);
  const history = useHistory();
  useState(() => {
    const callorderlistpage = async () => {
      try {
        //Requesting fro about page
        //To see if user authenticated or not
        const res = await fetch("/userorderlist", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          cridentials: "include",
        });
        const data = await res.json();

        if (!res.status === 200) {
          throw new Error("User not found");
        }
        // setuserdata(data);
        // console.log(data.email);
        setuseremail(data.email);
      } catch (e) {
       
        history.push("/login");
      }
    };
    const getallitems = async () => {
      try {
        const res = await fetch("/orderitems", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
      
        setorderitems(data);

        setloading(false);
      } catch (e) {
        

        setErrMessg(e);
      }
    };
    getallitems();

    callorderlistpage();
  }, []);
  return (
    <>
      {loading ? (
        <Loadingcomp></Loadingcomp>
      ) : (
        <>
          <Topivgive
            a1="fade-left"
            a2="zoom-out"
            title="Here are all your orders!"
          />
          <div className="container">
            <div className="row d-flex justify-content-center">
              {orderitems
                .filter((ele) => {
                  return ele.email === useremail;
                })
                .map((itm) => {
                  return (
                    <OrderedItem
                      address={itm.address}
                      itemname={itm.itemname}
                      price={itm.price}
                      discountprice={itm.discountprice}
                      id={itm.id}
                      img={itm.img}
                      mainid={itm._id}
                      key={itm._id}
                    />
                  );
                })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Userorders;
