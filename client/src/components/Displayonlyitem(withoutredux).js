import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ErrMessg from "./ErrMessDisplay";
import Loadingcomp from "./Loadingcomp";
import comfood from "../Images/comfood.jpg";

const Onlyitem = (props) => {
  const [loading,setloading]=useState(true);
  const [ErrMessg,setErrMessg]=useState(false);

  
  const [item, setitem] = useState({
    itemname: "",
    price: "",
    discountprice: "",
    description: "",
    qty:"",
    img:"",
    id:"",
  });

  const AddtoCart=async()=>{
    try {
      
       const {itemname,price,discountprice,img,id,qty}=item;
        //Sending this destructred data to path register by converting to json
  const response = await fetch(`/addtocart/${props.match.params.id}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
              itemname,price,discountprice,img,id,qty
          }),
        });
        const data = await response.json();
     
        alert("Item Added to cart!")
    } catch (e) {
    
        setloading(false)
        setErrMessg(e);
    }
}

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
          qty:data.stock,
          img:data.img,
          id:data._id
        });
        setloading(false);
      } catch (e) {
        
        setloading(false)
        setErrMessg(e);
      }
    };

    settheitem();
    scroller();
  }, []);
  return (
   

    
<>
{   loading?<Loadingcomp></Loadingcomp>:
 ErrMessg?<ErrMessg>{ErrMessg}</ErrMessg>:
   
    <>
     <div className="container userg">
        <h3 className="text text-center userdis" data-aos="zoom-in">
          The item you wish to see!
        </h3>
      </div>
      <div className="container gallery mt-5 ">
        <hr className="w-50 mx-auto" />
        <div className="row  mx-auto d-flex justify-content-center mt-2 mb-2">
          <div className="col-md-8 col-lg-8 col-12 ">
            {/* Blog  number - 1 */}

            <div className="container row blog ms-1" data-aos="fade-up">
              <div className=" imgcontsp row blog colcomp" data-aos="fade-down">
                <img
                  src={item.img}
                  alt="selected blog"
                  className="img-fluid  col-12 col-md-12 col-lg-12 "
                />
              </div>
              <h2 className="text-center">{item.itemname}</h2>
              <h4 className="text-center">₹{item.price}</h4>
              <h4 className="text-center">₹{item.discountprice}</h4>
              <p><strong>Description: </strong>{item.description}</p>
              <div className="writer">
                <strong>Stock:</strong>
                <h4>
                  <strong>{item.qty}</strong>
                </h4>
              </div>
              <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link to="/" className="Link">
                Home
                </Link>
              </button>
              <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3">
                <Link to={{ pathname: `/placeorder/${item.id}` }} className="Link">
                 Place Order
                </Link>
              </button>
              <button className="readmore calbtn  mb-2 imgbtn col-4 col-lg-3 col-md-3" onClick={()=>AddtoCart()}>
                {/* <Link onClick={AddtoCart()} className="Link"> */}
                 Add to cart
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    
    </>}
     
    </>
 
  );
};

export default Onlyitem;
