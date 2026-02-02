/**
 * After `next build` with output: "standalone", copy .next/static and public
 * into .next/standalone so _next/static and /public assets are served.
 * Run this after the build step.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standaloneDir = path.join(root, ".next", "standalone");
const staticSource = path.join(root, ".next", "static");
const staticDest = path.join(standaloneDir, ".next", "static");
const publicSource = path.join(root, "public");
const publicDest = path.join(standaloneDir, "public");

if (!fs.existsSync(standaloneDir)) {
  console.log("No .next/standalone found (run next build first). Skipping copy.");
  process.exit(0);
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const s = path.join(src, name);
    const d = path.join(dest, name);
    if (fs.statSync(s).isDirectory()) {
      copyRecursive(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

if (fs.existsSync(staticSource)) {
  copyRecursive(staticSource, staticDest);
  console.log("Copied .next/static into standalone.");
}
if (fs.existsSync(publicSource)) {
  copyRecursive(publicSource, publicDest);
  console.log("Copied public into standalone.");
}
