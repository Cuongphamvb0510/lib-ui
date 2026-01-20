import React from "react";
import "./BSkeleton.scss";

export interface BSkeletonProps {
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  variant?: "circle" | "rectangle";
  className?: string;
}

const BSkeleton: React.FC<BSkeletonProps> = ({
  width,
  height,
  radius,
  variant = "rectangle",
  className = "",
}) => {
  const isCircle = variant === "circle";
  const style: React.CSSProperties = {
    width: width || (isCircle ? "40px" : "100%"),
    height: height || (isCircle ? "40px" : "20px"),
    borderRadius: isCircle ? "50%" : radius || "4px",
  };

  return (
    <div
      className={`b-skeleton ${isCircle ? "circle" : "rectangle"} ${className}`}
      style={style}
    />
  );
};

export default BSkeleton;
