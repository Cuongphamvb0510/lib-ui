import React from "react";
import { TEXT_TYPES, TEXT_WEIGHTS } from "../../constants";
import { BText } from "../Text";
import "./BCheckbox.scss";

export interface BCheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const BCheckbox: React.FC<BCheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  className = "",
  children,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const classes = [
    "b-checkbox",
    checked ? "checked" : "",
    disabled ? "disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={handleClick}>
      <div className="b-checkbox-box">
        {checked && <div className="b-checkbox-tick" />}
      </div>
      {children && (
        <BText
          type={TEXT_TYPES.BODY}
          weight={TEXT_WEIGHTS.NORMAL}
          className="ml-2 flex-1"
        >
          {children}
        </BText>
      )}
    </div>
  );
};
