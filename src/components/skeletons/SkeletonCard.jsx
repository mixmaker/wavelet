import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonCard = () => {
  return (
    <div
      className="skeleton-wrapper"
      style={{
        position: "relative",
        height: "100%",
        width: "240px",
        background: "#444",
        margin: "0 1rem",
        padding: "1rem 1rem .75rem 1rem",
        borderRadius: "5px",
      }}
    >
      <div className="skeleton-card">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={200}
          height={200}
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
