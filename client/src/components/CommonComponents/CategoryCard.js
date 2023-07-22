import React from 'react'
import Image from "next/image";
const CategoryCard = ({img,type}) => {
  return (
    <>
    <div className="categorycard col-md-1 col-lg-1 col-3">
    <div className="imgwrap d-flex justify-content-center">
      <Image
        src={img}
        width={80}
        height={80}
        alt="category image"
      />
    </div>
    <h6 className="text-center">{type}</h6>
  </div>
</>
  )
}

export default CategoryCard