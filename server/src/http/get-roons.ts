import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { db } from '../db/connection.ts';
import { schema } from '../db/index.ts';

// route que retorna todas as salas 
export const getRoonsRoute: FastifyPluginCallbackZod = (app) => {
  app.get('/roons', async () => {
    const results = await db.select({
      id: schema.rooms.id,
      name: schema.rooms.name
    }).from(schema.rooms).orderBy(schema.rooms.createdAt)

    return results;
  })
}