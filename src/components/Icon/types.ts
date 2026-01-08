import type { SVGProps } from "react";

export interface IconProps
  extends Omit<
    SVGProps<SVGSVGElement>,
    "width" | "height" | "fill" | "stroke"
  > {
  size?: number | string;
  color?: string;
}
