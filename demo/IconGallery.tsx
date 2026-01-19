import React, { useState, useMemo } from "react";
import { IconComponent } from "../src/components/Icon/IconComponent";

interface IconGalleryProps {
  icons: string[];
  selectedIcon: string | null;
  onIconClick: (iconName: string) => void;
}

const IconGallery: React.FC<IconGalleryProps> = ({
  icons,
  selectedIcon,
  onIconClick,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return icons;
    const query = searchQuery.toLowerCase();
    return icons.filter((icon) => icon.toLowerCase().includes(query));
  }, [icons, searchQuery]);

  return (
    <div className="icon-gallery">
      <div className="gallery-header">
        <div className="gallery-title-section">
          <h2>Icons</h2>
          {searchQuery && (
            <span className="result-count">
              {filteredIcons.length}{" "}
              {filteredIcons.length === 1 ? "kết quả" : "kết quả"}
            </span>
          )}
        </div>
        <div className="search-box">
          <IconComponent name="icSearch" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm icon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Tìm kiếm icon"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Xóa tìm kiếm"
              title="Xóa"
            >
              <IconComponent name="icClose" size={16} />
            </button>
          )}
        </div>
      </div>

      {filteredIcons.length > 0 ? (
        <div className="icons-grid">
          {filteredIcons.map((iconName) => (
            <button
              key={iconName}
              className={`icon-item ${
                selectedIcon === iconName ? "selected" : ""
              }`}
              onClick={() => onIconClick(iconName)}
              title={iconName}
              aria-label={`Chọn icon ${iconName}`}
            >
              <div className="icon-wrapper">
                <IconComponent name={iconName} size={32} />
              </div>
              <div className="icon-name">{iconName}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <IconComponent name="icSearchEmpty" size={64} />
          <p>Không tìm thấy icon nào</p>
          {searchQuery && (
            <button
              className="clear-search-button"
              onClick={() => setSearchQuery("")}
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default IconGallery;
