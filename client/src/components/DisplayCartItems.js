import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
const CartItemsDisplay = () => {
  const [Cartitems, setcartitems] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const cartitems = async () => {
      try {
        const res = await fetch("/getcartitems", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });
        const data = await res.json();
        setcartitems(data);

        
      } catch (e) {
        console.log(e);
      }
    };
    cartitems();
  }, []);
  return (
    <>
      {Cartitems.map((ele) => {
        return (
          <>
            <CartItem
              itemname={ele.itemname}
              price={ele.price}
              discountprice={ele.discountprice}
              img={ele.img}
              qty={ele.qty}
              id={ele._id}
              key={ele._id}
            />
          </>
        );
      })}
    </>
  );
};

export default CartItemsDisplay;
