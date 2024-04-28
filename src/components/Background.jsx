import * as React from "react";
const Background = (props) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  opacity={0.15}
  viewBox="0 0 800 450"
  {...props}
>
  <defs>
    <filter
      id="a"
      width="400%"
      height="400%"
      x="-100%"
      y="-100%"
      colorInterpolationFilters="sRGB"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
    >
      <feGaussianBlur
        width="100%"
        height="100%"
        x="0%"
        y="0%"
        in="SourceGraphic"
        result="blur"
        stdDeviation={130}
      />
    </filter>
  </defs>
  <g filter="url(#a)">
    <ellipse
      cx={737.91}
      cy={411.408}
      fill="hsl(37, 99%, 67%)"
      rx={256}
      ry={176}
    />
    <ellipse
      cx={133.557}
      cy={1.431}
      fill="hsl(316, 73%, 52%)"
      rx={256}
      ry={176}
    />
    <ellipse
      cx={87.405}
      cy={440.809}
      fill="hsl(185, 100%, 57%)"
      rx={256}
      ry={176}
    />
  </g>
</svg>
);
export default Background;
