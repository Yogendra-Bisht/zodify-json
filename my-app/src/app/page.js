"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion } from "motion/react";
import { generateZodSchema } from "@/lib/zodGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InputPanel from "@/components/InputPanel";
import OutputPanel from "@/components/OutputPanel";

// ─── Tab factory ──────────────────────────────────────────────────────────────
const makeTab = (id) => ({ id, label: `Tab ${id}`, input: "" });

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const nextId = useRef(2);

  // All tabs live here — data is NOT wiped on tab switch, only on browser refresh
  const [tabs, setTabs] = useState([makeTab(1)]);
  const [activeId, setActiveId] = useState(1);

  // Derived output / error for the currently active tab
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  // The active tab object — always stays in sync
  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeId) ?? tabs[0],
    [tabs, activeId]
  );

  // Recompute schema whenever the active tab's JSON input changes
  useEffect(() => {
    const trimmed = activeTab.input.trim();
    if (!trimmed) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      setOutput(generateZodSchema(JSON.parse(trimmed)));
      setError(null);
    } catch (e) {
      setOutput("");
      setError(e.message);
    }
  }, [activeTab.input]);

  // ─── Tab operations ─────────────────────────────────────────────────────────

  /** Update the JSON input for the active tab only */
  const updateInput = useCallback(
    (val) => {
      setTabs((prev) =>
        prev.map((t) => (t.id === activeId ? { ...t, input: val } : t))
      );
    },
    [activeId]
  );

  /** Add a fresh blank tab and switch to it */
  const addTab = useCallback(() => {
    const id = nextId.current++;
    setTabs((prev) => [...prev, makeTab(id)]);
    setActiveId(id);
  }, []);

  /**
   * Close a tab. If it was the active tab, switch to the nearest sibling.
   * The last remaining tab cannot be closed.
   */
  const closeTab = useCallback((id) => {
    setTabs((prev) => {
      if (prev.length <= 1) return prev; // guard: never close the last tab
      const idx = prev.findIndex((t) => t.id === id);
      const filtered = prev.filter((t) => t.id !== id);

      // Adjust active tab if we're closing the one that's selected
      setActiveId((current) => {
        if (current !== id) return current;
        // Switch to the tab immediately to the left, else the first available
        return (filtered[Math.max(0, idx - 1)] ?? filtered[0]).id;
      });

      return filtered;
    });
  }, []);

  /** Switch both panels to the given tab id simultaneously */
  const switchTab = useCallback((id) => setActiveId(id), []);

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      <Header />

      <main className="flex flex-col flex-1">
        <Hero />

        {/* ── Editor shell ── */}
        <motion.div
          className="flex flex-1 px-4 sm:px-6 lg:px-8 pb-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto rounded-xl overflow-hidden"
            style={{
              border: "1px solid var(--border)",
              minHeight: "clamp(440px, 60vh, 720px)",
              background: "var(--surface)",
              boxShadow:
                "0 2px 4px rgba(0,0,0,0.5), 0 12px 40px rgba(0,0,0,0.35)",
            }}
          >
            {/* Left: JSON Input */}
            <div
              className="flex flex-col flex-1 min-h-0 min-w-0"
              style={{ borderRight: "1px solid var(--border)" }}
            >
              <InputPanel
                tabs={tabs}
                activeId={activeId}
                onSwitch={switchTab}
                onAdd={addTab}
                onClose={closeTab}
                value={activeTab.input}
                onChange={updateInput}
                error={error}
              />
            </div>

            {/* Mobile separator */}
            <div
              className="lg:hidden h-px flex-shrink-0"
              style={{ background: "var(--border)" }}
            />

            {/* Right: Zod Output */}
            <div className="flex flex-col flex-1 min-h-0 min-w-0">
              <OutputPanel
                tabs={tabs}
                activeId={activeId}
                onSwitch={switchTab}
                onAdd={addTab}
                onClose={closeTab}
                code={output}
              />
            </div>
          </div>
        </motion.div>

        {/* Status strip */}
        <StatusStrip
          hasInput={!!activeTab.input}
          hasOutput={!!output}
          hasError={!!error}
          tabCount={tabs.length}
        />
      </main>

      <Footer />
    </div>
  );
}

// ─── Status strip ─────────────────────────────────────────────────────────────
function StatusStrip({ hasInput, hasOutput, hasError, tabCount }) {
  return (
    <div
      className="flex items-center gap-4 px-4 sm:px-6 lg:px-8 pb-3 max-w-7xl mx-auto w-full"
      style={{ fontSize: "11px", fontFamily: "var(--font-mono)" }}
    >
      {/* JSON validity */}
      <Pip
        on={hasInput && !hasError}
        offDim={!hasInput}
        label={!hasInput ? "empty" : hasError ? "invalid json" : "valid json"}
        onColor="var(--success)"
        offColor="var(--error)"
      />

      {/* Schema state */}
      <Pip
        on={hasOutput}
        offDim={!hasInput}
        label={hasOutput ? "schema ready" : "awaiting input"}
        onColor="var(--teal)"
        offColor="var(--fg-3)"
      />

      {/* Tab count */}
      <span style={{ color: "var(--fg-3)" }}>
        {tabCount} tab{tabCount !== 1 ? "s" : ""} open
      </span>

      <span className="ml-auto" style={{ color: "var(--fg-3)", opacity: 0.5 }}>
        zod v3 · ts
      </span>
    </div>
  );
}

function Pip({ on, offDim, label, onColor, offColor }) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block rounded-full flex-shrink-0"
        style={{
          width: 6,
          height: 6,
          background: on ? onColor : offColor,
          opacity: offDim ? 0.25 : on ? 0.85 : 0.55,
          transition: "background 0.2s, opacity 0.2s",
        }}
      />
      <span
        style={{
          color: on ? onColor : offDim ? "var(--fg-3)" : offColor,
          opacity: offDim ? 0.35 : on ? 0.75 : 0.55,
          transition: "color 0.2s, opacity 0.2s",
        }}
      >
        {label}
      </span>
    </div>
  );
}
