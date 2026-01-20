import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { ForwardedRef } from "react";
import { TEXT_COLORS, TEXT_TYPES, TEXT_WEIGHTS, COLORS } from "../../constants";
import BCalendar, { type BCalendarRef } from "../calendar/BCalendar";
import { IconComponent } from "../Icon/IconComponent";
import { iconsData } from "../Icon/icons-data";
import { BText } from "../Text";
import SvgIcon from "../svgIcon";
import "./BInput.scss";
export type BInputRef = {
  // setValue: (value: string) => void;
  getValue: () => string | undefined;
  setError: (error: string) => void;
};

export interface BInputProps {
  label?: string;
  subtitle?: string;
  description?: string;
  tooltipContent?: React.ReactNode;
  value?: string;
  left?: string;
  leftText?: string;
  leftIcon?: string;
  onPressLeftIcon?: () => void;
  onLeftClick?: () => void;
  right?: string;
  rightText?: string;
  rightIcon?: string;
  onPressRightIcon?: () => void;
  onRightClick?: () => void;
  placeholder?: string;
  className?: string;
  type?:
    | "none"
    | "search"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "calendar"
    | "integer"
    | undefined;
  listenValueChange?: (str: string) => void;
  listenValueChangeWithNotFocus?: (str: string) => void;
  typeCheck?:
    | "fullname"
    | "phone"
    | "email"
    | "default"
    | "no-space"
    | "money"
    | "base-rule"
    | "no-vietnamese"
    | "integer";
  maxLength?: number;
  disableEnter?: boolean;
  disable?: boolean;
  readOnly?: boolean;
  onFocus?: () => void;
  onClick?: () => void;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  contentAvoidKeyboard?: React.ReactNode;
  bottomText?: string;
}

function BInput(props: BInputProps, ref: ForwardedRef<BInputRef>) {
  // const [isFocus, setFocus] = useState(false);
  // const [value, setValue] = useState(props.value);
  const [internalError, setInternalError] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [randomID] = useState(() => `input-${Date.now()}-${Math.random()}`);

  // Derived error từ props hoặc internal state
  const error = useMemo(() => {
    return props.error ?? internalError;
  }, [props.error, internalError]);

  React.useImperativeHandle(
    ref,
    (): BInputRef => ({
      // setValue(value) {
      //   setValue(value);
      // },
      getValue() {
        return props.value;
      },
      setError(error: string) {
        setInternalError(error);
      },
    })
  );

  const _pressLeftIcon = (ev: React.MouseEvent) => {
    if (props.disable) return;
    ev.stopPropagation();
    _refInput.current?.focus();
    if (props.onPressLeftIcon) {
      props.onPressLeftIcon();
    }
  };

  const _pressLeftClick = () => {
    if (props.disable) return;
    _refInput.current?.focus();
    if (props.onLeftClick) {
      props.onLeftClick();
    }
  };

  const _pressRightClick = () => {
    if (props.disable) return;
    _refInput.current?.focus();
    if (props.onRightClick) {
      props.onRightClick();
    }
  };
  const [isFirstFocus, setIsFirstFocus] = useState(true);
  const _refInput = useRef<HTMLTextAreaElement & HTMLInputElement>(null);
  const _refCalendar = useRef<BCalendarRef>(null);
  const _isComposingRef = useRef(false);

  const isIconName = (icon: string): boolean => {
    return icon in iconsData;
  };

  // useEffect(() => {
  //   setValue(props.value);
  // }, [props.value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showTooltip) {
        const target = event.target as HTMLElement;
        if (!target.closest(".custom-input-container")) {
          setShowTooltip(false);
        }
      }
    };

    if (showTooltip) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTooltip]);

  const _onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    // console.log("Paste", event.clipboardData.getData("Text"));
    if (props.typeCheck === "fullname") {
      if (
        !/^[A-Za-z ĐỲÝỴỶỸÙÚỤỦŨƯỪỨỰỬỮÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÌÍỊỈĨÈÉẸẺẼÊỀẾỆỂỄÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴàáảạâăàáạảãâầấậẩẫăằắặẳẵéèẻẽẹêèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+$/.test(
          event.clipboardData.getData("Text")
        )
      ) {
        event.preventDefault();
      }
    }
  };
  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && props.disableEnter) {
      e.preventDefault();
    }
  };

  // const _onBlur = () => {
  //   setFocus(false);
  //   props.onBlur?.();
  //   _firstFocus.current = true;
  //   _global.event.bottomViewAvoidKeyboard.current?._hide();
  // };

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value;
    if (error.length > 0) {
      setInternalError("");
    }
    if (props.typeCheck === "fullname") {
      str = str.replace(
        /([^A-Za-z ĐỲÝỴỶỸÙÚỤỦŨƯỪỨỰỬỮÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÌÍỊỈĨÈÉẸẺẼÊỀẾỆỂỄÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴàáảạâăàáạảãâầấậẩẫăằắặẳẵéèẻẽẹêèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ])/g,
        ""
      );
      e.target.value = str;
    } else if (props.typeCheck === "phone") {
      str = str.replace(/([^0-9])/g, "");
      if (str[0] != "0") {
        str = "";
      }
      e.target.value = str;
    } else if (props.typeCheck === "no-space") {
      str = str.replace(/([^0-9a-zA-Z])/g, "");
      e.target.value = str;
    } else if (props.type === "integer") {
      // Chỉ cho phép nhập số nguyên, không format
      str = str.replace(/([^0-9])/g, "");
      e.target.value = str;
    } else if (props.typeCheck === "base-rule") {
      str = str.replace(/[^0-9a-zA-Z/,.\-_]/g, "");
      e.target.value = str;
    } else if (props.typeCheck == "no-vietnamese") {
      str = str
        .replace(
          /([^A-Za-z ĐỲÝỴỶỸÙÚỤỦŨƯỪỨỰỬỮÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÌÍỊỈĨÈÉẸẺẼÊỀẾỆỂỄÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴàáảạâăàáạảãâầấậẩẫăằắặẳẵéèẻẽẹêèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ])/g,
          ""
        )
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      e.target.value = str;
    } else if (props.typeCheck === "integer") {
      // Chỉ nhập số nguyên, không được nhập , và .
      str = str.replace(/([^0-9])/g, "").replace(/^0+(?!$)/, "");
      e.target.value = str;
    }

    if (props.disableEnter) {
      str = str.replace(/\n/g, " ");
    }
    setIsFirstFocus(false);
    // Chỉ gọi onChange khi không đang composition để tránh gián đoạn IME khi nhập tiếng Việt
    if (!_isComposingRef.current) {
      props.onChange?.(str);
    }
  };

  const _onCompositionStart = () => {
    _isComposingRef.current = true;
  };

  const _onCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    _isComposingRef.current = false;
    // Sau khi kết thúc composition, cập nhật value từ event
    const str = e.currentTarget.value;
    props.onChange?.(str);
  };

  const _onFocus = () => {
    props.onFocus?.();
  };

  const _onBlur = (_e: React.FocusEvent<HTMLInputElement>) => {
    // Reset composition state khi blur để đảm bảo state được sync đúng
    if (_isComposingRef.current) {
      _isComposingRef.current = false;
      // Sync value cuối cùng khi blur trong lúc đang composition
      const finalValue = _e.currentTarget.value;
      props.onChange?.(finalValue);
    }

    props.onBlur?.();
  };

  const _onContainerClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (props.disable) return;

    const target = ev.target as HTMLElement;
    if (
      target.closest(".left-icon") ||
      target.closest(".right-icon") ||
      target.closest(".clear-icon") ||
      target.closest(".left-text.clickable") ||
      target.closest(".right-text.clickable") ||
      target.closest(".input-field")
    ) {
      return;
    }

    // Focus vào input khi click vào container
    _refInput.current?.focus();

    // Gọi props.onClick nếu có
    props.onClick?.();
  };

  const _onInputClick = (ev: React.MouseEvent<HTMLInputElement>) => {
    if (props.disable) return;

    // Khi type=calendar, click vào input sẽ mở calendar
    if (props.type === "calendar") {
      ev.stopPropagation();
      _onCalendarClick();
      return;
    }

    // Khi readOnly = true, click vào input sẽ trigger event của rightIcon hoặc rightClick
    if (props.readOnly) {
      if (props.onPressRightIcon) {
        ev.stopPropagation();
        props.onPressRightIcon();
      } else if (props.onRightClick) {
        ev.stopPropagation();
        props.onRightClick();
      }
    }
  };

  const _onClearValue = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    props.onChange?.("");
    _refInput.current?.focus();
  };

  const _onTooltipClick = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  const _onCalendarClick = (ev?: React.MouseEvent) => {
    if (props.disable) return;
    if (ev) {
      ev.stopPropagation();
    }
    _refInput.current?.focus();
    if (props.type === "calendar" && _refCalendar.current) {
      _refCalendar.current._open();
    }
  };

  const _onCalendarDateSelect = (start: Date) => {
    // Format ngày tháng theo định dạng dd/mm/yyyy
    const formatDate = (date: Date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const dateString = formatDate(start);
    // setValue(dateString);
    props.onChange?.(dateString);
  };

  return (
    <div className={`custom-input-container ${props.className || ""}`}>
      <div className="mb-2">
        <div className="flex items-center">
          {props.label && <BText type={TEXT_TYPES.BODY}>{props.label}</BText>}

          {props.subtitle && (
            <BText
              type={TEXT_TYPES.BODY}
              color={TEXT_COLORS.GRAY_400}
              weight={TEXT_WEIGHTS.NORMAL}
              className="ml-1"
            >
              {props.subtitle}
            </BText>
          )}
          {props.tooltipContent && (
            <IconComponent
              className="ml-1 icon-tooltip"
              name="icInformationCircleOutline"
              size={17}
              color={COLORS.PrimaryBrandColor500}
              onClick={_onTooltipClick}
            />
          )}
        </div>

        {/* Tooltip */}
        {showTooltip && props.tooltipContent && (
          <div className="tooltip-container">
            <div className="tooltip-arrow" />
            <div className="tooltip-content">{props.tooltipContent}</div>
          </div>
        )}

        {props.description && (
          <BText
            type={TEXT_TYPES.BODY}
            color={TEXT_COLORS.GRAY_400}
            weight={TEXT_WEIGHTS.NORMAL}
            className="mt-2"
          >
            {props.description}
          </BText>
        )}
      </div>
      <div
        className={
          "custom-input-content" +
          (error ? " error" : "") +
          (props.disable ? " disabled" : "") +
          (props.leftIcon ? " has-left-icon" : "") +
          (props.leftText ? " has-left-text" : "") +
          (props.rightIcon || props.type === "calendar"
            ? " has-right-icon"
            : "") +
          (props.rightText || props.right ? " has-right-text" : "")
        }
        onClick={_onContainerClick}
      >
        {!props.value && props.left && (
          <BText className="left-text" type={TEXT_TYPES.BODY}>
            {props.left}
          </BText>
        )}

        {props.leftText && (
          <BText
            className="left-text clickable"
            type={TEXT_TYPES.BODY}
            onClick={_pressLeftClick}
          >
            {props.leftText}
          </BText>
        )}

        {props.leftIcon &&
          (isIconName(props.leftIcon) ? (
            <IconComponent
              className="left-icon"
              name={props.leftIcon}
              size={24}
              onClick={_pressLeftIcon}
            />
          ) : (
            <SvgIcon
              className="left-icon"
              src={props.leftIcon}
              onClick={_pressLeftIcon}
              width={24}
              height={24}
            />
          ))}
        {isFirstFocus && <div className="ring-input" />}
        <input
          className={`input-field${props.readOnly ? " readonly" : ""}`}
          id={`input-field${randomID}`}
          ref={_refInput}
          value={props.value ?? ""}
          placeholder={props.placeholder}
          onChange={_onChange}
          onClick={_onInputClick}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onCompositionStart={_onCompositionStart}
          onCompositionEnd={_onCompositionEnd}
          inputMode={
            props.type === "calendar"
              ? "text"
              : props.type === "integer"
              ? "numeric"
              : props.type ?? "text"
          }
          maxLength={props.maxLength ?? 50}
          onPaste={_onPaste}
          onKeyDown={_onKeyDown}
          disabled={props.disable}
          readOnly={props.readOnly ?? props.type === "calendar"}
          autoCapitalize={"off"}
          autoCorrect={"off"}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Clear icon - chỉ hiển thị khi có value và input có thể nhập */}
        {props.value &&
          props.value.length > 0 &&
          !props.disable &&
          !props.readOnly && (
            <IconComponent
              className="clear-icon"
              name="icRemoveCircleOutline"
              size={20}
              onClick={_onClearValue}
            />
          )}

        {props.right && (
          <BText className="right-text" type={TEXT_TYPES.BODY}>
            {props.right}
          </BText>
        )}

        {props.rightText && (
          <BText
            className="right-text clickable"
            type={TEXT_TYPES.BODY}
            onClick={_pressRightClick}
          >
            {props.rightText}
          </BText>
        )}

        {(props.rightIcon || (props.type === "calendar" && !props.rightIcon)) &&
          (() => {
            const iconToUse = props.rightIcon || "icCalendarOutline";
            const isIcon = isIconName(iconToUse);

            return isIcon ? (
              <IconComponent
                className="right-icon"
                name={iconToUse}
                size={24}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  // Không focus vào input khi click icon bên phải
                  if (props.type === "calendar") {
                    _onCalendarClick();
                  } else {
                    if (props.disable) return;
                    if (props.onPressRightIcon) {
                      props.onPressRightIcon();
                    }
                  }
                }}
              />
            ) : (
              <SvgIcon
                className="right-icon"
                src={iconToUse}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  // Không focus vào input khi click icon bên phải
                  if (props.type === "calendar") {
                    _onCalendarClick();
                  } else {
                    if (props.disable) return;
                    if (props.onPressRightIcon) {
                      props.onPressRightIcon();
                    }
                  }
                }}
                width={24}
                height={24}
              />
            );
          })()}
      </div>
      {error && (
        <div className="error-view error-fade-in">
          <BText
            color={TEXT_COLORS.DANGER}
            type={TEXT_TYPES.BODY}
            weight={TEXT_WEIGHTS.NORMAL}
            className="mt-1"
          >
            {error}
          </BText>
        </div>
      )}

      {props.bottomText && (
        <BText
          color={TEXT_COLORS.GRAY_400}
          type={TEXT_TYPES.BODY}
          weight={TEXT_WEIGHTS.NORMAL}
          className="mt-1"
        >
          {props.bottomText}
        </BText>
      )}
      {/* BCalendar component */}
      {props.type === "calendar" && (
        <BCalendar ref={_refCalendar} onApplyDate={_onCalendarDateSelect} />
      )}
    </div>
  );
}

export default forwardRef(BInput);
