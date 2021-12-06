const mongoose = require("mongoose");

const Itemshema = new mongoose.Schema({
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

  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: Date.now(),
  },

});

const Item = new mongoose.model("Item", Itemshema);
// userschema.methods.addmessage=async function(name,email,phone,message){
//   try {
// this.messages=this.messages.concat({name,email,phone,message});
// await this.save();
// return this.messages;

//   } catch (e) {
//       console.log(e);
//   }
// }


Itemshema.methods.addreviewitem = async function (userreview, username, useremail, userrating, productid) {
  try {
   
    this.reviewsbyuser = this.reviewsbyuser.concat({ userreview, username, useremail, userrating, productid });
    await this.save();
    console.log("Generating the user review");
    return this.reviewsbyuser;
  } catch (e) {
    console.log(e);
  }
};
module.exports = Item;
