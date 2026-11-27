"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api, StatusPill } from "@/components/ui";
import { STAGE_ORDER, type AssetState, type StageState, type StageName } from "@/lib/types";

interface Row {
  id: string;
  name: string;
  idea: string;
  updatedAt: string;
  aspectRatio: "9:16" | "16:9";
  scenes: number;
  final: AssetState;
  running: boolean;
  stages: Record<StageName, StageState>;
}

export default function Dashboard() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let alive = true;
    const load = () => api<Row[]>("/api/projects").then((r) => alive && setRows(r)).catch((e) => setError(e.message));
    load();
    const t = setInterval(load, 4000);
    return () => {
      alive = false;
      clearInterval(t);
    };
  }, []);

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Your Neon Shadow animations. Type an idea, and the studio writes, draws, animates, voices and edits it.</p>
        </div>
        <Link href="/new" className="btn primary">✦ New project</Link>
      </div>
      {error && <div className="notice">{error}</div>}
      {rows && rows.length === 0 && (
        <div className="card hero-empty">
          <div className="orb" />
          <h2>No projects yet</h2>
          <p className="muted" style={{ margin: "8px 0 18px" }}>Start with a one-line idea — a mysterious elevator, a lighthouse keeper, a robot who raised a child.</p>
          <Link href="/new" className="btn primary">Create your first video</Link>
        </div>
      )}
      <div className="grid grid-auto">
        {rows?.map((p) => {
          const done = STAGE_ORDER.filter((s) => p.stages[s]?.status === "done").length;
          const failed = STAGE_ORDER.some((s) => p.stages[s]?.status === "error");
          return (
            <Link key={p.id} href={`/projects/${p.id}`} className="card project-card">
              <div className={`media ${p.aspectRatio === "9:16" ? "v916" : "v169"}`} style={{ maxHeight: 300 }}>
                {p.final.status === "done" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/projects/${p.id}/media/media/final_thumb.jpg?v=${p.final.updatedAt}`} alt="" />
                ) : (
                  <div className="empty">{p.scenes ? `${p.scenes} scenes` : "Draft"}</div>
                )}
              </div>
              <div className="row">
                <h3 style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} dir="auto">{p.name}</h3>
                {p.running ? <StatusPill status="running" /> : failed ? <StatusPill status="error" label="Needs attention" /> : p.final.status === "done" ? <StatusPill status="done" label="Rendered" /> : null}
              </div>
              <p className="muted small" dir="auto" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.idea}</p>
              <div className="row small dim">
                <span>{p.aspectRatio}</span>·<span>{done}/{STAGE_ORDER.length} stages</span>
                <span className="spacer" />
                <span>{new Date(p.updatedAt).toLocaleString()}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
