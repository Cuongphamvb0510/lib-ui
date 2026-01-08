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
        <h2>Icons</h2>
        <div className="search-box">
          <IconComponent name="icSearch" size={20} />
          <input
            type="text"
            placeholder="Tìm kiếm icon..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="icons-grid">
        {filteredIcons.map((iconName) => (
          <button
            key={iconName}
            className={`icon-item ${
              selectedIcon === iconName ? "selected" : ""
            }`}
            onClick={() => onIconClick(iconName)}
            title={iconName}
          >
            <div className="icon-wrapper">
              <IconComponent name={iconName} size={32} />
            </div>
            <div className="icon-name">{iconName}</div>
          </button>
        ))}
      </div>

      {filteredIcons.length === 0 && (
        <div className="empty-state">
          <IconComponent name="icSearchEmpty" size={64} />
          <p>Không tìm thấy icon nào</p>
        </div>
      )}
    </div>
  );
};

export default IconGallery;
