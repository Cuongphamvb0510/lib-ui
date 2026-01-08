import React from "react";
import type { IconProps } from "./types";

interface IconComponentProps extends IconProps {
  viewBox: string;
  children?: React.ReactNode;
}

export const Icon = ({
  size = 24,
  color = "currentColor",
  viewBox,
  children,
  className,
  ...props
}: IconComponentProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ color, ...props.style }}
      {...props}
    >
      {children}
    </svg>
  );
};
