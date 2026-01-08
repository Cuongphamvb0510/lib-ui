import React from "react";
import { Icon } from "./Icon";
import type { IconProps } from "./types";
import { iconsData } from "./icons-data";

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

  let processedContent = iconData.content;
  if (color !== "currentColor") {
    // Thay thế tất cả fill colors (giữ nguyên "none" và "currentColor")
    processedContent = processedContent.replace(
      /fill="(?!none|currentColor)[^"]*"/g,
      `fill="${color}"`
    );
    // Thay thế tất cả stroke colors (giữ nguyên "none" và "currentColor")
    processedContent = processedContent.replace(
      /stroke="(?!none|currentColor)[^"]*"/g,
      `stroke="${color}"`
    );
  }

  return (
    <Icon size={size} color={color} viewBox={iconData.viewBox} {...props}>
      <g dangerouslySetInnerHTML={{ __html: processedContent }} />
    </Icon>
  );
};
