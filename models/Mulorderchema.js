// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const MulOrders = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
  
//   totalAmount: {
//     type: Number,
//     required: true,
//   },
//   totalItem: {
//     type: Number,
//     required: true,
//   },
// });


// const MulOrder = new mongoose.model("Order", MulOrders);

// MulOrders.methods.additemtocart=async function(itemname,price,discountprice,date,img,id,qty){
//   try {
// this.items=this.items.concat({itemname,price,discountprice,date,img,id,qty});
// await this.save();
// return this.items;
      
//   } catch (e) {
//       console.log(e);
//   }
// }


// module.exports = MulOrder;
