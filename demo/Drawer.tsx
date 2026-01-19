import React, { useEffect } from "react";
import { IconComponent } from "../src/components/Icon/IconComponent";
import "./Drawer.css";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right";
  width?: string;
  title?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "600px",
  title,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className="drawer-overlay" onClick={handleOverlayClick} />
      <div
        className={`drawer drawer-${position}`}
        style={{ width }}
        onClick={handleDrawerClick}
      >
        <div className="drawer-header">
          {title && <h3 className="drawer-title">{title}</h3>}
          <button
            className="drawer-close-button"
            onClick={onClose}
            title="Đóng"
            aria-label="Đóng"
          >
            <IconComponent name="icRemoveCircleOutline" />
          </button>
        </div>
        <div className="drawer-content">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
