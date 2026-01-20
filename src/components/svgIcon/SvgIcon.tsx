import React, { useState, useEffect } from "react";

interface SvgIconProps {
  src: string;
  className?: string;
  width?: number;
  height?: number;
  onClick?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  color?: string;
  strokeColor?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  src,
  className = "",
  width = 24,
  height = 24,
  onClick,
  color,
  strokeColor,
  onTouchStart,
}) => {
  const [processedSrcFromStroke, setProcessedSrcFromStroke] = useState<
    string | null
  >(null);
  const [inlineSvg, setInlineSvg] = useState<string | null>(null);
  const [isStrokeOnly, setIsStrokeOnly] = useState(false);

  // Tính toán processedSrc cho trường hợp không có strokeColor (synchronous)
  const processedSrc = React.useMemo(() => {
    if (strokeColor) return processedSrcFromStroke;
    if (src && !src.startsWith("data:") && !src.startsWith("http")) {
      try {
        return encodeURI(src);
      } catch {
        return src;
      }
    }
    return src;
  }, [src, strokeColor, processedSrcFromStroke]);

  // Effect để xử lý strokeColor
  useEffect(() => {
    if (!strokeColor) return;

    const processSvgWithStrokeColor = async () => {
      try {
        const response = await fetch(src);
        const svgContent = await response.text();
        let processedSvg = svgContent;
        let resolvedStrokeColor = strokeColor;
        if (strokeColor && strokeColor.startsWith("var(")) {
          const varName = strokeColor.match(/var\(([^)]+)\)/)?.[1];
          if (varName) {
            try {
              const tempElement = document.createElement("div");
              tempElement.style.setProperty("color", `var(${varName})`);
              document.body.appendChild(tempElement);
              const computedColor = getComputedStyle(tempElement).color;
              document.body.removeChild(tempElement);
              resolvedStrokeColor = computedColor;
            } catch {
              resolvedStrokeColor = strokeColor;
            }
          }
        }

        const hasFillNone =
          /fill="none"/i.test(processedSvg) ||
          /fill='none'/i.test(processedSvg);
        const hasStroke = /stroke=/i.test(processedSvg);
        const strokeOnly = hasFillNone && hasStroke;

        processedSvg = processedSvg.replace(
          /stroke="[^"]*"/g,
          `stroke="${resolvedStrokeColor}"`
        );

        processedSvg = processedSvg.replace(
          /stroke='[^']*'/g,
          `stroke='${resolvedStrokeColor}'`
        );

        if (!processedSvg.includes("stroke=")) {
          processedSvg = processedSvg.replace(
            /<svg([^>]*)>/,
            `<svg$1 stroke="${resolvedStrokeColor}">`
          );
        }

        const encodedSvg = encodeURIComponent(processedSvg);
        const dataUriSvg = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

        if (strokeOnly) {
          setIsStrokeOnly(true);
          setInlineSvg(dataUriSvg);
          setProcessedSrcFromStroke(dataUriSvg);
        } else {
          setIsStrokeOnly(false);
          setInlineSvg(null);
          setProcessedSrcFromStroke(dataUriSvg);
        }
      } catch {
        setProcessedSrcFromStroke(src);
        setIsStrokeOnly(false);
        setInlineSvg(null);
      }
    };

    processSvgWithStrokeColor();
  }, [src, strokeColor]);

  const getBackgroundStyle = (): React.CSSProperties => {
    if (color) {
      let backgroundColor = color;

      if (
        backgroundColor &&
        !backgroundColor.startsWith("var(") &&
        !backgroundColor.startsWith("#") &&
        !backgroundColor.startsWith("rgb") &&
        !backgroundColor.startsWith("rgba") &&
        !backgroundColor.startsWith("linear-gradient") &&
        !backgroundColor.startsWith("radial-gradient")
      ) {
        backgroundColor = `var(--${backgroundColor})`;
      }

      return {
        WebkitMaskImage: `url(${processedSrc})`,
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${processedSrc})`,
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        background: backgroundColor,
      } as React.CSSProperties;
    }

    return {
      backgroundImage: `url(${processedSrc})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    };
  };

  const backgroundStyle = getBackgroundStyle();

  if (isStrokeOnly && inlineSvg) {
    return (
      <div
        className={`svg-icon ${className}`}
        onClick={(e: React.MouseEvent) => {
          if (onClick) {
            onClick(e);
          }
        }}
        onTouchStart={(e: React.TouchEvent) => {
          if (onTouchStart) {
            onTouchStart(e);
          }
        }}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={inlineSvg}
          alt=""
          style={{
            width: `${width}px`,
            height: `${height}px`,
            objectFit: "contain",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`svg-icon ${className}`}
      onClick={(e: React.MouseEvent) => {
        if (onClick) {
          onClick(e);
        }
      }}
      onTouchStart={(e: React.TouchEvent) => {
        if (onTouchStart) {
          onTouchStart(e);
        }
      }}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        ...backgroundStyle,
      }}
    />
  );
};

export default SvgIcon;
