import React, { useCallback, useRef } from "react";
import {
  BUTTON_TYPES,
  BUTTON_WIDTHS,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  type ButtonStyleWidth,
  type ButtonType,
} from "../../constants";
import { BText } from "../Text";
import "./BButton.scss";

export interface BButtonProps {
  children: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  styleWidth?: ButtonStyleWidth;
}

export const BButton: React.FC<BButtonProps> = ({
  children,
  type = BUTTON_TYPES.FULL,
  disabled = false,
  onClick,
  className,
  leftIcon,
  rightIcon,
  styleWidth = BUTTON_WIDTHS.FULL,
}) => {
  // Sử dụng useRef để track thời gian click cuối cùng
  const lastClickTimeRef = useRef<number>(0);
  const CLICK_THROTTLE_MS = 1000; // Chặn click trong 1000ms

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) {
        event.stopPropagation();
        return;
      }

      const now = Date.now();
      // Chặn click nếu chưa đủ thời gian từ lần click trước
      if (now - lastClickTimeRef.current < CLICK_THROTTLE_MS) {
        event.stopPropagation();
        return;
      }

      lastClickTimeRef.current = now;
      event.stopPropagation();
      onClick?.();
    },
    [disabled, onClick]
  );

  const classes = [
    "b-button",
    `b-button-${type}`,
    `b-button-width-${styleWidth}`,
    disabled ? "b-button-disabled" : "",
    leftIcon || rightIcon ? "b-button-with-icon" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={handleClick}>
      {leftIcon && <span className="b-button-icon-left">{leftIcon}</span>}
      <BText
        className="b-button-text"
        type={TEXT_TYPES.BODY}
        weight={TEXT_WEIGHTS.SEMIBOLD}
      >
        {children}
      </BText>
      {rightIcon && <span className="b-button-icon-right">{rightIcon}</span>}
    </div>
  );
};
