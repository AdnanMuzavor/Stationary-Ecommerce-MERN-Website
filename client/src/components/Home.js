import React, { useEffect, useState } from "react";

import Topivgive from "./TopicComp";
import Loadingcomp from "./Loadingcomp";
import ErrMessg from "./ErrMessDisplay";

import Userdisplay from "./ItemsDisplay";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import ItemCompT1 from "./ItemComponents/ItemCompT1";
import ItemCompT2 from "./ItemComponents/ItemCompT2";
import Header1 from "./Header/Header1";
import CategoryCard from "./ItemComponents/CategoryCard";

const Home = () => {
  const dispatch = useDispatch();
  //Getting products from redux
  const productlist = useSelector((state) => state.productlist);
  const { loading, error, products } = productlist;
  const [category, setvategory] = useState([
    {
      key: Math.floor(Math.random() * Math.random() + 10000),
      img: "https://n4.sdlcdn.com/imgs/g/1/8/HP-Black-Laptop-Bags-SDL547155957-3-bf0f1.jpeg",
      title: "Bags",
    },
    {
      key: Math.floor(Math.random() * Math.random() + 10000),
      img: "https://tse4.mm.bing.net/th?id=OIP.8B1lltiUXsxNTWk9BN7q5AHaE8&pid=Api&P=0&w=230&h=154",
      title: "Pens",
    },
    {
      key: Math.floor(Math.random() * Math.random() + 10000),
      img: "https://i.pinimg.com/originals/fd/40/7a/fd407a592e1c4b3ec860b585f5ca4254.jpg",
      title: "Pauches",
    },
  ]);

 
  const ToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    ToTop();
    dispatch(listProducts());
  }, []);
  return loading?<Loadingcomp/>:error?<ErrMessg/>:(
    <>

      {/*Category Cards*/}
      <section className="row category_wrap">
        {category.map((e) => {
          return (
            <CategoryCard
              img={e.img}
              title={e.title}
              key={Math.floor(Math.random() * 100 + Math.random())}
            />
          );
        })}
      </section>

      {/*Display Type - 01*/}
      <div className="newtopcontainer row mt-2">
        {products.map((e) => {
          return (
            <ItemCompT1
              img={e.img}
              itemname={e.itemname}
              price={e.price}
              id={e._id}
              key={e._id}
            />
          );
        })}
      </div>

      {/*Display Type - 02*/}
      <div className="main_cont row">
        <Header1 heading="The One Stop" />
        {/*Display Type - 2.1*/}
        <div className="cont col-md-5 col-lg-5 col-12">
          <Header1 heading="10% OFF" />

          <div className="right_cont row">
            {products.map((e) => {
              return (
                <ItemCompT2
                  img={e.img}
                  itemname={e.itemname}
                  price={e.price}
                  id={e._id}
                  key={e._id}
                />
              );
            })}
          </div>
        </div>
        {/*Display Type - 2.2*/}
        <div className=" cont  col-md-6 col-lg-6 col-12">
          <Header1 heading="20% OFF" />
          <div className="newtopcontainer row rcont">
            {products.map((e) => {
              return (
                <ItemCompT1
                  img={e.img}
                  itemname={e.itemname}
                  price={e.price}
                  id={e._id}
                  key={e._id}
                />
              );
            })}
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Home;
