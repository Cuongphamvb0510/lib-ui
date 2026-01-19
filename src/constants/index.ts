// Alert Icon Types
export const ALERT_ICON_TYPES = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  INFO: "info",
} as const;

// BText Types
export const TEXT_TYPES = {
  TITLE: "title",
  BODY: "body",
  CAPTION: "caption",
  HEADLINE: "headline",
} as const;

// BText Weights
export const TEXT_WEIGHTS = {
  LIGHT: "200",
  NORMAL: "400",
  SEMIBOLD: "600",
  BOLD: "700",
} as const;

// BText Align
export const TEXT_ALIGN = {
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right",
} as const;

// BText Element Types
export const TEXT_ELEMENTS = {
  DIV: "div",
  SPAN: "span",
} as const;

// Button Types
export const BUTTON_TYPES = {
  BORDER: "border",
  FULL: "full",
  LIGHT: "light",
} as const;

// Button Width Styles
export const BUTTON_WIDTHS = {
  FULL: "full",
  FIT_CONTENT: "fit-content",
} as const;

// Radio Styles
export const RADIO_STYLES = {
  DEFAULT: "default",
  POPUP: "popup",
} as const;

// Empty State Types
export const EMPTY_STATE_TYPES = {
  LIST_EMPTY: "list_empty",
  SEARCH_EMPTY: "search_empty",
  NOTIFI_EMPTY: "notifi_empty",
  LINK_EMPTY: "link_empty",
} as const;

// Locale Types
export const LOCALES = {
  EN: "en",
  VI: "vi",
} as const;

// Import from colors for type definitions
import { TEXT_COLORS } from "./colors";

// Re-export from colors
export * from "./colors";

// Type definitions
export type BTextType = (typeof TEXT_TYPES)[keyof typeof TEXT_TYPES];
export type BTextWeight = (typeof TEXT_WEIGHTS)[keyof typeof TEXT_WEIGHTS];
export type BTextColor = (typeof TEXT_COLORS)[keyof typeof TEXT_COLORS];
export type BTextAlign = (typeof TEXT_ALIGN)[keyof typeof TEXT_ALIGN];
export type BTextElement = (typeof TEXT_ELEMENTS)[keyof typeof TEXT_ELEMENTS];
export type RadioStyle = (typeof RADIO_STYLES)[keyof typeof RADIO_STYLES];
export type EmptyStateType =
  (typeof EMPTY_STATE_TYPES)[keyof typeof EMPTY_STATE_TYPES];
export type ButtonType = (typeof BUTTON_TYPES)[keyof typeof BUTTON_TYPES];
export type ButtonStyleWidth =
  (typeof BUTTON_WIDTHS)[keyof typeof BUTTON_WIDTHS];
export type Locale = (typeof LOCALES)[keyof typeof LOCALES];
