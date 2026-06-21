"use client";

import { motion } from "motion/react";

export default function Hero() {
  return (
    <motion.section
      className="px-5 sm:px-8 pt-12 pb-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Eyebrow */}
        <p
          className="mb-3 font-mono text-xs font-medium tracking-[0.12em] uppercase"
          style={{ color: "var(--accent)" }}
        >
          Developer Utility
        </p>

        {/* Headline */}
        <h1
          className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.15] mb-4"
          style={{ color: "var(--fg)" }}
        >
          JSON to{" "}
          <span className="gradient-text">Zod Schema</span>
          {" "}Generator
        </h1>

        {/* Subline */}
        <p
          className="max-w-lg text-[15px] leading-relaxed"
          style={{ color: "var(--fg-2)" }}
        >
          Paste any JSON object and instantly get a valid, typed{" "}
          <code
            className="font-mono text-[13px] px-1.5 py-px rounded-md"
            style={{ background: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-bd)" }}
          >
            z.object(&#123;&#125;)
          </code>{" "}
          schema — recursive, zero dependencies, runs entirely in your browser.
        </p>
      </div>
    </motion.section>
  );
}
