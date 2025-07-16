import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";
import { count, eq } from "drizzle-orm";

// route que retorna todas as salas
export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", async () => {
    const results = await db
      .select({
        id: schema.rooms.id,
        createdAt: schema.rooms.createdAt,
        name: schema.rooms.name,
        questionsCount: count(schema.questions.id)
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id, schema.rooms.name)
      .orderBy(schema.rooms.createdAt);

    return results;
  });
};
