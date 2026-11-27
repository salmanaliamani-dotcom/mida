import "server-only";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  ProviderSettings,
  PublicSettings,
  SECRET_KEYS,
  SecretKey,
  defaultProviderSettings,
} from "@/lib/types";
import { DATA_DIR, ensureDir } from "./paths";

// API keys can come from environment variables (preferred for deployments) or be
// saved from the Settings page. Saved keys are encrypted with AES-256-GCM using
// APP_SECRET (or a random secret generated once in data/.secret, chmod 600).
// Plain values are only ever read server-side; the browser gets a masked preview.

const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");
const SECRET_FILE = path.join(DATA_DIR, ".secret");

interface StoredSettings {
  providers: ProviderSettings;
  secrets: Partial<Record<SecretKey, string>>; // encrypted blobs
}

function masterKey(): Buffer {
  let secret = process.env.APP_SECRET;
  if (!secret) {
    ensureDir(DATA_DIR);
    if (!fs.existsSync(SECRET_FILE)) {
      fs.writeFileSync(SECRET_FILE, crypto.randomBytes(32).toString("hex"), { mode: 0o600 });
    }
    secret = fs.readFileSync(SECRET_FILE, "utf8").trim();
  }
  return crypto.createHash("sha256").update(secret).digest();
}

function encrypt(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", masterKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return [iv, cipher.getAuthTag(), enc].map((b) => b.toString("base64")).join(".");
}

function decrypt(blob: string): string | undefined {
  try {
    const [iv, tag, enc] = blob.split(".").map((s) => Buffer.from(s, "base64"));
    const decipher = crypto.createDecipheriv("aes-256-gcm", masterKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
  } catch {
    return undefined;
  }
}

function deepMerge<T>(base: T, over: unknown): T {
  if (!over || typeof over !== "object") return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    const b = out[k];
    out[k] = b && typeof b === "object" && !Array.isArray(b) && v && typeof v === "object" ? deepMerge(b, v) : v;
  }
  return out as T;
}

function readStored(): StoredSettings {
  try {
    const raw = JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8")) as Partial<StoredSettings>;
    return {
      providers: deepMerge(defaultProviderSettings(), raw.providers),
      secrets: raw.secrets ?? {},
    };
  } catch {
    return { providers: defaultProviderSettings(), secrets: {} };
  }
}

function writeStored(s: StoredSettings) {
  ensureDir(DATA_DIR);
  const tmp = SETTINGS_FILE + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(s, null, 2), { mode: 0o600 });
  fs.renameSync(tmp, SETTINGS_FILE);
}

export function getProviders(): ProviderSettings {
  return readStored().providers;
}

export function getSecret(key: SecretKey): string | undefined {
  const env = process.env[key]?.trim();
  if (env) return env;
  const blob = readStored().secrets[key];
  return blob ? decrypt(blob) : undefined;
}

export class MissingKeyError extends Error {
  constructor(public key: SecretKey, what: string) {
    super(`${what} needs ${key}. Add it in Settings (or as an environment variable) and try again.`);
  }
}

export function requireSecret(key: SecretKey, what: string): string {
  const v = getSecret(key);
  if (!v) throw new MissingKeyError(key, what);
  return v;
}

function mask(v: string) {
  return v.length <= 8 ? "••••" : `${v.slice(0, 4)}…${v.slice(-4)}`;
}

let ffmpegCache: PublicSettings["ffmpeg"] | undefined;
export function ffmpegInfo(): PublicSettings["ffmpeg"] {
  if (ffmpegCache) return ffmpegCache;
  try {
    const out = execFileSync(process.env.FFMPEG_PATH || "ffmpeg", ["-version"], { encoding: "utf8" });
    ffmpegCache = { available: true, version: out.split("\n")[0] };
  } catch {
    ffmpegCache = { available: false };
  }
  return ffmpegCache;
}

export function getPublicSettings(): PublicSettings {
  const stored = readStored();
  const secrets = {} as PublicSettings["secrets"];
  for (const key of SECRET_KEYS) {
    const env = process.env[key]?.trim();
    if (env) secrets[key] = { configured: true, source: "env", preview: mask(env) };
    else {
      const v = stored.secrets[key] ? decrypt(stored.secrets[key]!) : undefined;
      secrets[key] = v ? { configured: true, source: "saved", preview: mask(v) } : { configured: false, source: "none" };
    }
  }
  return { providers: stored.providers, secrets, ffmpeg: ffmpegInfo() };
}

export function saveSettings(update: {
  providers?: Partial<ProviderSettings>;
  secrets?: Partial<Record<SecretKey, string | null>>;
}) {
  const stored = readStored();
  if (update.providers) stored.providers = deepMerge(stored.providers, update.providers);
  for (const [k, v] of Object.entries(update.secrets ?? {})) {
    if (!(SECRET_KEYS as readonly string[]).includes(k)) continue;
    const key = k as SecretKey;
    if (v === null || v === "") delete stored.secrets[key];
    else if (typeof v === "string") stored.secrets[key] = encrypt(v.trim());
  }
  writeStored(stored);
}
