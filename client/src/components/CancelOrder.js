import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CancelOrder = (props) => {
  const history = useHistory();

  useEffect(() => {
    const CancelOrder = async () => {
      try {
        const res = await fetch(`/CancelOrder/${props.match.params.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ props }),
        });
        const data = await res.json();
         
        //   props.posts.filter((ele)=>{ele._id!=data._id})
        history.push("/");
        alert("Deletion done,Refresh the page");
      } catch (e) {
       
      }
    };

    CancelOrder();
  }, []);

  return <></>;
};

export default CancelOrder;
