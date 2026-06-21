"use client";

import { useRef } from "react";
import { Plus, X } from "lucide-react";

/**
 * Reusable synchronized tab bar.
 * Both Input and Output panels render this same component wired to shared state,
 * so clicking a tab on either side switches both panels simultaneously.
 */
export default function TabBar({ tabs, activeId, onSwitch, onAdd, onClose, accentColor }) {
  const scrollRef = useRef(null);

  // Guard against undefined/empty tabs during SSR or initial render
  if (!tabs || tabs.length === 0) return null;

  return (
    <div
      className="flex items-stretch flex-shrink-0 border-b"
      style={{
        background: "var(--surface-2)",
        borderColor: "var(--border)",
        height: "38px",
        overflow: "hidden",
      }}
    >
      {/* Horizontally scrollable tab list */}
      <div
        ref={scrollRef}
        className="no-scrollbar flex items-stretch flex-1 min-w-0 overflow-x-auto"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSwitch(tab.id)}
              className="group relative flex items-center gap-2 px-3.5 select-none flex-shrink-0 transition-all duration-100"
              style={{
                color: isActive ? "var(--fg)" : "var(--fg-3)",
                background: isActive ? "var(--surface)" : "transparent",
                borderRight: "1px solid var(--border)",
                // Active bottom-border indicator
                boxShadow: isActive
                  ? `inset 0 -2px 0 0 ${accentColor}`
                  : "none",
                fontSize: "12px",
                fontWeight: isActive ? 500 : 400,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--fg-2)";
                  e.currentTarget.style.background = "var(--surface-3)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "var(--fg-3)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {/* Dot indicator */}
              <span
                className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0 transition-all duration-150"
                style={{
                  background: isActive ? accentColor : "var(--border-2)",
                }}
              />

              {/* Label */}
              <span className="font-mono">{tab.label}</span>

              {/* Close — only visible on hover, only when >1 tab */}
              {tabs.length > 1 && (
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose(tab.id);
                  }}
                  className="flex items-center justify-center h-4 w-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-100 ml-0.5"
                  style={{ color: "var(--fg-3)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--error)";
                    e.currentTarget.style.background = "rgba(248,113,113,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--fg-3)";
                    e.currentTarget.style.background = "transparent";
                  }}
                  title="Close tab"
                >
                  <X style={{ width: "10px", height: "10px" }} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Add-tab button */}
      <div
        className="flex items-center justify-center flex-shrink-0 border-l"
        style={{ borderColor: "var(--border)", width: "38px" }}
      >
        <button
          onClick={onAdd}
          className="flex items-center justify-center rounded transition-all duration-100"
          style={{
            color: "var(--fg-3)",
            background: "transparent",
            width: "26px",
            height: "26px",
          }}
          title="New tab  (adds a fresh workspace)"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--fg)";
            e.currentTarget.style.background = "var(--surface-3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--fg-3)";
            e.currentTarget.style.background = "transparent";
          }}
        >
          <Plus style={{ width: "14px", height: "14px" }} />
        </button>
      </div>
    </div>
  );
}
