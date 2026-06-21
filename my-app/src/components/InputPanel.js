"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardPaste, AlignLeft, Trash2, AlertTriangle } from "lucide-react";
import TabBar from "./TabBar";

const EXAMPLE_JSON = JSON.stringify(
  {
    id: 1,
    name: "Yogendra Bisht",
    email: "yo@example.com",
    isActive: true,
    role: null,
    score: 98.5,
    tags: ["developer", "typescript", "zod"],
    address: {
      street: "123 Dev Lane",
      city: "Codeapolis",
      zip: "400001",
      country: "India",
    },
    metadata: {
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-06-01T12:00:00Z",
      version: 3,
    },
  },
  null,
  2
);

export default function InputPanel({
  tabs,
  activeId,
  onSwitch,
  onAdd,
  onClose,
  value,
  onChange,
  error,
}) {
  const textareaRef = useRef(null);
  const gutterRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    setLineCount(Math.max((value || "").split("\n").length, 1));
  }, [value]);

  const syncScroll = useCallback(() => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const handlePasteExample = useCallback(() => {
    onChange(EXAMPLE_JSON);
    textareaRef.current?.focus();
  }, [onChange]);

  const handleFormat = useCallback(() => {
    try {
      onChange(JSON.stringify(JSON.parse(value), null, 2));
    } catch { /* error shown below */ }
  }, [value, onChange]);

  const handleClear = useCallback(() => {
    onChange("");
    textareaRef.current?.focus();
  }, [onChange]);

  const handleTab = useCallback((e) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const { selectionStart: s, selectionEnd: end } = e.target;
    onChange(value.substring(0, s) + "  " + value.substring(end));
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = s + 2;
        textareaRef.current.selectionEnd = s + 2;
      }
    });
  }, [value, onChange]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Shared tab bar — purple accent for input side */}
      <TabBar
        tabs={tabs}
        activeId={activeId}
        onSwitch={onSwitch}
        onAdd={onAdd}
        onClose={onClose}
        accentColor="var(--accent)"
      />

      {/* Toolbar row */}
      <div
        className="flex items-center justify-between px-3 border-b flex-shrink-0"
        style={{
          background: "var(--surface-2)",
          borderColor: "var(--border)",
          height: "36px",
        }}
      >
        <span
          className="font-mono text-[11px] tracking-[0.08em] uppercase"
          style={{ color: "var(--fg-3)" }}
        >
          JSON Input
        </span>
        <div className="flex items-center gap-0.5">
          <ToolBtn
            icon={<ClipboardPaste style={{ width: 13, height: 13 }} />}
            label="Example"
            onClick={handlePasteExample}
            accent
          />
          <ToolBtn
            icon={<AlignLeft style={{ width: 13, height: 13 }} />}
            label="Prettify"
            onClick={handleFormat}
            disabled={!value}
          />
          <ToolBtn
            icon={<Trash2 style={{ width: 13, height: 13 }} />}
            label="Clear"
            onClick={handleClear}
            disabled={!value}
            danger
          />
        </div>
      </div>

      {/* Code editor area */}
      <div
        className="flex flex-1 min-h-0 overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        {/* Line gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="select-none overflow-hidden flex-shrink-0"
          style={{
            width: "44px",
            background: "var(--surface-2)",
            borderRight: "1px solid var(--border)",
            paddingTop: "14px",
            overflowY: "hidden",
          }}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <div
              key={i}
              className="text-right pr-3 font-mono tabular-nums"
              style={{
                color: "var(--fg-3)",
                fontSize: "11px",
                lineHeight: "24px",
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id="json-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleTab}
          placeholder={'{\n  "key": "value"\n}'}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          className="flex-1 w-full font-mono p-3.5 focus:outline-none"
          style={{
            background: "transparent",
            color: error ? "var(--error)" : "var(--fg)",
            caretColor: "var(--accent)",
            fontSize: "13px",
            lineHeight: "24px",
          }}
        />
      </div>

      {/* Error bar */}
      <AnimatePresence>
        {error && (
          <motion.div
            className="flex items-start gap-2 px-4 py-2.5 text-[12px] font-mono flex-shrink-0 border-t"
            style={{
              background: "rgba(248,113,113,0.05)",
              borderColor: "rgba(248,113,113,0.15)",
              color: "var(--error)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <AlertTriangle style={{ width: 13, height: 13, flexShrink: 0, marginTop: 1 }} />
            <span className="break-all leading-5">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToolBtn({ icon, label, onClick, disabled, danger, accent }) {
  const baseColor = danger ? "var(--error)" : accent ? "var(--accent)" : "var(--fg-3)";
  const hoverBg = danger
    ? "rgba(248,113,113,0.07)"
    : accent
    ? "var(--accent-bg)"
    : "rgba(255,255,255,0.04)";
  const hoverColor = danger ? "var(--error)" : accent ? "var(--accent-light)" : "var(--fg-2)";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={label}
      className="flex items-center gap-1.5 rounded px-2 py-1 transition-all duration-100 disabled:opacity-30 disabled:pointer-events-none"
      style={{ color: baseColor, background: "transparent", fontSize: "12px", fontWeight: 500 }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.color = hoverColor;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = baseColor;
      }}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
