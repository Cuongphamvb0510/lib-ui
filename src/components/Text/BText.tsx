import React from "react";
import {
  TEXT_ALIGN,
  TEXT_ELEMENTS,
  TEXT_TYPES,
  type BTextAlign,
  type BTextColor,
  type BTextElement,
  type BTextType,
  type BTextWeight,
} from "../../constants";
import "./BText.scss";

export interface BTextProps {
  children?: React.ReactNode;
  type?: BTextType;
  weight?: BTextWeight;
  color?: BTextColor;
  className?: string;
  align?: BTextAlign;
  truncate?: boolean;
  onClick?: () => void;
  as?: BTextElement;
  dangerouslySetInnerHTML?: { __html: string };
}

export const BText: React.FC<BTextProps> = ({
  children,
  type = TEXT_TYPES.BODY,
  weight,
  color,
  className,
  align = TEXT_ALIGN.LEFT,
  truncate = false,
  onClick,
  as = TEXT_ELEMENTS.DIV,
  dangerouslySetInnerHTML,
}) => {
  const classes = [
    "text",
    `text-${type}`,
    weight && `text-weight-${weight}`,
    color && `text-color-${color}`,
    align !== "left" && `text-align-${align}`,
    truncate && "text-truncate",
    onClick && "text-clickable",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Component = as;

  return (
    <Component
      className={classes}
      onClick={onClick}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {!dangerouslySetInnerHTML && children}
    </Component>
  );
};
