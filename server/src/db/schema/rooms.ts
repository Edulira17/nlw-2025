import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// entidade roons = salas
export const rooms = pgTable('rooms', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp().defaultNow().notNull()
})