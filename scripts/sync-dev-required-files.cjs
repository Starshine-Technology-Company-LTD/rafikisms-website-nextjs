const fs = require("fs");
const path = require("path");

const root = process.cwd();
const built = path.join(root, ".next", "required-server-files.json");
const devDir = path.join(root, ".next", "dev");
const devFile = path.join(devDir, "required-server-files.json");
const devFileTypo = path.join(devDir, "required-server-files.json.json");

try {
  fs.mkdirSync(devDir, { recursive: true });
  if (fs.existsSync(built)) {
    fs.copyFileSync(built, devFile);
    fs.copyFileSync(built, devFileTypo);
    process.stderr.write(
      "[sync-dev-required-files] copied required-server-files into .next/dev/\n"
    );
  }
} catch (e) {
  process.stderr.write(
    `[sync-dev-required-files] skipped (${e && e.message ? e.message : e})\n`
  );
}
