import React from "react";
import { getDetails } from "../api";

const Card = ({ id }) => {
  // const det = getDetails(id).then((data) => {
  //   console.log(data.data)
  //   return data.data;
  // });

  return (
    <div className="card">
      {id}
    </div>
  );
};

export default Card;
