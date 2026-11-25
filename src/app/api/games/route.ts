import { db } from "@/db";
import { games } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const clientId = new URL(req.url).searchParams.get("clientId");
  if (!clientId) return Response.json({ games: [] });
  const rows = await db
    .select({
      id: games.id,
      botName: games.botName,
      botElo: games.botElo,
      playerColor: games.playerColor,
      result: games.result,
      reason: games.reason,
      moves: games.moves,
      accuracy: games.accuracy,
      createdAt: games.createdAt,
    })
    .from(games)
    .where(eq(games.clientId, clientId))
    .orderBy(desc(games.createdAt))
    .limit(50);
  return Response.json({ games: rows });
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.clientId || typeof b.pgn !== "string" || !b.botName) {
      return Response.json({ error: "Datos inválidos" }, { status: 400 });
    }
    const [row] = await db
      .insert(games)
      .values({
        clientId: String(b.clientId).slice(0, 64),
        botName: String(b.botName).slice(0, 60),
        botElo: Number(b.botElo) || 0,
        playerColor: b.playerColor === "b" ? "b" : "w",
        result: ["win", "loss", "draw"].includes(b.result) ? b.result : "draw",
        reason: String(b.reason ?? "").slice(0, 60),
        pgn: b.pgn.slice(0, 20000),
        moves: Number(b.moves) || 0,
      })
      .returning({ id: games.id });
    return Response.json({ id: row.id });
  } catch {
    return Response.json({ error: "No se pudo guardar" }, { status: 500 });
  }
}
