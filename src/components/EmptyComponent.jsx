import React from "react";
import { BiGhost } from "react-icons/bi";

const EmptyComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <BiGhost size="42" />
      Boo! There's nothing here.
    </div>
  );
};

export default EmptyComponent;
