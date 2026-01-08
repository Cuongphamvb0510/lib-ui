import React, { useState } from "react";
import IconGallery from "./IconGallery";
import IconDetail from "./IconDetail";
import { iconsData } from "../src/components/Icon/icons-data";

export interface IconInfo {
  name: string;
  description: string;
}

const iconDescriptions: Record<string, string> = {
  icArrowDown: "Mũi tên xuống",
  icArrowRight: "Mũi tên phải",
  icBack: "Nút quay lại",
  icCalendar: "Lịch",
  icCamera: "Máy ảnh",
  icCheckDone: "Dấu tích hoàn thành",
  icChevronLeft: "Chevron trái",
  icChevronRight: "Chevron phải",
  icChevronRight2: "Chevron phải 2",
  icClearData: "Xóa dữ liệu",
  icClose: "Đóng",
  icContacts: "Danh bạ",
  icDelete: "Xóa",
  icError: "Lỗi",
  icFile: "Tệp",
  icInfo: "Thông tin",
  icInfoOutline: "Thông tin viền",
  icLinkEmpty: "Liên kết trống",
  icListEmpty: "Danh sách trống",
  icNotificationEmpty: "Thông báo trống",
  icSearch: "Tìm kiếm",
  icSearchEmpty: "Tìm kiếm trống",
  icSuccess: "Thành công",
  icTick: "Dấu tích",
  icUpload: "Tải lên",
  icUserAdd: "Thêm người dùng",
  icWarning: "Cảnh báo",
  logoAgribank: "Logo Agribank",
};

function App() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const iconNames = Object.keys(iconsData);
  const selectedIconInfo: IconInfo | null = selectedIcon
    ? {
        name: selectedIcon,
        description: iconDescriptions[selectedIcon] || "",
      }
    : null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>VBA UI - Icon Gallery</h1>
          <p className="subtitle">
            Thư viện icon cho React - {iconNames.length} icons có sẵn
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="layout">
            <div className="layout-left">
              <IconGallery
                icons={iconNames}
                selectedIcon={selectedIcon}
                onIconClick={setSelectedIcon}
              />
            </div>
            {selectedIconInfo && (
              <div className="layout-right">
                <IconDetail
                  icon={selectedIconInfo}
                  onClose={() => setSelectedIcon(null)}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
