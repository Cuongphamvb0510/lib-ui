import React from "react";
import {
  RADIO_STYLES,
  TEXT_COLORS,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  type RadioStyle,
} from "../../constants";
import { BText } from "../Text";
import "./BRadio.scss";

export interface BRadioProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  mainText?: string;
  subText?: string;
  style?: RadioStyle;
}

export const BRadio: React.FC<BRadioProps> = ({
  checked,
  onChange,
  disabled = false,
  className = "",
  children,
  mainText,
  subText,
  style = RADIO_STYLES.DEFAULT,
}) => {
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const renderContent = (checked?: boolean) => (
    <div className="b-radio-content">
      {children ? (
        <BText
          type={TEXT_TYPES.TITLE}
          color={TEXT_COLORS.GRAY_500}
          weight={checked ? TEXT_WEIGHTS.SEMIBOLD : TEXT_WEIGHTS.NORMAL}
        >
          {children}
        </BText>
      ) : (
        <>
          {mainText && (
            <BText
              type={TEXT_TYPES.TITLE}
              color={TEXT_COLORS.GRAY_500}
              weight={TEXT_WEIGHTS.SEMIBOLD}
            >
              {mainText}
            </BText>
          )}
          {subText && (
            <BText
              type={TEXT_TYPES.TITLE}
              color={TEXT_COLORS.GRAY_400}
              weight={TEXT_WEIGHTS.NORMAL}
            >
              {subText}
            </BText>
          )}
        </>
      )}
    </div>
  );

  const renderRadioBox = () => (
    <div className="b-radio-box">
      {checked && <div className="b-radio-dot" />}
    </div>
  );

  const isPopupStyle = style === RADIO_STYLES.POPUP;

  const classes = [
    "b-radio",
    isPopupStyle ? "b-radio-popup" : "",
    checked ? "checked" : "",
    disabled ? "disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} onClick={handleClick}>
      {isPopupStyle ? (
        <>
          {renderContent(checked)}
          {renderRadioBox()}
        </>
      ) : (
        <>
          {renderRadioBox()}
          {renderContent()}
        </>
      )}
    </div>
  );
};
