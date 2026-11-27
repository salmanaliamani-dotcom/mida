import { createProject, listProjects } from "@/lib/server/store";
import { body, fail, json } from "@/lib/server/http";
import type { ProjectSettings } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return json(
    listProjects().map((p) => ({
      id: p.id,
      name: p.name,
      idea: p.idea,
      updatedAt: p.updatedAt,
      createdAt: p.createdAt,
      aspectRatio: p.settings.aspectRatio,
      scenes: p.scenes.length,
      final: p.final,
      running: !!p.activeJob,
      stages: p.stages,
    })),
  );
}

export async function POST(req: Request) {
  try {
    const b = await body<{ name?: string; idea?: string; settings?: Partial<ProjectSettings> }>(req);
    if (!b.idea?.trim()) throw new Error("Describe your story idea.");
    const p = createProject(b.name?.trim() ?? "", b.idea.trim(), b.settings);
    return json(p, 201);
  } catch (e) {
    return fail(e);
  }
}
