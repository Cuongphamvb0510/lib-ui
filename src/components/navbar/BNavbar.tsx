import React from "react";
import { COLORS, TEXT_COLORS, TEXT_TYPES } from "../../constants";
import { IconComponent } from "../Icon";
import { BText } from "../Text";
import "./BNavbar.scss";

export interface BNavbarProps {
  title: string | React.ReactNode;
  showBack?: boolean;
  showRefresh?: boolean;
  onBack?: () => void;
  onRefresh?: () => void;
  onHomeBack?: () => void;
  fixed?: boolean;
  className?: string;
  showHomeBack?: boolean;
  isLanguageToggle?: boolean;
  rightIcon?: string;
  onRightIconClick?: () => void;
}

const BNavbar: React.FC<BNavbarProps> = ({
  title,
  showBack = true,
  showRefresh = false,
  onBack,
  onRefresh,
  onHomeBack,
  fixed = false,
  className = "",
  showHomeBack = false,
  isLanguageToggle = false,
  rightIcon,
  onRightIconClick,
}) => {
  return (
    <div className={`b-navbar ${fixed ? "fixed" : ""} ${className}`}>
      <div className="nav-left">
        {showBack && (
          <div className="icon-button" onClick={onBack}>
            <IconComponent name="arrowLeft02" size={24} color={COLORS.NeutralWhite500} />
          </div>
        )}
      </div>

      <div className="nav-center">
        <BText type={TEXT_TYPES.TITLE} color={TEXT_COLORS.WHITE} truncate>
          {title}
        </BText>
      </div>

      {(showRefresh || showHomeBack || isLanguageToggle || rightIcon) && (
        <div className="nav-right">
          {showRefresh && onRefresh && (
            <div className="icon-button" onClick={onRefresh}>
              <IconComponent name="refreshOutline" size={24} color={COLORS.NeutralWhite500} />
            </div>
          )}
          {showHomeBack && onHomeBack && (
            <div className="icon-button-back" onClick={onHomeBack}>
              <IconComponent name="icHomeOutline" size={20} color={COLORS.NeutralWhite500} />
            </div>
          )}
          {rightIcon && (
            <div className="icon-button" onClick={onRightIconClick}>
              <IconComponent name={rightIcon} size={24} color={COLORS.NeutralWhite500} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BNavbar;
