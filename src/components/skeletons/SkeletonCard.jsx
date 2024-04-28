import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="m-4">
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={200}
        height={200}
        // className="rounded-xl bg-zinc-900"
        style={{ background: "#282828", borderRadius: "0.75rem" }}
      />
      <div className="p-2 flex flex-col items-center justify-center">
        <Skeleton
          variant="text"
          animation="wave"
          width={100}
          // height={23}
          style={{ background: "#282828" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width={175}
          style={{ background: "#282828" }}
        />
      </div>
    </div>
  );
  return (
    <div
      className="relative h-full w-[240px] ml-4 mr-4 p-4 rounded-xl"
      // style={{
      //   position: "relative",
      //   height: "100%",
      //   width: "240px",
      //   // background: "#444",
      //   margin: "0 1rem",
      //   padding: "1rem 1rem .75rem 1rem",
      //   borderRadius: "5px",
      // }}
    >
      <div className="skeleton-card">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={200}
          height={200}
          className=" rounded-xl"
          style={{ background: "#5a5a5a", marginBottom: "1rem" }}
        />
        <div className="detailSkeleton">
          <Skeleton
            variant="text"
            animation="wave"
            width={100}
            height={23}
            style={{ background: "#5a5a5a" }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={200}
            style={{ background: "#5a5a5a", marginBottom: 0 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
