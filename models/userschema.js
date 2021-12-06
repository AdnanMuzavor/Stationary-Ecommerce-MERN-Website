const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  items: [
    {
      itemname: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      discountprice: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      img: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  reviewsbyuser: [
    {
      userreview: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      useremail: {
        type: String,
        required: true,
      },
      userrating: {
        type: Number,
        required: true,
      },
      productid: {
        type: String,
        required: true,
      },
      date: {
        type:Date,
        default: Date.now(),
       
      },
    },
  ],
});


//Find the user by Id and this comment will be added to item and registered in user
userschema.methods.addreviewuser = async function (userreview, username, useremail, userrating, productid) {
  try {
   
    this.reviewsbyuser = this.reviewsbyuser.concat({ userreview, username, useremail, userrating, productid });
    await this.save();
    console.log("Generating the user review");
    return this.reviewsbyuser;
  } catch (e) {
    console.log(e);
  }
};

//Middleware to hash the PASSWORD

const bcryptjs = require("bcryptjs");

userschema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcryptjs.hash(this.password, 12);
      this.cpassword = await bcryptjs.hash(this.cpassword, 12);
    }
    next();
  } catch (e) {
    console.log(e);
  }
});

//Middleware to generate TOKEN

const jwt = require("jsonwebtoken");
userschema.methods.generatetoken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("Generating the token");
    return token;
  } catch (e) {
    console.log(e);
  }
};
userschema.methods.generatetokenRedux = async function () {
  try {
    const token = await jwt.sign(
      {
        _id: this._id,
        name: this.name,
        email: this.email,
        isadmin: this.isadmin,
      },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    console.log("Generating the token");
    return token;
  } catch (e) {
    console.log(e);
  }
};
//Middle ware to add items to cart
userschema.methods.additemtocart = async function (
 { itemname,
  price,
  discountprice,
  img,
  id,
  qty}
) {
  try {
    this.items = this.items.concat({
      itemname,
      price,
      discountprice,
      img,
      id,
      qty,
    });
    await this.save();
    return this.items;
  } catch (e) {
    console.log(e);
  }
};

const User = new mongoose.model("User", userschema);

module.exports = User;
