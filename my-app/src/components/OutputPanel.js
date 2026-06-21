"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Check, FileCode } from "lucide-react";
import { highlightZodCode } from "@/lib/highlighter";
import TabBar from "./TabBar";

export default function OutputPanel({
  tabs,
  activeId,
  onSwitch,
  onAdd,
  onClose,
  code,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const lineCount = code ? code.split("\n").length : 0;
  const highlighted = code ? highlightZodCode(code) : null;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Shared tab bar — teal accent for output side */}
      <TabBar
        tabs={tabs}
        activeId={activeId}
        onSwitch={onSwitch}
        onAdd={onAdd}
        onClose={onClose}
        accentColor="var(--teal)"
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
          Zod Schema
          {code && (
            <span
              className="ml-2 normal-case"
              style={{ color: "var(--fg-3)", opacity: 0.6 }}
            >
              · {lineCount} lines
            </span>
          )}
        </span>

        {/* Copy button */}
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.div
              key="copied"
              className="flex items-center gap-1.5 rounded px-2.5 py-1"
              style={{
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.18)",
                color: "var(--success)",
                fontSize: "12px",
                fontWeight: 500,
              }}
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 0.1 }}
            >
              <Check style={{ width: 13, height: 13, strokeWidth: 2.5 }} />
              Copied!
            </motion.div>
          ) : (
            <motion.button
              key="copy"
              onClick={handleCopy}
              disabled={!code}
              className="flex items-center gap-1.5 rounded px-2.5 py-1 transition-all duration-100 disabled:opacity-25 disabled:pointer-events-none"
              style={{
                background: "transparent",
                border: "1px solid var(--border-2)",
                color: "var(--fg-3)",
                fontSize: "12px",
                fontWeight: 500,
              }}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.1 }}
              onMouseEnter={(e) => {
                if (!code) return;
                e.currentTarget.style.borderColor = "var(--accent-bd)";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.background = "var(--accent-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-2)";
                e.currentTarget.style.color = "var(--fg-3)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <Copy style={{ width: 13, height: 13 }} />
              Copy
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Code display */}
      <div
        className="relative flex flex-1 min-h-0 overflow-hidden"
        style={{ background: "var(--surface)" }}
      >
        {code ? (
          <div className="flex w-full min-h-0 overflow-auto">
            {/* Line gutter */}
            <div
              aria-hidden="true"
              className="select-none flex-shrink-0 sticky left-0"
              style={{
                width: "44px",
                background: "var(--surface-2)",
                borderRight: "1px solid var(--border)",
                paddingTop: "14px",
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

            {/* Highlighted output */}
            <pre
              className="flex-1 font-mono p-3.5 min-w-0"
              style={{
                color: "var(--fg)",
                fontSize: "13px",
                lineHeight: "24px",
                whiteSpace: "pre",
                overflowX: "visible",
              }}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center select-none">
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--border)",
        }}
      >
        <FileCode style={{ width: 18, height: 18, color: "var(--fg-3)" }} />
      </div>
      <div>
        <p style={{ color: "var(--fg-2)", fontSize: "13px", fontWeight: 500, marginBottom: 4 }}>
          No output yet
        </p>
        <p style={{ color: "var(--fg-3)", fontSize: "12px" }}>
          Paste valid JSON on the left to generate a schema
        </p>
      </div>
    </div>
  );
}
