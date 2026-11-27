import { cancelJob } from "@/lib/server/jobs";
import { fail, json } from "@/lib/server/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return json({ cancelled: cancelJob(id) });
  } catch (e) {
    return fail(e);
  }
}
