const mongoose= require("mongoose");
const jwt=require("jsonwebtoken");

const UserOrders=new mongoose.Schema({
    name:{
        type:String,
         required:true,

    },
    phone:{
        type:String,
        required:true,
    },
 
  
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    itemname:{
        type:String,
         required:true,

    },
    price:{
        type:Number,
        required:true,
    },
    discountprice:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    img:{
        type:String,
        required:true
    },
    id:{
        type:String,
         required:true,

    },
  
});

const Order= new mongoose.model("Order",UserOrders);

module.exports=Order;