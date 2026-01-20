import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  TEXT_ALIGN,
  TEXT_COLORS,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  COLORS,
} from "../../constants";
import { BText } from "../Text";
import { IconComponent } from "../Icon/IconComponent";
import "./BPopupSlide.scss";

export interface BPopupSlideProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  animationDuration?: number;
  slideFrom?: "left" | "right" | "top" | "bottom";
  rightIcon?: string;
  onClickRightIcon?: () => void;
  headerBackgroundColor?: "red" | "white";
}

const BPopupSlide: React.FC<BPopupSlideProps> = ({
  visible,
  onClose,
  title,
  children,
  className = "",
  showCloseButton = true,
  animationDuration = 300,
  slideFrom = "right",
  rightIcon,
  onClickRightIcon,
  headerBackgroundColor,
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);

  const formatLongTitle = (text: string, maxLength: number = 30): string => {
    if (text.length <= maxLength) return text;

    const sizeMatch = text.match(/\s*\([^)]+\)$/);
    const sizePart = sizeMatch ? sizeMatch[0] : "";
    const textWithoutSize = sizeMatch
      ? text.replace(/\s*\([^)]+\)$/, "")
      : text;

    const extensionMatch = textWithoutSize.match(/\.([^.]+)$/);
    const extension = extensionMatch ? `.${extensionMatch[1]}` : "";
    const nameWithoutExt = extensionMatch
      ? textWithoutSize.replace(/\.[^.]+$/, "")
      : textWithoutSize;

    const ellipsisLength = 3;
    const availableLength =
      maxLength - ellipsisLength - extension.length - sizePart.length;

    if (availableLength <= 0) {
      return text.substring(0, maxLength - 3) + "...";
    }

    const firstPartLength = Math.floor(availableLength / 2);
    const lastPartLength = availableLength - firstPartLength;

    const firstPart = nameWithoutExt.substring(0, firstPartLength);
    const lastPart = nameWithoutExt.substring(
      nameWithoutExt.length - lastPartLength
    );

    return `${firstPart}...${lastPart}${extension}${sizePart}`;
  };

  useEffect(() => {
    if (visible) {
      // Use requestAnimationFrame để tránh setState trong effect
      requestAnimationFrame(() => {
        setShouldRender(true);
        setIsClosing(false);
      });
    } else if (shouldRender) {
      const t1 = setTimeout(() => {
        setIsClosing(true);
      }, 0);
      const t2 = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, animationDuration);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [visible, animationDuration, shouldRender]);

  const handleClose = () => {
    onClose();
  };

  const getHeaderBackgroundColor = (): string => {
    if (headerBackgroundColor === "red") {
      return "var(--Primary-Brand-color-500---Main)";
    }
    return "var(--Neutral-White-500)";
  };

  const getTextColor = ():
    | typeof TEXT_COLORS.GRAY_500
    | typeof TEXT_COLORS.WHITE => {
    if (headerBackgroundColor === "red") {
      return TEXT_COLORS.WHITE;
    }
    return TEXT_COLORS.GRAY_500;
  };

  if (!shouldRender) return null;

  const textColor = getTextColor();
  const backgroundColor = getHeaderBackgroundColor();
  const iconColor =
    textColor === TEXT_COLORS.WHITE
      ? COLORS.NeutralWhite500
      : COLORS.NeutralGray500;

  return (
    <>
      <div
        className={`popup-slide-overlay ${isClosing ? "closing" : ""}`}
        onClick={handleClose}
      />

      <div
        className={`popup-slide-container slide-from-${slideFrom} ${className} ${
          isClosing ? "closing" : ""
        }`}
        style={
          {
            "--animation-duration": `${animationDuration}ms`,
            backgroundColor,
          } as CSSProperties
        }
      >
        <div className="popup-slide-content">
          <div
            className="popup-slide-header"
            style={
              {
                backgroundColor,
              } as CSSProperties
            }
          >
            {showCloseButton && (
              <div className="popup-slide-close-icon" onClick={handleClose}>
                <IconComponent
                  name="icRemoveXOutline"
                  size={14}
                  color={iconColor}
                />
              </div>
            )}
            <BText
              type={TEXT_TYPES.TITLE}
              weight={TEXT_WEIGHTS.BOLD}
              align={TEXT_ALIGN.CENTER}
              className="popup-slide-title"
              color={textColor}
            >
              {formatLongTitle(title)}
            </BText>
            {(rightIcon || onClickRightIcon) && (
              <IconComponent
                name={rightIcon || "icTrashOutline"}
                size={20}
                color={iconColor}
                onClick={onClickRightIcon}
                className="popup-slide-right-icon"
              />
            )}
          </div>

          {/* Nội dung popup */}
          <div className="popup-slide-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default BPopupSlide;
