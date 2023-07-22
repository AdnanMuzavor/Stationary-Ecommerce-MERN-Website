import "./App.css";
import React from "react";
import Home from "./components/Home";

import Signup from "./components/Signup";

import Navbar from "./components/Navbar";

import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Error from "./components/Error";
import Logout from "./components/Logout";

import { useReducer } from "react";
import { createContext } from "react";

import Footer from "./components/Footer";
// import Onlyitem from "./components/Displayonlyitem";

import { useState } from "react";
import { useEffect } from "react";
import Cartscreen from "./components/CartitemsScreen";
import PlaceOrder from "./components/PlaceOrder";
import Userorders from "./components/UserAllOrders";
import Updateorderdetails from "./components/UpdateOrderDetails";
import CancelOrder from "./components/CancelOrder";
import OnlyitemRedux from "./components/DisplayOnlyItem(WithRedux)";

import SigninR from "./components/Login(UsingRedux)";
import OrderScreen from "./components/DisplayOrderedItemsScreen";
import PlaceOrderScreen from "./components/PlaceOrderScreen";
import Shipping from "./components/Shipping";

import UserOrderList from "./components/UserOrdersList";
import Payment from "./components/Payment";
import AddItem from "./components/AddItemScreen";
import UpdateItems from "./components/UpdateItemDetails(Admin)";
import EditItemDetails from "./components/EditItemDetails(Admin)";
import DisplaySingleItem from "./components/ItemComponents/DisplaySingleItem";

export const usercontext = createContext();

function App() {
  //Delivery date

  const [posts, setposts] = useState([]);

  const getallblogs = async () => {
    try {
      const res = await fetch("/getblog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(`post data:${data}`);
      setposts(data);
    } catch (e) {
      console.log(e);
    }
  };

  const Routing = () => {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/singleorders">
          <Userorders />
        </Route>
        <Route path="/edititemdetails/:id" render={(props) => <EditItemDetails {...props} />} />
       
        <Route path="/signin" render={(props) => <SigninR {...props} />} />
        <Route
          path="/placeorder"
          render={(props) => <PlaceOrderScreen {...props} />}
        />
        <Route path="/shipping" render={(props) => <Shipping {...props} />} />
        <Route path="/payment" render={(props) => <Payment {...props} />} />
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/additem">
          <AddItem />
        </Route>
        <Route path="/updateitems">
          <UpdateItems />
        </Route>
        <Route
          path="/gettheitem/:id"
          render={(props) => <DisplaySingleItem {...props} />}
        />
        <Route
          path="/cart/:id?"
          render={(props) => <Cartscreen {...props} />}
        />
        <Route
          path="/placeorder/:id"
          render={(props) => <PlaceOrder {...props} />}
        />
        <Route path="/userorders">
          <UserOrderList />
        </Route>
        <Route
          path="/cancelorder/:id"
          render={(props) => <CancelOrder {...props} posts={posts} />}
        />
        <Route
          path="/updateorder/:id"
          render={(props) => <Updateorderdetails {...props} posts={posts} />}
        />
        <Route
          path="/orderscreen/:id"
          render={(props) => <OrderScreen {...props} />}
        />
        {/* <Route
          path="/addtocart/:id"
          render={(props) => <Addtocart {...props} posts={posts} />}
        /> */}
        <Route>
          <Error />
        </Route>
      </Switch>
    );
  };

  return (
    <>
      <Navbar />

      <Routing />
      <Footer />
    </>
  );
}

export default App;
