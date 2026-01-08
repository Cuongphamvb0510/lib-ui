import React from "react";
import {
  TEXT_TYPES,
  TEXT_WEIGHTS,
  TEXT_ALIGN,
  BUTTON_TYPES,
  EMPTY_STATE_TYPES,
  type EmptyStateType,
} from "../../constants";
import { BText } from "../Text";
import { BButton } from "../Button";
import { IconComponent } from "../Icon";
import "./BEmptyState.scss";

export interface BEmptyStateProps {
  mainText?: string;
  subText: string;
  buttonText?: string;
  type: EmptyStateType;
  onButtonClick?: () => void;
  className?: string;
}

export const BEmptyState: React.FC<BEmptyStateProps> = ({
  mainText,
  subText,
  buttonText,
  type,
  onButtonClick,
  className,
}) => {
  const getIconNameByType = (type: EmptyStateType): string => {
    switch (type) {
      case EMPTY_STATE_TYPES.LIST_EMPTY:
        return "icListEmpty";
      case EMPTY_STATE_TYPES.SEARCH_EMPTY:
        return "icSearchEmpty";
      case EMPTY_STATE_TYPES.NOTIFI_EMPTY:
        return "icNotificationEmpty";
      case EMPTY_STATE_TYPES.LINK_EMPTY:
        return "icLinkEmpty";
      default:
        return "icListEmpty";
    }
  };

  const classes = ["empty-state-container", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="empty-state-icon">
        <IconComponent name={getIconNameByType(type)} size={160} />
      </div>
      {mainText && (
        <BText
          type={TEXT_TYPES.TITLE}
          weight={TEXT_WEIGHTS.BOLD}
          align={TEXT_ALIGN.CENTER}
          className="empty-state-main-text"
        >
          {mainText}
        </BText>
      )}
      <BText
        type={TEXT_TYPES.BODY}
        weight={TEXT_WEIGHTS.NORMAL}
        align={TEXT_ALIGN.CENTER}
        className="empty-state-sub-text"
      >
        {subText}
      </BText>
      {buttonText && (
        <div className="empty-state-button">
          <BButton type={BUTTON_TYPES.FULL} onClick={onButtonClick}>
            {buttonText}
          </BButton>
        </div>
      )}
    </div>
  );
};
