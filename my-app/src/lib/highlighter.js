/**
 * Lightweight syntax highlighter for generated Zod schema code.
 * Returns an HTML string with <span> tokens for CSS coloring.
 */

const JS_KEYWORDS = new Set(["import", "from", "export", "const", "type", "typeof"]);
const ZOD_METHODS = new Set([
  "string", "number", "boolean", "null", "unknown",
  "object", "array", "infer", "optional", "nullable",
]);

export function highlightZodCode(code) {
  return code
    .split("\n")
    .map(line => {
      // Full-line comments
      const trimmed = line.trimStart();
      if (trimmed.startsWith("//")) {
        return `<span class="tok-comment">${esc(line)}</span>`;
      }
      return tokenizeLine(line);
    })
    .join("\n");
}

function tokenizeLine(line) {
  let out = "";
  let i = 0;
  const n = line.length;

  while (i < n) {
    const ch = line[i];

    // String literal (single or double quote)
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < n) {
        if (line[j] === "\\") { j += 2; continue; }
        if (line[j] === ch) { j++; break; }
        j++;
      }
      out += `<span class="tok-str">${esc(line.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Identifiers
    if (/[a-zA-Z_$]/.test(ch)) {
      let j = i;
      while (j < n && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      if (JS_KEYWORDS.has(word)) {
        out += `<span class="tok-kw">${esc(word)}</span>`;
      } else if (word === "z") {
        out += `<span class="tok-fn">${esc(word)}</span>`;
      } else if (ZOD_METHODS.has(word)) {
        out += `<span class="tok-type">${esc(word)}</span>`;
      } else {
        out += `<span class="tok-var">${esc(word)}</span>`;
      }
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < n && /[0-9.]/.test(line[j])) j++;
      out += `<span class="tok-num">${esc(line.slice(i, j))}</span>`;
      i = j;
      continue;
    }

    // Punctuation
    if (/[{}()[\],:;=.]/.test(ch)) {
      out += `<span class="tok-punct">${esc(ch)}</span>`;
      i++;
      continue;
    }

    // Whitespace and other chars — pass through
    out += esc(ch);
    i++;
  }

  return out;
}

function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
