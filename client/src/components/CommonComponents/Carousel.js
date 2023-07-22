import React from "react";
import styles from "./carousel.module.css"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
const CarouselComp = ({ img1, img2, img3, img4,ht }) => {
  const [imgs, setimgs] = useState([img1, img2, img3, img4]);
  return (
    <>
      <div>
        <Carousel>
          {imgs.map((e) => {
            return (
              <>
                <div>
                  <img src={e} 
                   className={`img-fluid ${styles.img}`} 
                  />
                </div>
              </>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default CarouselComp;
