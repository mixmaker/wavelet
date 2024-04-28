import React from "react";
import { RiLoader5Fill } from "react-icons/ri";
import { cn } from "../cn";

const LoadingComponent = ({ text, className, iconClassName }) => {
  return (
    <div className={cn("flex", className)}>
      <RiLoader5Fill
        className={cn(
          "h-5 w-5 animate-spin",
          text && text !== "" ? "mr-2" : "",
          iconClassName
        )}
      />
      {text}
    </div>
  );
};

export default LoadingComponent;
