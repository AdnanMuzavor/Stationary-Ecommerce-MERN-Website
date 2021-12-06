import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const Updateorderdetails=(props)=>{
    const history=useHistory();
    const [userdata, setuserdata] = useState({
        name: "",
        email: "",
        phone:"",
        address:"",
        id:"",
        orderid:""
      });

      const Userdatachanged = (event) => {
       
        event.preventDefault();
    
        //Getting the attributes of input tag in which change occur
        const { name, value } = event.target;
       
        //Making corresponding changes in state as well
        setuserdata({ ...userdata, [name]: value });
      };

      const updateorder = async () => {
        const { name, email,phone,address } = userdata;
        const res = await fetch(`/updateorder/${userdata.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address
          }),
        });
        const data = await res.json();
        if (!data) {
          console.log("Message not sent");
        } else {
          alert("Content Edited,Thank you!");
    
          // console.log(userdata);
    
         
    
          history.push("/");
        }
      };

    useEffect(() => {
        const getorderdetails=async()=>{
          try {
            const res=await fetch(`/orderitem/${props.match.params.id}`,{
             method:"GET",
             headers:{
             
               "Content-Type":"application/json",
             },
          
           })
        
           
            const data=await res.json();
           
           setuserdata({...userdata,name:data.name,phone:data.phone,email:data.email,address:data.address,id:data._id,orderid:data.id})
          } catch (e) {
            console.log(e)
          }
        }
    
         getorderdetails();
       }, []);
    return(
        <>
<div className="container ">
        <div className="text text-center">
          <h1>Edit your content here</h1>
        </div>

        <div className="row mt-4 ">
          <div className="col-12 col-md-12 col-lg-12">
            <form className="row " method="POST">
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label htmlFor="text">Name:</label>
                <input
                  type="text"
                  placeholder="Blog By:"
                  className="item ms-2 "
                  name="name"
                  value={userdata.name}
                  onChange={Userdatachanged}
                />
              </div>
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label htmlFor="text">Blogid:</label>
                <input
                  type="text"
                  placeholder="id"
                  className="item ms-2 "
                  name="id"
                  readOnly="readonly"
                  value={userdata.id}
                />
              </div>
              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label htmlFor="text">phone:</label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="item ms-2"
                  value={userdata.phone}
                  name="phone"
                  onChange={Userdatachanged}
                />
              </div>

              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="item ms-2"
                  value={userdata.email}
                  name="email"
                  readOnly="readonly"
                />
              </div>

              <div
                className="col-12 col-md-4 col-lg-4 
   d-flex justify-content-center sep"
              >
                <label htmlFor="text">Addrs:</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="item ms-2"
                  name="address"
                  value={userdata.address}
                  onChange={Userdatachanged}
                />
              </div>
            </form>
          </div>
        </div>


          <div className="mx-auto col-10 col-md-6 col-lg-6 cont ">
            <div className="input-group  mt-2 ">
              {/* <form method="POST"> */}
              <input
                className="inputs mx-auto form-control"
                type="submit"
                onClick={updateorder}
                placeholder="register"
                aria-label="register"
                aria-describedby="basic-addon1"
              />
              {/* </form> */}
            </div>
          </div>
        </div>
      
        </>
    )
}

export default Updateorderdetails;