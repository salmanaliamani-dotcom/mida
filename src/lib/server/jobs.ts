import "server-only";
import { STAGE_ORDER, StageName } from "@/lib/types";
import { CancelledError, runStage } from "./pipeline";
import { logLine, newId, readProject, updateProject } from "./store";

// In-process background job runner. One job per project at a time; jobs run
// stages sequentially and persist progress into project.json, which the UI polls.
// If the server restarts mid-job, `reconcile` marks the interrupted stage as failed
// so the user can resume — completed assets are kept and skipped next time.

export interface JobRequest {
  stages: StageName[];
  sceneIds?: string[];
  characterIds?: string[];
  force?: boolean;
}

interface Job {
  id: string;
  projectId: string;
  cancelled: boolean;
  promise: Promise<void>;
}

const g = globalThis as unknown as { __neonJobs?: Map<string, Job> };
const jobs = (g.__neonJobs ??= new Map<string, Job>());

export function isRunning(projectId: string) {
  return jobs.has(projectId);
}

export async function startJob(projectId: string, req: JobRequest): Promise<string> {
  if (jobs.has(projectId)) throw new Error("A job is already running for this project.");
  const stages = STAGE_ORDER.filter((s) => req.stages.includes(s));
  if (!stages.length) throw new Error("No stages selected.");
  const id = newId("j_");
  const job: Job = { id, projectId, cancelled: false, promise: Promise.resolve() };
  jobs.set(projectId, job);
  await updateProject(projectId, (p) => {
    p.activeJob = id;
    for (const s of stages) p.stages[s] = { status: "queued", progress: 0 };
    logLine(p, "info", `Job started: ${stages.join(" → ")}${req.force ? " (regenerate)" : ""}`);
  });
  job.promise = (async () => {
    try {
      for (const stage of stages) {
        if (job.cancelled) throw new CancelledError();
        await runStage(stage, {
          projectId,
          sceneIds: req.sceneIds,
          characterIds: req.characterIds,
          force: !!req.force,
          isCancelled: () => job.cancelled,
        });
      }
    } catch {
      // stage errors are already recorded on the project
    } finally {
      jobs.delete(projectId);
      await updateProject(projectId, (p) => {
        p.activeJob = undefined;
        for (const s of stages) if (p.stages[s].status === "queued") p.stages[s] = { status: "idle", progress: 0 };
      }).catch(() => undefined);
    }
  })();
  return id;
}

export function cancelJob(projectId: string) {
  const job = jobs.get(projectId);
  if (job) job.cancelled = true;
  return !!job;
}

/** Clean up state left behind by a server restart. */
export async function reconcile(projectId: string) {
  const p = readProject(projectId);
  if (!p || jobs.has(projectId)) return p;
  const stale = STAGE_ORDER.filter((s) => p.stages[s].status === "running" || p.stages[s].status === "queued");
  const staleAssets =
    p.scenes.some((s) => [s.image, s.video, s.voice, s.sfxAudio].some((a) => a.status === "running")) ||
    p.characters.some((c) => c.reference.status === "running") ||
    p.music.status === "running";
  if (!p.activeJob && !stale.length && !staleAssets) return p;
  const msg = "Interrupted (server restarted). Run again to resume — finished assets are kept.";
  return updateProject(projectId, (q) => {
    q.activeJob = undefined;
    for (const s of stale) q.stages[s] = { ...q.stages[s], status: "error", error: msg };
    const fix = (a: { status: string; error?: string }) => {
      if (a.status === "running") Object.assign(a, { status: "error", error: msg });
    };
    q.scenes.forEach((s) => [s.image, s.video, s.voice, s.sfxAudio].forEach(fix));
    q.characters.forEach((c) => fix(c.reference));
    fix(q.music);
  });
}
