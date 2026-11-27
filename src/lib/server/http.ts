import "server-only";
import { NextResponse } from "next/server";
import { MissingKeyError } from "./settings";

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status });

export function fail(e: unknown) {
  const err = e as Error;
  const status = e instanceof MissingKeyError ? 400 : /not found/i.test(err.message) ? 404 : 400;
  return NextResponse.json({ error: err.message }, { status });
}

export async function body<T>(req: Request): Promise<T> {
  try {
    return (await req.json()) as T;
  } catch {
    throw new Error("Invalid JSON body");
  }
}
