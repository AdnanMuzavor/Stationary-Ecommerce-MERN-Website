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
  // const productlist = useSelector((state) => state.productlist);
  // const { loading, error, products } = productlist;
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

  const [pd, setpd] = useState([
    {
      stock: 3,
      _id: "612b76774d2f7a1b4c95ebc4",
      itemname: "Amzing Pauches",
      price: 900,
      discountprice: 300,
      description:
        "A set of aesthetic pouches to amaze you and enhance your pauches collection.",
      img: "https://i.pinimg.com/originals/fd/40/7a/fd407a592e1c4b3ec860b585f5ca4254.jpg",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b76f74d2f7a1b4c95ebc6",
      itemname: "Super Drifterrrr",
      price: 300,
      discountprice: 150,
      description:
        "A pen as fast as a drifting car to drift and upskill your experience in writing, giving you a better experience and smooth look to your hand writing.",
      img: "https://tse4.mm.bing.net/th?id=OIP.8B1lltiUXsxNTWk9BN7q5AHaE8&pid=Api&P=0&w=230&h=154",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b77834d2f7a1b4c95ebc8",
      itemname: "Smart Student Back",
      price: 900,
      discountprice: 500,
      description:
        "The complete student back with all student tools and student things. It's a all in one super combo back offering quality and quantity as this cost.",
      img: "https://howtogetorganizedathome.com/wp-content/uploads/2016/04/26-Stationery-Products-That-You-Will-Love-1-1024x536.jpg",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b79b14d2f7a1b4c95ebd1",
      itemname: "Blue Pen Group",
      price: 180,
      discountprice: 120,
      description:
        "A group of blue pens offering you smooth, sharped and easy to refill pens, enhancing your writing and drawing skills giving a new shape and view to your kids and their hand writing and giving good experience.",
      img: "https://cdn.shopify.com/s/files/1/1251/0543/products/5881a17e7b9e2_1200x1200.jpg?v=1590045255",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b79fe4d2f7a1b4c95ebd3",
      itemname: "Make it Easy Pens",
      price: 180,
      discountprice: 120,
      description:
        "A group of blue pens making all tasks easier and offering you smooth, sharped and easy to refill pens, enhancing your writing and drawing skills giving a new shape and view to your kids and their hand writing and giving good experience.",
      img: "https://n2.sdlcdn.com/imgs/b/d/o/Signature-Auro-Ball-Pens-Pack-SDL687439111-1-6bda2.jpg",
      __v: 0,
    },
    {
      stock: 6,
      _id: "614b07844b49f3407cabd09b",
      itemname: "New BagRTQ",
      price: 1000,
      discountprice: 600,
      description:
        "It's a g degf eruiq iqru yrfiru yreiqu uqirf8u ique fjl.k3 uieq;rbf uierf.",
      img: "https://n4.sdlcdn.com/imgs/g/1/8/HP-Black-Laptop-Bags-SDL547155957-3-bf0f1.jpeg",
      __v: 0,
    },
    {
      stock: 8,
      _id: "61fd67578bbe0f0016501084",
      itemname: "pen",
      price: 12,
      discountprice: 10,
      description: "it's an osm pen",
      img: "https://www.carbatec.com.au/images/ProductImages/PKGAPENC24.jpg",
      __v: 0,
    },
    {
      stock: 3,
      _id: "612b76774d2f7a1b4c95ebc4",
      itemname: "Amzing Pauches",
      price: 900,
      discountprice: 300,
      description:
        "A set of aesthetic pouches to amaze you and enhance your pauches collection.",
      img: "https://i.pinimg.com/originals/fd/40/7a/fd407a592e1c4b3ec860b585f5ca4254.jpg",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b76f74d2f7a1b4c95ebc6",
      itemname: "Super Drifterrrr",
      price: 300,
      discountprice: 150,
      description:
        "A pen as fast as a drifting car to drift and upskill your experience in writing, giving you a better experience and smooth look to your hand writing.",
      img: "https://tse4.mm.bing.net/th?id=OIP.8B1lltiUXsxNTWk9BN7q5AHaE8&pid=Api&P=0&w=230&h=154",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b77834d2f7a1b4c95ebc8",
      itemname: "Smart Student Back",
      price: 900,
      discountprice: 500,
      description:
        "The complete student back with all student tools and student things. It's a all in one super combo back offering quality and quantity as this cost.",
      img: "https://howtogetorganizedathome.com/wp-content/uploads/2016/04/26-Stationery-Products-That-You-Will-Love-1-1024x536.jpg",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b79b14d2f7a1b4c95ebd1",
      itemname: "Blue Pen Group",
      price: 180,
      discountprice: 120,
      description:
        "A group of blue pens offering you smooth, sharped and easy to refill pens, enhancing your writing and drawing skills giving a new shape and view to your kids and their hand writing and giving good experience.",
      img: "https://cdn.shopify.com/s/files/1/1251/0543/products/5881a17e7b9e2_1200x1200.jpg?v=1590045255",
      __v: 0,
    },
    {
      stock: 4,
      _id: "612b79fe4d2f7a1b4c95ebd3",
      itemname: "Make it Easy Pens",
      price: 180,
      discountprice: 120,
      description:
        "A group of blue pens making all tasks easier and offering you smooth, sharped and easy to refill pens, enhancing your writing and drawing skills giving a new shape and view to your kids and their hand writing and giving good experience.",
      img: "https://n2.sdlcdn.com/imgs/b/d/o/Signature-Auro-Ball-Pens-Pack-SDL687439111-1-6bda2.jpg",
      __v: 0,
    },
    {
      stock: 6,
      _id: "614b07844b49f3407cabd09b",
      itemname: "New BagRTQ",
      price: 1000,
      discountprice: 600,
      description:
        "It's a g degf eruiq iqru yrfiru yreiqu uqirf8u ique fjl.k3 uieq;rbf uierf.",
      img: "https://n4.sdlcdn.com/imgs/g/1/8/HP-Black-Laptop-Bags-SDL547155957-3-bf0f1.jpeg",
      __v: 0,
    },
    {
      stock: 8,
      _id: "61fd67578bbe0f0016501084",
      itemname: "pen",
      price: 12,
      discountprice: 10,
      description: "it's an osm pen",
      img: "https://www.carbatec.com.au/images/ProductImages/PKGAPENC24.jpg",
      __v: 0,
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
  return (
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
        {pd.map((e) => {
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
            {pd.map((e) => {
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
            {pd.map((e) => {
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
