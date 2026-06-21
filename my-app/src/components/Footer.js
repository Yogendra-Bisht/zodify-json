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
                Yogendra Singh
              </span>
            </div>

            {/* Email */}
            <a
              href="mailto:bishtyogendra96436372@gmail.com"
              className="flex items-center gap-1.5 transition-colors duration-150"
              style={{ fontSize: "13px", color: "var(--fg-3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-3)")}
            >
              <Mail style={{ width: 13, height: 13 }} />
              bishtyogendra96436372@gmail.com
            </a>
          </div>

          {/* Right: GitHub + CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">

            {/* Built for Digital Heroes CTA */}
            <motion.a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2 font-semibold transition-all duration-150"
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

            {/* GitHub repo link */}
            <a
              href="https://github.com/Yogendra-Bisht/zodify-json"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg transition-all duration-150"
              style={{
                width: "36px",
                height: "36px",
                color: "var(--fg-3)",
                background: "var(--surface-3)",
                border: "1px solid var(--border-2)",
              }}
              title="View source on GitHub"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--fg)";
                e.currentTarget.style.background = "var(--surface-2)";
                e.currentTarget.style.borderColor = "var(--fg-3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--fg-3)";
                e.currentTarget.style.background = "var(--surface-3)";
                e.currentTarget.style.borderColor = "var(--border-2)";
              }}
            >
              {/* GitHub mark — inline SVG, no lucide dependency needed */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
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
