/**
 * zodify-json — Core schema generation engine
 *
 * Recursively maps any JavaScript value parsed from JSON into
 * its corresponding Zod schema fragment string.
 */

/**
 * Maps a single JSON value to a Zod schema fragment (single line, no indent).
 * @param {*} value - Any JSON-parsed JavaScript value
 * @param {number} depth - Current recursion depth (for indentation)
 * @returns {string} - Zod schema fragment string
 */
function mapValueToZod(value, depth = 1) {
  if (value === null) return "z.null()";

  const type = typeof value;

  if (type === "string") return "z.string()";
  if (type === "number") return "z.number()";
  if (type === "boolean") return "z.boolean()";

  if (Array.isArray(value)) {
    if (value.length === 0) return "z.array(z.unknown())";
    // Determine array element type from the first element
    const elementSchema = mapValueToZod(value[0], depth);
    return `z.array(${elementSchema})`;
  }

  if (type === "object") {
    return buildObjectSchema(value, depth);
  }

  return "z.unknown()";
}

/**
 * Builds a z.object({...}) schema string for a plain object.
 * @param {Object} obj - A plain JavaScript object
 * @param {number} depth - Current recursion depth
 * @returns {string}
 */
function buildObjectSchema(obj, depth) {
  const indent = "  ".repeat(depth);
  const closingIndent = "  ".repeat(depth - 1);
  const keys = Object.keys(obj);

  if (keys.length === 0) return "z.object({})";

  const fields = keys
    .map((key) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : JSON.stringify(key);
      const valueSchema = mapValueToZod(obj[key], depth + 1);
      return `${indent}${safeKey}: ${valueSchema},`;
    })
    .join("\n");

  return `z.object({\n${fields}\n${closingIndent}})`;
}

/**
 * Main entrypoint: generate a full Zod schema module string from a JSON object.
 * @param {Object|Array} parsed - A parsed JSON value (object or array)
 * @returns {string} - The full importable Zod schema code string
 */
export function generateZodSchema(parsed) {
  let schemaBody;
  let typeName = "GeneratedType";
  let schemaName = "generatedSchema";

  if (Array.isArray(parsed)) {
    if (parsed.length === 0) {
      schemaBody = "z.array(z.unknown())";
    } else {
      const elementSchema = mapValueToZod(parsed[0], 1);
      schemaBody = `z.array(${elementSchema})`;
    }
  } else if (parsed !== null && typeof parsed === "object") {
    schemaBody = buildObjectSchema(parsed, 1);
  } else {
    schemaBody = mapValueToZod(parsed, 1);
  }

  return [
    `import { z } from 'zod';`,
    ``,
    `export const ${schemaName} = ${schemaBody};`,
    ``,
    `// Inferred type representation:`,
    `// export type ${typeName} = z.infer<typeof ${schemaName}>;`,
  ].join("\n");
}
