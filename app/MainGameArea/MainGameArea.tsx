import { useState, useRef } from "react";
import "./MainGameArea.css";
import { GN_MATH } from "../games/Games";

enum TabState {
  ON = "on",
  OFF = "off",
}

interface Tab {
  id: string;
  label: string;
  state: TabState;
}

export function MainGameArea() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [tabStates, setTabStates] = useState<TabState[]>([
    TabState.OFF,
    TabState.OFF,
    TabState.OFF,
  ]);

  const tabs: Tab[] = [
    { id: "tab1", label: "Tab 1", state: tabStates[0]},
    { id: "tab2", label: "Tab 2", state: tabStates[1]},
    { id: "tab3", label: "Tab 3", state: tabStates[2]},
  ];

  const handlePowerOn = () => {
    const newStates = [...tabStates];
    newStates[activeTabIndex] = TabState.ON;
    setTabStates(newStates);
  };

  const handleStop = () => {
    const newStates = [...tabStates];
    newStates[activeTabIndex] = TabState.OFF;
    setTabStates(newStates);
  };

  const handlePrevTab = () => {
    setActiveTabIndex((prev) => (prev === 0 ? tabs.length - 1 : prev - 1));
  };

  const handleNextTab = () => {
    setActiveTabIndex((prev) => (prev === tabs.length - 1 ? 0 : prev + 1));
  };

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleFullScreen = () => {
    if (!contentRef.current) return;
    if (contentRef.current.requestFullscreen) {
      contentRef.current.requestFullscreen();
    } else if ((contentRef.current as any).webkitRequestFullscreen) {
      (contentRef.current as any).webkitRequestFullscreen();
    } else if ((contentRef.current as any).msRequestFullscreen) {
      (contentRef.current as any).msRequestFullscreen();
    }
  };

  return (
    <main className="game-area">
      <div className="controls">
        <button
          onClick={handlePowerOn}
          className="btn btn-power-on"
          disabled={tabs[activeTabIndex].state === TabState.ON}
        >
          Power On
        </button>
        <button
          onClick={handleStop}
          className="btn btn-stop"
          disabled={tabs[activeTabIndex].state !== TabState.ON}
        >
          Stop
        </button>
        <button
          onClick={handleFullScreen}
          className="btn btn-fullscreen"
          disabled={tabs[activeTabIndex].state !== TabState.ON}
          title="Full screen"
        >
          Full Screen
        </button>
        <span className={`status ${tabs[activeTabIndex].state === TabState.ON ? "active" : "inactive"}`}>
          {tabs[activeTabIndex].state === TabState.ON ? "ON" : "OFF"}
        </span>
      </div>

      <div className="tabs-container">
        <div className="tabs-header">
          <button onClick={handlePrevTab} className="arrow-btn">
            ←
          </button>
          <div className="tab-indicator">
            {activeTabIndex + 1} / {tabs.length}
          </div>
          <button onClick={handleNextTab} className="arrow-btn">
            →
          </button>
        </div>

        <div className="w-full h-full tabs-content" ref={contentRef}>
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`tab-pane ${index === activeTabIndex ? "visible" : "hidden"}`}
            >
              {tabs[activeTabIndex].state === TabState.ON && (
                <GN_MATH />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const resources = [];
