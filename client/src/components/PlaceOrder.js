import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Topivgive from "./TopicComp";
import OrderItemDisplay from "./DisplayOrderItem";
const PlaceOrder = (props) => {
  //   Creating state to store all form details
  const [user, setuser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  //To state to  detials of item which user want to order
  const [item, setitem] = useState({
    itemname: "",
    price: "",
    discountprice: "",
    description: "",
    stock: "",
    img: "",
    id: "",
  });

  //Creating a state variable to get the user data
  const [userdata, setuserdata] = useState({});

  //Chnage detecting function to set the state
  const Changedetected = (e) => {
    const { name, value } = e.target;
    setuser((prevuser) => {
      return { ...prevuser, [name]: value };
    });
  };

  // const [postss,setpostss]=useState([]);

  //Using hsotory to push user to login incase anything goes wrong
  const history = useHistory();
  const scroller = () => {
    window.scrollTo(500, 100);
  };

  useEffect(() => {
    const settheitem = async () => {
      try {
        const res = await fetch(`/getonlyitem/${props.match.params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // console.log(`databeta:${data}`);
        setitem({
          ...item,
          itemname: data.itemname,
          price: data.price,
          discountprice: data.discountprice,
          description: data.description,
          stock: data.stock,
          img: data.img,
          id: data._id,
        });
      } catch (e) {
        console.log(e);
      }
    };

    const callorderpage = async () => {
      try {
        //Requesting fro about page

        const res = await fetch("/placeorder", {
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
        setuserdata(data);
      } catch (e) {
       
        history.push("/login");
      }
    };

    callorderpage();
    settheitem();
    scroller();
  }, []);

  const Postdata = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = userdata;
    const { itemname, img, price, discountprice, id } = item;
    try {
      //Sending this destructred data to path register by converting to json
      const response = await fetch("/placetheorder", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          img,
          itemname,
          price,
          discountprice,
          id,
        }),
      });
      const data = await response.json();

      //Register path returns a particulat status so using it to alert incase ant issue/error
      if (response.status === 422 || !data) {
        window.alert("Invalid Order details");
      } else {
        window.alert("Order Placed");
        // console.log(" Registration done");
        history.push("/userorders");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Topivgive a1="zoom-in" a2="fade-right" title="Billing Counter" />

      <div className="container">
        <div className="row ">
          <div className="col-12 col-lg-6 col-md-6">
            <div className="container">
              <h3 className="text-center mb-4">User details</h3>
              <div className="formpart row d-flex justify-content-center">
                <form method="POST" className="col-12 col-md-10 col-lg-10">
                  <div className="signup input-group mb-3  ">
                    <label htmlfor="text" className="me-4 bk">
                      Name:
                    </label>

                    <span className="input-group-text" id="basic-addon1">
                      <i className="icon fa fa-user" aria-hidden="true"></i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="text"
                      className="form-control inputs"
                      placeholder="Your name"
                      aria-label="Your name"
                      aria-describedby="basic-addon1"
                      name="name"
                      autoComplete="off"
                      onChange={Changedetected}
                      value={userdata.name}
                    />
                  </div>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-4 bk">
                      Email:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i className="icon fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="email"
                      className="form-control inputs"
                      placeholder="Your email"
                      aria-label="Your email"
                      aria-describedby="basic-addon1"
                      name="email"
                      autoComplete="off"
                      onChange={Changedetected}
                      value={userdata.email}
                    />
                  </div>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-3 bk">
                      Ph no.:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i className="icon fa fa-phone" aria-hidden="true"></i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="number"
                      className="form-control inputs"
                      placeholder="Mobile Number"
                      aria-label="Mobile Number"
                      aria-describedby="basic-addon1"
                      name="phone"
                      autoComplete="off"
                      onChange={Changedetected}
                      value={userdata.phone}
                    />
                  </div>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-4 bk">
                      Adds:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i class="icon fa fa-home" aria-hidden="true"></i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="text"
                      className="form-control inputs"
                      placeholder="Your address"
                      aria-label="Your work"
                      aria-describedby="basic-addon1"
                      name="address"
                      autoComplete="off"
                      onChange={Changedetected}
                      value={userdata.address}
                    />
                  </div>

                  <h3 className="text-center mb-4">Item Details</h3>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-2 bk ">
                      ItemNme:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i
                        class="icon fa fa-shopping-cart"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="text"
                      className="form-control inputs"
                      placeholder="Item Name"
                      aria-label="Item Name"
                      aria-describedby="basic-addon1"
                      name="address"
                      autoComplete="off"
                      readOnly="readonly"
                      value={item.itemname}
                    />
                  </div>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-3 bk">
                      Ori.Price:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i class="icon" aria-hidden="true">
                        ₹
                      </i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="text"
                      className="form-control inputs"
                      placeholder="Original Price"
                      aria-label="Original Price"
                      aria-describedby="basic-addon1"
                      name="address"
                      autoComplete="off"
                      readOnly="readonly"
                      value={item.price}
                    />
                  </div>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-3 bk">
                      Dis.Price:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i class="icon" aria-hidden="true">
                        ₹
                      </i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="text"
                      className="form-control inputs"
                      placeholder="Discount Price"
                      aria-label="Discount Price"
                      aria-describedby="basic-addon1"
                      name="address"
                      autoComplete="off"
                      readOnly="readonly"
                      value={item.discountprice}
                    />
                  </div>
                  <div className="signup input-group mb-3 ">
                    <label htmlfor="text" className="me-4 bk">
                      Item-Id:
                    </label>
                    <span className="input-group-text" id="basic-addon1">
                      <i class="icon fa fa-id-badge" aria-hidden="true"></i>
                    </span>
                    <input
                      // readOnly="readonly"
                      type="text"
                      className="form-control inputs"
                      placeholder="Item Id"
                      aria-label="Item Id"
                      aria-describedby="basic-addon1"
                      name="id"
                      autoComplete="off"
                      readOnly="readonly"
                      value={item.id}
                    />
                  </div>

                  <div className="signup input-group mb-3 ">
                    <input
                      // readOnly="readonly"
                      type="submit"
                      className="form-control inputs"
                      placeholder="Place Order"
                      value="Place Order"
                      aria-label="register"
                      aria-describedby="basic-addon1"
                      name="name"
                      autoComplete="off"
                      onClick={Postdata}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 col-md-6">
            {/* <div className="row"> */}

            <OrderItemDisplay
              itemname={item.itemname}
              price={item.price}
              discountprice={item.discountprice}
              description={item.description}
              img={item.img}
              stock={item.stock}
              key={item._id}
              id={item._id}
            />
            {/* </div> */}
          </div>
        </div>
      </div>

      {userdata.name}
    </>
  );
};

export default PlaceOrder;
