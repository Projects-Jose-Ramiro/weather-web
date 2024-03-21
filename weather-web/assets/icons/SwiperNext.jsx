import * as React from "react";

const SwiperNext = ({ color }) => (
  <div
    className="icon-right"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "32px",
      height: "32px",
      borderRadius: "16px",
      border: `2px solid ${color}`,
      cursor: "pointer",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      fill={color}
      viewBox="0 0 24 24"
    >
      <path d="M9.29 15.88 13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42Z" />
    </svg>
  </div>
);
export default SwiperNext