import { db } from "@/db";
import { games } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const n = Number(id);
  if (!Number.isInteger(n)) return Response.json({ error: "ID inválido" }, { status: 400 });
  const [row] = await db.select().from(games).where(eq(games.id, n)).limit(1);
  if (!row) return Response.json({ error: "No encontrada" }, { status: 404 });
  return Response.json({ game: row });
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const n = Number(id);
  if (!Number.isInteger(n)) return Response.json({ error: "ID inválido" }, { status: 400 });
  const b = await req.json();
  await db
    .update(games)
    .set({ analysis: b.analysis ?? null, accuracy: Math.round(Number(b.accuracy) || 0) })
    .where(eq(games.id, n));
  return Response.json({ ok: true });
}
