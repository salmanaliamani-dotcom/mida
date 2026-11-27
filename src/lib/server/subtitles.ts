import "server-only";
import { stripCues } from "./providers/http";

// Builds an ASS subtitle file. Each scene's narration is split into short
// caption chunks whose timing is proportional to word count within the scene's
// voice duration. libass (with fribidi/harfbuzz) handles Arabic shaping and RTL.

export interface CaptionScene {
  start: number;
  voiceDuration: number;
  narration: string;
}

const ts = (s: number) => {
  const cs = Math.max(0, Math.round(s * 100));
  const h = Math.floor(cs / 360000);
  const m = Math.floor((cs % 360000) / 6000);
  const sec = Math.floor((cs % 6000) / 100);
  return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(cs % 100).padStart(2, "0")}`;
};

function chunks(text: string, maxWords: number): string[] {
  const out: string[] = [];
  for (const sentence of text.split(/\n+|(?<=[.!?؟…])\s+/)) {
    const words = sentence.trim().split(/\s+/).filter(Boolean);
    for (let i = 0; i < words.length; i += maxWords) out.push(words.slice(i, i + maxWords).join(" "));
  }
  return out.filter(Boolean);
}

export function buildAss(scenes: CaptionScene[], opts: { width: number; height: number; rtl: boolean }) {
  const vertical = opts.height > opts.width;
  const fontSize = Math.round((vertical ? opts.width : opts.height) * 0.066);
  const marginV = Math.round(opts.height * (vertical ? 0.2 : 0.09));
  const font = opts.rtl ? "Noto Sans Arabic" : "DejaVu Sans";
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: ${opts.width}
PlayResY: ${opts.height}
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Neon,${font},${fontSize},&H00FFFFFF,&H00FFFFFF,&H00B0208A,&H64000000,1,0,0,0,100,100,0,0,1,${Math.max(2, Math.round(fontSize / 14))},${Math.round(fontSize / 10)},2,${Math.round(opts.width * 0.08)},${Math.round(opts.width * 0.08)},${marginV},1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;
  const lines: string[] = [];
  for (const sc of scenes) {
    const parts = chunks(stripCues(sc.narration), vertical ? 5 : 8);
    const total = parts.reduce((n, p) => n + p.split(/\s+/).length, 0) || 1;
    let t = sc.start;
    for (const p of parts) {
      const d = (sc.voiceDuration * p.split(/\s+/).length) / total;
      const text = p.replace(/[{}]/g, "").replace(/\\/g, "");
      lines.push(`Dialogue: 0,${ts(t)},${ts(t + d)},Neon,,0,0,0,,{\\fad(120,120)}${text}`);
      t += d;
    }
  }
  return header + lines.join("\n") + "\n";
}
