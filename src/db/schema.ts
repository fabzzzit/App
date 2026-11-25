import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  clientId: text("client_id").notNull(),
  botName: text("bot_name").notNull(),
  botElo: integer("bot_elo").notNull(),
  playerColor: text("player_color").notNull(), // "w" | "b"
  result: text("result").notNull(), // "win" | "loss" | "draw"
  reason: text("reason").notNull().default(""),
  pgn: text("pgn").notNull(),
  moves: integer("moves").notNull().default(0),
  analysis: jsonb("analysis"),
  accuracy: integer("accuracy"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GameRow = typeof games.$inferSelect;
