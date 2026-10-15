import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const workspace = process.cwd();
const outputPath = resolve(workspace, "dist", "index.html");
const serverEntryPath = resolve(workspace, ".prerender", "entry-server.js");
const html = await readFile(outputPath, "utf8");
const { render } = await import(pathToFileURL(serverEntryPath).href);
const markup = render();
const root = '<div id="root"></div>';

if (!html.includes(root)) {
  throw new Error("The Vite HTML output does not contain the expected React root.");
}

await writeFile(outputPath, html.replace(root, `<div id="root">${markup}</div>`));
await rm(resolve(workspace, ".prerender"), { recursive: true, force: true });
