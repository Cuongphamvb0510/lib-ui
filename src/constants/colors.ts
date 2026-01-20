// BText Colors
export const TEXT_COLORS = {
  PRIMARY_MAIN: "Primary-Brand-color-500---Main",
  PRIMARY_50: "PrimaryBrandColor50",
  GRAY_500: "Neutral-Gray-500",
  GRAY_400: "Neutral-Gray-400",
  GRAY_300: "Neutral-Gray-300",
  GRAY_100: "Neutral-Gray-100",
  GRAY_50: "Neutral-Gray-50",
  WHITE: "Neutral-White-500",
  DANGER: "Sematic-Dangerous-Red-500",
  SUCCESS: "Sematic-Success-Green-500",
  INFO_BLUE: "Sematic-Information-Blue-500",
  INFO_BLUE_600: "Sematic-Information-Blue-600",
} as const;

export const CSS_COLOR_VARS = {
  // Primary Brand Colors
  PrimaryBrandColor600: "--Primary-Brand-color-600",
  PrimaryBrandColor500: "--Primary-Brand-color-500---Main",
  PrimaryBrandColor100: "--Primary-Brand-color-100",
  PrimaryBrandColor50: "--Primary-Brand-color-50",
  PrimaryBrandColor25: "--Primary-Brand-color-25",

  // Neutral Gray Colors
  NeutralGray500: "--Neutral-Gray-500",
  NeutralGray400: "--Neutral-Gray-400",
  NeutralGray300: "--Neutral-Gray-300",
  NeutralGray200: "--Neutral-Gray-200",
  NeutralGray100: "--Neutral-Gray-100",
  NeutralGray50: "--Neutral-Gray-50",
  NeutralGray25: "--Neutral-Gray-25",
  NeutralGray5: "--Neutral-Gray-5",

  // White
  NeutralWhite500: "--Neutral-White-500",

  // Semantic Dangerous Red
  SematicDangerousRed500: "--Sematic-Dangerous-Red-500",
  SematicDangerousRed50: "--Sematic-Dangerous-Red-50",
  SematicDangerousRed25: "--Sematic-Dangerous-Red-25",

  // Semantic Success Green
  SematicSuccessGreen500: "--Sematic-Success-Green-500",
  SematicSuccessGreen50: "--Sematic-Success-Green-50",
  SematicSuccessGreen25: "--Sematic-Success-Green-25",

  // Semantic Information Blue
  SematicInformationBlue500: "--Sematic-Information-Blue-500",
  SematicInformationBlue600: "--Sematic-Information-Blue-600",
  SematicInformationBlue50: "--Sematic-Information-Blue-50",
  SematicInformationBlue25: "--Sematic-Information-Blue-25",

  // Semantic Warning Orange
  SematicWarningOrange500: "--Sematic-Warning-Orange-500",
  SematicWarningOrange50: "--Sematic-Warning-Orange-50",
  SematicWarningOrange25: "--Sematic-Warning-Orange-25",
} as const;

export const COLORS = {
  // Primary Brand Colors
  PrimaryBrandColor600: `var(${CSS_COLOR_VARS.PrimaryBrandColor600})`,
  PrimaryBrandColor500: `var(${CSS_COLOR_VARS.PrimaryBrandColor500})`,
  PrimaryBrandColor100: `var(${CSS_COLOR_VARS.PrimaryBrandColor100})`,
  PrimaryBrandColor50: `var(${CSS_COLOR_VARS.PrimaryBrandColor50})`,
  PrimaryBrandColor25: `var(${CSS_COLOR_VARS.PrimaryBrandColor25})`,

  // Neutral Gray Colors
  NeutralGray500: `var(${CSS_COLOR_VARS.NeutralGray500})`,
  NeutralGray400: `var(${CSS_COLOR_VARS.NeutralGray400})`,
  NeutralGray300: `var(${CSS_COLOR_VARS.NeutralGray300})`,
  NeutralGray200: `var(${CSS_COLOR_VARS.NeutralGray200})`,
  NeutralGray100: `var(${CSS_COLOR_VARS.NeutralGray100})`,
  NeutralGray50: `var(${CSS_COLOR_VARS.NeutralGray50})`,
  NeutralGray25: `var(${CSS_COLOR_VARS.NeutralGray25})`,
  NeutralGray5: `var(${CSS_COLOR_VARS.NeutralGray5})`,

  // White
  NeutralWhite500: `var(${CSS_COLOR_VARS.NeutralWhite500})`,

  // Semantic Dangerous Red
  SematicDangerousRed500: `var(${CSS_COLOR_VARS.SematicDangerousRed500})`,
  SematicDangerousRed50: `var(${CSS_COLOR_VARS.SematicDangerousRed50})`,
  SematicDangerousRed25: `var(${CSS_COLOR_VARS.SematicDangerousRed25})`,

  // Semantic Success Green
  SematicSuccessGreen500: `var(${CSS_COLOR_VARS.SematicSuccessGreen500})`,
  SematicSuccessGreen50: `var(${CSS_COLOR_VARS.SematicSuccessGreen50})`,
  SematicSuccessGreen25: `var(${CSS_COLOR_VARS.SematicSuccessGreen25})`,

  // Semantic Information Blue
  SematicInformationBlue500: `var(${CSS_COLOR_VARS.SematicInformationBlue500})`,
  SematicInformationBlue600: `var(${CSS_COLOR_VARS.SematicInformationBlue600})`,
  SematicInformationBlue50: `var(${CSS_COLOR_VARS.SematicInformationBlue50})`,
  SematicInformationBlue25: `var(${CSS_COLOR_VARS.SematicInformationBlue25})`,

  // Semantic Warning Orange
  SematicWarningOrange500: `var(${CSS_COLOR_VARS.SematicWarningOrange500})`,
  SematicWarningOrange50: `var(${CSS_COLOR_VARS.SematicWarningOrange50})`,
  SematicWarningOrange25: `var(${CSS_COLOR_VARS.SematicWarningOrange25})`,
} as const;

const colorValueCache = new Map<string, string>();

export const getColorValue = (cssVar: string): string => {
  if (cssVar.startsWith("#")) return cssVar;

  if (colorValueCache.has(cssVar)) {
    return colorValueCache.get(cssVar)!;
  }

  let varName = cssVar;
  if (cssVar.startsWith("var(")) {
    varName = cssVar.replace(/var\(|\)/g, "");
  }

  if (typeof window !== "undefined" && document.documentElement) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();

    if (value) {
      colorValueCache.set(cssVar, value);
      return value;
    }
  }

  return cssVar;
};

export const getCssVarName = (colorKey: keyof typeof COLORS): string => {
  return CSS_COLOR_VARS[colorKey];
};