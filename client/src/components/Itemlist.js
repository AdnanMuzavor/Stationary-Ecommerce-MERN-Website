// import React, {useEffect, useState} from 'react';

// const [Cartitems,setcartitems]=useState([]); 
// useEffect(()=>{
//   const cartitems=async()=>{
//       try {
//           const res=await fetch("/getcartitems",{
//               method:"GET",
//               headers:{
//                   "Content-type":"application/json"
//               }
//           })
//           const data=await res.json();
//           setcartitems(data[0]);
//           console.log(data[0])
//       } catch (e) {
//           console.log(e);
//       }
//   }
//   cartitems();
// },[]);
// export default Cartitems;
// const Items=[
//     {
//        id:1,
//        name:"Galaxy a51",
//        price:25000,
//        img:"./Images/itm1.jpg",
//        qty:1,

//     },
//     {
//         id:2,
//         name:"Iphone 12",
//         price:50000,
//         img:"./Images/itm2.jpg",
//         qty:1,
//     },
//     {
//         id:3,
//         name:"Honor 9N",
//         price:20000,
//         img:"./Images/itm4.jpg",
//         qty:1,
//     },
//     {
//         id:4,
//         name:"Galaxy a51",
//         price:25000,
//         img:"./Images/itm1.jpg",
//         qty:1,
//      },
//      {
//          id:5,
//          name:"Iphone 12",
//          price:50000,
//          img:"./Images/itm2.jpg",
//          qty:1,
//      },
//      {
//          id:6,
//          name:"Honor 9N",
//          price:20000,
//          img:"./Images/itm4.jpg",
//          qty:1,
//      },
//      {
//         id:7,
//         name:"Galaxy a51",
//         price:25000,
//         img:"./Images/itm1.jpg",
//         qty:1,
//      },
//      {
//          id:8,
//          name:"Iphone 12",
//          price:50000,
//          img:"./Images/itm2.jpg",
//          qty:1,
//      },
//      {
//          id:9,
//          name:"Honor 9N",
//          price:20000,
//          img:"./Images/itm4.jpg",
//          qty:1,
//      },
// ];

// export default Items;