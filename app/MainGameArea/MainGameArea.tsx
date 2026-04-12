import { useState, useRef } from "react";
import "./MainGameArea.css";
import { SAFE_URL } from "../games/Sources";

interface Tab {
  id: string;
  label: string;
  state: boolean;
}

export function MainGameArea() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [tabStates, setTabStates] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const tabs: Tab[] = [
    { id: "tab1", label: "Tab 1", state: tabStates[0]},
    { id: "tab2", label: "Tab 2", state: tabStates[1]},
    { id: "tab3", label: "Tab 3", state: tabStates[2]},
  ];

  const handlePowerOn = () => {
    const newStates = [...tabStates];
    newStates[activeTabIndex] = true;
    setTabStates(newStates);
  };

  const handleStop = () => {
    const newStates = [...tabStates];
    newStates[activeTabIndex] = false;
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
          disabled={tabs[activeTabIndex].state === true}
        >
          Power On
        </button>
        <button
          onClick={handleStop}
          className="btn btn-stop"
          disabled={tabs[activeTabIndex].state !== true}
        >
          Stop
        </button>
        <button
          onClick={handleFullScreen}
          className="btn btn-fullscreen"
          disabled={tabs[activeTabIndex].state !== true}
          title="Full screen"
        >
          Full Screen
        </button>
        <span className={`status ${tabs[activeTabIndex].state === true ? "active" : "inactive"}`}>
          {tabs[activeTabIndex].state === true ? "ON" : "OFF"}
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
              {tabs[activeTabIndex].state === true && (
                <SAFE_URL />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
