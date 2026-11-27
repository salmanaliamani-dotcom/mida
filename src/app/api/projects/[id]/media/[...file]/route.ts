import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { projectFile } from "@/lib/server/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp4": "video/mp4",
  ".wav": "audio/wav",
  ".mp3": "audio/mpeg",
};

/** Serves project media with HTTP Range support (needed for video seeking). */
export async function GET(req: Request, { params }: { params: Promise<{ id: string; file: string[] }> }) {
  const { id, file } = await params;
  let full: string;
  try {
    full = projectFile(id, file.join("/"));
  } catch {
    return new Response("Bad path", { status: 400 });
  }
  if (!full.includes(`${path.sep}media${path.sep}`) || !fs.existsSync(full)) return new Response("Not found", { status: 404 });
  const stat = fs.statSync(full);
  const type = TYPES[path.extname(full).toLowerCase()] ?? "application/octet-stream";
  const download = new URL(req.url).searchParams.has("download");
  const headers: Record<string, string> = {
    "Content-Type": type,
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-cache",
    ...(download ? { "Content-Disposition": `attachment; filename="${path.basename(full)}"` } : {}),
  };
  const range = req.headers.get("range");
  const m = range && /bytes=(\d*)-(\d*)/.exec(range);
  if (m) {
    const start = m[1] ? parseInt(m[1], 10) : 0;
    const end = m[2] ? Math.min(parseInt(m[2], 10), stat.size - 1) : stat.size - 1;
    if (start > end || start >= stat.size) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${stat.size}` } });
    const stream = Readable.toWeb(fs.createReadStream(full, { start, end })) as ReadableStream;
    return new Response(stream, {
      status: 206,
      headers: { ...headers, "Content-Range": `bytes ${start}-${end}/${stat.size}`, "Content-Length": String(end - start + 1) },
    });
  }
  const stream = Readable.toWeb(fs.createReadStream(full)) as ReadableStream;
  return new Response(stream, { headers: { ...headers, "Content-Length": String(stat.size) } });
}
