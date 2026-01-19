import React, { useState } from "react";
import IconGallery from "./IconGallery";
import IconDetail from "./IconDetail";
import Drawer from "./Drawer";
import { iconsData } from "../src/components/Icon/icons-data";

export interface IconInfo {
  name: string;
  description: string;
}

function App() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const iconNames = Object.keys(iconsData);
  const selectedIconInfo: IconInfo | null = selectedIcon
    ? {
        name: selectedIcon,
        description: selectedIcon,
      }
    : null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h2>VBA UI - Icon Gallery</h2>
              <p className="subtitle">
                Thư viện icon cho React - <strong>{iconNames.length}</strong>{" "}
                icons có sẵn
              </p>
            </div>
          </div>
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
          </div>
        </div>
      </main>

      <Drawer
        isOpen={!!selectedIconInfo}
        onClose={() => setSelectedIcon(null)}
        position="right"
        width="600px"
        title={selectedIconInfo?.name}
      >
        {selectedIconInfo && (
          <IconDetail
            icon={selectedIconInfo}
            onClose={() => setSelectedIcon(null)}
          />
        )}
      </Drawer>
    </div>
  );
}

export default App;
