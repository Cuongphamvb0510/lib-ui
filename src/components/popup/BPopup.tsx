import React, {
  forwardRef,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import type { CSSProperties } from "react";
import "./BPopup.scss";
import { BText } from "../Text";
import { IconComponent } from "../Icon/IconComponent";
import {
  LOCALES,
  TEXT_ALIGN,
  TEXT_COLORS,
  TEXT_TYPES,
  TEXT_WEIGHTS,
  COLORS,
  type Locale,
} from "../../constants";
import strings from "../../res/strings";

export interface BPopupProps {
  children?: React.ReactNode;
  visible: boolean;
  onHide: () => void;
  styleHeader?: CSSProperties;
  title?: string;
  style?: CSSProperties;
  className?: string;
  paddingBottom?: number;
  iconClose?: boolean;
  closeOnClickOverlay?: boolean;
  fixedHeight?: boolean;
  locale?: Locale;
}

export interface BPopupParams {
  title?: string;
  children?: React.ReactNode;
  onHide?: () => void;
  iconClose?: boolean;
  closeOnClickOverlay?: boolean;
  fixedHeight?: boolean;
  locale?: Locale;
}

export type BPopupRef = {
  show: (params: BPopupParams) => void;
  hide: () => void;
};

const BPopup = (props: BPopupProps, ref: React.ForwardedRef<BPopupRef>) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [children, setChildren] = useState<React.ReactNode>(null);
  const [onHide, setOnHide] = useState<(() => void) | undefined>();
  const [iconClose, setIconClose] = useState<boolean | undefined>(undefined);
  const [closeOnClickOverlay, setCloseOnClickOverlay] = useState<
    boolean | undefined
  >(undefined);
  const [fixedHeight, setFixedHeight] = useState<boolean | undefined>(
    undefined
  );
  const [locale, setLocale] = useState<Locale | undefined>(props.locale);

  const ANIMATION_DURATION_MS = 300;
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Refs cho swipe to close
  const _refStartY = useRef<number | null>(null);
  const _refSheet = useRef<HTMLDivElement>(null);
  const _refLastDeltaY = useRef(0);
  const _refCanDragSheet = useRef(false);
  const _refScrollStart = useRef<number | null>(null);
  const _refIsClosing = useRef(false);
  const _refSwipeClosed = useRef(false); // Track nếu đã swipe close

  // Destructure props.onHide để tránh dependency warning
  const { onHide: propsOnHide } = props;

  const _closeWithAnimation = useCallback(() => {
    if (_refIsClosing.current) return;
    _refIsClosing.current = true;
    _refSwipeClosed.current = true; // Đánh dấu đã swipe close

    if (_refSheet.current) {
      _refSheet.current.style.transition = "transform 0.25s";
      _refSheet.current.style.transform = "translateY(100%)";
      setTimeout(() => {
        // Đóng ngay lập tức, không trigger CSS animation
        setShouldRender(false);
        setIsClosing(false);
        _refIsClosing.current = false;
        setVisible(false);
        onHide?.();
        propsOnHide?.();
        setFixedHeight(undefined);
      }, 250);
    } else {
      setShouldRender(false);
      setIsClosing(false);
      _refIsClosing.current = false;
      setVisible(false);
      onHide?.();
      propsOnHide?.();
      setFixedHeight(undefined);
    }
  }, [onHide, propsOnHide]);

  const _handleTouchStart = (e: React.TouchEvent) => {
    const touches = e.touches || e?.changedTouches;
    if (!touches || touches.length === 0) return;

    _refStartY.current = touches[0].clientY;
    _refLastDeltaY.current = 0;
    _refCanDragSheet.current = false;
    _refScrollStart.current = null;
    const target = e.target as HTMLElement;

    let scrollable: HTMLElement | null = target;
    while (scrollable) {
      const style = window.getComputedStyle(scrollable);
      const overflowY = style.overflowY;
      if (
        (overflowY === "auto" || overflowY === "scroll") &&
        scrollable.scrollHeight > scrollable.clientHeight
      ) {
        _refScrollStart.current = scrollable.scrollTop;
        if (scrollable.scrollTop === 0) {
          _refCanDragSheet.current = true;
        }
        break;
      }
      scrollable = scrollable.parentElement;
    }
    if (scrollable == null) {
      _refCanDragSheet.current = true;
    }
  };

  const _handleTouchMove = (e: React.TouchEvent) => {
    const touches = e.touches || e?.changedTouches;
    if (!touches || touches.length === 0) return;

    if (_refCanDragSheet.current && _refScrollStart.current !== null) {
      let scrollable: HTMLElement | null = e.target as HTMLElement;
      while (scrollable) {
        const style = window.getComputedStyle(scrollable);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          scrollable.scrollHeight > scrollable.clientHeight
        ) {
          if (scrollable.scrollTop !== _refScrollStart.current) {
            _refCanDragSheet.current = false;
            return;
          }
          break;
        }
        scrollable = scrollable.parentElement;
      }
    }
    if (!_refCanDragSheet.current) return;
    if (_refStartY.current !== null && _refSheet.current) {
      const deltaY = touches[0].clientY - _refStartY.current;
      if (deltaY > 0) {
        _refSheet.current.style.transition = "none";
        _refSheet.current.style.transform = `translateY(${deltaY}px)`;
        _refLastDeltaY.current = deltaY;
      } else {
        _refSheet.current.style.transition = "none";
        _refSheet.current.style.transform = `translateY(0px)`;
        _refLastDeltaY.current = 0;
      }
    }
  };

  const _handleTouchEnd = () => {
    if (!_refCanDragSheet.current) return;
    if (_refStartY.current !== null && _refSheet.current) {
      const deltaY = _refLastDeltaY.current;
      if (deltaY > 120) {
        _closeWithAnimation();
      } else {
        _refSheet.current.style.transition = "transform 0.3s";
        _refSheet.current.style.transform = `translateY(0)`;
      }
    }
    _refStartY.current = null;
    _refLastDeltaY.current = 0;
    _refCanDragSheet.current = false;
  };

  React.useImperativeHandle(
    ref,
    (): BPopupRef => ({
      show(params: BPopupParams) {
        setTitle(params.title || "");
        setChildren(params.children);
        setOnHide(params.onHide);
        setIconClose(params.iconClose);
        setCloseOnClickOverlay(params.closeOnClickOverlay);
        setFixedHeight(params.fixedHeight);
        setLocale(params.locale);
        setVisible(true);
      },
      hide() {
        setVisible(false);
      },
    })
  );

  const handleHide = () => {
    setVisible(false);
    onHide?.();
    props.onHide?.();
    setFixedHeight(undefined);
  };

  const handleOverlayClick = () => {
    const shouldClose =
      closeOnClickOverlay ?? props.closeOnClickOverlay ?? true;

    if (shouldClose) {
      handleHide();
    }
  };

  const renderContent = () => {
    if (children) {
      return children;
    }
    return props.children;
  };

  // Có thể mở bằng props.visible hoặc bằng ref.show()
  const isVisible = Boolean(props.visible || visible);

  useEffect(() => {
    if (isVisible) {
      requestAnimationFrame(() => {
        setShouldRender(true);
      });
      _refSwipeClosed.current = false; // Reset khi mở
      return;
    }

    if (!shouldRender) return;

    if (_refSwipeClosed.current) {
      return;
    }

    const t1 = setTimeout(() => {
      setIsClosing(true);
    }, 0);

    const t2 = setTimeout(() => {
      setShouldRender(false);
      setIsClosing(false);
    }, ANIMATION_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isVisible, shouldRender]);

  // Reset transform khi mở mới
  useEffect(() => {
    if (isVisible && shouldRender && _refSheet.current) {
      _refSheet.current.style.transition = "";
      _refSheet.current.style.transform = "";
      _refIsClosing.current = false;
      _refSwipeClosed.current = false;
    }
  }, [isVisible, shouldRender]);

  const popupTitle = title || props.title;
  const popupChildren = renderContent() || props.children;
  const showIconClose = iconClose ?? props.iconClose ?? true;
  const shouldFixedHeight = fixedHeight ?? props.fixedHeight ?? false;

  if (!shouldRender) return null;

  return (
    <>
      <div
        className={`bpopup-overlay ${isClosing ? "closing" : ""}`}
        style={
          {
            "--bpopup-duration": `${ANIMATION_DURATION_MS}ms`,
          } as React.CSSProperties
        }
        onClick={handleOverlayClick}
      />

      <div
        ref={_refSheet}
        className={`bpopup-sheet ${
          isClosing ? "closing" : ""
        } ${props.className ?? ""}`}
        style={
          {
            "--bpopup-duration": `${ANIMATION_DURATION_MS}ms`,
          } as React.CSSProperties
        }
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        onTouchStart={_handleTouchStart}
        onTouchMove={_handleTouchMove}
        onTouchEnd={_handleTouchEnd}
      >
        <div
          className={`base-popup-container ${
            shouldFixedHeight ? "fixed-height" : ""
          }`}
        >
          <div className="handle-bar"></div>
          <div className="view-header-base-popup" style={props.styleHeader}>
            <BText
              type={TEXT_TYPES.TITLE}
              weight={TEXT_WEIGHTS.BOLD}
              align={TEXT_ALIGN.CENTER}
              className="title-base-popup"
            >
              {popupTitle}
            </BText>
            {showIconClose ? (
              <div className="icon-close-base-popup" onClick={handleHide}>
                <IconComponent
                  name="icRemoveXOutline"
                  size={14}
                  color={COLORS.NeutralGray500}
                />
              </div>
            ) : (
              <BText
                onClick={handleHide}
                color={TEXT_COLORS.PRIMARY_MAIN}
                className="text-close-base-popup"
              >
                {strings(locale || props.locale || LOCALES.VI).close}
              </BText>
            )}
          </div>
          <div className="popup-content-wrapper">{popupChildren}</div>
        </div>
      </div>
    </>
  );
};

export default forwardRef(BPopup);
