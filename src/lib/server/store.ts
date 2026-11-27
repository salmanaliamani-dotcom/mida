import "server-only";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  Project,
  STAGE_ORDER,
  StageName,
  StageState,
  defaultProjectSettings,
  emptyAsset,
} from "@/lib/types";
import { PROJECTS_DIR, ensureDir, projectDir } from "./paths";

// Projects are stored as JSON files on disk: data/projects/<id>/project.json,
// next to the media they reference. Writes are atomic (write temp file + rename),
// and serialized per project through an in-process lock so concurrent pipeline
// steps never clobber each other.

const locks = new Map<string, Promise<unknown>>();

function withLock<T>(id: string, fn: () => Promise<T> | T): Promise<T> {
  const prev = locks.get(id) ?? Promise.resolve();
  const next = prev.then(fn, fn);
  locks.set(
    id,
    next.catch(() => undefined),
  );
  return next;
}

function file(id: string) {
  return path.join(projectDir(id), "project.json");
}

function writeAtomic(target: string, data: string) {
  const tmp = `${target}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(tmp, data);
  fs.renameSync(tmp, target);
}

export function newId(prefix = "") {
  return prefix + crypto.randomBytes(6).toString("hex");
}

const freshStages = (): Record<StageName, StageState> =>
  Object.fromEntries(STAGE_ORDER.map((s) => [s, { status: "idle", progress: 0 } as StageState])) as Record<
    StageName,
    StageState
  >;

export function createProject(name: string, idea: string, settings?: Partial<Project["settings"]>): Project {
  const id = newId("p_");
  const now = new Date().toISOString();
  const project: Project = {
    id,
    name: name || "Untitled project",
    idea,
    createdAt: now,
    updatedAt: now,
    settings: { ...defaultProjectSettings(), ...settings },
    characters: [],
    scenes: [],
    music: emptyAsset(),
    final: emptyAsset(),
    stages: freshStages(),
    log: [],
  };
  ensureDir(path.join(projectDir(id), "media"));
  writeAtomic(file(id), JSON.stringify(project, null, 2));
  return project;
}

export function readProject(id: string): Project | null {
  try {
    const raw = fs.readFileSync(file(id), "utf8");
    const p = JSON.parse(raw) as Project;
    // forward-compatible defaults
    p.stages = { ...freshStages(), ...p.stages };
    p.log ??= [];
    return p;
  } catch {
    return null;
  }
}

export function listProjects(): Project[] {
  ensureDir(PROJECTS_DIR);
  return fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => readProject(d.name))
    .filter((p): p is Project => !!p)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

/** Read-modify-write a project under its lock. */
export function updateProject(id: string, mutate: (p: Project) => void): Promise<Project> {
  return withLock(id, () => {
    const p = readProject(id);
    if (!p) throw new Error(`Project ${id} not found`);
    mutate(p);
    p.updatedAt = new Date().toISOString();
    if (p.log.length > 300) p.log = p.log.slice(-300);
    writeAtomic(file(id), JSON.stringify(p, null, 2));
    return p;
  });
}

export function deleteProject(id: string) {
  return withLock(id, () => {
    fs.rmSync(projectDir(id), { recursive: true, force: true });
  });
}

export function logLine(p: Project, level: "info" | "error", message: string) {
  p.log.push({ at: new Date().toISOString(), level, message });
}
