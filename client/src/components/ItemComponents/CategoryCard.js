import React from "react";

const CategoryCard = ({ img, title, key }) => {
  return (
    <>
      <div className="mt-2 col-3 col-md-2 col-lg-2 category_item">
        <img src={img} alt="" className="img-fluid img" />
        <p>{title}</p>
      </div>
    </>
  );
};
export default CategoryCard;
