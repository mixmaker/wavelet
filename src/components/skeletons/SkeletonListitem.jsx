import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonListitem = () => {
  return (
    <div
      style={{
        // background: "#1e1e1e",
        display: "flex",
        justifyContent: "space-between",
        padding: "0.75rem",
        marginBottom: "1rem",
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={70}
          width={70}
          style={{
            marginRight: "1rem",
            flexShrink: 0,
            background: "#3b3b3b",
            borderRadius: "14px",
          }}
        />
        <div style={{ width: "80%", marginTop: ".25rem" }}>
          <Skeleton
            variant="text"
            animation="wave"
            width={"40%"}
            height={30}
            style={{ background: "#3b3b3b" }}
          />
          <Skeleton
            variant="text"
            animation="wave"
            width={"70%"}
            style={{ background: "#3b3b3b" }}
          />
        </div>
      </div>
      <div
        style={{
          // paddingLeft: ".25rem",
          margin: "0.15rem",
          alignSelf: "center",
        }}
      >
        <Skeleton
          variant="circular"
          animation="wave"
          height={32}
          width={32}
          style={{
            flexShrink: 0,
            background: "#3b3b3b",
          }}
        />
      </div>
    </div>
  );
};

export default SkeletonListitem;
