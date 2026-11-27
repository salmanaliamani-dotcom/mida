"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AssetState, AssetStatus } from "@/lib/types";

export async function api<T = unknown>(url: string, init?: RequestInit & { json?: unknown }): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: init?.json !== undefined ? { "Content-Type": "application/json", ...init?.headers } : init?.headers,
    body: init?.json !== undefined ? JSON.stringify(init.json) : init?.body,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `Request failed (${res.status})`);
  return data as T;
}

export function StatusPill({ status, label }: { status: AssetStatus; label?: string }) {
  const text = label ?? { idle: "Not generated", queued: "Queued", running: "Generating", done: "Ready", error: "Failed" }[status];
  return (
    <span className={`pill ${status}`}>
      <span className="dot" />
      {text}
    </span>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="progress">
      <i style={{ width: `${Math.round(Math.max(0, Math.min(1, value)) * 100)}%` }} />
    </div>
  );
}

export function mediaUrl(projectId: string, asset?: AssetState) {
  if (!asset?.file) return undefined;
  return `/api/projects/${projectId}/media/${asset.file.replace(/^media\//, "media/")}?v=${encodeURIComponent(asset.updatedAt ?? "")}`;
}

export function MediaBox({
  projectId,
  asset,
  kind,
  aspect,
  empty = "Not generated yet",
  poster,
}: {
  projectId: string;
  asset: AssetState;
  kind: "image" | "video";
  aspect: "9:16" | "16:9";
  empty?: string;
  poster?: string;
}) {
  const url = asset.status === "done" ? mediaUrl(projectId, asset) : undefined;
  return (
    <div className={`media ${aspect === "9:16" ? "v916" : "v169"}`}>
      {url ? (
        kind === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" />
        ) : (
          <video src={url} poster={poster} controls loop playsInline preload="metadata" />
        )
      ) : (
        <div className="empty">{asset.status === "error" ? "Failed — see error" : empty}</div>
      )}
      {asset.status === "running" && <div className="shimmer" />}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const show = useCallback((text: string, error = false) => {
    setToast({ text, error });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), error ? 9000 : 3500);
  }, []);
  const node = toast ? <div className={`toast ${toast.error ? "error" : ""}`}>{toast.text}</div> : null;
  return { show, node };
}

/** Debounced auto-save helper for text fields */
export function useDebounced<T>(value: T, ms: number, onChange: (v: T) => void) {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => onChange(value), ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ms]);
}
