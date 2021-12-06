const mongoose = require("mongoose");

const UserReviewSchema = new mongoose.Schema({
    
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
          type: Date,
          default: Date.now(),
        },
});

const UserReview=new mongoose.model('UserReview',UserReviewSchema);

module.exports=UserReview;