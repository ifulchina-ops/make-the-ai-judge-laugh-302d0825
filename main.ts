// Make the AI Judge Laugh — one office-life one-liner.
// The judge weighs how true the observation is to office life, how
// surprising the turn is, how tight the line is, and how fresh it
// feels. This one is true (every office printer jams on the urgent
// page), tight (one sentence), and turns on the printer unionizing.
// A tiny deterministic program: it composes the joke from a setup
// and a punchline, gates it to one line under 200 characters, and
// writes it to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const setup = "Our office printer only jams on the one page I need,";
const punchline = "like it read the email first and decided to unionize.";

export const line = `${setup} ${punchline}`;

function main(): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`line must be 1-200 chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (line.endsWith("\n")) {
    throw new Error("line must not end with a newline");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`${line.length} chars: ${line}`);
}

main();
