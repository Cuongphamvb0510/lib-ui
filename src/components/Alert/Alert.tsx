import React, { forwardRef, useRef, useState } from "react";
import {
  BUTTON_TYPES,
  COLORS,
  TEXT_ALIGN,
  TEXT_TYPES,
  TEXT_WEIGHTS,
} from "../../constants";
import strings from "../../res/strings";
import { BButton } from "../Button";
import { IconComponent } from "../Icon";
import { BText } from "../Text";
import "./index.scss";

export type ParamsAlert = {
  message: string | React.ReactNode;
  onHide?: () => void;
  typeButton?: "1" | "2" | "hotline";
  typeAlert?: "normal" | "warning" | "copy";
  mainTitle?: string;
  titleLeftBtn?: string;
  titleRightBtn?: string;
  onRight?: () => void;
  onLeft?: () => void;
  imageTop?: string;
  touchOutside?: boolean;
  icon?: string; // Icon tùy chỉnh cho alert
  iconType?: "success" | "warning" | "error" | "custom";
};

export type SDKAlertRef = {
  show: (params: ParamsAlert) => void;
  hide: () => void;
};

const SDKAlert = (_props: unknown, ref: React.ForwardedRef<SDKAlertRef>) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | React.ReactNode>("");
  const [typeButton, setTypeButton] = useState<
    "1" | "2" | "hotline" | undefined
  >("1");
  const [leftTitle, setLeftTitle] = useState("");
  const [rightTitle, setRightTitle] = useState(strings(undefined).close);
  const [touchOutside, setTouchOutside] = useState<boolean | undefined>(
    undefined
  );
  const [mainTitle, setMainTitle] = useState("Thông báo");
  const [typeAlert, setTypeAlert] = useState<"normal" | "warning" | "copy">(
    "normal"
  );
  const [icon, setIcon] = useState("");
  const [iconType, setIconType] = useState<
    "success" | "warning" | "error" | "custom"
  >("success");
  const [isClosing, setIsClosing] = useState(false);

  const _onPressHide = useRef<(() => void) | undefined>(undefined);
  const _onPressRight = useRef<(() => void) | undefined>(undefined);
  const _onPressLeft = useRef<(() => void) | undefined>(undefined);

  const _handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
      setIsClosing(false);
      _onPressHide.current?.();
    }, 300);
  };

  React.useImperativeHandle(
    ref,
    (): SDKAlertRef => ({
      show(params: ParamsAlert) {
        setMessage(params.message);
        _onPressHide.current = params.onHide;
        _onPressRight.current = params.onRight;
        _onPressLeft.current = params.onLeft;
        setOpen(true);
        setIsClosing(false);
        setTypeButton(params.typeButton);
        setLeftTitle(params.titleLeftBtn ?? "");
        setRightTitle(params.titleRightBtn ?? strings(undefined).close);
        setMainTitle(params.mainTitle ?? "Thông báo");
        setTypeAlert(params.typeAlert ?? "normal");
        setIcon(params.icon ?? "");
        setIconType(params.iconType ?? "success");
        if (params.touchOutside === undefined) {
          setTouchOutside(true);
        } else {
          setTouchOutside(params.touchOutside);
        }
        if (params.typeAlert === "copy") {
          setTimeout(() => {
            _handleClose();
          }, 3000);
        }
      },
      hide() {
        _handleClose();
      },
    })
  );

  const _onRightClick = () => {
    _handleClose();
    _onPressRight.current?.();
  };

  const _onLeftClick = () => {
    _handleClose();
    _onPressLeft.current?.();
  };

  const _onOverlayClick = () => {
    if (touchOutside) {
      _handleClose();
    }
  };

  const getIconName = () => {
    if (iconType === "custom" && icon) return icon;
    if (iconType === "success") return "icCheckCircleOutline";
    if (iconType === "warning") return "icWarningOutline";
    if (iconType === "error") return "icWarningErrorOutline";
    return "icCheckCircleOutline";
  };

  return (
    <div className="alert-container">
      {open && (
        <div
          className={`alert-overlay ${isClosing ? "closing" : ""}`}
          onClick={_onOverlayClick}
        >
          <div
            className={`alert-dialog ${isClosing ? "closing" : ""} ${
              typeAlert === "copy" ? "alert-copy-dialog" : "alert-normal-dialog"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {typeAlert === "copy" ? (
              <div className="alert-copy-content">
                <span className="message-copy">{message}</span>
              </div>
            ) : (
              <>
                <div className="alert-header">
                  <div className="alert-icon-container">
                    {(iconType === "warning" ||
                      iconType === "success" ||
                      iconType === "error" ||
                      (iconType === "custom" && icon)) && (
                      <div className={`alert-icon ${iconType}-icon`}>
                        <IconComponent
                          name={getIconName()}
                          size={24}
                          color={
                            iconType === "success"
                              ? COLORS.SematicSuccessGreen500
                              : iconType === "error"
                              ? COLORS.SematicDangerousRed500
                              : iconType === "warning"
                              ? COLORS.SematicWarningOrange500
                              : undefined
                          }
                        />
                      </div>
                    )}
                  </div>
                  <BText
                    type={TEXT_TYPES.TITLE}
                    weight={TEXT_WEIGHTS.BOLD}
                    align={TEXT_ALIGN.LEFT}
                    className="mt-6"
                  >
                    {mainTitle}
                  </BText>
                </div>
                <div className="alert-content">
                  <BText
                    type={TEXT_TYPES.BODY}
                    weight={TEXT_WEIGHTS.NORMAL}
                    align={TEXT_ALIGN.LEFT}
                  >
                    {message}
                  </BText>
                </div>
                <div className="alert-actions">
                  {typeButton === "2" && (
                    <BButton type={BUTTON_TYPES.BORDER} onClick={_onLeftClick}>
                      {leftTitle}
                    </BButton>
                  )}
                  <BButton
                    type={BUTTON_TYPES.FULL}
                    onClick={_onRightClick}
                    className={typeButton === "2" ? "ml-3" : ""}
                  >
                    {rightTitle}
                  </BButton>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default forwardRef(SDKAlert);
