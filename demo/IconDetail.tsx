import React, { useState } from "react";
import { IconComponent } from "../src/components/Icon/IconComponent";
import type { IconInfo } from "./App";

interface IconDetailProps {
  icon: IconInfo;
  onClose: () => void;
}

const IconDetail: React.FC<IconDetailProps> = ({ icon, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const importCode = `import { IconComponent } from "vba-ui";`;
  const usageCode = `<IconComponent name="${icon.name}" />`;
  const usageWithSize = `<IconComponent name="${icon.name}" size={32} />`;
  const usageWithColor = `<IconComponent name="${icon.name}" color="#ff6b6b" />`;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const colorOptions = [
    { name: "currentColor", value: "currentColor", label: "Mặc định" },
    { name: "black", value: "#000000", label: "Đen" },
    { name: "gray", value: "#666666", label: "Xám" },
    { name: "primary", value: "#fc6f20", label: "Primary" },
    { name: "success", value: "#10b981", label: "Success" },
    { name: "error", value: "#ef4444", label: "Error" },
  ];

  const [selectedColor, setSelectedColor] = useState("currentColor");

  return (
    <div className="icon-detail">
      <div className="detail-header">
        <h3>{icon.name}</h3>
        <button className="close-button" onClick={onClose} title="Đóng">
          <IconComponent name="icClose" size={20} />
        </button>
      </div>

      <div className="detail-content">
        <div className="icon-preview">
          <div className="preview-wrapper">
            <IconComponent name={icon.name} size={64} color={selectedColor} />
          </div>
          {icon.description && (
            <p className="icon-description">{icon.description}</p>
          )}
        </div>

        <div className="color-selector">
          <label>Màu sắc:</label>
          <div className="color-options">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                className={`color-option ${
                  selectedColor === color.value ? "active" : ""
                }`}
                onClick={() => setSelectedColor(color.value)}
                title={color.label}
              >
                <div
                  className="color-swatch"
                  style={{ backgroundColor: color.value }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="code-section">
          <div className="code-block">
            <div className="code-header">
              <span>Import</span>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(importCode, "import")}
                title="Sao chép"
              >
                {copiedId === "import" ? "Đã sao chép!" : "Sao chép"}
              </button>
            </div>
            <pre className="code-content">
              <code>{importCode}</code>
            </pre>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span>Cách sử dụng</span>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(usageCode, "usage")}
                title="Sao chép"
              >
                {copiedId === "usage" ? "Đã sao chép!" : "Sao chép"}
              </button>
            </div>
            <pre className="code-content">
              <code>{usageCode}</code>
            </pre>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span>Với kích thước</span>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(usageWithSize, "size")}
                title="Sao chép"
              >
                {copiedId === "size" ? "Đã sao chép!" : "Sao chép"}
              </button>
            </div>
            <pre className="code-content">
              <code>{usageWithSize}</code>
            </pre>
          </div>

          <div className="code-block">
            <div className="code-header">
              <span>Với màu sắc</span>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(usageWithColor, "color")}
                title="Sao chép"
              >
                {copiedId === "color" ? "Đã sao chép!" : "Sao chép"}
              </button>
            </div>
            <pre className="code-content">
              <code>{usageWithColor}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconDetail;
