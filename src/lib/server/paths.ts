import "server-only";
import path from "node:path";
import fs from "node:fs";

export const DATA_DIR = path.resolve(process.env.DATA_DIR || path.join(process.cwd(), "data"));
export const PROJECTS_DIR = path.join(DATA_DIR, "projects");

export function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

const SAFE_ID = /^[a-zA-Z0-9_-]{1,64}$/;

export function assertSafeId(id: string): string {
  if (!SAFE_ID.test(id)) throw new Error(`Invalid id: ${id}`);
  return id;
}

export function projectDir(id: string) {
  return path.join(PROJECTS_DIR, assertSafeId(id));
}

/** Resolve a project-relative file and make sure it cannot escape the project folder. */
export function projectFile(id: string, rel: string) {
  const base = projectDir(id);
  const full = path.resolve(base, rel);
  if (full !== base && !full.startsWith(base + path.sep)) throw new Error("Path escapes project directory");
  return full;
}
