const express = require("express");
const app = express();
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Requiring authenticate function
const Authenticate = require("../Authentication/Authenticate");

//Requiring database models

require("../db/conn");
const User = require("../models/userschema");
const Order = require("../models/Ordershema(Individual)");
// const mulorder=require("../models/Mulorderchema");
const Item = require("../models/Itemshema");
const UserReview = require("../models/UserReviewsSchema");
const MultipleOrder = require("../models/OrderSchema(Multiple)");

//API to place order
router.post("/placemulorder", Authenticate, async (req, res) => {
  try {
    if (req.body.cartItems.length === 0) {
      return res.status(400).send({ message: "Cart is Empty" });
    } else {
      
      const OrderList = new MultipleOrder({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsprice: req.body.itemsprice,
        shippingprice: req.body.shippingprice,
        taxprice: req.body.taxprice,
        totalprice: req.body.totalprice,
        user: req.Userid,
      });
      const NewOrderList = await OrderList.save();
      
      return res
        .status(201)
        .send({ message: "New Order Created", order: NewOrderList });
    }
  } catch (e) {
    console.log(`error is ${e}`);
  }
});

//Get specific order by id(When user wants to view it singly)
router.get("/getorderplaced/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const particularorder = await MultipleOrder.findById({ _id });
    if (particularorder) {
      res.status(200).send(particularorder);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

//Payment via Paypal handler
router.put("/:id/paypal", Authenticate, async (req, res) => {
  try {
    const _id = req.params.id;
    const findorder = await MultipleOrder.findById({ _id });
    if (findorder) {
      findorder.isPaid = true;
      findorder.paidAt = Date.now();
      findorder.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updateorder = await findorder.save();
      res.send({ message: "Order Paid", order: updateorder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (e) {
    console.log(e);
  }
});

//Get specific order by id and update it's payment status
router.put("/payment/:id", async (req, res) => {
 
  try {
    const _id = req.params.id;
    const orderdetails = await MultipleOrder.findById({ _id });
    const updateparticulardata = await MultipleOrder.findByIdAndUpdate(
      { _id },
      {
        isPaid: true,
        paidAt: req.body.paidAt,
        paymentResultNP: {
          transdate: req.body.transdate,
          amount: orderdetails.totalprice,
          paymentid: req.body.cardno,
          email_address: req.body.email,
        },
      }
    );
    
    res.status(200).send(updateparticulardata);
  } catch (err) {
    res.status(404).send(err);
  }
});

//API to get order list from backendpart
//An API to return all the orders by particular user
router.get("/orderlist", Authenticate, async (req, res) => {
  
  try {
    const orders = await MultipleOrder.find({ user: req.Userid });
   
    if (orders) {
      res.send(orders);
    } else {
      res.send({ message: "Not found" });
    }
  } catch (err) {
    res.status(404).send(err);
  }
});

//API TO POST COMMENT and update user and item review array
router.post("/postreview/:id", Authenticate, async (req, res) => {
  try {
    //to get user by id,where id is from authenticate
    
    const finduser = await User.findOne({ _id: req.Userid });
    
    //getting body data
    const { userreview, username, useremail, userrating, productid } = req.body;
  
    if (finduser) {
      const postreview = new UserReview(req.body);
      const reviewposted = await postreview.save();
     

      const updateduserdata = finduser.addreviewuser(
        userreview,
        username,
        useremail,
        userrating,
        productid
      );

  

      return res.status(200).send({ message: "review posted" });
    }
  } catch (e) {
  
    return res.status(404).send(e);
  }
});

//API to get all the reviews
router.get("/getreviews", async (req, res) => {
  try {
    const AllReviews = await UserReview.find();
    res.status(201).send(AllReviews);
  } catch (err) {
    res.status(404).send(err);
  }
});

//An api for sending client cridentials for payment
router.get("/paypal", (req, res) => {
  
  res.send(process.env.PAYMENT_CLIENT_ID || "sp");
});

//Get cart items
router.get("/getcartitems", Authenticate, (req, res) => {
 
  res.send(req.cartitems);
});

//Add to cart
router.post("/addtocart/:id", Authenticate, async (req, res) => {
  try {
    //req.body will have all our data
    //Getting this data by destructuring
    const { itemname, price, discountprice, img, id, qty } = req.body;
    

    if (!itemname || !price || !discountprice || !img || !id || !qty) {
      //   return res.status(402).json({Error:"Al fields not filled"});
      throw new Error("All fields not filled");
    }

    //Authenticate function have variable name req.userId which can use here to find user in database
    const userfound = await User.findOne({ _id: req.Userid });
 
    if (userfound) {
      //Passing this argumentb to async awaut function which bwill store them i9n mesagesw array
      const additem = await userfound.additemtocart(
        itemname,
        price,
        discountprice,
        img,
        id,
        qty
      );

      //Since userdata is updated saving it
      await userfound.save();

      

      res.status(201).json({ message: "User Message Is Sent" });
    }
  } catch (e) {
    console.log(e);
  }
});

// To get all the Items from database
router.get("/items", async (req, res) => {
  try {
    const AllItems = await Item.find();
    res.status(201).send(AllItems);
  } catch (err) {
    res.status(404).send(err);
  }
});

// //To add a new selling item to database
router.post("/additem", async (req, res) => {
  try {
    const addtheitem = new Item(req.body);
    const finalised = await addtheitem.save();
    res.status(201).send(finalised);
  } catch (err) {
    res.status(404).send(err);
  }
});
// //To delete a selling item to database
router.delete("/deleteitem/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const findanddelete = await Item.findByIdAndDelete({_id:_id});
   
    res.status(201).send(findanddelete);
  } catch (err) {
    res.status(404).send(err);
  }
});
// //To update item details from database

router.put("/updateitemdata/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateparticulardata = await Item.findByIdAndUpdate(
      { _id },
      req.body,
      { new: true }
    );
    res.status(200).send(updateparticulardata);
  } catch (err) {
    res.status(404).send(err);
  }
});
//Get specific a item by id(When user wants to view it singly)
router.get("/getonlyitem/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const particularItem = await Item.findById({ _id });
    res.status(200).send(particularItem);
  } catch (err) {
    res.status(404).send(err);
  }
});

// To Get Specific order with help of id and delete it from database
router.delete("/cancelorder/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedorder = await Order.findByIdAndDelete({ _id });
    res.status(200).send(deletedorder);
  } catch (err) {
    console.log(err);
  }
});

//A route to be called when placeorder page is requested
//It's job is to authenticate the user
router.get("/placeorder", Authenticate, (req, res) => {

  res.send(req.getuser);
});

//A route to be called when orders/cart page is requested
//It's job is to authenticate the user and thn only display things ordered by user
router.get("/userorderlist", Authenticate, (req, res) => {
  
  res.send(req.getuser);
});

//To get all order items
//It'll fetch all orders of user from databse
router.get("/orderitems", async (req, res) => {
  try {
    const OrderItems = await Order.find();
    res.status(201).send(OrderItems);
  } catch (err) {
    res.status(404).send(err);
  }
});

//PLaces user order for selected item
router.post("/placetheorder", async (req, res) => {
  const ouruser = req.body;

  //Destructuring componenets got from req.body
  const {
    name,
    email,
    phone,
    address,
    img,
    itemname,
    price,
    discountprice,
    id,
  } = req.body;

  //Checking if any of the field is missing
  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !itemname ||
    !price ||
    !discountprice ||
    !id ||
    !img
  ) {
    return res.status(422).json({ Error: "Enter all the fields" });
  }

  //Dealing with getting data and saving into database part
  try {
    const userexist = await User.findOne({ email: email });

    if (userexist) {
      // return res.status(422).json({ Error: "User exists." });

      const neworder = new Order(req.body);
      const orderplaced = await neworder.save();
      res.status(200).send(orderplaced);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//Updating order details like user address, phone number or name
router.put("/updateorder/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateparticulardata = await Order.findByIdAndUpdate(
      { _id },
      req.body,
      { new: true }
    );
    res.status(200).send(updateparticulardata);
  } catch (err) {
    res.status(404).send(err);
  }
});

//To get the specific ordered item from database
router.get("/orderitem/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const OrderItems = await Order.findById({ _id });
    res.status(201).send(OrderItems);
  } catch (err) {
    res.status(404).send(err);
  }
});

//For user signup and <authentication
//Saving userdata in database after registration
router.post("/register", async (req, res) => {
  const ouruser = req.body;
  // res.send(ouruser);

  //Destructuring componenets got from req.body
  const { name, email, phone, address, password, cpassword } = req.body;

  //Checking if any of the field is missing
  if (!name || !email || !phone || !address || !password || !cpassword) {
    return res.status(422).json({ Error: "Enter all the fields" });
  }

  //Dealing with getting data and saving into database part
  try {
    const userexist = await User.findOne({ email: email });

    if (userexist) {
      return res.status(422).json({ Error: "User exists." });
    } else if (password !== cpassword) {
      return res
        .status(422)
        .json({ Error: "Password is not matching with confirm password" });
    } else {
      const newuser = new User(req.body);

      //Some middleware to hash password is running here

      const usercreated = await newuser.save();
      if (usercreated) {
        return res.json({ Message: "User is registered now." });
      }
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

//Code for user login and authentication only after fetching and checking from database

router.post("/login", async (req, res) => {
  try {
    // res.send(ouruser);

    //Destructuring componenets got from req.body
    const { email, password } = req.body;

    //Checking if any of the field is missing
    if (!email || !password) {
     
      return res.status(400).json({ Error: "Enter all the fields properly." });
    }

    //Dealing with getting data and saving into database part

    const userexist = await User.findOne({ email: email });
    

    if (userexist) {
      //Comapring password with hasged password in database
      const verify = await bcryptjs.compare(password, userexist.password);

      //Generating a token when user logs in
      const token = await userexist.generatetoken();

    
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        //  httponly:true
      });

      if (verify) {
        

        return res.json({ Message: "User logged in" });
      } else {
        

        return res.status(400).json({ Message: "Inproper cridentials" });
      }
    } else {
      return res.status(401).json({ Message: "invalid Cridentials" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
//A BETTER Code for user login and authentication only after fetching and checking from database

router.post("/signin", async (req, res) => {
  try {
    // res.send(ouruser);

    //Destructuring componenets got from req.body
    const { email, password } = req.body;

    //Checking if any of the field is missing
    if (!email || !password) {
     
      return res.status(400).json({ Error: "Enter all the fields properly." });
    }

    //Dealing with getting data and saving into database part

    const userexist = await User.findOne({ email: email });
    

    if (userexist) {
      //Comapring password with hasged password in database
      const verify = await bcryptjs.compare(password, userexist.password);

      //Generating a token when user logs in
      const token = await userexist.generatetokenRedux();

      if (verify) {
     
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          //  httponly:true
        });
       
        const data = {
          _id: userexist._id,
          name: userexist.name,
          isadmin: userexist.isadmin,
          email: userexist.email,
        };

        return res.send(data);
      } else {
        

        return res.status(400).json({ Message: "Inproper cridentials" });
      }
    } else {
      return res.status(401).json({ Message: "invalid Cridentials" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/logout", async (req, res) => {
  //Deleteb cookie and redirect user to home page
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("User logout");
});

module.exports = router;
