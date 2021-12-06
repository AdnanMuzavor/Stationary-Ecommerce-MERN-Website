import React from "react";

const Topivgive = ({ a1, a2, title }) => {
  return (
    <>
      <div className="container userg" data-aos={a1}>
        <h5 className="text text-center userdis" data-aos={a2}>
          {title}
        </h5>
      </div>
    </>
  );
};

export default Topivgive;
