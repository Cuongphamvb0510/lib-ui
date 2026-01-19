import React from "react";
import { Icon } from "./Icon";
import type { IconProps } from "./types";
import { iconsData } from "./icons-data";
import { getColorValue } from "../../constants/colors";

export interface IconComponentProps extends IconProps {
  name: string;
}

export const IconComponent: React.FC<IconComponentProps> = ({
  name,
  size = 24,
  color = "currentColor",
  ...props
}) => {
  const iconData = iconsData[name];

  if (!iconData) {
    console.warn(
      `Icon "${name}" not found. Available icons: ${Object.keys(iconsData).join(
        ", "
      )}`
    );
    return null;
  }

  const resolvedColor =
    color !== "currentColor" && color.startsWith("var(")
      ? getColorValue(color)
      : color;

  let processedContent = iconData.content;
  if (resolvedColor !== "currentColor") {
    processedContent = processedContent.replace(
      /fill="(?!none|currentColor)[^"]*"/g,
      `fill="${resolvedColor}"`
    );
    processedContent = processedContent.replace(
      /stroke="(?!none|currentColor)[^"]*"/g,
      `stroke="${resolvedColor}"`
    );
  }

  return (
    <Icon
      size={size}
      color={resolvedColor}
      viewBox={iconData.viewBox}
      {...props}
    >
      <g dangerouslySetInnerHTML={{ __html: processedContent }} />
    </Icon>
  );
};
