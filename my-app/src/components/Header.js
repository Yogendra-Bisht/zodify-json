"use client";

import { motion } from "motion/react";
import { Braces, ExternalLink } from "lucide-react";

export default function Header() {
  return (
    <header
      className="relative z-20 flex-shrink-0"
      style={{
        background: "rgba(11,11,13,0.92)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-px header-gradient-line opacity-70"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[52px] items-center justify-between gap-6">

          {/* ── Brand ── */}
          <motion.div
            className="flex items-center gap-3 flex-shrink-0"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Logo mark */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)",
              }}
            >
              <Braces style={{ width: 15, height: 15, color: "#fff", strokeWidth: 2.5 }} />
            </div>

            {/* Wordmark */}
            <div className="flex items-baseline gap-0 leading-none">
              <span
                className="font-mono font-bold tracking-tight"
                style={{ fontSize: "16px", color: "var(--fg)" }}
              >
                zodify
              </span>
              <span
                className="font-mono font-bold tracking-tight"
                style={{ fontSize: "16px", color: "var(--fg-3)" }}
              >
                -json
              </span>
            </div>

            {/* Version pill */}
            <span
              className="hidden sm:flex items-center font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.04em",
                color: "var(--fg-3)",
                background: "var(--surface-3)",
                border: "1px solid var(--border-2)",
                borderRadius: "4px",
                padding: "2px 6px",
              }}
            >
              v1.0.0
            </span>
          </motion.div>

          {/* ── Right nav ── */}
          <motion.nav
            className="flex items-center gap-1"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            {/* Tech badges */}
            <div className="hidden lg:flex items-center gap-1 mr-3">
              {["Zod v3", "TypeScript", "Client-side"].map((badge) => (
                <span
                  key={badge}
                  className="font-mono"
                  style={{
                    fontSize: "11px",
                    color: "var(--fg-3)",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "3px 8px",
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Separator */}
            <div
              className="hidden md:block w-px h-4 mx-2 flex-shrink-0"
              style={{ background: "var(--border-2)" }}
            />

            {/* CTA */}
            <NavLink href="https://digitalheroesco.com">
              Digital Heroes
              <ExternalLink style={{ width: 11, height: 11, opacity: 0.5 }} />
            </NavLink>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-medium transition-all duration-150"
      style={{
        fontSize: "13px",
        color: "var(--fg-2)",
        background: "transparent",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--fg)";
        e.currentTarget.style.background = "var(--surface-3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--fg-2)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </a>
  );
}
