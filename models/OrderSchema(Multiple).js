const mongoose = require("mongoose");

const MulOrderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        discntprce: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          red: "Item",
          required: true,
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalcode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    paymentResultNP: {
      transdate: Date,
      amount: Number,
      paymentid: Number,
      email_address: String,
    },
    itemsprice: { type: Number, required: true },
    taxprice: { type: Number, required: true },
    shippingprice: { type: Number, required: true },
    totalprice: { type: Number, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      red: "User",
      required: true,
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const MultipleOrder = new mongoose.model("MultipleOrder", MulOrderSchema);

module.exports = MultipleOrder;
