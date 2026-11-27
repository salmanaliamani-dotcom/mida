import { startJob, type JobRequest } from "@/lib/server/jobs";
import { readProject } from "@/lib/server/store";
import { body, fail, json } from "@/lib/server/http";
import { STAGE_ORDER, type StageName } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST { stages: ["images"], sceneIds?: [...], force?: true } or { stages: "all" } */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!readProject(id)) return json({ error: "Project not found" }, 404);
    const b = await body<Omit<JobRequest, "stages"> & { stages: StageName[] | "all" }>(req);
    const stages = b.stages === "all" ? STAGE_ORDER : (b.stages ?? []).filter((s) => STAGE_ORDER.includes(s));
    const jobId = await startJob(id, {
      stages,
      sceneIds: Array.isArray(b.sceneIds) ? b.sceneIds : undefined,
      characterIds: Array.isArray(b.characterIds) ? b.characterIds : undefined,
      force: !!b.force,
    });
    return json({ jobId }, 202);
  } catch (e) {
    return fail(e);
  }
}
