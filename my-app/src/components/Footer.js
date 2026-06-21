"use client";

import { motion } from "motion/react";
import { Mail, ExternalLink, Braces } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="flex-shrink-0 border-t"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Main footer row */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 py-5">

          {/* Left: brand + author */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6">
            {/* Mini wordmark */}
            <div className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--teal) 100%)",
                }}
              >
                <Braces style={{ width: 12, height: 12, color: "#fff", strokeWidth: 2.5 }} />
              </div>
              <span
                className="font-mono font-semibold"
                style={{ fontSize: "13px", color: "var(--fg-2)" }}
              >
                zodify-json
              </span>
            </div>

            {/* Separator */}
            <div
              className="hidden sm:block h-4 w-px flex-shrink-0"
              style={{ background: "var(--border-2)" }}
            />

            {/* Author */}
            <div
              className="flex items-center gap-1.5"
              style={{ fontSize: "13px", color: "var(--fg-3)" }}
            >
              Built by
              <span style={{ color: "var(--fg-2)", fontWeight: 500 }}>
                Yogendra Bisht
              </span>
            </div>

            {/* Email */}
            <a
              href="mailto:yogendrabisht.dev@gmail.com"
              className="flex items-center gap-1.5 transition-colors duration-150"
              style={{ fontSize: "13px", color: "var(--fg-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
            >
              <Mail style={{ width: 13, height: 13 }} />
              yogendrabisht.dev@gmail.com
            </a>
          </div>

          {/* Right: CTA */}
          <motion.a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all duration-150 flex-shrink-0"
            style={{
              fontSize: "13px",
              color: "var(--accent-light, #9d7fff)",
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-bd)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(124,92,252,0.13)";
              e.currentTarget.style.borderColor = "rgba(124,92,252,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent-bg)";
              e.currentTarget.style.borderColor = "var(--accent-bd)";
            }}
          >
            Built for Digital Heroes
            <ExternalLink style={{ width: 13, height: 13, opacity: 0.6 }} />
          </motion.a>
        </div>

        {/* Bottom strip */}
        <div
          className="flex items-center justify-between py-3 border-t"
          style={{ borderColor: "var(--border)", fontSize: "11px", color: "var(--fg-3)" }}
        >
          <span className="font-mono opacity-50">
            © {new Date().getFullYear()} zodify-json · MIT License
          </span>
          <span className="font-mono opacity-40">
            Zero-cost · Client-side · Open source
          </span>
        </div>
      </div>
    </footer>
  );
}
